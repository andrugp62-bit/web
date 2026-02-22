const bannedUsers = [
    {
        steamId: "76561198068434601",
        name: "Yadhira*",
        reason: "Comportamiento tóxico",
        banDate: "2026-02-21",
        expiry: "2026-03-07",
        profileLink: "https://steamcommunity.com/profiles/76561198068434601/",
        avatar: "https://avatars.fastly.steamstatic.com/7552fa0cfb216ac4dcb29cb8b364a258880ea516_full.jpg"
    },
    {
        steamId: "76561199095816162",
        name: "NEcro",
        reason: "Comportamiento tóxico",
        banDate: "2026-02-20",
        expiry: "2026-05-20",
        profileLink: "https://steamcommunity.com/id/4565713NECRODIOS",
        avatar: "https://avatars.fastly.steamstatic.com/88b5935e2df5077c8232e4e2a0bfa152ab3e9201_full.jpg"
    },
    {
        steamId: "76561199509225336",
        name: "GENERAL PANKEIKS",
        reason: "Comportamiento tóxico",
        banDate: "2026-02-17",
        expiry: "2026-03-03",
        profileLink: "https://steamcommunity.com/profiles/76561199509225336",
        avatar: "https://avatars.fastly.steamstatic.com/e09ec35fa0f9ff9bc5957399d3017c25b16d757e_full.jpg"
    },
    {
        steamId: "76561199082361363",
        name: "Satoshy",
        reason: "Vago",
        banDate: "2026-02-12",
        expiry: "2526-03-12",
        profileLink: "https://steamcommunity.com/id/not_tryhard/",
        avatar: "https://avatars.fastly.steamstatic.com/fbd8981829186c28ca76fc81456da8117c6353e5_full.jpg"
    },
    {
        steamId: "76561198795864565",
        name: "シェイディ♍",
        reason: "Uso de trampas",
        banDate: "2024-08-24",
        expiry: "2026-08-24",
        profileLink: "https://steamcommunity.com/id/Mr_Tank_Bhop",
        avatar: "https://avatars.fastly.steamstatic.com/7ef510cc60c30ed8cef5d0dda2d01a128475e767_full.jpg"
    },
    {
        steamId: "76561198000000001",
        name: "añañinpro",
        reason: "Comportamiento tóxico",
        banDate: "2023-06-15",
        expiry: "Permanente",
        profileLink: "https://steamcommunity.com/id/toxicplayer",
        avatar: "https://avatars.akamai.steamstatic.com/e67eb286b96d581a5a148968d5c1e86c0a3af5cb_full.jpg"
    }
];

function renderTable(data) {
    const tbody = document.getElementById('banTableBody');
    tbody.innerHTML = '';

    if (data.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6">No se encontró ningún perfil baneado.</td>
            </tr>
        `;
        return;
    }

    data.forEach(user => {
        const row = `
            <tr>
                <td class="profile-cell">
                    <img src="${user.avatar}" alt="${user.name}" class="profile-img">
                    <a href="${user.profileLink}" target="_blank">${user.name}</a>
                </td>
                <td>${user.reason}</td>
                <td>${user.banDate}</td>
                <td>${user.expiry}</td>
                <td><a href="https://discord.gg/YFz5SPTy" target="_blank" class="btn-danger">Apelar</a></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Buscador
document.getElementById('searchBtn').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value.toLowerCase();

    const filtered = bannedUsers.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.steamId.includes(query) ||
        user.profileLink.toLowerCase().includes(query)
    );

    renderTable(filtered);
});

// Inicial
renderTable(bannedUsers);


/* ========================= */
/* SISTEMA ASISTENTE VIVO MEJORADO */
/* ========================= */

const assistant = document.getElementById("assistant");
const assistantImg = document.getElementById("assistantImg");
const bubble = document.getElementById("assistantBubble");

let inactivityTimer;
let afkSequenceTimer;
let isAfk = false;
let mouseOver = false;

// Mensajes de AFK + imágenes
const afkMessages = [
    { text: "♪ Lalala... tarareando feliz ♪", img: "miku-one.png" },
    { text: "Hmm... 1, 2, 3, 4...", img: "miku-two.png" },
    { text: "♪ Nya~ cantando al viento ♪", img: "miku-three.png" },
    { text: "Estoy aburrida... contemos estrellas: 1,2,3...", img: "miku-four.png" },
    { text: "♪ Tarara~ lalala~ ♪", img: "miku-five.png" },
    { text: "Hmm... qué silencioso está esto...", img: "miku-six.png" },
    { text: "♪ Lalalalaaa... ♪", img: "miku-seven.png" },
    { text: "Contando flores: rosa, azul, roja...", img: "miku-eight.png" },
    { text: "♪ Cantando sin parar... ♫", img: "miku-nine.png" },
    { text: "Espero que alguien venga a saludarme 🥺", img: "miku-teen.png" }
];

// Función para mostrar mensaje y ocultarlo después de 4s
function speak(text) {
    bubble.innerText = text;
    bubble.style.display = "block";
    setTimeout(() => {
        bubble.style.display = "none";
    }, 4000);
}

// Evento mouse sobre Miku
assistant.addEventListener("mouseenter", () => {
    mouseOver = true;
    clearTimeout(afkSequenceTimer); // pausa AFK
    isAfk = false;
    assistantImg.src = "miku-happy.png";
    speak("Dime tu consulta 💙");
});

assistant.addEventListener("mouseleave", () => {
    mouseOver = false;
    if (!isAfk) assistantImg.src = "miku-normal.png";
});

// Inicia la secuencia de mensajes de aburrimiento
function startAfkSequence() {
    if (mouseOver) return; // si estás sobre Miku, no inicia

    isAfk = true;
    let i = 0;

    function nextMessage() {
        if (!isAfk || mouseOver) return; // cortamos si hay actividad
        if (i >= afkMessages.length) i = 0; // vuelve a empezar si quieres bucle

        const msg = afkMessages[i];
        assistantImg.src = msg.img;
        speak(msg.text);
        animateAfk();

        i++;
        afkSequenceTimer = setTimeout(nextMessage, 4000);
    }

    nextMessage();
}

// Mini animación mientras está aburrida
function animateAfk() {
    assistantImg.style.transition = "transform 1s ease-in-out";
    assistantImg.style.transform = "translateY(-10px)";
    setTimeout(() => {
        if (!isAfk) return;
        assistantImg.style.transform = "translateY(0px)";
    }, 1000);
}

// Resetea el AFK y timers al detectar actividad
function resetInactivity() {
    clearTimeout(inactivityTimer);
    clearTimeout(afkSequenceTimer);

    if (isAfk) {
        isAfk = false;
        assistantImg.src = "miku-normal.png";
        assistantImg.style.transform = "translateY(0px)";
        bubble.style.display = "none"; // ocultamos mensaje inmediatamente
        speak("¡Perdón! Me distraje un poquito 🥺");
    }

    inactivityTimer = setTimeout(() => {
        startAfkSequence();
    }, 20000); // 20s de inactividad
}

// Detecta actividad general
document.addEventListener("mousemove", resetInactivity);
document.addEventListener("keydown", resetInactivity);
document.addEventListener("scroll", resetInactivity);

// Inicializamos
resetInactivity();
