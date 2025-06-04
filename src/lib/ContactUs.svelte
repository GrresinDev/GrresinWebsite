<script>
	import Button from './components/ui/button/button.svelte';
</script>

<div
	class="mx-auto grid max-w-screen-xl grid-cols-1 gap-8 rounded-lg bg-transparent px-8 py-16 md:grid-cols-2 md:px-12 lg:px-16 xl:px-32"
>
	<div class="flex flex-col justify-between">
		<div class="space-y-2">
			<h2 class="text-4xl font-bold leading-tight lg:text-5xl">Let's talk!</h2>
			<div class="">Vivamus in nisl metus? Phasellus.</div>
		</div>
		<img src="" alt="" class="h-52 p-6 md:h-64" />
	</div>
	<form class="flex flex-col space-y-6">
		<div>
			<label for="name" class="text-sm">Full name</label>
			<input id="name" type="text" placeholder="" class="w-full rounded p-3" />
		</div>
		<div>
			<label for="email" class="text-sm">Email</label>
			<input id="email" type="email" class="w-full rounded p-3" />
		</div>
		<div>
			<label for="email" class="text-sm">Email</label>
			<input id="email" type="email" class="w-full rounded bg-transparent p-3" />
		</div>
		<Button class="w-48 self-center bg-purple-500 font-semibold">submit</Button>
	</form>
</div>
