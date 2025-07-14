<script lang="ts">
	import { onMount } from 'svelte';
	import { createPostsIndex, createProjectIndex, searchAll } from '$lib/search/search';
	import type { PostModelThumbNail } from '$lib/interface/post';
	import type { ProjectWithThumbNail } from '$lib/interface/project';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { fade } from 'svelte/transition';

	
	type SearchResult = {
		slug: string;
		title: string;
		content: string[];
		title_ar: string;
		content_ar: string[];
	};

	export let isOpen = false;
	let search: 'loading' | 'ready' = 'loading';
	let searchTerm = ''; // Initialize with an empty string
	let postResults: SearchResult[] = [];
	let projectResults: SearchResult[] = [];

	onMount(async () => {
		// Fetch both posts and projects data from the /search.json endpoint
		try {
			const response = await fetch('/search.json');
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();

			// Ensure data.posts and data.projects are arrays before passing
			const posts = Array.isArray(data.posts) ? data.posts : [];
			const projects = Array.isArray(data.projects) ? data.projects : [];

			// Create indices for both posts and projects
			createPostsIndex(posts as PostModelThumbNail[]);
			createProjectIndex(projects as ProjectWithThumbNail[]);
			search = 'ready';
		} catch (error) {
			console.error('Failed to load search data:', error);
			// Optionally, handle error state for the user
			search = 'ready'; // Still set to ready to allow input, but with no results
		}
	});

	// Reactively search when the search term changes and the index is ready
	$: if (search === 'ready' && searchTerm.trim() !== '') {
		const results = searchAll(searchTerm);
		postResults = results.posts;
		projectResults = results.projects;
	} else if (searchTerm.trim() === '') {
		// Clear results when search term is empty
		postResults = [];
		projectResults = [];
	}
</script>

{#if isOpen}
	{#if search === 'ready'}
		<div class="modal-overlay" tabindex="-1" in:fade={{ duration: 200, delay: 200 }}>
			<div
				class="modal"
				role="dialog"
				aria-modal="true"
				aria-labelledby="search-title"
				in:fade={{ duration: 200, delay: 200 }}
			>
				<button
					class="close-button"
					on:click={() => {
						searchTerm = '';
						isOpen = false;
					}}
					aria-label="Close search"
				>
					&times;
				</button>

				<h2 id="search-title" class="modal-title">Search</h2>

				<input
					bind:value={searchTerm}
					placeholder="Search posts and projects..."
					autocomplete="off"
					spellcheck="false"
					type="search"
					class="modal-input"
					dir="auto"
				/>

				<div class="results" dir="auto">
					{#if postResults.length > 0 || projectResults.length > 0}
						{#if postResults.length > 0}
							<h3>Posts</h3>
							<ul>
								{#each postResults as result}
									<li>
										<a href={localizeHref(`blog/${result.slug}`)}>
											{@html result.title}
											{#if result.title_ar && result.title_ar !== result.title}
												<br />
												{@html result.title_ar}
											{/if}
										</a>
										{#each result.content as contentLine}
											<p>{@html contentLine}</p>
										{/each}
										{#each result.content_ar as contentLine_ar}
											<p>{@html contentLine_ar}</p>
										{/each}
									</li>
								{/each}
							</ul>
						{/if}

						{#if projectResults.length > 0}
							<h3>Projects</h3>
							<ul>
								{#each projectResults as result}
									<li>
										<a href={localizeHref(`/projects/${result.slug}`)}>
											{@html result.title}
											{#if result.title_ar && result.title_ar !== result.title}
												<br />
												{@html result.title_ar}
											{/if}
										</a>
										{#each result.content as contentLine}
											<p>{@html contentLine}</p>
										{/each}
										{#each result.content_ar as contentLine_ar}
											<p>{@html contentLine_ar}</p>
										{/each}
									</li>
								{/each}
							</ul>
						{/if}
					{:else if searchTerm.trim() !== ''}
						<p>No results found for "{searchTerm}"</p>
					{:else}
						<p>Start typing to search...</p>
					{/if}
				</div>
			</div>
		</div>
	{/if}
{/if}

<style>
	.modal-overlay {
		position: fixed;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	.modal {
		background-color: hsl(220, 10%, 14%);
		color: hsl(220, 10%, 98%);
		border-radius: 1rem;
		width: 90vw;
		max-width: 600px;
		max-height: 90vh;
		overflow: auto;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
		padding: 2rem;
		position: relative;
	}

	.modal-title {
		font-size: 1.75rem;
		margin-bottom: 1rem;
	}

	.modal-input {
		width: 100%;
		padding: 1rem;
		font-size: 1.25rem;
		border: none;
		outline: none;
		border-radius: 0.5rem;
		background-color: hsl(220, 10%, 20%);
		color: hsl(220, 10%, 98%);
		margin-bottom: 1.5rem;
	}

	.results {
		overflow-y: auto;
		max-height: 50vh;
	}

	.results h3 {
		color: hsl(220, 10%, 85%);
		border-bottom: 1px solid hsl(220, 10%, 20%);
		padding-bottom: 0.5rem;
		margin-top: 1rem;
		margin-bottom: 0.5rem;
	}

	.results ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 1rem;
	}

	.results li {
		padding-block: 0.5rem;
		border-bottom: 1px solid hsl(220, 10%, 20%);
	}

	.results a {
		color: hsl(220, 10%, 80%);
		font-size: 1.25rem;
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.results a:hover {
		color: aqua;
	}

	.results p {
		color: hsl(220, 10%, 70%);
		font-size: 1rem;
		margin-top: 0.5rem;
		line-height: 1.4;
	}

	.close-button {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: none;
		border: none;
		color: hsl(220, 10%, 60%);
		font-size: 2rem;
		cursor: pointer;
	}

	.close-button:hover {
		color: hsl(0, 100%, 70%);
	}

	[dir='rtl'] {
		text-align: right;
	}

	.modal-input::-webkit-search-cancel-button {
		-webkit-appearance: none;
		appearance: none;
		display: none;
	}
	.modal-input::-webkit-search-cancel-button {
		-webkit-appearance: none;
		appearance: none;
		display: none;
	}
</style>
