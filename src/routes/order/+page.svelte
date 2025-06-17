<script lang="ts">
	import { Switch } from '$lib/components/ui/switch/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { m } from '$lib/paraglide/messages';
	import { enhance } from '$app/forms';

	let cities = ['Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina'];
	let placeTypes = ['Home', 'Commercial'];
	let city1 = $state<string>('');
	let place1 = $state<string>('');
	const place1Content = $derived(placeTypes.find((p) => p === place1) ?? 'Select a Type');
	const city1Content = $derived(cities.find((c) => c === city1) ?? 'Select a City');
</script>

<main class="min-h-screen p-4 sm:p-8">
	<!-- Hero Section -->
	<section class="mb-10 rounded-2xl bg-transparent p-10 text-center shadow-lg">
		<h1 class="mb-4 text-4xl font-bold text-[#a71580]">
			{m.tense_topical_shrike_edit()}
		</h1>
		<p class="text-lg text-gray-600">
			{m.maroon_fine_shell_zoom()}
		</p>
	</section>

	<!-- Forms Section -->
	<div class="min-w-md flex items-center justify-center">
		<!-- Floor Estimation Request Form -->
		<form method="POST" class="w-full shadow-2xl" use:enhance>
			<Card.Root class="w-full shadow-2xl">
				<Card.Content class="space-y-4">
					<h2 class="text-2xl font-semibold">{m.patient_major_samuel_list()}</h2>
					<div>
						<Label for="name">{m.due_teal_panther_drum()}</Label>
						<Input id="name" name="name" type="text" placeholder={m.ideal_proof_dingo_fulfill()} />
					</div>
					<div>
						<Label for="email">{m.house_drab_alligator_enjoy()}</Label>
						<Input id="email" name="email" type="email" placeholder="example@mail.com" />
					</div>
					<div>
						<Label for="phone">{m.swift_elegant_bullock_forgive()}</Label>
						<Input id="phone" name="phone" type="tel" placeholder="05xxxxxxxx" />
					</div>
					<div>
						<Label for="city1">{m.bold_frail_platypus_express()}</Label>
						<Select.Root type="single" name="city" bind:value={city1}>
							<Select.Trigger id="city1">
								{city1Content}
							</Select.Trigger>
							<Select.Content class=" bg-white text-black">
								{#each cities as city}
									<Select.Item value={city} label={city} class=" hover:bg-slate-500 "
										>{city}</Select.Item
									>
								{/each}
							</Select.Content>
						</Select.Root>
					</div>
					<div>
						<Label for="place">{m.lofty_loose_martin_drop()}</Label>
						<Select.Root type="single" name="place" bind:value={place1}>
							<Select.Trigger id="place">
								{place1Content}
							</Select.Trigger>

							<Select.Content class=" bg-white text-black">
								{#each placeTypes as type}
									<Select.Item value={type} class=" hover:bg-slate-500 ">{type}</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
					</div>

					<div class="flex items-center space-x-2">
						<Switch id="cracks" name="cracks" />
						<Label for="cracks" class="px-2">{m.cute_knotty_lemur_evoke()}</Label>
					</div>
					<Button
						class="w-full bg-[#a71580]  text-lg font-bold text-white"
						variant="outline"
						type="submit">{m.lazy_tasty_zebra_support()}</Button
					>
				</Card.Content>
			</Card.Root>
		</form>
	</div>
</main>
