const projectsBtn = document.getElementById("projects-btn");
const projectsNotebook = document.getElementById("projects-notebook");
const reveals = document.querySelectorAll(".reveal");


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
    "ATOM 1.jpg",
    "ATOM 2.png",
];


loadStaticGallery(imagenesAtom, "imagenes/atom/", "atom-preview");