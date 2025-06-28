<script lang="ts">
	import { Check } from '@lucide/svelte';

	import { cn } from '$lib/utils';

	let {
		selectedColor,
		onColorChange,
		selectedTexture,
		onTextureChange
	}: {
		selectedColor: string;
		onColorChange: (color: string) => void;
		selectedTexture: string | null;
		onTextureChange: (texture: string | null) => void;
	} = $props();

	const colors = [
		{ name: 'Primary Purple', value: '#673AB7' },
		{ name: 'Deep Sea Blue', value: '#03A9F4' },
		{ name: 'Forest Green', value: '#4CAF50' },
		{ name: 'Sunshine Yellow', value: '#FFEB3B' },
		{ name: 'Sunset Orange', value: '#FF5722' },
		{ name: 'Charcoal Gray', value: '#607D8B' }
	];

	const textures = [
		{
			name: 'Classic Terrazzo',
			value: 'https://placehold.co/100x100.png',
			hint: 'terrazzo texture'
		},
		{ name: 'Marble Flake', value: 'https://placehold.co/100x100.png', hint: 'marble texture' },
		{ name: 'Quartz Aggregate', value: 'https://placehold.co/100x100.png', hint: 'quartz texture' },
		{ name: 'Mica Shimmer', value: 'https://placehold.co/100x100.png', hint: 'glitter texture' }
	];

	function handleColorClick(color: string) {
		onColorChange(color);
		onTextureChange(null);
	}

	function handleTextureClick(texture: string) {
		onTextureChange(texture);
	}
</script>

<div class="space-y-6">
	<div>
		<h3 class="text-md mb-2 font-semibold">Epoxy Colors</h3>
		<div class="grid grid-cols-4 gap-2 md:grid-cols-6">
			{#each colors as color (color.name)}
				{#key color.name}
					<button
						aria-label={`Select color ${color.name}`}
						title={color.name}
						onclick={() => handleColorClick(color.value)}
						class={cn(
							'flex aspect-square w-full items-center justify-center rounded-md border-2 transition-all duration-150',
							selectedColor === color.value && !selectedTexture
								? 'border-ring ring-2 ring-ring ring-offset-2' // Apply ring if selected color AND no texture is active
								: 'border-transparent hover:border-muted-foreground'
						)}
						style:background-color={color.value}
					>
						{#if selectedColor === color.value && !selectedTexture}
							<!-- Checkmark for selected color when no texture is active -->
							<Check class="h-6 w-6 text-primary-foreground mix-blend-difference" />
						{/if}
					</button>
				{/key}
			{/each}
		</div>
	</div>

	<div>
		<h3 class="text-md mb-2 font-semibold">Terrazzo Textures</h3>
		<div class="grid grid-cols-2 gap-2 md:grid-cols-4">
			{#each textures as texture (texture.name)}
				{#key texture.name}
					<button
						onclick={() => handleTextureClick(texture.value)}
						class={cn(
							'group relative overflow-hidden rounded-md border-2 transition-all duration-150',
							selectedTexture === texture.value
								? 'border-ring ring-2 ring-ring ring-offset-2' // Apply ring if this texture is selected
								: 'border-transparent hover:border-muted-foreground'
						)}
					>
					
						<img
							src={texture.value}
							alt={texture.name}
							width="100"
							height="100"
							class="h-full w-full object-cover"
							data-ai-hint={texture.hint}
						/>
						<div
							class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
						>
							<span class="p-1 text-center text-xs text-white">{texture.name}</span>
						</div>

						{#if selectedTexture === texture.value}
							<!-- Overlay and checkmark for selected texture -->
							<div class="absolute inset-0 flex items-center justify-center bg-primary/50">
								<Check class="h-6 w-6 text-primary-foreground" />
							</div>
						{/if}
					</button>
				{/key}
			{/each}
		</div>
	</div>
</div>
