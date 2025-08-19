const contacts = [
  {
    id: 'ana',
    name: 'Ana Clara',
    avatar: 'https://i.pravatar.cc/150?img=47',
    last: 'Perfeito! Envio mockup ainda hoje.',
    unread: 2
  },
  {
    id: 'lucas',
    name: 'Lucas Andrade',
    avatar: 'https://i.pravatar.cc/150?img=12',
    last: 'Consigo por R$ 180 se for pix.',
    unread: 0
  },
  {
    id: 'mariana',
    name: 'Mariana Torres',
    avatar: 'https://i.pravatar.cc/150?img=32',
    last: 'Fechado! Te mando o local.',
    unread: 1
  },
  {
    id: 'studio',
    name: 'Studio Aurora',
    avatar: 'https://i.pravatar.cc/150?img=5',
    last: 'Contrato assinado ✔️',
    unread: 0
  }
];

// cada mensagem pode ter: {type:'sent'|'received', text?, image?, location?{lat,lng,label,url}, quote?}
const conversations = {
  ana: [
    {type:'received', text:'Oi! Você consegue uma arte de capa para evento no Instagram com o tema neon/tech?', time:'09:12'},
    {type:'sent', text:'Consigo sim! Qual tamanho você precisa? 1080x1350?', time:'09:15'},
    {type:'received', text:'Isso! E queria algo nessa vibe:', time:'09:18'},
    {type:'received', image:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop', time:'09:18'},
    {type:'sent', quote:'Briefing: tema neon/tech, tipografia futurista, CTA "Inscreva-se". Entregar hoje até 19h.', text:'Perfeito! Envio mockup ainda hoje. Orçamento R$ 220 (inclui 2 revisões).', time:'09:26'},
    {type:'received', text:'Fechado por R$ 200? Se eu pagar agora no pix.', time:'09:30'},
    {type:'sent', text:'Fecho por R$ 200 no pix ✅ Me manda a chave.', time:'09:33'},
    {type:'received', text:'Chave: ana@email.com. Obrigada!', time:'09:35'},
  ],
  lucas: [
    {type:'received', text:'Curti o seu poster do NeXart! Rola uma impressão A3?', time:'Ontem'},
    {type:'sent', text:'Rola sim! Impressão em couchê 250g. Sai por R$ 200.', time:'Ontem'},
    {type:'received', text:'Consigo por R$ 180 se for pix.', time:'Ontem'},
    {type:'received', image:'https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?q=80&w=1200&auto=format&fit=crop', time:'Ontem'},
    {type:'sent', text:'Fechado por R$ 180 no pix. Posso entregar amanhã às 16h no Shopping Central?', time:'Ontem'},
    {type:'received', location:{lat:-19.937, lng:-43.938, label:'Shopping Central, BH', url:'https://www.google.com/maps?q=-19.937,-43.938'}, time:'Ontem'},
    {type:'sent', text:'Perfeito, nos vemos lá!', time:'Ontem'},
  ],
  mariana: [
    {type:'received', text:'Oi! Você faz logotipo para loja de acessórios?', time:'08:02'},
    {type:'sent', text:'Faço sim! Me manda referências ✨', time:'08:05'},
    {type:'received', image:'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop', time:'08:06'},
    {type:'received', text:'Queria algo elegante com fundo claro.', time:'08:07'},
    {type:'sent', text:'Ok! Cobro R$ 650 (2 propostas + manual básico). Entrego preview até sexta.', time:'08:12'},
    {type:'received', text:'Fechado! Pode me encontrar no estúdio amanhã?', time:'08:15'},
    {type:'received', location:{lat:-19.915, lng:-43.934, label:'Parque Municipal, BH', url:'https://www.google.com/maps?q=-19.915,-43.934'}, time:'08:16'},
    {type:'sent', text:'Melhor no café ao lado do parque, 10h? ☕', time:'08:17'},
    {type:'received', text:'Feito! Até amanhã 👋', time:'08:18'},
  ],
  studio: [
    {type:'received', text:'Olá, aqui é do Studio Aurora. Seguimos com o mural para setembro.', time:'Seg'},
    {type:'sent', text:'Perfeito! Posso enviar o contrato.', time:'Seg'},
    {type:'received', image:'https://images.unsplash.com/photo-1496318447583-f524534e9ce1?q=80&w=1200&auto=format&fit=crop', time:'Seg'},
    {type:'received', text:'Referência de paleta. Valores ok.', time:'Seg'},
    {type:'sent', quote:'Mural 6x2m | Estilo abstrato | Paleta fria | Execução: 5 dias úteis | Sinal 40%', text:'Contrato assinado ✔️ Inicio 02/09.', time:'Seg'},
  ]
};

// Estado atual
let currentId = contacts[0].id;

// ------------------------------
// HELPERS
// ------------------------------
function el(tag, cls){ const e=document.createElement(tag); if(cls) e.className=cls; return e; }

function renderContactItem(c){
  const li = el('li','contact'); li.dataset.id = c.id;
  const img = el('img','avatar'); img.src = c.avatar; img.alt = c.name;
  const meta = el('div','c-meta');
  const texts = el('div','c-texts');
  const name = el('div','c-name'); name.textContent = c.name;
  const last = el('div','c-last'); last.textContent = c.last;
  texts.append(name,last);
  const right = el('div','c-right');
  const time = el('div','c-time'); time.textContent = 'agora';
  right.append(time);
  if(c.unread>0){ const b=el('span','badge'); b.textContent=c.unread; right.append(b); }
  meta.append(texts); meta.append(right);
  li.append(img, meta);
  return li;
}

function setActiveContact(id){
  currentId = id;
  // Sidebar
  document.querySelectorAll('#contactList .contact').forEach(li=>{
    li.classList.toggle('active', li.dataset.id===id);
  });
  document.querySelectorAll('#mContactList .contact').forEach(li=>{
    li.classList.toggle('active', li.dataset.id===id);
  });
  // Header
  const c = contacts.find(x=>x.id===id);
  document.getElementById('chatName').textContent = c.name;
  document.getElementById('chatAvatar').src = c.avatar;
  // Messages
  renderMessages();
}

function renderMessages(){
  const wrap = document.getElementById('messages');
  wrap.innerHTML = '';
  (conversations[currentId]||[]).forEach(msg => {
    const row = el('div', 'row '+(msg.type==='sent'?'sent':'received'));
    const bubble = el('div', 'bubble');

    if(msg.quote){
      const q = el('div','quote'); q.textContent = msg.quote; bubble.append(q);
    }

    if(msg.text){
      const p = el('p'); p.textContent = msg.text; bubble.append(p);
    }

    if(msg.image){
      const imgBox = el('div','m-image');
      const img = el('img'); img.src=msg.image; img.alt='imagem enviada';
      imgBox.append(img); bubble.append(imgBox);
    }

    if(msg.location){
      const loc = el('div','m-location');
      const t = el('div','title'); t.textContent = msg.location.label || 'Localização';
      const a = el('a'); a.href = msg.location.url; a.target = '_blank'; a.rel='noopener'; a.textContent = 'Abrir no Google Maps';
      loc.append(t,a); bubble.append(loc);
    }

    const time = el('span','time'); time.textContent = msg.time || 'agora';
    bubble.append(time);

    row.append(bubble); wrap.append(row);
  });
  wrap.scrollTop = wrap.scrollHeight;
}

function renderContactsInto(listEl){
  listEl.innerHTML = '';
  contacts.forEach(c => listEl.appendChild(renderContactItem(c)));
}

// ------------------------------
// INIT UI
// ------------------------------
renderContactsInto(document.getElementById('contactList'));
renderContactsInto(document.getElementById('mContactList'));
setActiveContact(currentId);

// Seletores
const contactList = document.getElementById('contactList');
const mContactList = document.getElementById('mContactList');
const searchInput = document.getElementById('searchInput');
const mSearchInput = document.getElementById('mSearchInput');

// Clique nos contatos
function onContactClick(e){
  const li = e.target.closest('.contact');
  if(!li) return;
  setActiveContact(li.dataset.id);
  // fechar drawer no mobile
  document.getElementById('overlay').classList.remove('show');
}
contactList.addEventListener('click', onContactClick);
mContactList.addEventListener('click', onContactClick);

// Busca
function applyFilter(q){
  const ql = q.toLowerCase();
  [contactList, mContactList].forEach(list=>{
    list.querySelectorAll('.contact').forEach(li=>{
      const name = li.querySelector('.c-name').textContent.toLowerCase();
      const last = li.querySelector('.c-last').textContent.toLowerCase();
      li.style.display = (name.includes(ql) || last.includes(ql)) ? '' : 'none';
    });
  });
}
searchInput.addEventListener('input', e=>applyFilter(e.target.value));
mSearchInput.addEventListener('input', e=>applyFilter(e.target.value));

// Overlay (mobile)
const overlay = document.getElementById('overlay');
const openContacts = document.getElementById('openContacts');
const closeContacts = document.getElementById('closeContacts');
openContacts.addEventListener('click', ()=> overlay.classList.add('show'));
closeContacts.addEventListener('click', ()=> overlay.classList.remove('show'));
overlay.addEventListener('click', (e)=>{ if(e.target===overlay) overlay.classList.remove('show'); });

// Envio de mensagens
const textInput = document.getElementById('textInput');
const btnSend = document.getElementById('btnSend');
const btnPhoto = document.getElementById('btnPhoto');
const fileInput = document.getElementById('fileInput');
const btnLocation = document.getElementById('btnLocation');

function pushMessage(msg){
  conversations[currentId] = conversations[currentId] || [];
  conversations[currentId].push(Object.assign({type:'sent', time: formatTime()}, msg));
  renderMessages();
}

function formatTime(){
  const d = new Date(); let h = d.getHours().toString().padStart(2,'0'); let m = d.getMinutes().toString().padStart(2,'0');
  return `${h}:${m}`;
}

btnSend.addEventListener('click', ()=>{
  const t = textInput.value.trim(); if(!t) return;
  pushMessage({text:t}); textInput.value='';
});
textInput.addEventListener('keydown', (e)=>{ if(e.key==='Enter'){ e.preventDefault(); btnSend.click(); }});

btnPhoto.addEventListener('click', ()=> fileInput.click());
fileInput.addEventListener('change', ()=>{
  const file = fileInput.files[0]; if(!file) return;
  const reader = new FileReader();
  reader.onload = ()=> pushMessage({image:reader.result});
  reader.readAsDataURL(file);
  fileInput.value='';
});

btnLocation.addEventListener('click', ()=>{
  if(!navigator.geolocation){ alert('Geolocalização não suportada neste dispositivo.'); return; }
  navigator.geolocation.getCurrentPosition(pos=>{
    const {latitude:lat, longitude:lng} = pos.coords;
    pushMessage({location:{lat,lng,label:'Minha localização', url:`https://www.google.com/maps?q=${lat},${lng}`}});
  }, ()=> alert('Não foi possível obter sua localização.'));
});