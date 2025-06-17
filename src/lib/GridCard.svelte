<script lang="ts">
	import type { ProjectsProductsModelWithThumb } from '$lib/interface/project';
	import { getLocale } from '$lib/paraglide/runtime';
	let { project, i }: { project: ProjectsProductsModelWithThumb; i: number } = $props();
</script>

<a
	href={project.tds_url}
	download="SuggestedFileName.pdf"
	target="_blank"
	class="flex w-full max-w-3xl flex-col space-y-3 rounded-2xl bg-white p-4 shadow-lg md:p-8"
>
	<div
		class="flex flex-col space-y-4 md:flex-row-reverse md:space-x-8 md:space-y-0 md:rtl:flex-row"
	>
		<!-- Image -->
		<div class="flex h-24 w-full items-center justify-center md:h-24 md:basis-[60%] rtl:ml-3">
			<img
				src={project.thumbnail}
				alt="Project Products"
				class="h-full w-full rounded-2xl object-contain"
			/>
		</div>
		<!-- Title -->
		<div class="mx-0 flex-1 md:basis-[40%]">
			<h2
				class="my-2 text-wrap text-start text-lg font-bold tracking-wider text-gray-800 md:text-lg"
			>
				{getLocale() === 'ar' ? project.name_ar : project.name}
			</h2>
			<hr class="mb-6 h-1 w-full bg-[#a71580b2]" />
		</div>
	</div>

	<!-- List -->
	<div class="flex-1">
		<ul class="text-sm text-gray-600 md:text-base">
			{getLocale() === 'ar' ? project.descriptoin_ar : project.descriptoin}
		</ul>
	</div>
</a>
