<script lang="ts">
	import { Menu } from '@lucide/svelte';
	import * as Sheet from '$lib/components/ui/sheet/index';
	import Button from '../ui/button/button.svelte';
	import { setLocale, getLocale, localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages';
	import logo from '$lib/assets/images/Logo.png';

	let open = $state(false);
	let locle = $state(getLocale());
	let side = $derived<'right' | 'left'>(locle === 'ar' ? 'right' : 'left');
	type NavItem = {
		text: string;
		href: string;
	};
	let nav_list: NavItem[] = [
		{ text: m.nav_about(), href: localizeHref('/about') },
		{
			href: localizeHref('/#contact'),
			text: m.contact()
		},
		{ text: m.nav_blog(), href: localizeHref('/blog') },
		{ text: m.nav_floor(), href: localizeHref('/#top') },
		{ text: m.projects(), href: localizeHref('/projects') },
		{ text: m.aqua_mad_frog_gleam(), href: localizeHref('/careers') }
	];
</script>

<header class="w-full border-b bg-black text-white" id="top">
	<div class="flex h-16 items-center justify-between px-4">
		<a
			class="flex w-1/3 items-center gap-2 md:w-fit"
			href={localizeHref('/')}
			aria-label="Grresin Home"
		>
			<div class="rounded-lg border p-2 2xl:hidden">
				<img src={logo} alt="Grresin Logo" class="h-10 w-10 object-cover" />
			</div>
			<div class="hidden 2xl:block">
				<img src={logo} alt="Grresin Logo" class="h-14 w-14 object-cover" />
			</div>
		</a>

		<div class="mx-4 hidden w-1/3 flex-1 items-start justify-start md:flex">
			<nav class="flex gap-6" aria-label="Main navigation">
				{#each nav_list as navItem}
					<Button href={navItem.href} class="hover:bg-[#a71580]" size="sm">{navItem.text}</Button>
				{/each}
			</nav>
		</div>

		<div class="flex w-1/3 items-center justify-end gap-4">
			<Button
				size="sm"
				class="hidden bg-white capitalize text-[#a71580] hover:bg-[#a71580] hover:text-white md:flex"
				onclick={() => {
					setLocale('en');
				}}
				aria-label="Switch language to English"
			>
				<span>🇬🇧</span>
				EN
			</Button>
			<Button
				size="sm"
				class="hidden bg-white capitalize text-[#a71580] hover:bg-[#a71580] hover:text-white md:flex"
				onclick={() => {
					setLocale('ar');
				}}
				aria-label="Switch language to Arabic"
			>
				<span>🇸🇦</span>
				AR
			</Button>

			<Button
				variant="ghost"
				size="icon"
				class="md:hidden"
				onclick={() => (open = true)}
				aria-label="Open navigation menu"
			>
				<Menu class="h-5 w-5" />
			</Button>
		</div>
	</div>
</header>

<Sheet.Root bind:open>
	<Sheet.Content {side} class="w-64 bg-white text-black">
		<div>
			<div class="mb-6 flex items-center justify-start gap-x-3">
				<div class="rounded-lg border p-2">
					<img src={logo} alt="Grresin Logo" class="h-10 w-10 object-cover" />
				</div>
				<span class="text-md font-semibold" id="mobile-menu-title">{m.menu()}</span>
			</div>
			<nav class="flex flex-col space-y-1" aria-label="Mobile navigation">
				{#each nav_list as navItem}
					<Button
						href={navItem.href}
						class="justify-start hover:bg-[#a71580]"
						onclick={() => (open = false)}>{navItem.text}</Button
					>
				{/each}
				<Button
					size="sm"
					class="justify-start bg-white capitalize text-[#a71580] hover:bg-[#a71580] hover:text-white"
					onclick={() => {
						setLocale('en');
						open = false; // Close menu on selection
					}}
					aria-label="Switch language to English"
				>
					<span>🇬🇧</span>
					EN
				</Button>
				<Button
					size="sm"
					class="justify-start bg-white capitalize text-[#a71580] hover:bg-[#a71580] hover:text-white"
					onclick={() => {
						setLocale('ar');
						open = false; // Close menu on selection
					}}
					aria-label="Switch language to Arabic"
				>
					<span>🇸🇦</span>
					AR
				</Button>
			</nav>
		</div>
	</Sheet.Content>
</Sheet.Root>
