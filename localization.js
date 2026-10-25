/* Shared, reversible interface localization. User-entered data is never rewritten. */
(()=>{'use strict';
const dictionary={
 "BAM Automotive Company": "خودروسازان بم",
 "Statistical Process Control": "کنترل آماری فرایند",
 "Temperature profiles": "پروفایل‌های دما",
 "THERMAL DATA WORKSPACE": "سامانه پایش حرارتی",
 "Precision starts with every": "دقت آغاز می‌شود با هر",
 "measurement.": "اندازه‌گیری.",
 "Precision starts with": "دقت آغاز می‌شود با",
 "every degree.": "هر درجه دما.",
 "Quality characteristics": "مشخصه‌های کیفی",
 "＋ New folder": "＋ پوشه جدید",
 "Create your first quality characteristic folder.": "اولین پوشه مشخصه کیفی را بسازید.",
 "← All characteristics": "همه مشخصه‌ها →",
 "＋ Add sample": "＋ ثبت نمونه",
 "Edit setup": "ویرایش تنظیمات",
 "Delete folder": "حذف پوشه",
 "Sampling history": "سوابق نمونه‌برداری",
 "Subgroup": "زیرگروه",
 "Mean": "میانگین",
 "Range": "دامنه",
 "Operator": "اپراتور",
 "Shift": "شیفت",
 "Persian date & time": "تاریخ و ساعت شمسی",
 "Status": "وضعیت",
 "New characteristic folder": "پوشه مشخصه کیفی جدید",
 "Edit characteristic folder": "ویرایش پوشه مشخصه کیفی",
 "Set the permanent details and specification limits.": "مشخصات ثابت و حدود مشخصات فنی را وارد کنید.",
 "Part name": "نام قطعه",
 "Part number / drawing code": "شماره قطعه / کد نقشه",
 "Quality characteristic": "مشخصه کیفی",
 "Unit": "واحد",
 "Line / station": "خط / ایستگاه",
 "Measurement tool": "ابزار اندازه‌گیری",
 "Subgroup size": "اندازه زیرگروه",
 "subgroup size": "اندازه زیرگروه",
 "Target value": "مقدار هدف",
 "Lower specification limit (LSL)": "حد پایین مشخصات (LSL)",
 "Upper specification limit (USL)": "حد بالای مشخصات (USL)",
 "Control limits are calculated from collected subgroups.": "حدود کنترل از زیرگروه‌های ثبت‌شده محاسبه می‌شوند.",
 "Cancel": "انصراف",
 "Save folder": "ذخیره پوشه",
 "Add sample subgroup": "ثبت زیرگروه نمونه",
 "Operator name": "نام اپراتور",
 "Morning": "صبح",
 "Evening": "عصر",
 "Night": "شب",
 "Measurements": "اندازه‌گیری‌ها",
 "Chassis number": "شماره شاسی",
 "Not recorded": "ثبت نشده",
 "Persian calendar date and Tehran local time are recorded on save.": "تاریخ شمسی و ساعت محلی تهران هنگام ذخیره ثبت می‌شود.",
 "Save subgroup": "ذخیره زیرگروه",
 "Subgroup details": "جزئیات زیرگروه",
 "Measurements and collection details": "مقادیر اندازه‌گیری و اطلاعات نمونه‌برداری",
 "Close": "بستن",
 "readings per subgroup": "اندازه‌گیری در هر زیرگروه",
 "subgroups recorded": "زیرگروه ثبت‌شده",
 "subgroups": "زیرگروه",
 "readings required": "اندازه‌گیری الزامی",
 "Subgroups recorded": "زیرگروه‌های ثبت‌شده",
 "Target / LSL / USL": "هدف / LSL / USL",
 "Target · LSL · USL": "هدف · LSL · USL",
 "Average subgroup mean": "میانگین میانگین زیرگروه‌ها",
 "Out-of-control signals": "هشدارهای خارج از کنترل",
 "Process status": "وضعیت فرایند",
 "Review signals": "بررسی هشدارها",
 "No limit signals": "بدون هشدار حدود کنترل",
 "Awaiting samples": "در انتظار نمونه",
 "X-bar chart": "نمودار میانگین (X̄)",
 "Range chart": "نمودار دامنه (R)",
 "R chart": "نمودار دامنه (R)",
 "S chart": "نمودار انحراف معیار (S)",
 "Add a subgroup to start this chart.": "برای نمایش نمودار، یک زیرگروه ثبت کنید.",
 "Add samples to start this chart.": "برای نمایش نمودار، نمونه ثبت کنید.",
 "Click a point for details": "برای جزئیات روی نقطه کلیک کنید",
 "Review": "نیازمند بررسی",
 "In control": "تحت کنترل",
 "No subgroups recorded yet.": "هنوز زیرگروهی ثبت نشده است.",
 "Histogram & normality": "هیستوگرام و نرمال بودن",
 "Normal": "نرمال",
 "Not normal": "غیرنرمال",
 "Not enough data": "داده ناکافی",
 "values": "مقدار",
 "Process mean": "میانگین فرایند",
 "Within subgroup σ": "انحراف معیار درون زیرگروه (σ)",
 "Normality": "نرمال بودن",
 "Alerts": "هشدارها",
 "Review special causes": "بررسی علل ویژه",
 "In statistical control": "تحت کنترل آماری",
 "Delete this folder and its sampling history?": "این پوشه و سوابق نمونه‌برداری آن حذف شود؟",
 "Enter limits so LSL < Target < USL.": "حدود را به‌صورت LSL < Target < USL وارد کنید.",
 "Enter a value and chassis number for every reading.": "برای هر اندازه‌گیری، مقدار و شماره شاسی را وارد کنید.",
 "Subgroup saved and charts updated.": "زیرگروه ذخیره و نمودارها به‌روزرسانی شدند.",
 "WAITING FOR TASK MANAGEMENT": "در انتظار اتصال از سامانه مدیریت عملیات",
 "SAVING…": "در حال ذخیره…",
 "DATABASE SYNCED": "همگام با پایگاه داده",
 "SYNC ISSUE": "اشکال در همگام‌سازی",
 "LOADING…": "در حال بارگذاری…",
 "SESSION ERROR": "خطای نشست کاربری",
 "Local copy saved, but cloud sync failed. Check your connection and save again.": "نسخه محلی ذخیره شد؛ همگام‌سازی انجام نشد. اتصال را بررسی و دوباره ذخیره کنید.",
 "Open SPC from Task Management to connect your session.": "کنترل آماری را از سامانه مدیریت عملیات باز کنید تا نشست متصل شود.",
 "ED Oven": "کوره ED",
 "Primer Oven": "کوره آستر",
 "Sealer Oven": "کوره سیلر",
 "Base Coat Oven": "کوره رنگ پایه",
 "Electrodeposition coating": "پوشش‌دهی الکتریکی",
 "Primer curing process": "پخت رنگ آستر",
 "Sealing and thermal treatment": "آب‌بندی و عملیات حرارتی",
 "Base coat temperature profiles": "پروفایل‌های دمای رنگ پایه",
 "Select oven →": "انتخاب کوره ←",
 "Daily report": "گزارش روزانه",
 "Four oven summaries in one PDF.": "خلاصه چهار کوره در یک فایل PDF.",
 "Create daily report →": "تهیه گزارش روزانه ←",
 "THERMAL WORKSPACE": "سامانه پایش حرارتی",
 "← Change oven": "تغییر کوره →",
 "VALIDATED REFERENCE": "مرجع تأییدشده",
 "baking window": "محدوده مجاز پخت",
 "Minimum duration": "حداقل زمان",
 "Maximum duration": "حداکثر زمان",
 "Peak temperature": "دمای اوج",
 "REFERENCE PENDING": "در انتظار مرجع",
 "Explore your recordings": "بررسی داده‌های ثبت‌شده",
 "Baking-window evaluation will show “Not configured”.": "ارزیابی محدوده پخت با وضعیت «تنظیم نشده» نمایش داده می‌شود.",
 "Continue to workspace": "ورود به محیط کار",
 "Upload & File Management": "بارگذاری و مدیریت فایل‌ها",
 "Upload & Files": "بارگذاری و فایل‌ها",
 "Information Tables": "جداول اطلاعات",
 "Information": "اطلاعات",
 "Charts": "نمودارها",
 "Baking Window Analysis": "تحلیل محدوده پخت",
 "File & Window Comparison": "مقایسه فایل و محدوده پخت",
 "Baking Analysis": "تحلیل پخت",
 "Comparison": "مقایسه",
 "Temperature analytics": "تحلیل دما",
 "↻ Change oven / window": "↻ تغییر کوره / محدوده پخت",
 "Workspace navigation": "پیمایش محیط کار",
 "Process workspaces": "فرایندهای کاری",
 "Workspace": "محیط کار",
 "ED Baking Window": "محدوده پخت ED",
 "Gamma Thinner Baking Window": "محدوده پخت گاما تینر",
 "Kansai Paint Iranian Co": "شرکت رنگ کانسای ایران",
 "Kansai Paint": "رنگ کانسای",
 "Gamma Thinner": "گاما تینر",
 "No recordings uploaded yet": "هنوز داده‌ای بارگذاری نشده است",
 "Go to uploads →": "رفتن به بارگذاری ←",
 "No worksheet loaded yet": "هنوز کاربرگی بارگذاری نشده است",
 "Choose Upload & File Management to add a workbook.": "برای افزودن فایل، بخش بارگذاری و مدیریت فایل‌ها را انتخاب کنید.",
 "NOT CONFIGURED": "تنظیم نشده",
 "No validated baking window for this oven": "محدوده پخت تأییدشده‌ای برای این کوره وجود ندارد",
 "The ED reference is never applied to another process. Configure the manufacturer-approved polygon before enabling pass/fail decisions here.": "مرجع ED برای فرایند دیگر استفاده نمی‌شود. پیش از ارزیابی قبول یا رد، چندضلعی مورد تأیید سازنده را تنظیم کنید.",
 "Upload a workbook →": "بارگذاری فایل اکسل ←",
 "Baking Window Evaluation": "ارزیابی محدوده پخت",
 "Summary PDF": "خلاصه PDF",
 "Total probes": "تعداد حسگرها",
 "Passed": "قبول",
 "Failed": "رد",
 "No data": "بدون داده",
 "NO DATA": "بدون داده",
 "PASS": "قبول",
 "FAIL": "رد",
 "Channel Comparison Matrix": "ماتریس مقایسه کانال‌ها",
 "Evaluation parameter": "پارامتر ارزیابی",
 "Probe location": "محل حسگر",
 "ALLOWED BAKING WINDOW": "محدوده مجاز پخت",
 "Min duration at peak temperature": "حداقل زمان در دمای اوج",
 "Max duration at peak temperature": "حداکثر زمان در دمای اوج",
 "Min temperature at actual duration": "حداقل دما در زمان واقعی",
 "Max temperature at actual duration": "حداکثر دما در زمان واقعی",
 "DISTANCE TO LIMITS (SIGNED MARGINS)": "فاصله تا حدود مجاز (حاشیه علامت‌دار)",
 "Minimum duration margin": "حاشیه حداقل زمان",
 "Maximum duration margin": "حاشیه حداکثر زمان",
 "Minimum peak temperature margin": "حاشیه حداقل دمای اوج",
 "Maximum temperature margin": "حاشیه حداکثر دما",
 "RULE EVALUATION": "ارزیابی قواعد",
 "Violated rules": "قواعد نقض‌شده",
 "Final status": "وضعیت نهایی",
 "Min time margin": "حاشیه حداقل زمان",
 "Max time margin": "حاشیه حداکثر زمان",
 "Min temp margin": "حاشیه حداقل دما",
 "Max temp margin": "حاشیه حداکثر دما",
 "No numeric samples to evaluate": "نمونه عددی برای ارزیابی وجود ندارد",
 "All baking window rules satisfied": "تمام قواعد محدوده پخت رعایت شده‌اند",
 "Rule logic": "منطق قواعد",
 "Measured Channel Points": "نقاط اندازه‌گیری کانال‌ها",
 "Duration at or above": "مدت زمان در دمای حداقل",
 "Peak Temperature (°C)": "دمای اوج (°C)",
 "Peak temperature (°C)": "دمای اوج (°C)",
 "Temperature (°C)": "دما (°C)",
 "Temperature band (°C)": "بازه دما (°C)",
 "Channel": "کانال",
 "Minutes": "دقیقه",
 "Elapsed time (min)": "زمان سپری‌شده (دقیقه)",
 "Elapsed time (mm:ss)": "زمان سپری‌شده (mm:ss)",
 "Time (min)": "زمان (دقیقه)",
 "Time (mm:ss)": "زمان (mm:ss)",
 "Temperature profile": "پروفایل دما",
 "TEMPERATURE PROFILE": "پروفایل دما",
 "Temperature analysis": "تحلیل دما",
 "Channel temperature spread": "اختلاف دمای کانال‌ها",
 "Time in temperature bands": "زمان در بازه‌های دمایی",
 "Peak temperatures by uploaded file": "دمای اوج به تفکیک فایل",
 "Download Excel": "دریافت اکسل",
 "Download PNG": "دریافت PNG",
 "Download all charts (PNG)": "دریافت همه نمودارها (PNG)",
 "Visible channels": "کانال‌های قابل نمایش",
 "Recorded duration": "مدت ثبت داده",
 "Time samples": "تعداد نقاط زمانی",
 "Median interval": "فاصله زمانی میانه",
 "Uploaded worksheet": "کاربرگ بارگذاری‌شده",
 "Browse files": "انتخاب فایل",
 "Excel files": "فایل‌های اکسل",
 "No files selected": "فایلی انتخاب نشده است",
 "Uploaded files": "فایل‌های بارگذاری‌شده",
 "Your uploaded files will appear here.": "فایل‌های بارگذاری‌شده در این قسمت نمایش داده می‌شوند.",
 "Worksheet": "کاربرگ",
 "Import notes": "نکات ورود داده",
 "Preparing Excel and chart libraries...": "در حال آماده‌سازی ابزارهای اکسل و نمودار…",
 "Reading temperature profiles...": "در حال خواندن پروفایل‌های دما…",
 "uploaded file(s)": "فایل بارگذاری‌شده",
 "readable worksheet(s)": "کاربرگ قابل خواندن",
 "recordings": "داده‌های ثبت‌شده",
 "No readable worksheets": "کاربرگ قابل خواندنی وجود ندارد",
 "Every channel. One clear view.": "نمایی روشن از تمام کانال‌ها.",
 "Review the import notes for this file, or choose another uploaded file.": "نکات ورود داده را بررسی یا فایل دیگری انتخاب کنید.",
 "Upload your Excel files, then select a file from the list on the left.": "فایل‌های اکسل را بارگذاری و سپس یک فایل را از فهرست انتخاب کنید.",
 "Upload Excel": "بارگذاری اکسل",
 "Select a file": "انتخاب فایل",
 "Explore your profile": "بررسی پروفایل دما",
 "Select at least one channel.": "حداقل یک کانال انتخاب کنید.",
 "Chart library unavailable.": "ابزار رسم نمودار در دسترس نیست.",
 "Temperature profiles — overlay curves": "پروفایل دما — هم‌پوشانی منحنی‌ها",
 "Temperature spread — compare files": "اختلاف دما — مقایسه فایل‌ها",
 "Choose recordings": "انتخاب داده‌های ثبت‌شده",
 "Channels": "کانال‌ها",
 "Chart type": "نوع نمودار",
 "Chart to compare": "نمودار مورد مقایسه",
 "Select all": "انتخاب همه",
 "Clear": "پاک کردن",
 "Uploaded file": "فایل بارگذاری‌شده",
 "Chart comparison": "مقایسه نمودارها",
 "Baking-window comparison": "مقایسه محدوده پخت",
 "Select uploaded files and channels to compare baking-window compliance.": "فایل‌ها و کانال‌ها را برای مقایسه انطباق با محدوده پخت انتخاب کنید.",
 "Choose at least one file and one channel to draw the comparison.": "برای مقایسه، حداقل یک فایل و یک کانال انتخاب کنید.",
 "Select at least two channels to compare temperature spread.": "برای مقایسه اختلاف دما، حداقل دو کانال انتخاب کنید.",
 "No valid numeric data exists for the selected channel(s).": "داده عددی معتبری برای کانال‌های انتخاب‌شده وجود ندارد.",
 "A validated baking window has not been configured for this oven. Chart comparison remains available.": "محدوده پخت تأییدشده برای این کوره تنظیم نشده است. مقایسه نمودارها در دسترس است.",
 "Chart library unavailable. Upload an Excel file to load plotting tools.": "ابزار نمودار در دسترس نیست. برای بارگذاری ابزار رسم، یک فایل اکسل بارگذاری کنید.",
 "Plotting library unavailable.": "ابزار رسم نمودار در دسترس نیست.",
 "Please render the comparison chart first.": "ابتدا نمودار مقایسه را رسم کنید.",
 "Baking-window manufacturer": "سازنده مرجع محدوده پخت",
 "Excel recording": "فایل اکسل ثبت دما",
 "← Back to ovens": "بازگشت به کوره‌ها →",
 "Daily oven summary": "خلاصه روزانه کوره‌ها",
 "Report date": "تاریخ گزارش",
 "YYYY-MM-DD · entered manually": "سال-ماه-روز · ورود دستی",
 "Download daily summary PDF": "دریافت خلاصه روزانه PDF",
 "Only uploaded ovens are included · A4 landscape": "فقط کوره‌های بارگذاری‌شده · A4 افقی",
 "Reading workbook…": "در حال خواندن فایل اکسل…",
 "Upload at least one valid Excel file.": "حداقل یک فایل اکسل معتبر بارگذاری کنید.",
 "Insufficient Duration": "زمان ناکافی",
 "Excessive Duration": "زمان بیش از حد",
 "Insufficient Temperature": "دمای ناکافی",
 "Excessive Absolute Temperature": "دمای بالاتر از حد مطلق",
 "Outside Sloped Boundary": "خارج از مرز شیب‌دار",
 "Outside Upper Sloped Boundary": "خارج از مرز شیب‌دار بالا",
 "Outside Lower Sloped Boundary": "خارج از مرز شیب‌دار پایین",
 "Summary": "خلاصه",
 "Date:": "تاریخ:",
 "Not available": "در دسترس نیست",
 "Peak": "اوج",
 "Spread": "اختلاف",
 "Parameter": "پارامتر",
 "Readings": "اندازه‌گیری‌ها",
 "Channel summary — from workbook": "خلاصه کانال‌ها — از فایل اکسل",
 "Worksheet content": "محتوای کاربرگ",
 "Air": "هوا",
 "Top": "بالا",
 "Middle": "میانه",
 "Bottom": "پایین",
 "Elapsed time from first reading (min)": "زمان از نخستین اندازه‌گیری (دقیقه)",
 "Recorded temperature (°C)": "دمای ثبت‌شده (°C)",
 "Channel spread (°C)": "اختلاف دمای کانال‌ها (°C)",
 "File name": "نام فایل",
 "Time ≥": "زمان ≥",
 "with measured channel points": "همراه با نقاط اندازه‌گیری کانال‌ها",
 "Visible channels for all four charts": "کانال‌های قابل نمایش در هر چهار نمودار",
 "Channel colors for temperature profile": "رنگ کانال‌ها در پروفایل دما",
 "Channel colors for peak temperatures": "رنگ کانال‌ها در نمودار دمای اوج",
 "Remove": "حذف",
 "unlabelled": "بدون برچسب",
 "No validated baking window has been configured for": "محدوده پخت تأییدشده‌ای تنظیم نشده است برای",
 "You can upload recordings and explore temperature tables and charts.": "می‌توانید داده‌ها را بارگذاری و جداول و نمودارهای دما را بررسی کنید.",
 "Ready to evaluate": "آماده ارزیابی",
 "Rules (failure conditions)": "قواعد (شرایط عدم انطباق)",
 "Oven": "کوره",
 "→": "←",
 "←": "→"
};
const pageTitle=document.title;
const KEY='bamco.ui.language',font="'Bamco Nazanin', 'Times New Roman', Times, serif";
let language='fa';try{language=localStorage.getItem(KEY)==='en'?'en':'fa'}catch{}
const textState=new WeakMap(),attributeState=new WeakMap();let observer,scheduled=false;
const phrases=Object.entries(dictionary).filter(([key])=>(key.length>=4||['Air','Top'].includes(key))).sort((a,b)=>b[0].length-a[0].length);
function translate(value){
 const source=String(value??'');if(language==='en')return source;
 const trimmed=source.trim();if(dictionary[trimmed])return source.replace(trimmed,dictionary[trimmed]);
 if(/^Start (.+) analysis$/.test(trimmed))return 'شروع تحلیل '+translate(trimmed.match(/^Start (.+) analysis$/)[1]);
 if(/^Value \d+$/.test(trimmed))return source.replace('Value','مقدار');
 if(/^Chassis number \d+$/.test(trimmed))return source.replace('Chassis number','شماره شاسی');
 let result=source;
 for(const [en,fa] of phrases){
  const escaped=en.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  result=result.replace(new RegExp('(?<![A-Za-z])'+escaped+'(?![A-Za-z])','g'),()=>fa);
 }
 return result;
}
const skip='.rule-explanation span,script,style,noscript,textarea,[data-i18n-skip],.language-switch,#title,#subtitle,#meta b,.folder-copy strong,.folder-copy small:first-of-type,.latin-data,.uploaded-select,.compare-filename,.device-label,.chart-heading h2,.chart-heading .secondary,#source-sections td,.daily-slot-status:not(.has-error)';
function original(state,value){return state&&value===state.display?state.source:value}
function localize(){
 scheduled=false;if(!document.body)return;
 observer?.disconnect();
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let node;
 while((node=walker.nextNode())){
  if(!node.parentElement||node.parentElement.closest(skip)||!node.nodeValue.trim())continue;
  const source=original(textState.get(node),node.nodeValue),display=translate(source);
  textState.set(node,{source,display});if(node.nodeValue!==display)node.nodeValue=display;
 }
 document.querySelectorAll('[title],[aria-label],[placeholder],input[readonly]').forEach(el=>{
  if(el.closest(skip))return;let states=attributeState.get(el)||{};
  for(const attr of ['title','aria-label','placeholder']){if(!el.hasAttribute(attr))continue;const source=original(states[attr],el.getAttribute(attr)),display=translate(source);states[attr]={source,display};if(el.getAttribute(attr)!==display)el.setAttribute(attr,display)}
  // The upload picker has a fixed UI value, distinct from imported filenames.
  if(el.id==='filename'){
   const source=original(states.value,el.value),display=translate(source);states.value={source,display};if(el.value!==display)el.value=display;
  }
  attributeState.set(el,states);
 });
 document.querySelectorAll('.language-switch button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.language===language)));
 observer?.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['title','aria-label','placeholder']});
}
function queue(){if(!scheduled){scheduled=true;requestAnimationFrame(localize)}}
function setLanguage(value){
 language=value==='en'?'en':'fa';try{localStorage.setItem(KEY,language)}catch{}
 document.documentElement.lang=language;document.documentElement.dir=language==='fa'?'rtl':'ltr';document.title=translate(pageTitle);
 localize();window.dispatchEvent(new CustomEvent('bamco:language',{detail:{language}}));
 // Rebuild only plots, preserving selected ovens, uploaded files, and form values.
 if(document.body?.dataset.section==='charts')window.BAMCO_CORE?.renderPlots?.();
 if(document.body?.dataset.section==='comparison')window.BAMCOCompare?.render?.();
}
function localizePlot(value,key=''){
 if(Array.isArray(value))return value.map(item=>localizePlot(item,key));
 if(value&&typeof value==='object'){const output={};for(const [k,v] of Object.entries(value))output[k]=localizePlot(v,k);return output}
 if(typeof value==='string'&&['title','text','hovertemplate','hovertext'].includes(key))return translate(value);
 return value;
}
function cloneLocalized(element){
 const copy=element.cloneNode(true),from=document.createTreeWalker(element,NodeFilter.SHOW_TEXT),to=document.createTreeWalker(copy,NodeFilter.SHOW_TEXT);let a,b;
 while((a=from.nextNode())&&(b=to.nextNode())){const state=textState.get(a);if(state)textState.set(b,{...state})}
 const originals=[element,...element.querySelectorAll('*')],copies=[copy,...copy.querySelectorAll('*')];
 originals.forEach((node,index)=>{const state=attributeState.get(node);if(state)attributeState.set(copies[index],structuredClone(state))});return copy;
}
window.BamcoI18n={t:translate,setLanguage,clone:cloneLocalized,get language(){return language},font,
 newPlot:(target,data,layout,...args)=>window.Plotly.newPlot(target,localizePlot(data),localizePlot(layout),...args)};
for(const name of ['alert','confirm']){const native=window[name].bind(window);window[name]=message=>native(translate(message))}
document.documentElement.lang=language;document.documentElement.dir=language==='fa'?'rtl':'ltr';
function init(){
 const control=document.createElement('div');control.className='language-switch';control.setAttribute('role','group');control.setAttribute('aria-label','Language / زبان');
 control.innerHTML='<button type="button" data-language="fa" lang="fa">فارسی</button><button type="button" data-language="en" lang="en">English</button>';
 control.addEventListener('click',event=>{const button=event.target.closest('[data-language]');if(button)setLanguage(button.dataset.language)});document.body.append(control);
 observer=new MutationObserver(queue);localize();
 window.addEventListener('storage',event=>{if(event.key===KEY)setLanguage(event.newValue)});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
