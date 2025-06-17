<script lang="ts">
	import { page } from '$app/state';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Graffiti Resin Flooring Services | Epoxy & Terrazzo in Saudi Arabia</title>
  <meta name="description" content="Discover Graffiti Resin's professional services in resin flooring: epoxy terrazzo, cement terrazzo, polyurethane coatings, and decorative finishes for commercial and residential spaces." />

  <meta property="og:title" content="Resin Flooring Solutions by Graffiti Resin" />
  <meta property="og:description" content="Graffiti Resin offers premium epoxy and cement terrazzo flooring services across Saudi Arabia. Ideal for homes, offices, malls, and showrooms." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={page.url.href} />

  <meta name="keywords" content="resin flooring Saudi Arabia, epoxy flooring, terrazzo services, cement terrazzo contractor, commercial flooring, resin solutions, Graffiti Resin services" />
</svelte:head>
<div class="container mx-auto p-4 sm:p-6 md:p-8">
	<!-- Header -->
	<header class="mb-8 md:mb-12">
		<div class="mb-6 flex items-center justify-between">
			<!-- Optional: Add other header elements here, like a small logo image if available -->
		</div>
		<h2 class="text-center text-xl font-semibold text-[#a71580] sm:text-2xl md:text-3xl">
			بإمكانكم الحصول على منتجات جرافيتي ريزن من إحدى نقاط البيع لدينا
		</h2>
	</header>

	<!-- Main Content Grid -->
	<main class="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
		<!-- Section 1: Inside Saudi Arabia -->
		<section class="flex flex-col rounded-xl bg-white shadow-xl">
			<h3
				class="rounded-t-xl bg-[#a71580] p-4 text-center text-xl font-bold text-white sm:text-2xl"
			>
				داخل المملكة العربية السعودية
			</h3>
			<div class="flex-grow overflow-x-auto rounded-b-xl">
				<table class="w-full min-w-[650px] text-sm sm:text-base">
					<thead class="sticky top-0 z-10">
						<tr class="bg-pink-500 text-white">
							<th class="p-3 text-right font-semibold">موزعنا</th>
							<th class="p-3 text-right font-semibold">الموقع</th>
							<th class="p-3 text-right font-semibold">التواصل</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200">
						<!-- KSA General -->
						<tr class="bg-pink-50">
							<td colspan="3" class="p-3 text-lg font-bold text-[#a71580]">السعودية</td>
						</tr>
						<tr>
							<td class="p-3">مكتبة جرير</td>
							<td class="p-3">-</td>
							<td class="p-3">
								<a
									href="#"
									class="flex items-center justify-end space-x-1 space-x-reverse text-blue-600 hover:underline"
									><span>www.jarir.com</span> <span>🌐</span></a
								>
							</td>
						</tr>
						<tr>
							<td class="p-3">ساكو</td>
							<td class="p-3">-</td>
							<td class="p-3">
								<a
									href="#"
									class="flex items-center justify-end space-x-1 space-x-reverse text-blue-600 hover:underline"
									><span>www.saco.sa</span> <span>🌐</span></a
								>
							</td>
						</tr>
						<tr>
							<td class="p-3">فيرجن ميغا ستور</td>
							<td class="p-3">-</td>
							<td class="p-3">
								<a
									href="#"
									class="flex items-center justify-end space-x-1 space-x-reverse text-blue-600 hover:underline"
									><span>www.virginmegastore.sa</span> <span>🌐</span></a
								>
							</td>
						</tr>

						<!-- Riyadh -->
						<tr class="bg-pink-50">
							<td colspan="3" class="p-3 text-lg font-bold text-pink-700">الرياض</td>
						</tr>
						<tr>
							<td class="p-3">الما للديار</td>
							<td class="p-3">في الدرعية</td>
							<td class="p-3">
								<span class="flex items-center justify-end space-x-1 space-x-reverse"
									><span>@abczshop.sa</span> <span></span></span
								>
								<!-- Using @ for social media -->
							</td>
						</tr>
						<tr>
							<td class="p-3">مكتبة الكاتب</td>
							<td class="p-3">شبرا، لبن، طريف، تبوك</td>
							<td class="p-3">
								<span class="flex items-center justify-end space-x-1 space-x-reverse"
									><span>0502709453</span> <span>📱</span></span
								>
							</td>
						</tr>
						<tr>
							<td class="p-3">مؤسسة الأعمدة العالمية</td>
							<td class="p-3">شارع العطايف، الملز، الصحافة، العربية، النزهة، الياسمين</td>
							<td class="p-3">
								<span class="flex items-center justify-end space-x-1 space-x-reverse"
									><span>0550469023</span> <span>📱</span></span
								>
							</td>
						</tr>
						<tr>
							<td class="p-3">مكتبة النابغة</td>
							<td class="p-3">الروضة شارع خالد ابن الوليد، العليا، اسواق طيبة</td>
							<td class="p-3">
								<span class="flex items-center justify-end space-x-1 space-x-reverse"
									><span>0557372145</span> <span>📱</span></span
								>
							</td>
						</tr>
						<tr>
							<td class="p-3">مكتبة الشرق</td>
							<td class="p-3">طريق سعد بن عبد الرحمن الأول، في الروابي</td>
							<td class="p-3">
								<span class="flex items-center justify-end space-x-1 space-x-reverse"
									><span>0507132298</span> <span>📱</span></span
								>
							</td>
						</tr>
						<tr>
							<td class="p-3">مكتبة الإشراق</td>
							<td class="p-3">طريق الملك عبد الله، من المغيرات</td>
							<td class="p-3">
								<span class="flex items-center justify-end space-x-1 space-x-reverse"
									><span>0559872222</span> <span>📱</span></span
								>
							</td>
						</tr>
						<tr>
							<td class="p-3">ملت آرت</td>
							<td class="p-3">السليمانية</td>
							<td class="p-3">
								<span class="flex items-center justify-end space-x-1 space-x-reverse"
									><span>00966500810031</span> <span>📱</span></span
								>
							</td>
						</tr>
						<tr>
							<td class="p-3">أسواق الجزيرة</td>
							<td class="p-3">شارع عسير</td>
							<td class="p-3">
								<span class="flex items-center justify-end space-x-1 space-x-reverse"
									><span>@Aljazeeramarkets</span> <span></span></span
								>
							</td>
						</tr>
						<tr>
							<td class="p-3">مكتبة اعلام البواسل</td>
							<td class="p-3">الحياة مول</td>
							<td class="p-3">
								<span class="flex items-center justify-end space-x-1 space-x-reverse"
									><span>0554235606</span> <span>📱</span></span
								>
							</td>
						</tr>
						<tr>
							<td class="p-3">ريشة ولون</td>
							<td class="p-3">الطريق الدائري الشرقي</td>
							<td class="p-3">
								<span class="flex items-center justify-end space-x-1 space-x-reverse"
									><span>0542100185</span> <span>📱</span></span
								>
							</td>
						</tr>
						<tr>
							<td class="p-3">متجر خرابيط</td>
							<td class="p-3">المعادي - الرويس</td>
							<td class="p-3">
								<span class="flex items-center justify-end space-x-1 space-x-reverse"
									><span>@krabart9</span> <span></span></span
								>
							</td>
						</tr>

						<!-- Jeddah -->
						<tr class="bg-pink-50">
							<td colspan="3" class="p-3 text-lg font-bold text-pink-700">جدة</td>
						</tr>
						<tr>
							<td class="p-3">عالم الهوايات</td>
							<td class="p-3">-</td>
							<td class="p-3">
								<span class="flex items-center justify-end space-x-1 space-x-reverse"
									><span>0533777333</span> <span>📱</span></span
								>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Section 2: Outside Saudi Arabia -->
		<section class="flex flex-col rounded-xl bg-white shadow-xl">
			<h3
				class="rounded-t-xl bg-purple-600 p-4 text-center text-xl font-bold text-white sm:text-2xl"
			>
				خارج المملكة العربية السعودية
			</h3>
			<div class="flex-grow overflow-x-auto rounded-b-xl">
				<table class="w-full min-w-[650px] text-sm sm:text-base">
					<thead class="sticky top-0 z-10">
						<tr class="bg-pink-500 text-white">
							<th class="p-3 text-right font-semibold">موزعنا</th>
							<th class="p-3 text-right font-semibold">الموقع</th>
							<th class="p-3 text-right font-semibold">التواصل</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200">
						<!-- Jordan -->
						<tr class="bg-pink-50">
							<td colspan="3" class="p-3 text-lg font-bold text-pink-700">الأردن</td>
						</tr>
						<tr>
							<td class="p-3">شركة بقلة وشركاءه</td>
							<td class="p-3">عمان، قرب إشارة المصدار، شارع الطلياني</td>
							<td class="p-3">
								<span class="flex items-center justify-end space-x-1 space-x-reverse"
									><span>baqleh.partners.co</span> <span>📧</span></span
								>
							</td>
						</tr>

						<!-- Oman -->
						<tr class="bg-pink-50">
							<td colspan="3" class="p-3 text-lg font-bold text-pink-700">عمان</td>
						</tr>
						<tr>
							<td class="p-3">Smart Market LLC</td>
							<td class="p-3">مسقط، ولاية السيب، الخضين</td>
							<td class="p-3">
								<span class="flex items-center justify-end space-x-1 space-x-reverse"
									><span>92972794</span> <span>📱</span></span
								>
							</td>
						</tr>
						<tr>
							<td class="p-3">راشد الشكيلي</td>
							<td class="p-3">ولاية الرستاق</td>
							<td class="p-3">
								<span class="flex items-center justify-end space-x-1 space-x-reverse"
									><span>@rashidgifts</span> <span></span></span
								>
							</td>
						</tr>
						<tr>
							<td class="p-3">مكتبة الثقافة الاسلامية</td>
							<td class="p-3">-</td>
							<td class="p-3">
								<span class="flex items-center justify-end space-x-1 space-x-reverse"
									><span>0096822029519</span> <span>📱</span></span
								>
							</td>
						</tr>
						<tr>
							<td class="p-3">منور الفنون</td>
							<td class="p-3">ولاية سمائل شارع الوقبة</td>
							<td class="p-3">
								<span class="flex items-center justify-end space-x-1 space-x-reverse"
									><span>0096894807071</span> <span>📱</span></span
								>
							</td>
						</tr>

						<!-- Kuwait -->
						<tr class="bg-pink-50">
							<td colspan="3" class="p-3 text-lg font-bold text-pink-700">الكويت</td>
						</tr>
						<tr>
							<td class="p-3">مكتبة مول الكويت</td>
							<td class="p-3">-</td>
							<td class="p-3">
								<span class="flex items-center justify-end space-x-1 space-x-reverse"
									><span>0096596646137</span> <span>📱</span></span
								>
							</td>
						</tr>
						<tr>
							<td class="p-3">جوري ريزن</td>
							<td class="p-3">-</td>
							<td class="p-3">
								<span class="flex items-center justify-end space-x-1 space-x-reverse"
									><span>0096556747410</span> <span>📱</span></span
								>
							</td>
						</tr>
						<tr>
							<td class="p-3">ريزن ارتولز</td>
							<td class="p-3">-</td>
							<td class="p-3">
								<span class="flex items-center justify-end space-x-1 space-x-reverse"
									><span>0096550172279</span> <span>📱</span></span
								>
							</td>
						</tr>
						<tr>
							<td class="p-3">الحرفي</td>
							<td class="p-3">-</td>
							<td class="p-3">
								<span class="flex items-center justify-end space-x-1 space-x-reverse"
									><span>0096550377444</span> <span>📱</span></span
								>
							</td>
						</tr>
						<tr>
							<td class="p-3">البلدي ديزاين</td>
							<td class="p-3">-</td>
							<td class="p-3">
								<span class="flex items-center justify-end space-x-1 space-x-reverse"
									><span>0096569002041</span> <span>📱</span></span
								>
							</td>
						</tr>
						<tr>
							<td class="p-3">مكتبة نيويورك</td>
							<td class="p-3">الكويت - حولي - شارع قتيبة قطعة 1</td>
							<td class="p-3">
								<span class="flex items-center justify-end space-x-1 space-x-reverse"
									><span>0096599840388</span> <span>📱</span></span
								>
							</td>
						</tr>
						<tr>
							<td class="p-3">مكتبة لندن</td>
							<td class="p-3">الكويت - حولي - شارع قتيبة، مقابل مجمع النقرة الجنوبي</td>
							<td class="p-3">
								<span class="flex items-center justify-end space-x-1 space-x-reverse"
									><span>0096599842288</span> <span>📱</span></span
								>
							</td>
						</tr>
						<tr>
							<td class="p-3">مكتبة دباسة</td>
							<td class="p-3">-</td>
							<td class="p-3">
								<span class="flex items-center justify-end space-x-1 space-x-reverse"
									><span>0096599171701</span> <span>📱</span></span
								>
							</td>
						</tr>
						<tr>
							<td class="p-3">مكتبة المعلم</td>
							<td class="p-3">الكويت حولي شارع تونس</td>
							<td class="p-3">
								<span class="flex items-center justify-end space-x-1 space-x-reverse"
									><span>0096599992503</span> <span>📱</span></span
								>
							</td>
						</tr>

						<!-- Bahrain -->
						<tr class="bg-pink-50">
							<td colspan="3" class="p-3 text-lg font-bold text-pink-700">البحرين</td>
						</tr>
						<tr>
							<td class="p-3">Art Shift Trading</td>
							<td class="p-3">الفكر الفني البحرين</td>
							<td class="p-3">
								<span class="flex items-center justify-end space-x-1 space-x-reverse"
									><span>0097339612247</span> <span>📱</span></span
								>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	</main>

	<!-- Footer -->
	<footer class="mt-12 border-t border-gray-300 py-6 text-center text-gray-500">
		&copy; <span id="currentYear"></span> Graffiti RESIN. جميع الحقوق محفوظة.
	</footer>
</div>
