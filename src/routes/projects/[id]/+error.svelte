<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="flex min-h-svh flex-col items-center justify-center text-5xl">
	<h1 class="text-6xl text-[#a71580]">Sorry !!</h1>
	<h2>{page.status}: {page.error?.message}</h2>
</div>
