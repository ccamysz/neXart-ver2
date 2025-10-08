const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

/* ========= DADOS ========= */
const artistas = [
  { nome: 'Camila Lopes',  profissao: 'ilustradora', estrelas: 4, foto:'https://randomuser.me/api/portraits/women/44.jpg' },
  { nome: 'João Martins',  profissao: 'designer',     estrelas: 5, foto:'https://randomuser.me/api/portraits/men/32.jpg' },
  { nome: 'Renata Silva',  profissao: 'fotógrafa',    estrelas: 4, foto:'https://randomuser.me/api/portraits/women/65.jpg' },
  { nome: 'Lucas Dias',    profissao: 'artista 3d',   estrelas: 5, foto:'https://randomuser.me/api/portraits/men/55.jpg' },
  { nome: 'Bianca Rocha',  profissao: 'ilustradora',  estrelas: 3, foto:'https://randomuser.me/api/portraits/women/52.jpg' },
  { nome: 'Diego Castro',  profissao: 'pintor',       estrelas: 4, foto:'https://randomuser.me/api/portraits/men/45.jpg' },
  { nome: 'Sofia Nunes',   profissao: 'designer',     estrelas: 5, foto:'https://randomuser.me/api/portraits/women/81.jpg' },
  { nome: 'Mateus Lima',   profissao: 'cartunista',   estrelas: 4, foto:'https://randomuser.me/api/portraits/men/23.jpg' },
  { nome: 'Amanda Souza',  profissao: 'fotógrafa',    estrelas: 5, foto:'https://randomuser.me/api/portraits/women/36.jpg' },
  { nome: 'Rafael Mota',   profissao: 'desenhista',   estrelas: 4, foto:'https://randomuser.me/api/portraits/men/17.jpg' },
  { nome: 'Marina Gomes',  profissao: 'lettering',    estrelas: 4, foto:'https://randomuser.me/api/portraits/women/91.jpg' },
  { nome: 'Vinicius Prado',profissao: 'motion',       estrelas: 5, foto:'https://randomuser.me/api/portraits/men/88.jpg' },
  { nome: 'Aline Teixeira',profissao: 'designer',     estrelas: 3, foto:'https://randomuser.me/api/portraits/women/29.jpg' },
  { nome: 'Pedro Leal',    profissao: 'pintor',       estrelas: 4, foto:'https://randomuser.me/api/portraits/men/14.jpg' },
  { nome: 'Juliana Cardoso',profissao:'colorista',    estrelas: 5, foto:'https://randomuser.me/api/portraits/women/73.jpg' },
];

/* ========= CONTROLES ========= */
const container     = document.getElementById('cardsContainer');
const btnVerMais    = document.getElementById('btnVerMais');
const selectFiltro  = document.getElementById('selectFiltro');
const inputBusca    = document.getElementById('inputBusca');
const btnBusca      = document.getElementById('btnBusca');
const selectEstrelas = document.getElementById('selectEstrelas');
const selectOrdem = document.getElementById('selectOrdem');


let pagina = 0;
const porPagina = 15; // 5 linhas * 3 colunas
let listaAtual = [...artistas]; // lista filtrada+buscada

/* ========= FUNÇÕES ========= */
function estrelasHTML(n){
  return '⭐'.repeat(n) + '☆'.repeat(5-n);
}

function criarCard(a){
  const card = document.createElement('div');
  card.className = 'card-artista';
  card.innerHTML = `
    <img src="${a.foto}" alt="${a.nome}">
    <h3>${a.nome}</h3>
    <p>${a.profissao.charAt(0).toUpperCase()+a.profissao.slice(1)}</p>
    <div class="estrelas">${estrelasHTML(a.estrelas)}</div>
    <button class="btn-detalhes">Detalhes</button>
  `;

  // Ao clicar em "Detalhes", salva o artista no localStorage e vai para a página do perfil
  card.querySelector('.btn-detalhes').addEventListener('click', () => {
    localStorage.setItem('artistaSelecionado', JSON.stringify(a));
    window.location.href = 'perfil-artista.html';
  });

  return card;
}


function renderPagina(){
  const ini = pagina*porPagina;
  const fim = ini + porPagina;
  const grupo = listaAtual.slice(ini,fim);
  grupo.forEach(a=>container.appendChild(criarCard(a)));
  pagina++;
  if(pagina*porPagina >= listaAtual.length){
    btnVerMais.style.display='none';
  }else{
    btnVerMais.style.display='inline-block';
  }
}

function resetEFiltrar() {
  const termoFiltro = selectFiltro.value;
  const termoBusca = inputBusca.value.trim().toLowerCase();
  const estrelasMin = parseInt(selectEstrelas.value);
  const tipoOrdem = selectOrdem.value;

  listaAtual = artistas.filter(a => {
    const profOk = termoFiltro === 'todos' || a.profissao.includes(termoFiltro);
    const buscaOk =
      a.nome.toLowerCase().includes(termoBusca) ||
      a.profissao.toLowerCase().includes(termoBusca);
    const estrelasOk = a.estrelas >= estrelasMin;
    return profOk && buscaOk && estrelasOk;
  });

  // Ordenação
  if (tipoOrdem === 'az') {
    listaAtual.sort((a, b) => a.nome.localeCompare(b.nome));
  } else if (tipoOrdem === 'za') {
    listaAtual.sort((a, b) => b.nome.localeCompare(a.nome));
  }

  // Resetar grid
  container.innerHTML = '';
  pagina = 0;
  renderPagina();
}


/* ========= EVENTOS ========= */
btnVerMais.addEventListener('click',renderPagina);
selectFiltro.addEventListener('change',resetEFiltrar);
btnBusca.addEventListener('click',resetEFiltrar);
inputBusca.addEventListener('keyup', e=>{ if(e.key==='Enter') resetEFiltrar(); });
selectEstrelas.addEventListener('change', resetEFiltrar);
selectOrdem.addEventListener('change', resetEFiltrar);

/* ========= INICIAL ========= */
resetEFiltrar();
