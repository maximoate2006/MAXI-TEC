const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {

    reveals.forEach(element => {

        const top = element.getBoundingClientRect().top;

        if(top < window.innerHeight - 100){
            element.classList.add("active");
        }

    });

});