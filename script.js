const screens=[...document.querySelectorAll('.screen')];
const toast=document.getElementById('toast');
const show=(id)=>{screens.forEach(s=>s.classList.toggle('active',s.id===id));window.scrollTo(0,0);document.getElementById('sideMenu').classList.remove('open');document.querySelectorAll('.bottom-nav button').forEach(b=>b.classList.toggle('nav-active',b.dataset.go===id));};
const notify=(msg)=>{toast.textContent=msg;toast.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>toast.classList.remove('show'),2600)};
document.addEventListener('click',e=>{const go=e.target.closest('[data-go]');if(go)show(go.dataset.go)});

document.getElementById('menuBtn').onclick=()=>document.getElementById('sideMenu').classList.add('open');
document.getElementById('closeMenu').onclick=()=>document.getElementById('sideMenu').classList.remove('open');

const bagItems=[
 ['💧','Agua segura','Reserva para hidratación.'],['🥫','Alimentos no perecibles','Alimentos de fácil conservación.'],['🔦','Linterna','Útil ante cortes de energía.'],['🔋','Pilas de repuesto','Guárdalas secas y protegidas.'],['🩹','Botiquín','Elementos básicos de primeros auxilios.'],['📻','Radio','Para recibir información si falla internet.'],['📱','Cargador o batería','Mantén comunicación.'],['🪪','Documentos','Protege copias importantes.'],['🧼','Higiene personal','Elementos básicos de higiene.'],['🧥','Ropa de abrigo','Una muda seca y adecuada.']
];
const bagList=document.getElementById('bagList');
bagItems.forEach((it,i)=>{const key='bag_'+i;const checked=localStorage.getItem(key)==='1';const row=document.createElement('label');row.className='check-item';row.innerHTML=`<input type="checkbox" ${checked?'checked':''} data-bag="${i}"><span style="font-size:23px">${it[0]}</span><div><b>${it[1]}</b><small>${it[2]}</small></div>`;bagList.appendChild(row)});
function updateBag(){const boxes=[...document.querySelectorAll('[data-bag]')];const n=boxes.filter(x=>x.checked).length;const p=Math.round(n/boxes.length*100);document.getElementById('bagCount').textContent=`${n}/${boxes.length}`;document.getElementById('bagPercent').textContent=p+'%';document.querySelector('.circle-progress').style.setProperty('--progress',p+'%');boxes.forEach(x=>localStorage.setItem('bag_'+x.dataset.bag,x.checked?'1':'0'));}
bagList.addEventListener('change',updateBag);updateBag();

const guide={before:{title:'ANTES',emoji:'🟢',intro:'Prepárate con anticipación para reducir riesgos.',items:['Identifica las zonas seguras y las rutas de evacuación de tu sector.','Prepara y revisa tu mochila de emergencia.','Protege documentos y objetos importantes.','Mantente atento a información y alertas de fuentes oficiales.','Acuerda con tu familia un punto de encuentro.']},during:{title:'DURANTE',emoji:'🟠',intro:'Actúa con calma y sigue las indicaciones oficiales.',items:['Conserva la calma y ayuda a niños, adultos mayores y personas que necesiten apoyo.','Aléjate de ríos, quebradas y zonas con peligro de inundación o deslizamiento.','No intentes cruzar corrientes de agua.','Dirígete a una zona segura siguiendo las rutas establecidas.','Sigue los comunicados de las autoridades y evita difundir rumores.']},after:{title:'DESPUÉS',emoji:'🔵',intro:'Cuando pase el peligro, continúa actuando con precaución.',items:['Verifica el estado de tu familia y comunica que estás a salvo.','Evita regresar a zonas afectadas hasta recibir indicaciones.','No toques cables o instalaciones dañadas.','Informa de situaciones de peligro a las autoridades correspondientes.','Revisa tu vivienda con precaución antes de ingresar.']}};
function renderGuide(type='before'){const g=guide[type];document.getElementById('guideContent').innerHTML=`<article class="guide-card"><div style="font-size:32px">${g.emoji}</div><h2>${g.title}</h2><p>${g.intro}</p><div class="guide-list">${g.items.map((x,i)=>`<div class="guide-item"><b>${i+1}</b><span>${x}</span></div>`).join('')}</div></article>`}
renderGuide();document.querySelectorAll('.tab').forEach(t=>t.onclick=()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));t.classList.add('active');renderGuide(t.dataset.tab)});

