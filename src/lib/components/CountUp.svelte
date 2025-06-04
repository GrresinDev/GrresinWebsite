<script lang="ts">
	import CountUp from '$lib/utils';

	const squareMeters: number = 1000000;
	let squareMetersText: string = $state('');
	const completedProjects: number = 50000;
	let completedProjectsText: string = $state('');
	const yearsInBusiness: number = 5;
	let yearsInBusinessText: string = $state('');
	let { reloade = $bindable() }: { reloade: boolean } = $props();
	$effect(() => {
		if (reloade) {
			CountUp.countUp({
				targetNumber: squareMeters,
				durationMs: 1500,
				callback: (formattedNumber) => {
					squareMetersText = formattedNumber;
				}
			});
			CountUp.countUp({
				targetNumber: completedProjects,
				durationMs: 1500,
				callback: (formattedNumber) => {
					completedProjectsText = formattedNumber;
				}
			});
			CountUp.countUp({
				targetNumber: yearsInBusiness,
				durationMs: 1500,
				callback: (formattedNumber) => {
					yearsInBusinessText = formattedNumber;
				}
			});
		} else {
			yearsInBusinessText = '';
			completedProjectsText = '';
			squareMetersText = '';
		}
	});
</script>

{#snippet divider()}
	<div class="w-20 border-t border-black lg:h-20 lg:w-1 lg:border-l lg:border-t-0"></div>
{/snippet}
<div
	class="glass flex flex-col items-center justify-center gap-10 p-8 py-7 lg:flex-row"
	class:animate={reloade}
>
	<!-- Start -->
	<div class="space-y-1 rounded-2xl p-2">
		<span class="  block text-center text-6xl font-bold text-black md:text-8xl"
			>{squareMetersText}+</span
		>
		<p class="block"><strong>Projects</strong></p>
	</div>

	{@render divider()}
	<!-- End -->

	<!-- Start -->
	<div class="space-y-1 rounded-2xl p-2">
		<span class="block text-center text-6xl font-bold md:text-8xl">{completedProjectsText}+</span>
		<p class="myshadow block"><strong>Artisit</strong></p>
	</div>

	{@render divider()}
	<!--End -->

	<!--Start -->
	<div class="space-y-1 rounded-2xl p-2">
		<span class=" block text-center text-6xl font-bold md:text-8xl">
			{yearsInBusinessText}<span>yr</span>
		</span>
		<p class="myshadow block"><strong>Years </strong></p>
	</div>
	{@render divider()}
	<!--End -->

	<!--Start -->
	<div class="space-y-1 rounded-2xl p-2">
		<span class=" block text-center text-6xl font-bold md:text-8xl">{squareMetersText}+</span>
		<p class="myshadow block"><strong>Sales Points </strong></p>
	</div>
</div>

<style>
	.animate {
		animation: animate 1s cubic-bezier(0.26, 0.53, 0.74, 1.48) 0.5s backwards;
	}

	@keyframes animate {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
