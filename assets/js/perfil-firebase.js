// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCw7snkgmvB3eM2wWP6nuoMMamNLytkllM",
    authDomain: "nexart-b046c.firebaseapp.com",
    projectId: "nexart-b046c",
    storageBucket: "nexart-b046c.appspot.com",
    messagingSenderId: "228586482415",
    appId: "1:228586482415:web:3c49d7db357b057452091a",
    measurementId: "G-N6186P4B92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// DOM elements
const cover = document.getElementById("cover");
const btnEdit = document.getElementById("btnEdit");
const editor = document.getElementById("editor");
const closeEditor = document.getElementById("closeEditor");
const cancelEdit = document.getElementById("cancelEdit");
const form = document.getElementById("profileForm");
const toast = document.getElementById("toast");
const avatar = document.getElementById("avatar");
const badgeType = document.getElementById("badgeType");
const displayName = document.getElementById("displayName");
const bio = document.getElementById("bio");
const locationEl = document.getElementById("location");
const websiteEl = document.getElementById("website");
const followersCount = document.getElementById("followersCount");
const followingCount = document.getElementById("followingCount");
const likesCount = document.getElementById("likesCount");
const worksGrid = document.getElementById("worksGrid");

// Editor inputs
const inpDisplayName = document.getElementById("inpDisplayName");
const inpTipoUsuario = document.getElementById("inpTipoUsuario");
const inpBio = document.getElementById("inpBio");
const inpLocation = document.getElementById("inpLocation");
const inpWebsite = document.getElementById("inpWebsite");
const inpInstagram = document.getElementById("inpInstagram");
const inpBehance = document.getElementById("inpBehance");
const inpDribbble = document.getElementById("inpDribbble");
const inpFollowers = document.getElementById("inpFollowers");
const inpFollowing = document.getElementById("inpFollowing");
const inpLikes = document.getElementById("inpLikes");
const fileAvatar = document.getElementById("fileAvatar");
const fileBanner = document.getElementById("fileBanner");
const previewAvatar = document.getElementById("previewAvatar");
const previewBanner = document.getElementById("previewBanner");

// Helpers
const showToast = (m) => {
    toast.textContent = m;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2200);
};

const getInitials = (name = "") => {
    const p = name.trim().split(/\s+/).filter(Boolean);
    if (!p.length) return "NX";
    const first = (p[0][0] || "").toUpperCase();
    const last = (p[p.length - 1][0] || "").toUpperCase();
    return (first + (p.length > 1 ? last : "")).slice(0, 2);
};

const setAvatar = (url, name) => {
    if (url) {
        avatar.style.background = "none";
        avatar.innerHTML = `<img alt="Avatar" src="${url}">`;
    } else {
        avatar.innerHTML = `<span id="avatarInit">${getInitials(name)}</span>`;
        avatar.style.background = "radial-gradient(120px 120px at 30% 30%, rgba(255,255,255,.18), transparent 40%), linear-gradient(145deg, var(--azul-escuro), var(--azul-medio))";
    }
};

const setBanner = (url) => {
    if (url) {
        cover.style.background = `center/cover no-repeat url("${url}")`;
    } else {
        cover.style.background = "radial-gradient(1200px 460px at 60% -40%, rgba(92,169,244,.30), transparent 55%), linear-gradient(135deg, var(--azul-medio), var(--azul-claro))";
    }
};

const uploadIfAny = async (file, path) => {
    if (!file) return null;
    const r = ref(storage, path);
    await uploadBytes(r, file);
    return await getDownloadURL(r);
};

// Render works
function renderWorks(works = []) {
    worksGrid.innerHTML = "";
    const items = works.length
        ? works
        : [
                { title: "Projeto 1", likes: 128 },
                { title: "Projeto 2", likes: 256 },
                { title: "Projeto 3", likes: 89 },
                { title: "Projeto 4", likes: 64 },
                { title: "Projeto 5", likes: 145 },
                { title: "Projeto 6", likes: 72 }
            ];
    items.forEach((w, i) => {
        const card = document.createElement("article");
        card.className = "card";
        card.innerHTML = `
            <div class="thumb" style="
                background: radial-gradient(420px 220px at ${20 + i * 5}% ${15 + i * 7}%, rgba(92,169,244,.35), transparent 60%),
                linear-gradient(135deg, var(--azul-escuro), var(--azul-medio));
            "></div>
            <div class="body">
                <span class="title">${w.title}</span>
                <span class="pill">❤ ${w.likes ?? 0}</span>
            </div>
        `;
        worksGrid.appendChild(card);
    });
}

