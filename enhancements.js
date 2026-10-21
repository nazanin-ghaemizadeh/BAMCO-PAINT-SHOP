/* BAMCO Paint Shop — oven onboarding, workspace navigation and ED compliance.
   All calculations run locally in the browser. No uploaded data leaves the device. */
'use strict';
(function () {
  const WINDOW = {name:'ED Baking Window — 165°C / 15 min', threshold:165, minDuration:15,
    maxDuration:35.5, minTemp:165, maxTemp:200,
    vertices:[[15,165],[15,200],[22,200],[35.5,172],[35.5,165]]};
  const ovens = [
    {id:'ed',name:'ED Oven',description:'Electrodeposition coating',symbol:'01'},
    {id:'primer',name:'Primer Oven',description:'Primer curing process',symbol:'02'},
    {id:'sealer',name:'Sealer Oven',description:'Sealing and thermal treatment',symbol:'03'},
    {id:'bc',name:'Base Coat Oven',description:'Base coat temperature profiles',symbol:'04'}
  ];

  // Distinct oven illustrations, drawn as transparent SVG vectors.
  const OVEN_ART={
    ed:'<path d="M13 57h70v17a8 8 0 0 1-8 8H21a8 8 0 0 1-8-8z" fill="currentColor" fill-opacity=".08"/>'
      +'<path d="M13 57h70v17a8 8 0 0 1-8 8H21a8 8 0 0 1-8-8z"/>'
      +'<path d="M20 66c6-4 11-4 17 0s11 4 17 0 11-4 17 0 10 4 13 1" class="oven-icon-soft"/>'
      +'<path d="M29 51l6-13h27l6 13M25 53h48M37 51v-5h24v5"/>'
      +'<path d="M54 10 39 28h12l-8 18 19-24H50z" fill="currentColor" fill-opacity=".17"/>'
      +'<path d="M54 10 39 28h12l-8 18 19-24H50z"/>',
    primer:'<path d="M12 28h29l9 8-9 8H22l-10-7z" fill="currentColor" fill-opacity=".12"/>'
      +'<path d="M12 28h29l9 8-9 8H22l-10-7z"/>'
      +'<path d="M26 44v24h13l5 10M35 44l-2 13h10"/>'
      +'<path d="M14 28v-8h14v8"/>'
      +'<path d="M74 19v58M83 19v58" class="oven-icon-soft"/>'
      +'<circle cx="56" cy="30" r="2.5" fill="currentColor" stroke="none"/>'
      +'<circle cx="64" cy="36" r="2.5" fill="currentColor" stroke="none"/>'
      +'<circle cx="56" cy="43" r="2" fill="currentColor" stroke="none"/>'
      +'<circle cx="66" cy="47" r="2" fill="currentColor" stroke="none"/>',
    sealer:'<rect x="17" y="27" width="47" height="17" rx="5" fill="currentColor" fill-opacity=".12"/>'
      +'<rect x="17" y="27" width="47" height="17" rx="5"/>'
      +'<path d="M64 30h11l10 6-10 6H64M25 44v14h15l5 20H33l-10-18V44"/>'
      +'<path d="M17 23v-4h11M13 36h-6M52 27V17h9"/>'
      +'<path d="M15 81h67M13 69c12-8 20-8 31 0s21 8 37-1" class="oven-icon-soft"/>',
    bc:'<path d="M19 29 47 16l29 13-29 14z" fill="currentColor" fill-opacity=".08"/>'
      +'<path d="M19 29 47 16l29 13-29 14z"/>'
      +'<path d="M19 43 47 56l29-13M19 55l28 13 29-13M19 67l28 13 29-13" class="oven-icon-soft"/>'
      +'<path d="M19 43v24M76 43v24"/>'
      +'<path d="M12 19c5 0 6-5 11-5M73 19c5 0 6-5 11-5"/>'
      +'<circle cx="16" cy="16" r="2" fill="currentColor" stroke="none"/>'
      +'<circle cx="78" cy="14" r="2" fill="currentColor" stroke="none"/>'
  };
  function ovenIcon(id){
    return '<svg class="oven-icon oven-icon-'+(OVEN_ART[id]?id:'ed')+'" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round">'+(OVEN_ART[id]||OVEN_ART.ed)+'</svg>';
  }
  const sections = [
    {id:'upload',label:'Upload & File Management',icon:'⇧'},
    {id:'information',label:'Information Tables',icon:'▤'},
    {id:'charts',label:'Charts',icon:'▥'},
    {id:'analysis',label:'Baking Window Analysis',icon:'◎'},
    {id:'comparison',label:'File & Window Comparison',icon:'⇄'}
  ];
  let choice='ed',step=1,activeSection='upload',gateway;
  const core=()=>window.BAMCO_CORE;
  const esc=x=>String(x??'').replace(/[&<>"']/g,s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
  const fmt=(v,n=3)=>Number.isFinite(v)?v.toFixed(n):'N/A';
  const timeAllowed=t=>t>=15&&t<=35.5?(t<=22?200:200-(28/13.5)*(t-22)):null;
  const durationAllowed=T=>T>=165&&T<=200?Math.min(35.5,22+(13.5/28)*(200-T)):null;
  const CHANNEL_COLORS=['#087d8c','#e19a24','#4364c5','#ce4e68','#865ac2','#0e946e','#bb627f','#7d8737'];
  function channelColor(ch){const n=Number(String(ch).replace(/\D/g,''));return CHANNEL_COLORS[(Number.isFinite(n)&&n>0?n-1:0)%CHANNEL_COLORS.length];}
  function svgChart(points=[],small=false){
    const w=790,h=small?310:460,L=65,R=23,top=26,B=small?58:95;
    const X=x=>L+(x-10)/30*(w-L-R),Y=y=>h-B-(y-155)/55*(h-top-B);
    const poly=WINDOW.vertices.map(p=>X(p[0])+','+Y(p[1])).join(' ');
    const lines=[];
    for(const x of [10,15,20,22,25,30,35.5,40]){
      lines.push('<line x1="'+X(x)+'" y1="'+top+'" x2="'+X(x)+'" y2="'+(h-B)+'" stroke="#dfebe7" stroke-dasharray="4 5"/>');
      lines.push('<text x="'+X(x)+'" y="'+(h-B+20)+'" text-anchor="middle" font-size="12" fill="#708983">'+x+'</text>');
    }
    for(const y of [160,165,170,180,190,200,210]){
      lines.push('<line x1="'+L+'" y1="'+Y(y)+'" x2="'+(w-R)+'" y2="'+Y(y)+'" stroke="#dfebe7" stroke-dasharray="4 5"/>');
      lines.push('<text x="'+(L-13)+'" y="'+(Y(y)+4)+'" text-anchor="end" font-size="12" fill="#708983">'+y+'</text>');
    }
    let dots='',labels='',legend='';
    WINDOW.vertices.forEach(([x,y])=>dots+='<circle cx="'+X(x)+'" cy="'+Y(y)+'" r="4.5" fill="#237e4b" stroke="white" stroke-width="1.6"/>');
    const occupied=[];
    points.forEach((p,i)=>{
      if(!Number.isFinite(p.d)||!Number.isFinite(p.t))return;
      const x=X(p.d),y=Y(p.t),c=channelColor(p.ch),wLabel=82,hLabel=23;
      // Do not change the measured coordinate. Move only its annotation if nearby probes overlap.
      const offsets=[[14,14],[-95,14],[14,-37],[-95,-37],[14,39],[-95,39],[14,-62],[-95,-62],[25,65],[-104,65]];
      let selected=null,score=Infinity;
      for(const [dx,dy] of offsets){
        const bx=Math.max(L+3,Math.min(w-R-wLabel-3,x+dx));
        const by=Math.max(top+4,Math.min(h-B-hLabel-4,y+dy));
        let penalty=Math.abs(dx)*.13+Math.abs(dy)*.15;
        for(const o of occupied)if(bx<o.x+wLabel+8&&bx+wLabel+8>o.x&&by<o.y+hLabel+8&&by+hLabel+8>o.y)penalty+=1500;
        if(penalty<score){score=penalty;selected={x:bx,y:by};}
      }
      occupied.push(selected);
      const cx=selected.x+wLabel/2,cy=selected.y+hLabel/2;
      labels+='<line x1="'+x+'" y1="'+y+'" x2="'+cx+'" y2="'+cy+'" stroke="'+c+'" stroke-width="1.25" opacity=".7"/>'
        +'<rect x="'+selected.x+'" y="'+selected.y+'" width="'+wLabel+'" height="'+hLabel+'" rx="7" fill="white" stroke="'+c+'" stroke-width="1.4"/>'
        +'<text x="'+cx+'" y="'+(selected.y+15.6)+'" text-anchor="middle" font-size="12" font-weight="bold" fill="'+c+'">'+esc(p.ch)+'</text>';
      dots+='<circle cx="'+x+'" cy="'+y+'" r="6.4" fill="'+c+'" stroke="white" stroke-width="2.1"/>'
        +'<circle cx="'+x+'" cy="'+y+'" r="8.9" fill="none" stroke="'+c+'" stroke-width="1.1" opacity=".65"/>';
      legend+='<g><circle cx="'+(L+16+i*124)+'" cy="'+(h-49)+'" r="5" fill="'+c+'"/><text x="'+(L+27+i*124)+'" y="'+(h-45)+'" font-size="12" fill="#344b52">'+esc(p.ch)+' · '+(p.status==='PASS'?'PASS':'FAIL')+'</text></g>';
    });
    return '<svg class="window-svg" viewBox="0 0 '+w+' '+h+'" role="img" aria-label="ED window: distinct probe colors; labels are offset so real probe locations remain precise." xmlns="http://www.w3.org/2000/svg">'
      +'<rect width="'+w+'" height="'+h+'" rx="12" fill="#fff"/>'
      +lines.join('')+'<line x1="'+L+'" y1="'+top+'" x2="'+L+'" y2="'+(h-B)+'" stroke="#82969c"/>'
      +'<line x1="'+L+'" y1="'+(h-B)+'" x2="'+(w-R)+'" y2="'+(h-B)+'" stroke="#82969c"/>'
      +'<polygon points="'+poly+'" fill="#74c990" fill-opacity=".26" stroke="#277f47" stroke-width="3.1" stroke-linejoin="round"/>'
      +labels+dots
      +'<text x="'+(w/2)+'" y="'+(h-B+43)+'" fill="#344b52" font-size="14" text-anchor="middle">Duration above 165°C (min)</text>'
      +'<text transform="translate(19 '+((h-B+top)/2)+') rotate(-90)" text-anchor="middle" fill="#344b52" font-size="14">Peak Temperature (°C)</text>'
      +legend+'</svg>';
  }
  function preview(){
    return '<div class="window-photo-card ed-reference-image"><img src="assets/ed-baking-window.svg?v=20261021-4" alt="ED Baking Window — Kansai Paint Iranian Co" class="window-photo" decoding="async" loading="eager"></div>';
  }
  function applyGatewayLogo(){
    const original=document.getElementById('company-logo-image');
    if(!original||!gateway)return;
    const mark=gateway.querySelector('.brand-mark');
    if(!mark)return;
    const clone=original.cloneNode(true);clone.removeAttribute('id');
    clone.className='gateway-company-logo';
    clone.alt='BAM Automotive Company';
    mark.replaceChildren(clone);
    mark.classList.add('has-company-logo');
  }
  function renderGate(){
    if(!gateway)return;
    const oven=ovens.find(x=>x.id===choice);
    if(step===1){
      gateway.innerHTML='<div class="gate-container"><div class="gate-brand"><span class="brand-mark">B</span><span>BAM AUTOMOTIVE COMPANY <small>PAINT SHOP INTELLIGENCE</small></span></div>'
      +'<div class="gate-kicker">WELCOME TO YOUR THERMAL WORKSPACE</div>'
      +'<h1>Precision starts with every degree.</h1>'
      +'<h2 class="gate-subtitle"><span>Select your oven</span></h2>'
      +'<div class="oven-grid">'+ovens.map(o=>'<button class="oven-choice" data-oven="'+o.id+'"><span class="oven-number">'+o.symbol+'</span><span class="oven-graphic" aria-hidden="true">'+ovenIcon(o.id)+'</span><strong>'+o.name+'</strong><small>'+o.description+'</small><span class="oven-cta">Select oven →</span></button>').join('')+'</div>'
      +'</div>';
      applyGatewayLogo();
    } else {
      gateway.innerHTML='<div class="gate-container gate-window-container"><div class="gate-brand"><span class="brand-mark">B</span><span>BAM AUTOMOTIVE COMPANY <small>PAINT SHOP INTELLIGENCE</small></span></div>'
      +'<button class="gate-back" data-go-back>← All ovens</button><div class="gate-kicker">STEP 02 / BAKING WINDOW SELECTION</div>'
      +'<h1>'+oven.name+'</h1><p class="gate-lead">Choose a validated reference before analysing your temperature recordings.</p>'
      +(choice==='ed'
        ?'<div class="window-selection"><div class="window-description"><span class="approved-flag">CONFIGURED WINDOW</span><h2>ED — Kansai Paint Iranian Co</h2><div class="window-spec"><span>Min duration <b>15 min</b></span><span>Max duration <b>35.5 min</b></span><span>Peak range <b>165–200°C</b></span></div><button class="primary-action" data-enter>Start ED analysis <span aria-hidden="true">→</span></button></div>'+preview()+'</div>'
        :'<div class="window-selection no-window"><div class="window-description"><span class="pending-flag">WINDOW NOT CONFIGURED</span><h2>Temperature data exploration</h2><p>No validated baking-window coordinates have been supplied for '+oven.name+'. Uploads, tables and charts remain available. The evaluation panel will clearly show “Not configured” rather than an unverified PASS or FAIL.</p><button class="primary-action" data-enter>Continue without curing rules →</button></div></div>')
      +'</div>';
    }
    applyGatewayLogo();
  }
  function enter(){
    document.body.classList.add('bamco-entered');
    core().chooseTab(choice);
    activeSection='upload';
    switchSection('upload');
  }
  function openGate(){
    step=1;document.body.classList.remove('bamco-entered');renderGate();window.scrollTo(0,0);
  }
  function navHTML(){
    return '<aside class="workspace-nav" aria-label="Workspace navigation"><div class="nav-overline">ACTIVE WORKSPACE</div>'
      +'<div class="nav-oven"><span class="nav-oven-symbol">'+ovenIcon(core().getStage())+'</span><div><strong>'+esc(ovens.find(x=>x.id===core().getStage()).name)+'</strong><small>'+(core().getStage()==='ed'?'ED — 165°C / 15 min':'No validated window')+'</small></div></div>'
      +'<div class="nav-overline nav-section-label">WORKSPACE</div>'
      +sections.map(s=>'<button type="button" class="workspace-nav-link '+(activeSection===s.id?'is-active':'')+'" data-section="'+s.id+'"><span class="nav-icon">'+s.icon+'</span><span>'+s.label+'</span></button>').join('')
      +'<div class="nav-bottom"><button type="button" class="change-oven" data-change-oven>↻ &nbsp; Change oven / window</button><p>BAMCO • Paint Shop Analytics</p></div></aside>';
  }
  function switchSection(s){
    activeSection=s;document.body.dataset.section=s;
    document.querySelectorAll('.workspace-nav-link').forEach(b=>b.classList.toggle('is-active',b.dataset.section===s));
    const sectionName=sections.find(a=>a.id===s)?.label||'Workspace';
    const h=document.getElementById('selected-section-name');if(h)h.textContent=sectionName;
    if(s==='charts'){
      window.setTimeout(()=>{
        if(window.Plotly)for(const id of ['plot-profile','plot-spread','plot-bands','plot-peaks']){
          const e=document.getElementById(id);if(e&&e.data)try{Plotly.Plots.resize(e);}catch(_){}
        }
      },120);
    }
    if(s==='comparison')window.setTimeout(()=>window.BAMCOCompare?.render?.(),60);
  }
  function elapsedDuration(reads,ch,step){
    const valid=reads.every(x=>Number.isFinite(x.values[ch]));
    if(!valid)return {duration:null,error:'Missing/non-numeric readings'};
    let duration=0;
    for(let i=1;i<reads.length;i++){
      const a=reads[i-1],b=reads[i],dt=(b.ts-a.ts)/60000;
      if(!(dt>0)||dt>step/60*1.5+0.0001)return {duration:null,error:'Irregular or missing timestamps'};
      const A=a.values[ch],B=b.values[ch],threshold=WINDOW.threshold;
      if(A>=threshold&&B>=threshold)duration+=dt;
      else if(A<threshold&&B>=threshold&&A!==B)duration+=dt*(B-threshold)/(B-A);
      else if(A>=threshold&&B<threshold&&A!==B)duration+=dt*(A-threshold)/(A-B);
    }
    return {duration,error:null};
  }
  function evaluate(r){
    if(!r||!r.channels)return [];
    return r.channels.map(ch=>{
      const temps=r.reads.map(q=>q.values[ch]).filter(Number.isFinite);
      const T=temps.length?Math.max(...temps):null;
      const durationResult=elapsedDuration(r.reads,ch,r.step);
      const D=durationResult.duration;
      let violations=[],status='PASS';
      if(!Number.isFinite(D)||!Number.isFinite(T)||r.reads.length<2){
        status='INVALID DATA';violations=['R07 — '+(durationResult.error||'Incomplete temperature readings')];
      }else{
        if(D<15-1e-9)violations.push('R01 — Insufficient Duration');
        if(D>35.5+1e-9)violations.push('R02 — Excessive Duration');
        if(T<165-1e-9)violations.push('R03 — Insufficient Temperature');
        if(T>200+1e-9)violations.push('R04 — Excessive Absolute Temperature');
        if(28*D+13.5*T>3316+1e-8)violations.push('R05 — Outside Sloped Boundary');
        if(violations.length)status='FAIL';
      }
      const dMax=Number.isFinite(T)?durationAllowed(T):null;
      const tMax=Number.isFinite(D)?timeAllowed(D):null;
      return {ch, label:r.labels[ch]||ch, D,T,status,violations,dMax,tMax,
        mdMin:Number.isFinite(D)?D-15:null,
        mdMax:Number.isFinite(D)&&dMax!==null?dMax-D:null,
        mtMin:Number.isFinite(T)?T-165:null,
        mtMax:Number.isFinite(T)&&tMax!==null?tMax-T:null,
        mdAbs:Number.isFinite(D)?35.5-D:null,
        mtAbs:Number.isFinite(T)?200-T:null};
    });
  }
  function tag(status){
    return '<span class="eval-tag '+(status==='PASS'?'pass':status==='FAIL'?'fail':'pending')+'">'+esc(status)+'</span>';
  }
  function signed(v,n=3,unit=''){return v===null?'N/A':(v>0?'+':'')+fmt(v,n)+(unit?' '+unit:'');}
  function summaryRows(data){
    const row=(label,key,digits=3,unit='',kind='')=>'<tr><th>'+label+'</th>'+data.map(v=>'<td class="'+(kind==='margin'&&v[key]<0?'negative':'')+'">'+(kind==='margin'?signed(v[key],digits,unit):v[key]===null?'N/A':fmt(v[key],digits)+(unit?' '+unit:''))+'</td>').join('')+'</tr>';
    return '<div class="matrix-scroll"><table class="eval-matrix"><thead><tr><th>Evaluation parameter</th>'+data.map(v=>'<th>'+esc(v.ch)+'</th>').join('')+'</tr></thead><tbody>'
      +'<tr><th>Probe location</th>'+data.map(v=>'<td>'+esc(v.label.replace(/^Ch\d+\s*[-–]\s*/,''))+'</td>').join('')+'</tr>'
      +row('Duration above 165°C','D',3,'min')+row('Peak temperature','T',1,'°C')
      +'<tr class="matrix-group"><th colspan="'+(data.length+1)+'">ALLOWED BAKING WINDOW</th></tr>'
      +'<tr><th>Min allowed duration</th>'+data.map(()=>'<td>15.000 min</td>').join('')+'</tr>'
      +row('Max duration at peak temperature','dMax',3,'min')
      +'<tr><th>Min allowed peak temperature</th>'+data.map(()=>'<td>165.0°C</td>').join('')+'</tr>'
      +row('Max temperature at actual duration','tMax',1,'°C')
      +'<tr class="matrix-group"><th colspan="'+(data.length+1)+'">DISTANCE TO LIMITS (SIGNED MARGINS)</th></tr>'
      +row('Minimum duration margin','mdMin',3,'min','margin')
      +row('Maximum duration margin','mdMax',3,'min','margin')
      +row('Minimum peak temperature margin','mtMin',1,'°C','margin')
      +row('Maximum temperature margin','mtMax',1,'°C','margin')
      +'<tr class="matrix-group"><th colspan="'+(data.length+1)+'">RULE EVALUATION</th></tr>'
      +'<tr><th>Violated rules</th>'+data.map(v=>'<td>'+(v.violations.length?esc(v.violations.map(x=>x.split(' — ')[0]).join(', ')):'—')+'</td>').join('')+'</tr>'
      +'<tr class="status-row"><th>Final status</th>'+data.map(v=>'<td>'+tag(v.status)+'</td>').join('')+'</tr>'
      +'</tbody></table></div>';
  }
  function renderAnalysis(r,stage){
    if(stage!=='ed'){
      return '<div class="no-analysis"><span class="pending-flag">NOT CONFIGURED</span><h2>No validated baking window for this oven</h2><p>The ED reference is never applied to another process. Configure the manufacturer-approved polygon before enabling pass/fail decisions here.</p></div>';
    }
    if(!r){
      return '<div class="no-analysis"><h2>Ready to evaluate ED curing.</h2><p>Upload an Elcometer Excel workbook in <strong>Upload & File Management</strong>, then return here. Your temperature channels will be evaluated automatically against the selected green baking window.</p>'+preview()+'<button type="button" class="primary-action" data-section="upload">Upload a workbook →</button></div>';
    }
    const results=evaluate(r);
    const pass=results.filter(v=>v.status==='PASS').length,fail=results.filter(v=>v.status==='FAIL').length,invalid=results.filter(v=>v.status==='INVALID DATA').length;
    const overall=invalid?'INVALID DATA':fail?'FAIL':results.length?'PASS':'NO DATA';
    let cards=results.map(v=>'<article class="probe-card '+(v.status==='PASS'?'good':'bad')+'"><div class="probe-head"><h3>'+esc(v.ch)+'</h3>'+tag(v.status)+'</div>'
      +'<p class="probe-location">'+esc(v.label)+'</p>'
      +'<div class="probe-numbers"><span><small>Time ≥165°C</small><b>'+fmt(v.D)+' <em>min</em></b></span><span><small>Peak temperature</small><b>'+fmt(v.T,1)+' <em>°C</em></b></span></div>'
      +'<div class="probe-margins"><span>Min time margin <b class="'+(v.mdMin<0?'negative':'')+'">'+signed(v.mdMin,3,'min')+'</b></span>'
      +'<span>Max time margin <b>'+signed(v.mdMax,3,'min')+'</b></span>'
      +'<span>Min temp margin <b>'+signed(v.mtMin,1,'°C')+'</b></span>'
      +'<span>Max temp margin <b>'+signed(v.mtMax,1,'°C')+'</b></span></div>'
      +'<div class="probe-reason">'+(v.violations.length?esc(v.violations.join('; ')):'All baking window rules satisfied')+'</div></article>').join('');
    return '<div class="analysis-titlebar"><div><span class="eyebrow">ENGINEERING VALIDATION / ED OVEN</span><h2>Baking Window Evaluation</h2><p>Time above 165°C is calculated from timestamped readings using linear interpolation.</p></div>'+tag(overall)+'</div>'
      +'<div class="eval-stats"><div><small>Total probes</small><strong>'+results.length+'</strong></div><div><small>Passed</small><strong class="text-green">'+pass+'</strong></div><div><small>Failed</small><strong class="text-red">'+fail+'</strong></div><div><small>Invalid</small><strong>'+invalid+'</strong></div></div>'
      +'<div class="window-analysis-plot"><h3>ED Baking Window — Measured Channel Points</h3>'+svgChart(results.map(v=>({ch:v.ch,d:v.D,t:v.T,status:v.status})))
      +'<p class="window-legend"><span>Each channel has a unique marker color. Label positions are offset only for readability.</span><span>Measured values always remain at their true coordinates.</span></p></div>'
      +'<div class="analysis-table-title"><h3>Channel Comparison Matrix</h3><p>Dependent limits change with the measured point. N/A indicates an out-of-domain calculation, not a pass.</p></div>'
      +summaryRows(results)
      +'<div class="probe-grid">'+cards+'</div>'
      +'<div class="rule-explanation"><strong>Rule logic</strong><span>R01: D &lt; 15 min</span><span>R02: D &gt; 35.5 min</span><span>R03: Peak &lt; 165°C</span><span>R04: Peak &gt; 200°C</span><span>R05: 28D + 13.5T &gt; 3316</span><span>R07: Invalid or missing data</span></div>'
      +'<p class="evaluation-disclaimer">Geometric window compliance is not the instrument’s Cure Pass/Fail calculation. Manufacturer-approved tolerances, temperature sensor placement and coating requirements govern final quality release. All values refer to the selected workbook, not to simulated data.</p>';
  }
  function evaluationForExport(){
    const r=core()?.getRecord();if(core()?.getStage()!=='ed'||!r)return null;
    const data=evaluate(r);
    return {window:WINDOW.name,headers:['Parameter',...data.map(x=>x.ch)],rows:[
      ['Time above 165C (min)',...data.map(x=>x.D)],
      ['Peak temperature (C)',...data.map(x=>x.T)],
      ['Min duration (min)',...data.map(()=>15)],
      ['Max duration at peak (min)',...data.map(x=>x.dMax)],
      ['Min peak temperature (C)',...data.map(()=>165)],
      ['Max temperature at duration (C)',...data.map(x=>x.tMax)],
      ['Min duration margin (min)',...data.map(x=>x.mdMin)],
      ['Max duration margin (min)',...data.map(x=>x.mdMax)],
      ['Min temperature margin (C)',...data.map(x=>x.mtMin)],
      ['Max temperature margin (C)',...data.map(x=>x.mtMax)],
      ['Violated rules',...data.map(x=>x.violations.join('; '))],
      ['Final status',...data.map(x=>x.status)]
    ]};
  }
  function refresh(){
    if(!document.body.classList.contains('bamco-entered'))return;
    const layout=document.querySelector('.stage-layout');
    if(!layout)return;
    let nav=layout.querySelector('.workspace-nav');
    if(!nav){nav=document.createElement('div');nav.className='workspace-nav-slot';layout.insertBefore(nav,layout.firstChild);}
    nav.innerHTML=navHTML();
    const main=document.getElementById('chart-panel'),r=core().getRecord();
    if(!main)return;
    if(!main.querySelector('.bamco-views')){
      const children=Array.from(main.children);
      const holder=document.createElement('div');holder.className='bamco-views';
      const top=document.createElement('div');top.className='view-intro';
      const charts=document.createElement('section');charts.className='view-charts';
      const info=document.createElement('section');info.className='view-information';
      const analysis=document.createElement('section');analysis.className='view-analysis';
      const comparison=document.createElement('section');comparison.className='view-comparison';
      let afterTitle=false;
      children.forEach(el=>{
        if(el.classList.contains('chart-heading')||el.classList.contains('metrics')||el.classList.contains('import-errors'))top.appendChild(el);
        else if(el.classList.contains('section-title')){afterTitle=true;info.appendChild(el);}
        else if(afterTitle)info.appendChild(el);
        else charts.appendChild(el);
      });
      if(!r){
        info.innerHTML='<div class="no-analysis"><h2>No worksheet loaded yet</h2><p>Choose Upload & File Management to add a workbook.</p></div>';
      }
      analysis.innerHTML=renderAnalysis(r,core().getStage());
      holder.append(top,charts,info,analysis,comparison);main.appendChild(holder);
    }else{
      const analysis=main.querySelector('.view-analysis');
      if(analysis)analysis.innerHTML=renderAnalysis(r,core().getStage());
    }
    window.BAMCOCompare?.mount?.();
    switchSection(activeSection);
  }
  function init(){
    gateway=document.createElement('div');gateway.id='bamco-gateway';document.body.insertBefore(gateway,document.body.firstChild);
    renderGate();
    document.addEventListener('click',function(e){
      const b=e.target.closest('button');if(!b)return;
      if(b.dataset.oven){choice=b.dataset.oven;step=2;renderGate();}
      else if(b.hasAttribute('data-go-back')){step=1;renderGate();}
      else if(b.hasAttribute('data-enter'))enter();
      else if(b.hasAttribute('data-change-oven'))openGate();
      else if(b.dataset.section)switchSection(b.dataset.section);
    });
    refresh();
  }
  window.BAMCOEnhance={refresh,evaluate,evaluationForExport};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
