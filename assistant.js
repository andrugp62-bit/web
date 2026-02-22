const assistantImg = document.getElementById("assistantImg");
const assistantBubble = document.getElementById("assistantBubble");

// Estados con mensajes
const states = {
    normal: { img: "miku-normal.png", text: "Hola~ ¿En qué puedo ayudarte?" },
    happy: { img: "miku-happy.png", text: "¡Yay! Eso suena genial 💙" },
    bored: { img: "miku-bored.png", text: "Mmm… me estoy aburriendo un poquito…" }
};

// Cambiar estado y mostrar burbuja
function changeState(state) {
    assistantImg.src = states[state].img;
    assistantBubble.textContent = states[state].text;
    assistantBubble.style.display = "block"; // mostrar burbuja
}

// Inicial
changeState("normal");

// Cambiar estado al pasar mouse
document.getElementById("assistant").addEventListener("mouseenter", () => {
    changeState("happy");
});

// Volver a normal cuando sale mouse
document.getElementById("assistant").addEventListener("mouseleave", () => {
    changeState("normal");
});

// Ejemplo automático de aburrido si el usuario no mueve el mouse
let idleTimer;
document.addEventListener("mousemove", () => {
    clearTimeout(idleTimer);
    changeState("normal");
    idleTimer = setTimeout(() => changeState("bored"), 10000); // 10s sin mover mouse
});
