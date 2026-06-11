const reveals = document.querySelectorAll(".reveal");
const gallertpreview = document.querySelectorAll(".gallery-preview");
const imaginmput = document.querySelector(".imagin-input");
const proyectsBtn = document.querySelector(".proyects-btn");
const projectsNoreboock = document.querySelector(".projects-norebook");

proyectsBtn.addEventListener("click", () => {
    projectsNoreboock.classList.toggle("active");
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