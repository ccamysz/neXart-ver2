import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// 🔹 COLOQUE SUA CONFIGURAÇÃO AQUI
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
const provider = new GoogleAuthProvider();

// Elementos
const formLogin = document.getElementById("formLogin");
const googleLogin = document.getElementById("googleLogin");
const forgotPassword = document.getElementById("forgotPassword");
const feedback = document.getElementById("feedback");

function showFeedback(message, type = "error") {
  feedback.textContent = message;
  feedback.className = `alert ${type}`;
  feedback.classList.remove("d-none");
}

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    showFeedback("Login realizado com sucesso! Redirecionando...", "success");
    setTimeout(() => window.location.href = "dashboard.html", 1500);
  } catch (err) {
    showFeedback(err.message);
  }
});

googleLogin.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, provider);
    showFeedback("Login com Google realizado! Redirecionando...", "success");
    setTimeout(() => window.location.href = "dashboard.html", 1500);
  } catch (err) {
    showFeedback(err.message);
  }
});

forgotPassword.addEventListener("click", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  if (!email) {
    showFeedback("Digite seu e-mail para recuperar a senha.");
    return;
  }
  try {
    await sendPasswordResetEmail(auth, email);
    showFeedback("E-mail de redefinição enviado!", "success");
  } catch (err) {
    showFeedback(err.message);
  }
});
