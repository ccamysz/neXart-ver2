// Dados fictícios
const perfilFake = {
  displayName: "Luna Martins",
  tipoUsuario: "Artista",
  bio: "Ilustradora digital apaixonada por cores vibrantes e mundos imaginários ✨",
  location: "Belo Horizonte, MG",
  followers: 1250,
  following: 320,
  likes: 7850,
  avatarUrl: "https://i.pravatar.cc/300?img=47",
  works: [
    { title: "Montanha Silenciosa", category: "Paisagem", thumb: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg" },
    { title: "Praia ao Entardecer", category: "Paisagem", thumb: "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg" },
    { title: "Floresta Verde", category: "Natureza", thumb: "https://images.pexels.com/photos/34950/pexels-photo.jpg" },
    { title: "Cidade Moderna", category: "Urbano", thumb: "https://images.pexels.com/photos/373912/pexels-photo-373912.jpeg" },
    { title: "Lago Sereno", category: "Paisagem", thumb: "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg" },
    { title: "Montanha com Neblina", category: "Paisagem", thumb: "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg" },
    { title: "Campo Dourado", category: "Natureza", thumb: "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg" },
    { title: "Mar Calmo", category: "Natureza", thumb: "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg" },
    { title: "Pôr do Sol Urbano", category: "Cidades", thumb: "https://images.pexels.com/photos/21014/pexels-photo.jpg" },
    { title: "Deserto", category: "Paisagem", thumb: "https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg" },
    { title: "Reflexo na Água", category: "Natureza", thumb: "https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg" },
    { title: "Lagos Tranquilos", category: "Natureza", thumb: "https://images.pexels.com/photos/460621/pexels-photo-460621.jpeg" }
  ]
};


// Preenche perfil
document.getElementById("displayName").textContent = perfilFake.displayName;
document.getElementById("badgeType").textContent = perfilFake.tipoUsuario;
document.getElementById("bio").textContent = perfilFake.bio;
document.getElementById("location").textContent = perfilFake.location;
document.getElementById("followersCount").textContent = perfilFake.followers;
document.getElementById("followingCount").textContent = perfilFake.following;
document.getElementById("likesCount").textContent = perfilFake.likes;
document.getElementById("avatarImg").src = perfilFake.avatarUrl;

// Monta galeria
const worksGrid = document.getElementById("worksGrid");
perfilFake.works.forEach(work => {
  const card = document.createElement("div");
  card.classList.add("card");

  const thumb = document.createElement("div");
  thumb.classList.add("thumb");
  thumb.style.backgroundImage = `url(${work.thumb})`;
  thumb.style.backgroundSize = "cover";
  thumb.style.backgroundPosition = "center";

  const body = document.createElement("div");
  body.classList.add("body");

  const title = document.createElement("span");
  title.classList.add("title");
  title.textContent = work.title;

  const pill = document.createElement("span");
  pill.classList.add("pill");
  pill.textContent = work.category;

  body.appendChild(title);
  body.appendChild(pill);
  card.appendChild(thumb);
  card.appendChild(body);

  worksGrid.appendChild(card);
});

// Ações do editor
document.getElementById("btnEdit").addEventListener("click", () => {
  document.getElementById("editor").classList.add("show");
});
document.getElementById("closeEditor").addEventListener("click", () => {
  document.getElementById("editor").classList.remove("show");
});
document.getElementById("profileForm").addEventListener("submit", e => {
  e.preventDefault();
  perfilFake.displayName = document.getElementById("inpDisplayName").value;
  perfilFake.tipoUsuario = document.getElementById("inpTipoUsuario").value;
  perfilFake.bio = document.getElementById("inpBio").value;
  perfilFake.location = document.getElementById("inpLocation").value;

  // Atualiza na tela
  document.getElementById("displayName").textContent = perfilFake.displayName;
  document.getElementById("badgeType").textContent = perfilFake.tipoUsuario;
  document.getElementById("bio").textContent = perfilFake.bio;
  document.getElementById("location").textContent = perfilFake.location;
  document.getElementById("website").href = perfilFake.website;

  document.getElementById("editor").classList.remove("show");
});
