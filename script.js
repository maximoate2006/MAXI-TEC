const reveals = document.querySelectorAll(".reveal");
const galleryPreviews = document.querySelectorAll(".gallery-preview");
const imageInput = document.querySelector(".image-input");
const projectsBtn = document.querySelector(".projects-btn");
const projectsNotebook = document.querySelector(".projects-notebook");

projectsBtn.addEventListener('click', () => {
    projectsNotebook.classList.toggle('open');
    projectsBtn.classList.toggle('active-trigger');
});
window.addEventListener("scroll", () => {

    reveals.forEach(element => {

        const top = element.getBoundingClientRect().top;

        if(top < window.innerHeight - 100){
            element.classList.add("active");
        }

    });

});

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