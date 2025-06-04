<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import { Heart, Share } from '@lucide/svelte';
	import { fly } from 'svelte/transition';
	let { likes = $bindable<string>(), copyToClipBoard } = $props();
	let isRemoved = $state(false);

	$effect(() => {
		if (typeof window !== 'undefined') {
			// Check if running in browser
			isRemoved = JSON.parse(localStorage.getItem('remove') ?? 'false');
			if (page.form?.remove) {
				isRemoved = true;
				localStorage.setItem('remove', 'true');
			}
		}
	});
</script>

<div class="fixed inset-x-0 bottom-6 text-center">
	<div class="inline-block rounded-full bg-white px-4 py-3 shadow-md dark:bg-neutral-800">
		<div class="flex items-center gap-x-1.5">
			{#if likes}
				<form class="inline-block pt-1" action="?/like" method="POST" use:enhance>
					<input
						bind:value={likes}
						type="hidden"
						id="likes"
						name="likes"
						aria-hidden="true"
						tabindex="-1"
						hidden
					/>
					<!-- Button -->

					<button
						disabled={isRemoved}
						type="submit"
						class=" focus:outline-hidden flex items-center gap-x-2 overflow-hidden text-sm text-gray-500 hover:text-gray-800 focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
					>
						<Heart size="20" fill={isRemoved} />
						{#key likes}
							<span in:fly={{ y: 200 }} out:fly={{ y: -200 }} class="inline-block min-w-[1.5ch]">
								{likes}
							</span>
						{/key}
					</button>

					<!-- Button -->
				</form>
				<div class="mx-3 block h-3 border-e border-gray-300 dark:border-neutral-600"></div>
			{/if}

			<!-- Button -->
			<div class=" relative inline-flex">
				<button
					onclick={() => copyToClipBoard()}
					type="button"
					class="focus:outline-hidden flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-800 focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
				>
					<Share size="18" />
					Copy
				</button>
			</div>
			<!-- Button -->
		</div>
	</div>
</div>
