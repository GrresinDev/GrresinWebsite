<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { type Icon as IconType } from '@lucide/svelte';

	interface Info {
		title: string;
		date: string;
		description: string;
		Icon?: typeof IconType;
	}
	let { event, isLast }: { event: Info; isLast: boolean } = $props();
</script>

<div class="group relative py-3 pl-2 sm:pl-10">
	{#if !isLast}
		<div
			class="absolute bottom-0 left-20 top-[18%] w-0.5 bg-border transition-colors duration-300 group-hover:bg-[#a71580] sm:left-3"
		></div>
	{/if}
	<div
		class="group-hover:bg-[#a71580]-foreground absolute left-0 top-3.5 h-4 w-4 rounded-full border-4 border-black bg-border transition-colors duration-300 group-hover:border-[#a71580] sm:left-0.5"
	></div>

	<Card.Root
		class="ml-4 transition-shadow duration-300 ease-in-out hover:shadow-lg group-hover:border-[#a71580]/50"
	>
		<Card.Header class="pb-2">
			<div class="flex items-center justify-between">
				<Card.Title
					class="text-lg text-primary transition-colors duration-300 group-hover:text-[#a71580]"
					>{event.title}</Card.Title
				>
				<span class="rounded-full bg-muted px-2 py-1 text-xs font-semibold text-muted-foreground"
					>{event.date}</span
				>
			</div>
		</Card.Header>
		<Card.Content>
			<div class="flex items-start space-x-3">
				{#if event.Icon}
					{@const Icon = event.Icon}
					<Icon class="mt-1 h-5 w-5 shrink-0 text-accent" />
				{/if}
				<Card.Description class="text-sm text-foreground/80">{event.description}</Card.Description>
			</div>
		</Card.Content>
	</Card.Root>
</div>

=
