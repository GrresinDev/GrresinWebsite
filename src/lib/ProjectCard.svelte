<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Eye } from '@lucide/svelte';
	import type { ProjectWithThumbNail } from './interface/project';
	import { getLocale } from './paraglide/runtime';

	let { project }: { project: ProjectWithThumbNail } = $props();
	let showAfter = $state(false);
</script>

<a href={`/projects/${project.slug}`} class="group block h-full">
	<Card.Root
		class="flex h-full flex-col overflow-hidden bg-card shadow-lg transition-shadow duration-300 ease-in-out group-hover:shadow-xl"
	>
		<!-- Header -->
		<Card.Header class="pb-2">
			<div class="flex items-start justify-between">
				<Card.Title
					class="mb-1 text-xl text-primary transition-colors duration-150 group-hover:text-[#a71580] lg:text-2xl"
				>
					{getLocale() == 'ar' ? project.title_ar : project.title}
				</Card.Title>

				<Badge
					variant={project.type === 'Commercial'
						? 'default'
						: project.type === 'Residential'
							? 'secondary'
							: 'outline'}
					class={project.type === 'Commercial'
						? 'bg-primary text-primary-foreground'
						: project.type === 'Residential'
							? 'bg-secondary text-secondary-foreground'
							: 'border-primary text-primary'}
				>
					{project.slug}
				</Badge>
			</div>
			<Card.Description class="line-clamp-2 text-sm text-muted-foreground">
				{getLocale() == 'ar' ? project.desc_ar : project.desc}
			</Card.Description>
		</Card.Header>

		<!-- Content (Image Toggle) -->
		<Card.Content class="flex flex-grow flex-col justify-between p-4">
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="relative mb-4 aspect-video w-full cursor-pointer overflow-hidden rounded-md"
				onmouseenter={() => (showAfter = true)}
				onmouseleave={() => (showAfter = false)}
				onclick={(e) => {
					e.preventDefault();
				}}
			>
				<img
					src={showAfter ? project.before_thumbnail : project.after_thumbnail}
					alt={showAfter ? `After: ${project.title}` : `Before: ${project.title}`}
					class="h-full w-full object-cover transition-opacity duration-500 ease-in-out"
				/>

				<!-- Dark overlay with eye icon on hover -->
				<div
					class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
				>
					<Eye class="h-10 w-10 text-white" />
				</div>

				<!-- Badge showing "Before"/"After" -->
				<Badge
					class="absolute left-2 top-2 bg-black/70 text-white backdrop-blur-sm"
					variant="default"
				>
					{showAfter ? m.lime_vivid_vole_conquer() : m.tired_left_kestrel_adapt()}
				</Badge>
			</div>
		</Card.Content>
	</Card.Root>
</a>
