import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// 🔹 COLOQUE SUA CONFIGURAÇÃO DO FIREBASE AQUI
const firebaseConfig = {
  apiKey: "AIzaSyCw7snkgmvB3eM2wWP6nuoMMamNLytkllM",
  authDomain: "nexart-b046c.firebaseapp.com",
  projectId: "nexart-b046c",
  storageBucket: "nexart-b046c.firebasestorage.app",
  messagingSenderId: "228586482415",
  appId: "1:228586482415:web:3c49d7db357b057452091a",
  measurementId: "G-N6186P4B92"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Campos dinâmicos
const camposExtras = document.getElementById('camposExtras');
const artista = document.getElementById('artista');
const contratante = document.getElementById('contratante');

function atualizarCampos() {
  if (artista.checked) {
    camposExtras.innerHTML = `
      <div class="mb-3">
        <label class="form-label">Nome artístico</label>
        <input type="text" class="form-control" name="nomeArtistico">
      </div>
      <div class="mb-3">
        <label class="form-label">Área de atuação</label>
        <select class="form-select" name="areaAtuacao">
          <option value="">Selecione...</option>
          <option value="ilustracao">Ilustração</option>
          <option value="fotografia">Fotografia</option>
          <option value="design-grafico">Design Gráfico</option>
          <option value="arte-3d">Arte 3D</option>
          <option value="musica">Música</option>
          <option value="pintura">Pintura</option>
          <option value="escultura">Escultura</option>
        </select>
      </div>
    `;
  } else {
    camposExtras.innerHTML = `
      <div class="mb-3">
        <label class="form-label">Nome da empresa</label>
        <input type="text" class="form-control" name="empresa">
      </div>
      <div class="mb-3">
        <label class="form-label">Segmento</label>
        <input type="text" class="form-control" name="segmento">
      </div>
    `;
  }
}
artista.addEventListener('change', atualizarCampos);
contratante.addEventListener('change', atualizarCampos);
atualizarCampos();

// Elementos principais
const formCadastro = document.getElementById('formCadastro');
const feedback = document.createElement('div');
feedback.id = "feedback";
feedback.className = "alert d-none p-2 mt-2";
formCadastro.appendChild(feedback);

const btnCadastrar = document.getElementById('formCadastrar');
const btnHeader = document.getElementById('btn-header');

function validarCampos() {
  const nome = formCadastro.nome.value.trim();
  const email = formCadastro.email.value.trim();
  const senha = formCadastro.senha.value;
  let valido = nome && email && senha;

  if (artista.checked) {
    valido = valido && formCadastro.nomeArtistico?.value.trim() && formCadastro.areaAtuacao?.value;
  } else {
    valido = valido && formCadastro.empresa?.value.trim() && formCadastro.segmento?.value.trim();
  }
  return valido;
}

formCadastro.addEventListener('input', () => {
  btnCadastrar.disabled = !validarCampos();
});

btnCadastrar.addEventListener('click', (e) => {
  if (validarCampos()) {
    if (btnHeader) btnHeader.remove();
    window.location.href = "index.html";
  }
});
btnCadastrar.disabled = true;
// ajustar, para tirar a selecaao q escolher a area de atuação ou segmento
function showFeedback(message, type = "error") {
  feedback.textContent = message;
  feedback.className = `alert ${type}`;
  feedback.classList.remove("d-none");
}

formCadastro.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = formCadastro.nome.value.trim();
  const email = formCadastro.email.value.trim();
  const senha = formCadastro.senha.value;
  const tipoUsuario = artista.checked ? "artista" : "contratante";

  let extraData = {};
  if (tipoUsuario === "artista") {
    extraData = {
      nomeArtistico: formCadastro.nomeArtistico?.value || "",
      areaAtuacao: formCadastro.areaAtuacao?.value || ""
    };
  } else {
    extraData = {
      empresa: formCadastro.empresa?.value || "",
      segmento: formCadastro.segmento?.value || ""
    };
  }

  try {
    // Criar conta no Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;

    // Salvar dados no Firestore
    await setDoc(doc(db, "usuarios", user.uid), {
      uid: user.uid,
      nome,
      email,
      tipoUsuario,
      ...extraData,
      criadoEm: new Date().toISOString()
    });

    showFeedback("Conta criada com sucesso! Redirecionando...", "success");
    setTimeout(() => window.location.href = "dashboard.html", 1500);

  } catch (err) {
    showFeedback(err.message);
  }
});
