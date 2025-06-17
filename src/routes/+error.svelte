<script lang="ts">
	import { page } from '$app/state';
</script>

<div class=" container mx-auto min-h-screen text-center">
	<h1>{page.status}: {page.error?.message}</h1>
</div>
