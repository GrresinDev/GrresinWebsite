<script lang="ts">
	// Using Svelte 5's $state rune for reactive state management.
	// These variables will hold the user's selections.
	let selectedShapes = $state<string[]>(['circle']);
	let selectedColor = $state<string>('#673AB7');
	let selectedTexture = $state<string | null>(null);

	// Import svelte-shadcn components. Adjust paths if necessary based on your setup.
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js'; // Using `* as Card` for svelte-shadcn Card components

	// Import your custom Svelte components. Ensure these paths are correct relative to +page.svelte.
	// These components were previously converted to Svelte 5.
	import ShapeSelector from '$lib/visualizer/ShapeSelector.svelte';
	import MaterialSelector from '$lib/visualizer/material-selector.svelte';
	import ResultsDisplay from '$lib/visualizer/results-display.svelte';

	// Handler for shape selection changes.
	// Directly updates the $state variable.
	function handleShapeSelectionChange(shapes: string[]) {
		selectedShapes = shapes;
	}

	// Handler for color selection changes.
	// Directly updates the $state variable.
	function handleColorChange(color: string) {
		selectedColor = color;
	}

	// Handler for texture selection changes.
	// Directly updates the $state variable.
	function handleTextureChange(texture: string | null) {
		selectedTexture = texture;
	}
</script>

<!--
<div class="font-body min-h-screen bg-background text-foreground">
	
	<div class="grid grid-cols-1 gap-8 p-4 md:p-8 lg:grid-cols-3">
		
		<div class="flex flex-col gap-8 lg:col-span-1">
			
			<Card.Root>
				<Card.Header>
					<Card.Title class="font-headline">1. Select Shapes</Card.Title>
					<Card.Description>Click to add or remove shapes from your design.</Card.Description>
				</Card.Header>
				<Card.Content>
				
					<ShapeSelector {selectedShapes} onSelectionChange={handleShapeSelectionChange} />
				</Card.Content>
			</Card.Root>

			
			<Card.Root>
				<Card.Header>
					<Card.Title class="font-headline">2. Choose Materials</Card.Title>
					<Card.Description>Pick a solid color or a terrazzo texture.</Card.Description>
				</Card.Header>
				<Card.Content>
				
					<MaterialSelector
						{selectedColor}
						onColorChange={handleColorChange}
						{selectedTexture}
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

		
		<div class="lg:col-span-2">
			<Card.Root class="sticky top-8">
				
				<Card.Header>
					<Card.Title class="font-headline">Results Display</Card.Title>
					<Card.Description>Your custom floor design dynamically appears here.</Card.Description>
				</Card.Header>
				<Card.Content class="max-w-md">
					<ResultsDisplay shapes={selectedShapes} color={selectedColor} texture={selectedTexture} />
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</div>
-->
<div class="font-body min-h-screen bg-background p-4 text-foreground md:p-8">
	<div class="flex flex-col gap-8 lg:flex-row lg:justify-between">
		<div class="flex w-full flex-col gap-8 lg:w-1/3">
			<Card.Root>
				<Card.Header>
					<Card.Title class="font-headline">1. Select Shapes</Card.Title>
					<Card.Description>Click to add or remove shapes from your design.</Card.Description>
				</Card.Header>
				<Card.Content>
					<ShapeSelector {selectedShapes} onSelectionChange={handleShapeSelectionChange} />
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="font-headline">2. Choose Materials</Card.Title>
					<Card.Description>Pick a solid color or a terrazzo texture.</Card.Description>
				</Card.Header>
				<Card.Content>
					<MaterialSelector
						{selectedColor}
						onColorChange={handleColorChange}
						{selectedTexture}
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
