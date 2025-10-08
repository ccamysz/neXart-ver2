document.addEventListener("DOMContentLoaded", () => {
  const artista = JSON.parse(localStorage.getItem("artistaSelecionado"));
  const main = document.querySelector("main");

  if (!artista) {
    main.innerHTML = `
      <div style="text-align:center; padding:80px;">
        <h2>Artista não encontrado 😢</h2>
        <a href="artistas.html" style="color:#1f4fa3; text-decoration:underline;">Voltar para Artistas</a>
      </div>`;
    return;
  }

  // Elementos
  const foto = document.getElementById("fotoArtista");
  const nome = document.getElementById("nomeArtista");
  const profissao = document.getElementById("profissaoArtista");
  const estrelas = document.getElementById("estrelasArtista");
  const bio = document.getElementById("bioArtista");
  const galeria = document.getElementById("galeriaArtista");
  const btnSeguir = document.getElementById("btnSeguir");
  const contadorSeguidores = document.getElementById("contadorSeguidores");
  const btnConversar = document.getElementById("btnConversar");

  // slug para keys no localStorage (seguro)
  const slug = artista.nome.replace(/\s+/g, '_');

  // Fallback para a foto do perfil (se artista.foto não existir)
  foto.src = artista.foto || `https://picsum.photos/seed/${encodeURIComponent(slug)}-profile/400/400`;
  foto.alt = artista.nome + " - foto";

  nome.textContent = artista.nome;
  profissao.textContent = artista.profissao.charAt(0).toUpperCase() + artista.profissao.slice(1);
  estrelas.textContent = "⭐".repeat(artista.estrelas || 0) + "☆".repeat(5 - (artista.estrelas || 0));
  bio.textContent = artista.bio || `Olá! Eu sou ${artista.nome}, ${artista.profissao}. Apaixonado(a) por arte e por transformar ideias em criações únicas. Trabalho com dedicação para entregar o melhor resultado em cada projeto.`;

  // ---------- GALERIA (gerada automaticamente para TODOS os artistas) ----------
  function generatePicsumGallery(name, count = 6, w = 800, h = 500) {
    const base = encodeURIComponent(name.replace(/\s+/g, ''));
    const arr = [];
    for (let i = 1; i <= count; i++) {
      // seed único por artista + índice -> garante imagens coesas e diferentes entre artistas
      arr.push(`https://picsum.photos/seed/${base}-${i}/${w}/${h}`);
    }
    return arr;
  }

  const imagens = generatePicsumGallery(artista.nome, 6, 800, 500);
  galeria.innerHTML = '';
  imagens.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Trabalho de ${artista.nome}`;
    img.className = 'foto-galeria';
    // fallback local caso a imagem externa falhe
    img.addEventListener('error', () => {
      img.src = `https://picsum.photos/seed/fallback/${400}/${300}`;
    });
    galeria.appendChild(img);
  });

  // ---------- SEGUIR (persistente por artista) ----------
  const keySeguindo = `seguindo_${slug}`;
  const keySeguidores = `seguidores_${slug}`;

  let seguindo = localStorage.getItem(keySeguindo) === 'true';
  let seguidores = Number(localStorage.getItem(keySeguidores));
  if (!localStorage.getItem(keySeguidores)) {
    seguidores = Math.floor(Math.random() * 500) + 100; // valor inicial aleatório e plausível
    localStorage.setItem(keySeguidores, seguidores);
  }

  // atualizar UI
  contadorSeguidores.textContent = seguidores;
  btnSeguir.textContent = seguindo ? 'Seguindo' : 'Seguir';
  btnSeguir.classList.toggle('seguindo', seguindo);

  btnSeguir.addEventListener('click', () => {
    seguindo = !seguindo;
    if (seguindo) {
      seguidores++;
    } else {
      seguidores = Math.max(0, seguidores - 1);
    }
    contadorSeguidores.textContent = seguidores;
    btnSeguir.textContent = seguindo ? 'Seguindo' : 'Seguir';
    btnSeguir.classList.toggle('seguindo', seguindo);
    localStorage.setItem(keySeguindo, seguindo);
    localStorage.setItem(keySeguidores, seguidores);
  });

  // ---------- CONVERSAR (vai para chat) ----------
  btnConversar.addEventListener('click', () => {
    // salva o artista que vamos conversar e redireciona
    localStorage.setItem('artistaParaChat', JSON.stringify(artista));
    window.location.href = 'chat.html';
  });

});
