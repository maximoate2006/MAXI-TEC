// 1. Optimizacion de Animaciones de Aparicion mediante IntersectionObserver
const reveals = document.querySelectorAll(".reveal");

const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target); // Garantiza que la animacion se ejecute una sola vez
        }
    });
}, observerOptions);

reveals.forEach(element => {
    revealObserver.observe(element);
});

// 2. Logica Operacional de la Maquina de Estados del Chatbot
const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotContainer = document.getElementById("chatbot-container");
const chatbotClose = document.getElementById("chatbot-close");
const chatbotMessages = document.getElementById("chatbot-messages");
const chatbotInput = document.getElementById("chatbot-input");
const chatbotSend = document.getElementById("chatbot-send");

// Estructura de Datos Conversacionales del Cliente
const userData = {
    nombre: "",
    email: "",
    proyecto: ""
};

let currentStep = 0;

const botSteps = [
    "Hola, bienvenido a MAXI-TEC. ¿Cómo es tu nombre?",
    "Perfecto. ¿A qué dirección de correo electrónico te podemos escribir?",
    "Por último, cuéntame brevemente qué tipo de software o sitio web necesitas para tu proyecto.",
    "Muchas gracias. He recibido tus datos correctamente, nos comunicaremos a la brevedad."
];

function toggleChatbot() {
    chatbotContainer.classList.toggle("hidden");
    if (!chatbotContainer.classList.contains("hidden") && chatbotMessages.children.length === 0) {
        renderMessage(botSteps[0], "bot");
    }
}

function renderMessage(text, sender) {
    const messageBubble = document.createElement("div");
    messageBubble.classList.add("msg", sender);
    messageBubble.textContent = text;
    chatbotMessages.appendChild(messageBubble);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Auto-scroll al final del contenedor
}

async function handleUserResponse() {
    const text = chatbotInput.value.trim();
    if (text === "") return;

    renderMessage(text, "user");
    chatbotInput.value = "";

    // Mapeo y persistencia de variables segun el paso actual
    if (currentStep === 0) {
        userData.nombre = text;
        currentStep++;
        setTimeout(() => renderMessage(botSteps[1], "bot"), 800);
    } else if (currentStep === 1) {
        userData.email = text;
        currentStep++;
        setTimeout(() => renderMessage(botSteps[2], "bot"), 800);
    } else if (currentStep === 2) {
        userData.proyecto = text;
        currentStep++;
        setTimeout(() => {
            renderMessage(botSteps[3], "bot");
            submitChatbotData(); // Despacho asincrono de datos consolidados
        }, 800);
        chatbotInput.disabled = true;
        chatbotSend.disabled = true;
    }
}

// Despacho de payloads mediante API Fetch asincrona hacia la infraestructura de recepcion
async function submitChatbotData() {
    const endpoint = "https://formspree.io/f/tu_id_formspree"; // Reemplazar por tu ID de Formspree
    
    const payload = {
        origen: "Chatbot Flotante MAXI-TEC",
        nombre: userData.nombre,
        email: userData.email,
        proyecto: userData.proyecto,
        _replyto: "maximoate2006@gmail.com"
    };

    try {
        await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(payload)
        });
    } catch (error) {
        console.error("Error en la transmision de datos del chatbot:", error);
    }
}

// Escuchadores de Eventos de la Interfaz
chatbotToggle.addEventListener("click", toggleChatbot);
chatbotClose.addEventListener("click", toggleChatbot);

chatbotSend.addEventListener("click", handleUserResponse);
chatbotInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        handleUserResponse();
    }
});