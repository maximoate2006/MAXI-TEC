const reveals = document.querySelectorAll(".reveal");
const gallertpreview = document.querySelectorAll(".gallery-preview");
const imaginmput = document.querySelector(".imagin-input");

window.addEventListener("scroll", () => {

    reveals.forEach(element => {

        const top = element.getBoundingClientRect().top;

        if(top < window.innerHeight - 100){
            element.classList.add("active");
        }

    });

});

imageInput.addEventListener('change', (event) => {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = "Evidencia de ATOM GYM";
                galleryPreview.appendChild(img); // añadir imagen
            };
            
            reader.readAsDataURL(file);
        }
    }
});