<script lang="ts">
	import { Switch } from '$lib/components/ui/switch/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	let cities = ['Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina'];
	let placeTypes = ['Home', 'Commercial'];
	let city1 = $state<string>('');
	let place1 = $state<string>('');
	const place1Content = $derived(placeTypes.find((p) => p === place1) ?? 'Select a Type');
	const city1Content = $derived(cities.find((c) => c === city1) ?? 'Select a City');
</script>

<main class="min-h-screen p-4 sm:p-8">
	<!-- Hero Section -->
	<section class="mb-10 rounded-2xl bg-white p-10 text-center shadow-lg">
		<h1 class="mb-4 text-4xl font-bold text-gray-800">Premium Flooring Services in Saudi Arabia</h1>
		<p class="text-lg text-gray-600">
			Request an estimate or apply for a flooring service easily with our online forms.
		</p>
	</section>

	<!-- Forms Section -->
	<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
		<!-- Floor Estimation Request Form -->
		<Card.Root class="shadow-2xl">
			<Card.Content class="space-y-4">
				<h2 class="text-2xl font-semibold">Floor Estimation Request</h2>
				<div>
					<Label for="name1">Name</Label>
					<Input id="name1" type="text" placeholder="Your Name" />
				</div>
				<div>
					<Label for="email1">Email</Label>
					<Input id="email1" type="email" placeholder="example@mail.com" />
				</div>
				<div>
					<Label for="phone1">Phone Number</Label>
					<Input id="phone1" type="tel" placeholder="05xxxxxxxx" />
				</div>
				<div>
					<Label for="city1">City</Label>
					<Select.Root type="single" name="city1" bind:value={city1}>
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
					<Label for="place1">Place Type</Label>
					<Select.Root type="single" name="place1" bind:value={place1}>
						<Select.Trigger id="place1">
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
					<Switch id="cracks1" name="cracks1" />
					<Label for="cracks1">Is there any cracks in the floor?</Label>
				</div>
				<Button class="w-full bg-[#a71580] text-white" variant="outline"
					>Submit Estimation Request</Button
				>
			</Card.Content>
		</Card.Root>

		<!-- Floor Application Form -->
		<Card.Root>
			<Card.Content class="space-y-4">
				<h2 class="text-2xl font-semibold">Floor Application Form</h2>
				<div>
					<Label for="name2">Name</Label>
					<Input id="name2" type="text" placeholder="Your Name" />
				</div>
				<div>
					<Label for="email2">Email</Label>
					<Input id="email2" type="email" placeholder="example@mail.com" />
				</div>
				<div>
					<Label for="phone2">Phone Number</Label>
					<Input id="phone2" type="tel" placeholder="05xxxxxxxx" />
				</div>
				<div>
					<Label>City</Label>
					<Select.Root type="single">
						{#each cities as city}
							<Select.Item value={city}>{city}</Select.Item>
						{/each}
					</Select.Root>
				</div>
				<div>
					<Label>Place Type</Label>
					<Select.Root type="single">
						{#each placeTypes as type}
							<Select.Item value={type}>{type}</Select.Item>
						{/each}
					</Select.Root>
				</div>
				<div class="flex items-center gap-2">
					<Switch id="cracks2" />
					<Label for="cracks2">Is there any cracks in the floor?</Label>
				</div>
				<Button class="w-full">Submit Application</Button>
			</Card.Content>
		</Card.Root>
	</div>
</main>
