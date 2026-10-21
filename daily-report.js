/* Daily summaries keep their own uploads and never change the oven workspaces. */
'use strict';
(function(){
  const ovens=[{id:'ed',name:'ED Oven',reference:'ed'},{id:'primer',name:'Primer Oven',reference:'primer'},{id:'sealer',name:'Sealer Oven',reference:''},{id:'bc',name:'Base Coat Oven',reference:'primer'}];
  const slots=Object.fromEntries(ovens.map(o=>[o.id,{reference:o.reference,records:[],sheet:0,name:'',error:'',warnings:[],pending:false,version:0}]));
  const state={date:''};
  let refreshActive=null;
  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function normalizeDate(value){
    const text=String(value||'').trim().replace(/[۰-۹٠-٩]/g,c=>{const n=c.charCodeAt(0);return String(n>=1776?n-1776:n-1632);});
    const match=text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if(!match)return null;
    const [,year,month,day]=match.map(Number);
    if(year<1300||year>2099||month<1||month>12||day<1)return null;
    const max=year<1700?(month<=6?31:30):new Date(Date.UTC(year,month,0)).getUTCDate();
    return day<=max?text:null;
  }
  function entries(){
    return ovens.map(oven=>{
      const slot=slots[oven.id],reference=window.BAMCOBakingWindows.get(slot.reference),record=slot.records[slot.sheet];
      if(!reference)throw Error('Select a baking-window manufacturer for '+oven.name+'.');
      if(slot.pending)throw Error('Wait for '+oven.name+' to finish loading.');
      if(!record)throw Error('Upload a valid Excel file for '+oven.name+'.');
      const results=window.BAMCOEnhance.evaluate(record,slot.reference);
      if(!results.length)throw Error('No channel cards are available for '+oven.name+'.');
      return {results,options:{ovenName:oven.name,manufacturer:reference.manufacturer}};
    });
  }
  function open(host,onBack){
    const references=window.BAMCOBakingWindows.references();
    host.innerHTML='<div class="daily-report-container"><div class="window-topbar"><div><span class="window-eyebrow">THERMAL WORKSPACE</span><h1>Daily report</h1></div><button type="button" class="window-change-oven" data-daily-back>← Back to ovens</button></div>'
      +'<form class="daily-report-form"><div class="daily-date-row"><div><h2>Four ovens. One daily summary.</h2><p>Upload one workbook for each oven. Each summary gets its own A4 landscape page.</p></div><label for="daily-date">Report date<input id="daily-date" type="text" inputmode="numeric" dir="ltr" placeholder="1405-06-05" autocomplete="off" required value="'+esc(state.date)+'"><small>YYYY-MM-DD · entered manually</small></label></div>'
      +'<div class="daily-oven-grid">'+ovens.map(oven=>'<section class="daily-oven-card" data-daily-slot="'+oven.id+'"><h3>'+oven.name+'</h3><label for="daily-reference-'+oven.id+'">Baking-window manufacturer</label><select id="daily-reference-'+oven.id+'" data-daily-reference="'+oven.id+'" required><option value="">Select manufacturer</option>'+references.map(ref=>'<option value="'+ref.id+'" '+(slots[oven.id].reference===ref.id?'selected':'')+'>'+esc(ref.name)+'</option>').join('')+'</select>'
        +(oven.id==='sealer'?'<small class="daily-reference-note">Choose the supplied reference that applies to this oven.</small>':'')
        +'<label for="daily-file-'+oven.id+'">Excel recording</label><input id="daily-file-'+oven.id+'" data-daily-file="'+oven.id+'" type="file" accept=".xls,.xlsx"><div class="daily-slot-status" aria-live="polite"></div><div class="daily-sheet-picker"></div></section>').join('')+'</div>'
      +'<div class="daily-report-footer"><p class="daily-report-error" role="alert"></p><button type="submit" class="primary-action">Download daily summary PDF <span aria-hidden="true">→</span></button><small>4 pages · ED / Primer / Sealer / Base Coat</small></div></form></div>';
    const form=host.querySelector('.daily-report-form'),date=form.querySelector('#daily-date'),error=form.querySelector('.daily-report-error'),button=form.querySelector('[type="submit"]');
    let generating=false;
    host.querySelector('[data-daily-back]').addEventListener('click',()=>{state.date=date.value;refreshActive=null;onBack();});
    date.addEventListener('input',()=>{state.date=date.value;error.textContent='';date.setCustomValidity('');});
    function update(id){
      const slot=slots[id],card=form.querySelector('[data-daily-slot="'+id+'"]');
      card.querySelector('.daily-slot-status').textContent=slot.pending?'Reading workbook…':slot.error||slot.name;
      card.querySelector('.daily-slot-status').classList.toggle('has-error',!!slot.error);
      card.querySelector('.daily-sheet-picker').innerHTML=slot.records.length>1?'<label for="daily-sheet-'+id+'">Worksheet</label><select id="daily-sheet-'+id+'" data-daily-sheet="'+id+'">'+slot.records.map((record,i)=>'<option value="'+i+'" '+(slot.sheet===i?'selected':'')+'>'+esc(record.sheetName)+'</option>').join('')+'</select>':slot.warnings.length?'<small>'+esc(slot.warnings.join('; '))+'</small>':'';
      button.disabled=generating||Object.values(slots).some(s=>s.pending);
    }
    refreshActive=()=>ovens.forEach(o=>update(o.id));
    refreshActive();
    form.addEventListener('change',async event=>{
      const target=event.target,id=target.dataset.dailyFile;
      error.textContent='';
      if(target.dataset.dailyReference){slots[target.dataset.dailyReference].reference=target.value;return;}
      if(target.dataset.dailySheet){slots[target.dataset.dailySheet].sheet=Number(target.value);return;}
      if(!id)return;
      const slot=slots[id],file=target.files?.[0];
      // A cancelled file dialog retains the previous selection.
      if(!file)return;
      const version=++slot.version;
      Object.assign(slot,{records:[],sheet:0,name:file.name,error:'',warnings:[],pending:true});update(id);
      try{
        const parsed=await window.BAMCO_CORE.readWorkbook(file);
        if(version!==slot.version)return;
        if(!parsed.records.length)throw Error(parsed.errors.join('; ')||'No valid readings table was found.');
        slot.records=parsed.records;slot.warnings=parsed.errors;
      }catch(problem){if(version===slot.version)slot.error=problem.message;}
      finally{if(version===slot.version){slot.pending=false;refreshActive?.();}}
    });
    form.addEventListener('submit',async event=>{
      event.preventDefault();if(generating)return;error.textContent='';
      const reportDate=normalizeDate(date.value);
      if(!reportDate){error.textContent='Enter a valid report date, for example 1405-06-05.';date.focus();return;}
      state.date=reportDate;date.value=reportDate;
      try{
        const pages=entries();
        generating=true;button.disabled=true;button.setAttribute('aria-busy','true');button.textContent='Creating four-page PDF…';
        await window.BAMCOSummaryPDF.downloadReport(pages,reportDate);
      }catch(problem){error.textContent=problem.message;}
      finally{generating=false;button.disabled=generating||Object.values(slots).some(s=>s.pending);button.removeAttribute('aria-busy');button.textContent='Download daily summary PDF →';}
    });
    window.scrollTo({top:0,left:0,behavior:'instant'});
  }
  window.BAMCODailyReport={open};
})();
