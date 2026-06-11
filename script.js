const reveals = document.querySelectorAll(".reveal");
const galleryPreviews = document.querySelectorAll(".gallery-preview");
const imageInput = document.querySelector(".image-input");
const projectsBtn = document.getElementById("projects-btn");
const projectsNotebook = document.getElementById("projects-notebook");
const reveals = document.querySelectorAll(".reveal");

if (projectsBtn && projectsNotebook) {
    projectsBtn.addEventListener("click", () => {
        projectsNotebook.classList.toggle("open");
        projectsBtn.classList.toggle("active-trigger");
    });
}

// Control de animaciones por desplazamiento (Scroll)
window.addEventListener("scroll", () => {
    reveals.forEach(element => {
        const top = element.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            element.classList.add("active");
        }
    });
});

// Función encapsulada para el procesamiento y previsualización local de imágenes
function setupGallery(inputId, previewId) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);

    if (input && preview) {
        input.addEventListener('change', (event) => {
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        img.alt = "Captura de evidencia del proyecto";
                        preview.appendChild(img);
                    };
                    reader.readAsDataURL(file);
                }
            }
        });
    }
}

// Inicialización de los módulos de carga de forma independiente
setupGallery('atom-input', 'atom-preview');
setupGallery('p2-input', 'p2-preview');