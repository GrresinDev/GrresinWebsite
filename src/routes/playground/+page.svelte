<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import ShapeSelector from '$lib/visualizer/ShapeSelector.svelte';
	import MaterialSelector from '$lib/visualizer/material-selector.svelte';
	import ResultsDisplay from '$lib/visualizer/results-display.svelte';

	let selectedShapes = $state<string[]>(['circle']);
	let selectedColor = $state<string>('#673AB7');
	let selectedTexture = $state<string | null>(null);
	function handleShapeSelectionChange(shapes: string[]) {
		selectedShapes = shapes;
	}

	function handleColorChange(color: string) {
		selectedColor = color;
	}

	function handleTextureChange(texture: string | null) {
		selectedTexture = texture;
	}
</script>

<div class="font-body min-h-screen bg-background p-4 text-foreground md:p-8">
	<div class="flex flex-col gap-8 lg:flex-row lg:justify-between">
		<div class="flex w-full flex-col gap-8 lg:w-1/3">
			<Card.Root>
				<Card.Header>
					<Card.Title class="font-headline">1. Select Shapes</Card.Title>
					<Card.Description>Click to add or remove shapes from your design.</Card.Description>
				</Card.Header>
				<Card.Content>
					<ShapeSelector bind:selectedShapes onSelectionChange={handleShapeSelectionChange} />
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="font-headline">2. Choose Materials</Card.Title>
					<Card.Description>Pick a solid color or a terrazzo texture.</Card.Description>
				</Card.Header>
				<Card.Content>
					<MaterialSelector
						bind:selectedColor
						onColorChange={handleColorChange}
						bind:selectedTexture
						onTextureChange={handleTextureChange}
					/>
				</Card.Content>
			</Card.Root>

			<div class="flex justify-center">
				<Button
					size="lg"
					class="w-full bg-accent text-accent-foreground hover:bg-accent/90 md:w-auto"
					>Request a Quote</Button
				>
			</div>
		</div>

		<div class="w-full lg:w-2/3">
			<Card.Root class="sticky top-8">
				<Card.Header>
					<Card.Title class="font-headline">Results Display</Card.Title>
					<Card.Description>Your custom floor design dynamically appears here.</Card.Description>
				</Card.Header>
				<Card.Content class="mx-auto max-w-md">
					<ResultsDisplay shapes={selectedShapes} color={selectedColor} texture={selectedTexture} />
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</div>
