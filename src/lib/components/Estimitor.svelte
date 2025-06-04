<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import { Input } from '$lib/components/ui/input/index.js';

	import { Calculator } from '@lucide/svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Button } from '$lib/components/ui/button/index';

	// Form state
	let projectType: string = $state('');
	let area: number | '' = $state('');
	let finishType: string = $state('');
	let estimatedCost: string | null = $state(null);

	// Example cost‐calculation logic (replace with your own)
	function calculateEstimate() {
		if (!projectType || !area || !finishType) {
			estimatedCost = null;
			return;
		}

		// Basic placeholder logic (e.g., base rate by finish)
		let ratePerSqm = 0;
		switch (finishType) {
			case 'standard_epoxy':
				ratePerSqm = 25;
				break;
			case 'metallic':
				ratePerSqm = 35;
				break;
			case 'polyurethane':
				ratePerSqm = 30;
				break;
			case 'heavy_duty':
				ratePerSqm = 40;
				break;
		}

		// Project‐type multiplier
		let typeMultiplier = 1;
		switch (projectType) {
			case 'residential':
				typeMultiplier = 1;
				break;
			case 'luxury_residential':
				typeMultiplier = 1.2;
				break;
			case 'commercial':
				typeMultiplier = 1.1;
				break;
			case 'industrial':
				typeMultiplier = 1.3;
				break;
		}

		const raw = ratePerSqm * Number(area) * typeMultiplier;
		// Format as currency (e.g., USD). Adjust to desired locale/currency.
		estimatedCost = new Intl.NumberFormat('en‑US', {
			style: 'currency',
			currency: 'USD'
		}).format(raw);
	}

	function onSubmit(event: Event) {
		event.preventDefault();
		calculateEstimate();
	}
</script>

<section id="estimator" class="w‑full py‑16 md:py‑24 bg‑card">
	<div class="mx‑auto px‑4 sm:px‑6 lg:px‑8 container">
		<div class="container mx-auto px-4 text-center sm:px-6 lg:px-8">
			<h1 class="mb-6 text-4xl font-bold tracking-tight text-[#a71580] sm:text-5xl md:text-6xl">
				Instant Project Estimate
			</h1>
			<p class="mx-auto mb-10 max-w-2xl text-lg text-foreground/80 sm:text-xl">
				Get a quick idea of your project costs. For precise quotes, please contact us.
			</p>
		</div>
		<Card.Root class="max‑w‑2xl mx‑auto shadow‑xl">
			<Card.Header>
				<Card.Title class="items‑center text‑2xl text‑primary flex">
					<Calculator class="mr‑2 h‑6 w‑6" />
					Cost Calculator
				</Card.Title>
				<Card.Description>Fill in the details below for an approximate cost.</Card.Description>
			</Card.Header>

			<Card.Content>
				<form onsubmit={onSubmit} class="space‑y‑6">
					<!-- Project Type -->
					<div>
						<Select.Root type="single" bind:value={projectType}>
							<Select.Trigger>vv</Select.Trigger>
							<Select.Content>
								<Select.Group class="Group">
									<Select.Item value="residential">Residential</Select.Item>
									<Select.Item value="luxury_residential">Luxury Residential</Select.Item>
									<Select.Item value="commercial">Commercial</Select.Item>
									<Select.Item value="industrial">Industrial</Select.Item>
								</Select.Group>
							</Select.Content>
						</Select.Root>
					</div>

					<!-- Area (sqm) -->
					<div>
						<label class="text‑sm font‑medium text‑foreground block"> Area (sqm) </label>
						<Input type="number" placeholder="e.g., 100" bind:value={area} min="0" />
					</div>

					<!-- Finish Type -->
					<div>
						<label class="text‑sm font‑medium text‑foreground block"> Desired Finish </label>
						<Select.Root type="single" bind:value={finishType}>
							<Select.Trigger>vv</Select.Trigger>
							<Select.Content class="z-10 bg-white">
								<Select.Item class="bg-white text-black" value="standard_epoxy"
									>Standard Epoxy</Select.Item
								>
								<Select.Item class="bg-white text-black" value="metallic"
									>Metallic Epoxy</Select.Item
								>
								<Select.Item class="bg-white text-black" value="polyurethane"
									>Polyurethane</Select.Item
								>
								<Select.Item
									class="z-[100] cursor-pointer bg-white text-black hover:bg-slate-500"
									value="heavy_duty">Heavy‑Duty Industrial</Select.Item
								>
							</Select.Content>
						</Select.Root>
					</div>

					<Button
						type="submit"
						class="w‑full bg‑primary text‑primary‑foreground hover:bg‑primary/90 text‑lg py‑6 shadow‑md transition‑transform hover:scale‑105"
					>
						Calculate Estimate
					</Button>
				</form>

				{#if estimatedCost}
					<Alert.Root class="mt‑8 border‑primary bg‑primary/10">
						<Calculator class="h‑4 w‑4 text‑primary" />
						<Alert.Title class="text‑primary">Estimated Cost</Alert.Title>
						<Alert.Description class="text‑xl font‑bold text‑foreground">
							{estimatedCost}
						</Alert.Description>
						<p class="text‑xs text‑muted‑foreground mt‑1">
							This is a rough estimate. Actual costs may vary.
						</p>
					</Alert.Root>
				{/if}

				<Alert.Root variant="default" class="mt‑6 bg‑muted/50">
					<Alert.Title>Disclaimer</Alert.Title>
					<Alert.Description>
						This calculator provides an approximate cost for estimation purposes only. For a
						detailed and accurate quotation, please contact our sales team. Factors like subfloor
						condition, specific design requirements, and location can influence the final price.
					</Alert.Description>
				</Alert.Root>
			</Card.Content>
		</Card.Root>
	</div>
</section>
