<script lang="ts">
	import {
		Circle,
		Square,
		Hexagon,
		Triangle,
		Sparkles,
		Gem,
		type Icon as IconType
	} from '@lucide/svelte';

	import * as ToggleGroup from '$lib/components/ui/toggle-group/index.js';

	let {
		selectedShapes,
		onSelectionChange
	}: { selectedShapes: string[]; onSelectionChange: (shapes: string[]) => void } = $props();

	const shapes: { name: string; icon: typeof IconType; label: string }[] = [
		{ name: 'circle', icon: Circle, label: 'Circle' },
		{ name: 'square', icon: Square, label: 'Square' },
		{ name: 'triangle', icon: Triangle, label: 'Triangle' },
		{ name: 'hexagon', icon: Hexagon, label: 'Hexagon' },

		{ name: 'organic1', icon: Sparkles, label: 'Sparkles' },
		{ name: 'organic2', icon: Gem, label: 'Gem' }
	];

	function handleValueChange(newSelection: string[]) {
		selectedShapes = newSelection;
		onSelectionChange(newSelection);
	}
</script>

<ToggleGroup.Root
	type="multiple"
	variant="outline"
	value={selectedShapes}
	onValueChange={handleValueChange}
	class="grid grid-cols-3 gap-2"
>
	{#each shapes as shape (shape.name)}
		<ToggleGroup.Item
			value={shape.name}
			variant="default"
			aria-label={`Select ${shape.label}`}
			class="flex h-20 flex-col gap-2  data-[state=on]:bg-[#a71580b2]"
		>
			{@const Icon = shape.icon}
			<Icon class="size-8" />

			<span class="text-xs">{shape.label}</span>
		</ToggleGroup.Item>
	{/each}
</ToggleGroup.Root>
