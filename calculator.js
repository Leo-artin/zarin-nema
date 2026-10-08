// All monetary inputs are toman; rates are user-controlled, not legal defaults.
const calculatorCopy = {
  fa: ['ماشین‌حساب خرید طلا','محاسبه شفاف قیمت نهایی، با اجرت یا بدون اجرت','وزن طلا (گرم؛ بدون سنگ)','عیار','قیمت هر گرم (تومان)','استفاده از قیمت تابلو','بدون اجرت','با اجرت','نوع اجرت','درصد ارزش طلا','مبلغ به ازای هر گرم','مبلغ ثابت کل','مقدار اجرت','سود فروشنده (%)','مالیات (%)','مبنای مالیات','اجرت + سود','کل فاکتور','بدون مالیات','ارزش طلا','اجرت','سود فروشنده','مالیات','مبلغ نهایی','معادل دلار','نرخ‌ها قابل تنظیم‌اند؛ سود از مجموع ارزش طلا و اجرت محاسبه می‌شود. مبنای مالیات را مطابق فاکتور انتخاب کنید.','قیمت معتبر هر گرم را وارد کنید یا منتظر دریافت قیمت تابلو بمانید.','تومان','ماشین‌حساب'],
  en: ['Gold purchase calculator','Transparent total, with or without making charges','Gold weight (g; excluding stones)','Purity','Price per gram (toman)','Use board price','Without making charge','With making charge','Making charge type','Percent of gold value','Amount per gram','Fixed total amount','Making charge value','Seller profit (%)','Tax (%)','Tax basis','Making charge + profit','Entire invoice','No tax','Gold value','Making charge','Seller profit','Tax','Final total','USD equivalent','Rates are adjustable. Profit is calculated on gold value plus making charges. Select the tax basis used on your invoice.','Enter a valid gram price or wait for the board price.','Toman','Calculator']
};
const calcSection = document.createElement('section');
calcSection.id = 'calculator';
calcSection.className = 'gold-calculator';
$('#about').before(calcSection);
const calcStyle = document.createElement('style');
calcStyle.textContent = '.gold-calculator{margin-top:60px;padding:30px;background:#142019;border:1px solid var(--line);border-radius:13px}.gold-calculator h2{margin:0;font-size:1.8rem}.calc-description,.calc-note{color:var(--muted);font-size:.8rem;line-height:1.9}.calc-fields{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin:25px 0}.calc-fields label{font-size:.76rem;display:grid;gap:7px}.calc-fields input,.calc-fields select{min-width:0}.calc-mode{display:flex;gap:12px;flex-wrap:wrap}.calc-mode button.active{background:var(--gold);color:#171408}.calc-results{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.calc-result{padding:16px;background:#0d1612;border-radius:7px}.calc-result span{display:block;font-size:.72rem;color:var(--muted)}.calc-result strong{display:block;margin-top:8px;font-size:1.15rem;color:var(--gold-soft);overflow-wrap:anywhere}.calc-result.total{border:1px solid var(--gold)}.calc-warning{color:#f0bd81;font-size:.8rem}@media(max-width:650px){.calc-fields,.calc-results{grid-template-columns:1fr 1fr}.gold-calculator{padding:20px}.calc-result strong{font-size:.92rem}}@media(max-width:390px){.calc-fields{grid-template-columns:1fr}}';
document.head.append(calcStyle);
const calcValues = { weight:1, purity:'18', price:'', mode:'with', type:'percent', charge:0, profit:0, tax:0, basis:'services', auto:true };
function calcNumbers(v) {
  const gold = v.weight * v.price;
  const charge = v.mode === 'without' ? 0 : v.type === 'percent' ? gold * v.charge / 100 : v.type === 'gram' ? v.weight * v.charge : v.charge;
  const profit = (gold + charge) * v.profit / 100;
  const tax = (v.basis === 'none' ? 0 : v.basis === 'total' ? gold + charge + profit : charge + profit) * v.tax / 100;
  return { gold, charge, profit, tax, total:gold + charge + profit + tax };
}
function renderCalculator() {
  const c = calculatorCopy[state.lang];
  const field = (label,id,value,attrs='') => `<label>${c[label]}<input id="calc-${id}" type="number" min="0" step="any" value="${value}" ${attrs}></label>`;
  const select = (label,id,options,value) => `<label>${c[label]}<select id="calc-${id}">${options.map(([key,text]) => `<option value="${key}" ${String(value)===String(key)?'selected':''}>${text}</option>`).join('')}</select></label>`;
  calcSection.innerHTML = `<h2>${c[0]}</h2><p class="calc-description">${c[1]}</p><div class="calc-mode"><button type="button" class="button ghost ${calcValues.mode==='without'?'active':''}" data-mode="without">${c[6]}</button><button type="button" class="button ghost ${calcValues.mode==='with'?'active':''}" data-mode="with">${c[7]}</button></div><div class="calc-fields">${field(2,'weight',calcValues.weight)}${select(3,'purity',purities.map(p=>[p.karat,p[state.lang]]),calcValues.purity)}${field(4,'price',calcValues.price)}${select(8,'type',[['percent',c[9]],['gram',c[10]],['fixed',c[11]]],calcValues.type)}${field(12,'charge',calcValues.charge)}${field(13,'profit',calcValues.profit)}${field(14,'tax',calcValues.tax)}${select(15,'basis',[['services',c[16]],['total',c[17]],['none',c[18]]],calcValues.basis)}<button type="button" class="button ghost" id="calc-auto">${c[5]}</button></div><p class="calc-warning" id="calc-warning"></p><div class="calc-results" id="calc-results"></div><p class="calc-note">${c[25]}</p>`;
  calcSection.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>{calcValues.mode=button.dataset.mode;renderCalculator();}));
  ['weight','purity','price','type','charge','profit','tax','basis'].forEach(key=>$('#calc-'+key).addEventListener('input',()=>{
    calcValues[key] = ['weight','price','charge','profit','tax'].includes(key) ? Math.max(0,Number($('#calc-'+key).value)||0) : $('#calc-'+key).value;
    if(key==='price') calcValues.auto=false;
    updateCalculator();
  }));
  $('#calc-auto').addEventListener('click',()=>{calcValues.auto=true;updateCalculator();});
  $('#calc-type').disabled = $('#calc-charge').disabled = calcValues.mode==='without';
  updateCalculator();
}
function updateCalculator() {
  const c = calculatorCopy[state.lang];
  if(calcValues.auto){const price=iranGram(purities.find(p=>String(p.karat)===calcValues.purity));calcValues.price=price||'';$('#calc-price').value=price?Math.round(price):'';}
  const valid=Number(calcValues.price)>0;
  $('#calc-warning').textContent=valid?'':c[26];
  const numbers=calcNumbers({...calcValues,price:Number(calcValues.price)||0});
  const rows=[['gold',19],['charge',20],['profit',21],['tax',22],['total',23]];
  $('#calc-results').innerHTML=rows.map(([key,label])=>`<div class="calc-result ${key==='total'?'total':''}"><span>${c[label]}</span><strong>${valid?fmt(numbers[key]):'—'} ${c[27]}</strong></div>`).join('')+`<div class="calc-result"><span>${c[24]}</span><strong>${valid&&currentUsd()?'$'+decimal(numbers.total/currentUsd(),2):'—'}</strong></div>`;
}
$('#languageToggle').addEventListener('click',renderCalculator);
new MutationObserver(()=>updateCalculator()).observe($('#spotPrice'),{childList:true});
new MutationObserver(()=>updateCalculator()).observe($('#usdToman'),{childList:true});
const calculatorLink=document.createElement('a');calculatorLink.href='#calculator';
function labelCalculatorLink(){calculatorLink.textContent=calculatorCopy[state.lang][28];}
$('.nav-links').append(calculatorLink);labelCalculatorLink();$('#languageToggle').addEventListener('click',labelCalculatorLink);
renderCalculator();
