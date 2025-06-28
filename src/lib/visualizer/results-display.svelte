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

	let {
		shapes, // Array of selected shape names (e.g., ['circle', 'square'])
		color, // Selected epoxy color (e.g., '#673AB7')
		texture // Selected texture URL (e.g., 'https://placehold.co/100x100.png') or null
	}: {
		shapes: string[];
		color: string;
		texture: string | null;
	} = $props();

	// Define the mapping from shape names (strings) to their corresponding Lucide Svelte components.
	const SHAPE_MAP: { [key: string]: typeof IconType } = {
		circle: Circle,
		square: Square,
		triangle: Triangle,
		hexagon: Hexagon,
		organic1: Sparkles, // Using Sparkles as an abstract alternative for 'organic1'
		organic2: Gem // Using Gem as an abstract alternative for 'organic2'
	};

	// Type definition for a single rendered shape instance.
	type ShapeInstance = {
		id: string; // Unique identifier for the shape instance
		Component: typeof IconType; // The Svelte icon component to render
		x: number; // X-position (percentage)
		y: number; // Y-position (percentage)
		size: number; // Size (percentage)
		rotation: number; // Rotation angle (degrees)
		zIndex: number; // Z-index for layering
	};

	// Svelte 5 $state variable to hold the array of dynamically generated shapes.
	let renderedShapes = $state<ShapeInstance[]>([]);

	// Svelte 5 $state variable for the unique texture ID.
	// It's initialized with a random string and will reactively update if 'texture' changes.
	let textureId = $state(`texture-${Math.random().toString(36).substring(2, 11)}`);

	// Svelte 5 reactive statement triggered when 'shapes' or 'texture' changes.
	// This effectively replaces React's useEffect for generating/updating shapes.
	$effect(() => {
		if (shapes.length === 0) {
			renderedShapes = [];
			return;
		}

		const newShapes: ShapeInstance[] = [];
		const totalShapesToGenerate = 150; // Total number of shapes to display

		// Generate a new set of shapes.
		for (let i = 0; i < totalShapesToGenerate; i++) {
			// Cycle through the selected shapes
			const shapeName = shapes[i % shapes.length];
			const Component = SHAPE_MAP[shapeName];

			// Only add if a valid component mapping exists
			if (Component) {
				newShapes.push({
					id: `${shapeName}-${i}-${Math.random()}`, // Unique ID for each instance
					Component: Component, // The actual Svelte component
					x: Math.random() * 100, // Random X position (0-100%)
					y: Math.random() * 100, // Random Y position (0-100%)
					size: Math.random() * 12 + 4, // Random size (4-16% of container)
					rotation: Math.random() * 360, // Random rotation (0-360 degrees)
					zIndex: Math.floor(Math.random() * 10) // Random z-index (0-9)
				});
			}
		}
		// Update the state with the newly generated shapes. Svelte will re-render efficiently.
		renderedShapes = newShapes;

		// Update textureId when 'texture' prop changes
		if (texture) {
			textureId = `texture-${Math.random().toString(36).substring(2, 11)}`;
		}
	});

	// Derived state for the CSS fill style.
	// It will be a URL to the pattern if texture is selected, otherwise the solid color.
	const fillStyle = $derived(texture ? `url(#${textureId})` : color);
</script>

<div
	class="relative aspect-square w-full overflow-hidden rounded-lg border bg-card-foreground/5 shadow-inner"
>
	<svg width="0" height="0" class="absolute">
		<defs>
			{#if texture}
				<pattern id={textureId} patternUnits="userSpaceOnUse" width="200" height="200">
					<image href={texture} x="0" y="0" width="200" height="200" />
				</pattern>
			{/if}
		</defs>
	</svg>

	{#each renderedShapes as shape (shape.id)}
		{@const Icon = shape.Component}
		<div
			class="absolute transition-all duration-300"
			style:left={`${shape.x}%`}
			style:top={`${shape.y}%`}
			style:width={`${shape.size}%`}
			style:height={`${shape.size}%`}
			style:transform={`translate(-50%, -50%) rotate(${shape.rotation}deg)`}
			style:z-index={shape.zIndex}
			style:opacity={0.85}
		>
			<Icon class="h-full w-full" fill={fillStyle} color={fillStyle} />
		</div>
	{/each}

	{#if shapes.length === 0}
		<div class="absolute inset-0 flex items-center justify-center">
			<p class="text-muted-foreground">Select a shape to begin designing.</p>
		</div>
	{/if}
</div>