// Fill UI
function fillUI(data = {}) {
    const {
        displayName: name = "",
        tipoUsuario = "artista",
        bio: bioText = "Escreva uma breve bio sobre você.",
        location = "—",
        website = "",
        avatarUrl = "",
        bannerUrl = "",
        followersCount: f1 = 0,
        followingCount: f2 = 0,
        likesCount: f3 = 0,
        works = []
    } = data;
    setBanner(bannerUrl);
    setAvatar(avatarUrl, name);
    badgeType.textContent = tipoUsuario === "artista" ? "ART" : "BIZ";
    displayName.textContent = name || "Seu nome";
    bio.textContent = bioText;
    locationEl.textContent = location || "—";
    if (website) {
        websiteEl.href = website;
        websiteEl.textContent = website.replace(/^https?:\/\//, "");
    } else {
        websiteEl.removeAttribute("href");
        websiteEl.textContent = "Website";
    }
    followersCount.textContent = f1;
    followingCount.textContent = f2;
    likesCount.textContent = f3;
    inpDisplayName.value = name;
    inpTipoUsuario.value = tipoUsuario;
    inpBio.value = bioText;
    inpLocation.value = location;
    inpWebsite.value = website;
    inpFollowers.value = f1;
    inpFollowing.value = f2;
    inpLikes.value = f3;
    previewAvatar.style.backgroundImage = avatarUrl ? `url("${avatarUrl}")` : "none";
    previewBanner.style.backgroundImage = bannerUrl ? `url("${bannerUrl}")` : "none";
    previewAvatar.style.backgroundSize = "cover";
    previewBanner.style.backgroundSize = "cover";
    renderWorks(works);
}

// Editor open/close
btnEdit.addEventListener("click", () => {
    editor.classList.add("show");
    editor.setAttribute("aria-hidden", "false");
});
closeEditor.addEventListener("click", () => {
    editor.classList.remove("show");
    editor.setAttribute("aria-hidden", "true");
});
cancelEdit.addEventListener("click", () => {
    editor.classList.remove("show");
    editor.setAttribute("aria-hidden", "true");
});

// Previews
fileAvatar.addEventListener("change", (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    previewAvatar.style.backgroundImage = `url("${URL.createObjectURL(f)}")`;
    previewAvatar.style.backgroundSize = "cover";
});
fileBanner.addEventListener("change", (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    previewBanner.style.backgroundImage = `url("${URL.createObjectURL(f)}")`;
    previewBanner.style.backgroundSize = "cover";
});

// Auth / Load
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "login.html";
        return;
    }
    const userRef = doc(db, "usuarios", user.uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
        await setDoc(userRef, {
            createdAt: Date.now(),
            displayName: user.displayName || "",
            tipoUsuario: "artista",
            bio: "",
            avatarUrl: "",
            bannerUrl: "",
            followersCount: 0,
            followingCount: 0,
            likesCount: 0,
            dadosCompletos: false
        });
    }
    const data = (await getDoc(userRef)).data();
    fillUI(data);

    // Save changes
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const payload = {
            displayName: inpDisplayName.value.trim(),
            tipoUsuario: inpTipoUsuario.value,
            bio: inpBio.value.trim(),
            location: inpLocation.value.trim(),
            website: inpWebsite.value.trim(),
            instagram: inpInstagram?.value?.trim() || "",
            behance: inpBehance?.value?.trim() || "",
            dribbble: inpDribbble?.value?.trim() || "",
            followersCount: Number(inpFollowers.value || 0),
            followingCount: Number(inpFollowing.value || 0),
            likesCount: Number(inpLikes.value || 0),
            dadosCompletos: true,
            updatedAt: Date.now()
        };
        const [avatarURL, bannerURL] = await Promise.all([
            uploadIfAny(fileAvatar.files?.[0], `users/${user.uid}/avatar.jpg`),
            uploadIfAny(fileBanner.files?.[0], `users/${user.uid}/banner.jpg`)
        ]);
        if (avatarURL) payload.avatarUrl = avatarURL;
        if (bannerURL) payload.bannerUrl = bannerURL;
        try {
            await updateDoc(userRef, payload);
            const fresh = (await getDoc(userRef)).data();
            fillUI(fresh);
            editor.classList.remove("show");
            showToast("Perfil atualizado com sucesso!");
        } catch (err) {
            console.error(err);
            showToast("Erro ao salvar. Verifique os campos e tente novamente.");
        }
    });
});