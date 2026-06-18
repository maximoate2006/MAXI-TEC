// Código anterior se mantiene igual
const projectsBtn = document.getElementById("projects-btn");
const projectsNotebook = document.getElementById("projects-notebook");
const reveals = document.querySelectorAll(".reveal");
const contactForm= document.querySelector('.contact-form')



if (projectsBtn && projectsNotebook) {
    projectsBtn.addEventListener("click", () => {
        projectsNotebook.classList.toggle("open");
        projectsBtn.classList.toggle("active-trigger");
    });
}

window.addEventListener("scroll", () => {
    reveals.forEach(element => {
        const top = element.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            element.classList.add("active");
        }
    });
});

function loadStaticGallery(imagesArray, folderPath, previewId) {
    const preview = document.getElementById(previewId);
    if (preview) {
        preview.innerHTML = "";
        imagesArray.forEach(imageName => {
            const img = document.createElement('img');
            img.src = `${folderPath}${imageName}`;
            img.alt = `Evidencia del proyecto: ${imageName}`;
            preview.appendChild(img);
        });
    }
}

const imagenesAtom = [
    "ATOM 1.png",
    "ATOM 2.png",
];

loadStaticGallery(imagenesAtom, "Evidencias/atom/", "atom-preview");

/* ===== NUEVO: Control del modal de Términos ===== */
const modalOverlay = document.getElementById("modalOverlay");
const openModalLink = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");

// Abrir modal
if (openModalLink && modalOverlay) {
    openModalLink.addEventListener("click", (e) => {
        e.preventDefault(); // evita el salto de página
        modalOverlay.classList.add("active");
        document.body.style.overflow = "hidden"; // evita scroll del fondo
    });
}

// Cerrar modal (con la X)
if (closeModalBtn && modalOverlay) {
    closeModalBtn.addEventListener("click", () => {
        modalOverlay.classList.remove("active");
        document.body.style.overflow = ""; // restaura scroll
    });
}

// Cerrar modal haciendo clic fuera del panel (en el overlay)
if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove("active");
            document.body.style.overflow = "";
        }
    });
}

// Cerrar con tecla ESC
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
        modalOverlay.classList.remove("active");
        document.body.style.overflow = "";
    }
});

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const email = this.querySelector('input[name="email"]').value.trim();
        const telefono = this.querySelector('input[name="telefono"]').value.trim();
        if (!email && !telefono) {
            e.preventDefault();
            alert('Por favor, proporciona al menos un email o un número de teléfono.');
        }
    });
}