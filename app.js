const $ = (selector) => document.querySelector(selector);
const units = [
  { id: 'gram', grams: 1, fa: 'گرم', en: 'Gram (g)' },
  { id: 'mithqal', grams: 4.608, fa: 'مثقال صیرفی', en: 'Mithqal (4.608 g)' },
  { id: 'ounce', grams: 31.1034768, fa: 'اونس تروا', en: 'Troy ounce (oz t)' },
  { id: 'kilogram', grams: 1000, fa: 'کیلوگرم', en: 'Kilogram (kg)' },
  { id: 'soot', grams: .001, fa: 'سوت', en: 'Soot / milligram' },
  { id: 'caratmass', grams: .2, fa: 'قیراط وزنی', en: 'Metric carat (ct)' },
  { id: 'grain', grams: .06479891, fa: 'گرین', en: 'Grain (gr)' },
  { id: 'tola', grams: 11.6638038, fa: 'تولا', en: 'Tola (11.6638 g)' }
];
const purities = [
  { karat: 24, fineness: .999, fa: '۲۴ عیار (۹۹۹)', en: '24K (999)' },
  { karat: 22, fineness: .916, fa: '۲۲ عیار (۹۱۶)', en: '22K (916)' },
  { karat: 21, fineness: .875, fa: '۲۱ عیار (۸۷۵)', en: '21K (875)' },
  { karat: 18, fineness: .750, fa: '۱۸ عیار (۷۵۰)', en: '18K (750)' },
  { karat: 17, fineness: .705, fa: '۱۷ عیار (۷۰۵)', en: '17K (705)' },
  { karat: 14, fineness: .585, fa: '۱۴ عیار (۵۸۵)', en: '14K (585)' },
  { karat: 10, fineness: .417, fa: '۱۰ عیار (۴۱۷)', en: '10K (417)' }
];
const translations = {
  fa: { brand:'زرین‌نما',navPrices:'قیمت‌ها',navConverter:'مبدل',navAbout:'درباره داده‌ها',connecting:'در حال اتصال',eyebrow:'نبض بازار فلزات گران‌بها',heroTitle:'طلا را، با چشم باز معامله کنید.',heroText:'قیمت لحظه‌ای طلای جهانی و برآورد بازار ایران، در کنار مبدلی که با واحدهای حرفه‌ای بازار کار می‌کند.',viewPrices:'مشاهده قیمت‌ها',openConverter:'باز کردن مبدل',spotGold:'طلای جهانی',perOunce:'دلار / اونس تروا',usdRate:'دلار مبنا',gram24:'هر گرم ۲۴ عیار',mithqal17:'هر مثقال ۱۷ عیار',tomanUnit:'تومان',refreshes:'به‌روزرسانی خودکار',seconds:'ثانیه',liveBoard:'تابلوی زنده',priceTitle:'قیمت عیارهای طلا',sourceNotice:'هر کارت، قیمت جهانی به دلار و برآورد ایران به تومان را هم‌زمان نمایش می‌دهد. نرخ دلار آزاد را از تنظیمات داده وارد کنید.',dataSettings:'تنظیمات داده',precisionTool:'ابزار دقیق',converterTitle:'مبدل واحدهای طلا',converterText:'بین اونس، مثقال، گرم، سوت، کیلوگرم و واحدهای متداول بازار تبدیل کنید.',amount:'مقدار',from:'از واحد',to:'به واحد',result:'نتیجه تبدیل',purity:'عیار قطعه (برای محاسبه طلای خالص)',infoOneTitle:'داده جهانی زنده',infoOneText:'قیمت لحظه‌ای XAU/USD به‌صورت خودکار دریافت و هر یک دقیقه تازه می‌شود.',infoTwoTitle:'محاسبه شفاف',infoTwoText:'هر قیمت عیار، هم به دلار و هم به تومان بر پایه همان نسبت خلوص محاسبه می‌شود.',infoThreeTitle:'هشدار حرفه‌ای',infoThreeText:'قیمت‌ها اطلاع‌رسانی هستند؛ اجرت، مالیات و حباب بازار در آن‌ها نیست.',footer:'برای تصمیم‌های دقیق‌تر در بازار طلا',settingsTitle:'نرخ بازار ایران',settingsText:'برای برآورد نزدیک‌تر به بازار آزاد، نرخ یک دلار آمریکا را به تومان وارد کنید. خالی بگذارید تا نرخ مرجع جهانی استفاده شود.',manualUsd:'نرخ دستی دلار (تومان)',reset:'بازنشانی',save:'ذخیره',world:'جهانی',iran:'ایران (تومان)',pureGold:'طلای خالص',updated:'به‌روزرسانی',manual:'دستی',live:'زنده',fallback:'داده نمایشی',noData:'داده در دسترس نیست' },
  en: { brand:'Zarin Nema',navPrices:'Prices',navConverter:'Converter',navAbout:'About data',connecting:'Connecting',eyebrow:'PRECIOUS METALS MARKET PULSE',heroTitle:'Trade gold with clarity.',heroText:'Live global gold pricing and an Iran-market estimate, paired with a converter built for professional market units.',viewPrices:'View prices',openConverter:'Open converter',spotGold:'Global gold',perOunce:'USD / troy oz',usdRate:'Reference USD',gram24:'24K per gram',mithqal17:'17K per mithqal',tomanUnit:'Toman',refreshes:'Auto refresh',seconds:'seconds',liveBoard:'LIVE BOARD',priceTitle:'Gold purity prices',sourceNotice:'Each card shows the global USD price and Iran estimate in toman together. Enter a free-market USD rate in data settings for a closer local estimate.',dataSettings:'Data settings',precisionTool:'PRECISION TOOL',converterTitle:'Gold unit converter',converterText:'Convert between troy ounces, mithqal, grams, soot, kilograms, and other market units.',amount:'Amount',from:'From',to:'To',result:'Conversion result',purity:'Item purity (for fine gold)',infoOneTitle:'Live global data',infoOneText:'The XAU/USD spot price is retrieved automatically and refreshed every minute.',infoTwoTitle:'Transparent math',infoTwoText:'Every purity is calculated in both USD and toman from the same fine-gold ratio.',infoThreeTitle:'Professional caution',infoThreeText:'Prices are informational and exclude making charges, taxes, and local premiums.',footer:'For more confident gold-market decisions',settingsTitle:'Iran market rate',settingsText:'For a closer free-market estimate, enter the toman value of one US dollar. Leave it blank to use the global reference rate.',manualUsd:'Manual USD rate (toman)',reset:'Reset',save:'Save',world:'Global',iran:'Iran (toman)',pureGold:'Fine gold',updated:'Updated',manual:'Manual',live:'Live',fallback:'Demo data',noData:'No data available' }
};
Object.assign(translations.fa, {sourceNotice:'نرخ ۱۸ عیار و دلار آزاد از TGJU دریافت می‌شود؛ سایر عیارها بر پایه خلوص محاسبه می‌شوند. قیمت دلاری جهانی با معادل دلاری بازار ایران یکسان نیست.', settingsText:'نرخ دستی دلار فقط برای تبدیل ارز استفاده می‌شود؛ قیمت طلای ایران از نرخ داخلی ۱۸ عیار دریافت می‌شود. خالی بگذارید تا دلار آزاد TGJU استفاده شود.', usdRate:'دلار آزاد', infoTwoText:'مبنای قیمت ایران، هر گرم طلای ۱۸ عیار بازار داخلی است؛ نه نرخ رسمی ارز. سایر عیارها برآورد متناسب با خلوص هستند.', domestic:'آخرین نرخ بازار ایران', unavailable:'اتصال ایران ناموفق؛ نرخ قبلی', equivalent:'معادل دلار ایران'});
Object.assign(translations.en, {sourceNotice:'18K gold and free-market USD quotes come from TGJU; other purities are calculated by fineness. Global USD spot prices differ from Iranian USD equivalents.', settingsText:'Manual USD only affects currency conversion, not domestic gold quotes. Leave blank to use TGJU free-market USD.', usdRate:'Free-market USD', infoTwoText:'Iran pricing uses domestic 18K gold, not an official FX rate. Other purities are proportional estimates.', domestic:'Latest Iran market quote', unavailable:'Iran connection failed; previous quote', equivalent:'Iran USD equivalent'});
const state = { lang: localStorage.getItem('zarin-language') || 'fa', spot: null, usdToman: null, gold18: null, mithqal: null, iranTimestamp: null, iranAvailable: false, source: '—', timestamp: null, manualUsd: Number(localStorage.getItem('zarin-manual-usd-toman')) || null };
const fmt = (number, options = {}) => new Intl.NumberFormat(state.lang === 'fa' ? 'fa-IR' : 'en-US', { maximumFractionDigits: 0, ...options }).format(number);
const decimal = (number, digits = 5) => new Intl.NumberFormat(state.lang === 'fa' ? 'fa-IR' : 'en-US', { maximumFractionDigits:digits }).format(number);
const t = (key) => translations[state.lang][key];
function setLanguage() {
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === 'fa' ? 'rtl' : 'ltr';
  document.title = state.lang === 'fa' ? 'زرین‌نما | قیمت زنده طلا' : 'Zarin Nema | Live Gold Prices';
  document.querySelectorAll('[data-i18n]').forEach(node => node.textContent = t(node.dataset.i18n));
  $('#languageToggle').textContent = state.lang === 'fa' ? 'EN' : 'فا';
  $('#languageToggle').setAttribute('aria-label', state.lang === 'fa' ? 'Switch to English' : 'تغییر به فارسی');
  populateSelectors(); renderAll();
}
function populateSelectors() {
  const selectedFrom = $('#fromUnit').value || 'ounce'; const selectedTo = $('#toUnit').value || 'gram'; const selectedPurity = $('#puritySelect').value || '18';
  const options = units.map(u => `<option value="${u.id}">${u[state.lang]}</option>`).join('');
  $('#fromUnit').innerHTML = options; $('#toUnit').innerHTML = options; $('#fromUnit').value = selectedFrom; $('#toUnit').value = selectedTo;
  $('#puritySelect').innerHTML = purities.map(p => `<option value="${p.karat}">${p[state.lang]}</option>`).join(''); $('#puritySelect').value = selectedPurity;
}
function currentUsd() { return state.manualUsd || state.usdToman; }
function iranGram(purity) { return state.gold18 ? state.gold18 * purity.fineness / .750 : null; }
function renderPrices() {
  const grid = $('#priceGrid');
  grid.innerHTML = purities.map(p => {
    const price = iranGram(p); const world = state.spot ? (state.spot / 31.1034768) * p.fineness : null;
    return `<article class="price-card"><div class="price-card-top"><span>${state.lang === 'fa' ? `${p.karat} عیار` : `${p.karat} karat`}</span><span class="purity-tag">${Math.round(p.fineness * 1000)}</span></div><div class="price-card-values"><div class="price-line"><span>${t('world')} / g</span><strong>$${world ? decimal(world, 2) : '—'}</strong></div><div class="price-line toman"><span>${t('iran')} / g</span><strong>${price ? fmt(price) : '—'} ${t('tomanUnit')}</strong></div><div class="price-line"><span>${t('equivalent')}</span><strong>$${price && currentUsd() ? decimal(price / currentUsd(), 2) : '—'}</strong></div></div></article>`;
  }).join('');
}
function renderSummary() {
  const usd = currentUsd(); const gram24 = iranGram(purities[0]); const gram24World = gram24 && usd ? gram24 / usd : null; const mithqal = state.mithqal || (iranGram(purities.find(p => p.karat === 17)) || 0) * 4.608; const mithqalWorld = mithqal && usd ? mithqal / usd : null;
  $('#spotPrice').textContent = state.spot ? decimal(state.spot, 2) : '—';
  $('#spotToman').textContent = state.spot && usd ? `${fmt(state.spot * usd)} ${t('tomanUnit')} / ${state.lang === 'fa' ? 'اونس تروا' : 'troy oz'}` : '—';
  $('#usdToman').textContent = usd ? fmt(usd) : '—'; $('#gram24').textContent = gram24 ? fmt(gram24) : '—'; $('#gram24Usd').textContent = `$${gram24World ? decimal(gram24World, 2) : '—'} / g`; $('#mithqal17').textContent = mithqal ? fmt(mithqal) : '—'; $('#mithqal17Usd').textContent = `$${mithqalWorld ? decimal(mithqalWorld, 2) : '—'} / ${state.lang === 'fa' ? 'مثقال' : 'mithqal'}`;
  const suffix = state.manualUsd ? ` · ${t('manual')}` : state.source;
  $('#lastUpdated').textContent = state.timestamp ? `${t('updated')} ${state.timestamp}${suffix ? suffix : ''}` : '—';
  $('#priceTimestamp').textContent = state.iranTimestamp ? `${state.iranAvailable ? t('domestic') : t('unavailable')} · TGJU · ${state.iranTimestamp} (Asia/Tehran)` : t('noData');
}
function renderConverter() {
  const amount = Math.max(0, Number($('#amountInput').value) || 0); const from = units.find(u => u.id === $('#fromUnit').value); const to = units.find(u => u.id === $('#toUnit').value); const p = purities.find(x => x.karat === Number($('#puritySelect').value));
  const result = amount * from.grams / to.grams; const grams = amount * from.grams; const pure = grams * p.fineness;
  $('#conversionValue').textContent = decimal(result, 7); $('#conversionUnit').textContent = to[state.lang];
  $('#fineGoldResult').textContent = `${t('pureGold')}: ${decimal(pure, 5)} ${state.lang === 'fa' ? 'گرم' : 'g'}`;
}
function renderAll() { renderSummary(); renderPrices(); renderConverter(); }
function setStatus(kind, label) { const el = $('#connectionStatus'); el.classList.toggle('offline', kind !== 'live'); el.querySelector('span').textContent = label; }
async function getJson(url) { const response = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(12000) }); if (!response.ok) throw new Error(`Request failed (${response.status})`); return response.json(); }
async function fetchMarketData() {
  $('#refreshButton').classList.add('spinning'); setStatus('loading', t('connecting'));
  const spotSources = [
    async () => { const r = await getJson('https://api.gold-api.com/price/XAU'); return { price: Number(r.price), change: Number(r.ch) }; },
    async () => { const r = await getJson('https://api.metals.live/v1/spot/gold'); return { price: Number(Array.isArray(r) ? r[0]?.gold : r.gold), change: null }; }
  ];
  let spotResult; for (const source of spotSources) { try { const value = await source(); if (Number.isFinite(value.price) && value.price > 100) { spotResult = value; break; } } catch (_) {} }
  state.iranAvailable = false;
  try {
    const feed = await getJson('https://call3.tgju.org/ajax.json');
    const value = key => Number(String(feed.current?.[key]?.p || '').replace(/,/g, ''));
    const gold = value('geram18'), dollar = value('price_dollar_rl'), mithqal = value('mesghal');
    if (!(gold > 0) || !(dollar > 0) || !feed.current.geram18.ts) throw new Error('Invalid domestic quote');
    // TGJU publishes IRR. Convert exactly once at the data boundary.
    state.gold18 = gold / 10; state.usdToman = dollar / 10;
    state.mithqal = mithqal > 0 ? mithqal / 10 : null;
    state.iranTimestamp = feed.current.geram18.ts; state.iranAvailable = true;
  } catch (_) {}
  if (spotResult) { state.spot = spotResult.price; $('#spotChange').textContent = Number.isFinite(spotResult.change) ? `${spotResult.change >= 0 ? '+' : ''}${decimal(spotResult.change, 2)} USD` : t('live'); $('#spotChange').className = Number.isFinite(spotResult.change) ? (spotResult.change >= 0 ? 'positive' : 'negative') : 'neutral'; }
  const now = new Date(); state.timestamp = new Intl.DateTimeFormat(state.lang === 'fa' ? 'fa-IR' : 'en-GB', { hour:'2-digit', minute:'2-digit', second:'2-digit' }).format(now);
  state.source = spotResult ? ' · Gold API' : ` · ${t('noData')}`;
  setStatus('offline', state.iranAvailable ? t('domestic') : t('noData'));
  if (!spotResult) $('#spotChange').textContent = '—';
  renderAll(); $('#refreshButton').classList.remove('spinning');
}
function saveManual() { const input = Number($('#manualUsdInput').value); state.manualUsd = input > 0 ? input : null; if (state.manualUsd) localStorage.setItem('zarin-manual-usd-toman', String(state.manualUsd)); else localStorage.removeItem('zarin-manual-usd-toman'); renderAll(); }
function init() {
  $('#year').textContent = new Date().getFullYear(); setLanguage();
  $('#languageToggle').addEventListener('click', () => { state.lang = state.lang === 'fa' ? 'en' : 'fa'; localStorage.setItem('zarin-language', state.lang); setLanguage(); });
  ['#amountInput','#fromUnit','#toUnit','#puritySelect'].forEach(id => $(id).addEventListener('input', renderConverter));
  $('#swapButton').addEventListener('click', () => { const a = $('#fromUnit').value; $('#fromUnit').value = $('#toUnit').value; $('#toUnit').value = a; renderConverter(); });
  $('#refreshButton').addEventListener('click', fetchMarketData);
  $('#openSettings').addEventListener('click', () => { $('#manualUsdInput').value = state.manualUsd || ''; $('#settingsDialog').showModal(); });
  $('#clearManual').addEventListener('click', () => { $('#manualUsdInput').value = ''; });
  $('#settingsForm').addEventListener('submit', saveManual);
  fetchMarketData(); setInterval(fetchMarketData, 60000);
}
init();