const places=[
 {name:'Punto seguro demostrativo A',desc:'Zona de referencia • reemplazar con fuente oficial',type:'safe',x:28,y:64,icon:'✓'},
 {name:'Zona de precaución demostrativa',desc:'Riesgo de referencia • reemplazar con fuente oficial',type:'risk',x:62,y:40,icon:'!'},
 {name:'Centro de ayuda demostrativo',desc:'Punto de referencia • reemplazar con fuente oficial',type:'help',x:72,y:72,icon:'+'},
 {name:'Punto seguro demostrativo B',desc:'Zona de referencia • reemplazar con fuente oficial',type:'safe',x:45,y:25,icon:'✓'}
];
const mapCanvas=document.getElementById('mapCanvas'), placeList=document.getElementById('placeList');
function renderMap(filter='all'){mapCanvas.querySelectorAll('.marker').forEach(m=>m.remove());placeList.innerHTML='';places.filter(p=>filter==='all'||p.type===filter).forEach(p=>{const m=document.createElement('button');m.className='marker '+p.type;m.style.left=p.x+'%';m.style.top=p.y+'%';m.innerHTML=`<span>${p.icon}</span>`;m.title=p.name;m.onclick=()=>notify(p.name);mapCanvas.appendChild(m);const row=document.createElement('div');row.className='place-row';row.innerHTML=`<span class="place-dot ${p.type}"></span><div><b>${p.name}</b><small>${p.desc}</small></div>`;placeList.appendChild(row)});}
renderMap();document.querySelectorAll('.map-filter').forEach(b=>b.onclick=()=>{document.querySelectorAll('.map-filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderMap(b.dataset.filter)});
document.getElementById('locateBtn').onclick=()=>{if(!navigator.geolocation){notify('Tu navegador no permite ubicación.');return}navigator.geolocation.getCurrentPosition(()=>notify('Ubicación obtenida. En el prototipo no se almacena.'),()=>notify('No se pudo obtener la ubicación. Revisa el permiso del navegador.'))};

const alerts=[['high','🔴 ALERTA DE LLUVIAS','Información demostrativa: revisa los comunicados oficiales para conocer las condiciones reales.','Hoy • 10:24 a. m.'],['medium','🟠 Riesgo de inundaciones','Referencia demostrativa para Trujillo. Verifica las zonas oficiales antes de desplazarte.','Hoy • 09:15 a. m.'],['low','🟢 Información preventiva','Recuerda mantener lista tu mochila y conocer tus rutas de evacuación.','Hoy • 08:10 a. m.']];
function renderAlerts(){document.getElementById('alertList').innerHTML=alerts.map(a=>`<article class="alert-box ${a[0]}"><h3>${a[1]}</h3><p>${a[2]}</p><small>${a[3]}</small></article>`).join('')};renderAlerts();document.getElementById('clearAlerts').onclick=()=>notify('Centro de alertas revisado.');

const advice={Inundación:'Aléjate de corrientes de agua y zonas inundadas. Dirígete a un lugar seguro siguiendo las indicaciones oficiales.', 'Lluvia intensa':'Permanece en un lugar seguro, evita zonas de riesgo y sigue información oficial.',Huaico:'Aléjate de quebradas y laderas inestables. Sigue las rutas y órdenes de evacuación oficiales.','Otra emergencia':'Mantén la calma, busca un lugar seguro y contacta al servicio de emergencia correspondiente.'};
document.querySelectorAll('[data-emergency]').forEach(b=>b.onclick=()=>{const type=b.dataset.emergency;const box=document.getElementById('emergencyAdvice');box.classList.remove('hidden');box.innerHTML=`<b>${type}</b><p>${advice[type]}</p><small>Información general de prevención. En una emergencia real, sigue a las autoridades.</small>`});

document.querySelectorAll('[data-toggle]').forEach(s=>s.onclick=()=>s.classList.toggle('on'));
document.getElementById('darkToggle').onclick=e=>{document.body.classList.toggle('dark');e.currentTarget.classList.toggle('on');localStorage.setItem('dark',document.body.classList.contains('dark')?'1':'0')};
if(localStorage.getItem('dark')==='1'){document.body.classList.add('dark');document.getElementById('darkToggle').classList.add('on')}

show('intro');
