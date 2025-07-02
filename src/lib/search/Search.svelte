<script lang="ts">
	import { onMount } from 'svelte';
	import { createPostsIndex, createProjectIndex, searchAll } from '$lib/search/search';
	import type { PostModelThumbNail } from '$lib/interface/post';
	import type { ProjectWithThumbNail } from '$lib/interface/project';
	import { localizeHref } from '$lib/paraglide/runtime';

	// Define a type for the search results, now including Arabic fields
	type SearchResult = {
		slug: string;
		title: string;
		content: string[];
		title_ar: string;
		content_ar: string[];
	};

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

{#if search === 'ready'}
	<div class="search" dir="auto">
		<input
			bind:value={searchTerm}
			placeholder="Search posts and projects..."
			autocomplete="off"
			spellcheck="false"
			type="search"
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
{/if}

<style>
	.search {
		width: 90vw;
		max-width: 600px;
		position: fixed;
		left: 50%;
		top: 20%;
		translate: -50% -0%;
		border-radius: 0.5rem;
		box-shadow: 0px 0px 20px hsl(0 0% 0% / 40%);
		overflow: hidden;
	}

	.search input {
		width: 100%;
		padding: 1.5rem;
		color: hsl(220 10% 98%);
		background-color: hsl(220 10% 20%);
		font: inherit;
		border: none;
		outline: none;
	}

	.results {
		max-height: 48vh;
		padding: 1.5rem;
		background-color: hsl(220 10% 14%);
		overflow-y: auto;
		scrollbar-width: thin;
	}

	.results h3 {
		margin-top: 1rem;
		margin-bottom: 0.5rem;
		color: hsl(220 10% 85%);
		border-bottom: 1px solid hsl(220 10% 20%);
		padding-bottom: 0.5rem;
	}

	.results ul {
		display: grid;
		gap: 1rem;
		padding: 0px;
		margin: 0px;
		list-style: none;
	}

	.results ul li:not(:last-child) {
		padding-block: 0.5rem;
		border-bottom: 1px solid hsl(220 10% 20%);
	}

	.results a {
		display: block;
		font-size: 1.5rem;
		color: hsl(220 10% 80%);
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.results a:hover {
		color: aqua;
	}

	.results p {
		font-size: 1rem;
		color: hsl(220 10% 70%);
		margin-top: 0.5rem;
		line-height: 1.4;
	}

	[dir='rtl'] {
		text-align: right;
	}
</style>
