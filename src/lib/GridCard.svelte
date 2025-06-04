<script>
	import { m } from '$lib/paraglide/messages';
	import gridcard from '$lib/assets/images/gridcard.jpg';
</script>

<div class="flex w-full max-w-3xl flex-col space-y-3 rounded-2xl bg-white p-4 shadow-lg md:p-8">
	<div class="flex flex-col space-y-4 md:flex-row md:space-x-8 md:space-y-0">
		<!-- Image -->
		<div class="flex h-24 w-full items-center justify-center md:h-24 md:basis-[60%] rtl:ml-3">
			<img
				src={gridcard}
				alt="Epoxy flooring illustration"
				class="h-full w-full rounded-2xl object-cover"
			/>
		</div>
		<!-- Title -->
		<div class="mx-0 flex-1 md:basis-[40%]">
			<h2
				class="my-2 text-wrap text-start text-lg font-bold tracking-wider text-gray-800 md:text-lg"
			>
				{m.title_card()}
			</h2>
			<hr class="mb-6 h-1 w-full bg-[#a71580b2]" />
		</div>
	</div>

	<!-- List -->
	<div class="flex-1">
		<ul class="space-y-3 text-sm text-gray-600 md:text-base">
			<li class="flex items-start">
				<span class=" mr-2 text-xl font-bold text-[#a71580b2] rtl:ml-2 rtl:mr-0">&#8226;</span>
				<span class="line-clamp-1">
					{m.card_list()}
				</span>
			</li>
			<li class="flex items-start">
				<span class="mr-2 text-xl font-bold text-[#a71580b2] rtl:ml-2 rtl:mr-0">&#8226;</span>
				<span>
					{m.card_list_second()}
				</span>
			</li>
		</ul>
	</div>
</div>
