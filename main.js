const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/*
function distanciaPuntos(p1, p2) {
    return Math.sqrt(Math.pow((p2[0] - p1[0]), 2) + Math.pow((p2[1] - p1[1]), 2) + Math.pow((p2[2] - p1[2]), 2));
}
*/

function esfera(radio = 100, anillos = 16, centro = [canvas.width / 2, 0, canvas.height / 2]) {
    // Radio en píxeles, anillos en número de puntos, centro en coordenadas de pantalla x, y, z.

    /*
    * x = ρ*cos(θ)*sin(ϕ)
    * y = ρ*sin(θ)*sin(ϕ)
    * z = ρ*cos(ϕ)
    * siendo θ ∈ [0, 2*PI) y ϕ ∈ [0, PI] y ρ el radio de la esfera
    */
    let puntos = [];
    const ancho = 2 * Math.PI / anillos;
    const alto = Math.PI / anillos;
    for (let i = 0; i < anillos; i++) {
        for (let j = 0; j <= anillos; j++) {
            const x = radio * Math.cos(i * ancho) * Math.sin(j * alto) + centro[0];
            const y = radio * Math.sin(i * ancho) * Math.sin(j * alto) + centro[1]; // no se usa dado no es visible
            const z = radio * Math.cos(j * alto) + centro[2];
            puntos.push([x, y, z]);
        }
    }

    return puntos;
}

function dibujarPuntos(esfera) {
    for (let i = 0; i < esfera.length; i++) {
        ctx.beginPath();
        ctx.arc(esfera[i][0], esfera[i][2], 2, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
    }
}

function rotarX(esfera, angulo, centro = [canvas.width / 2, 0, canvas.height / 2]) {
    for (let i = 0; i < esfera.length; i++) {
        const y = esfera[i][1];
        const z = esfera[i][2];
        esfera[i][1] = Math.cos(angulo) * (y - centro[1]) - Math.sin(angulo) * (z - centro[2]) + centro[1];
        esfera[i][2] = Math.sin(angulo) * (y - centro[1]) + Math.cos(angulo) * (z - centro[2]) + centro[2];
    }
}

function rotarY(esfera, angulo, centro = [canvas.width / 2, 0, canvas.height / 2]) {
    for (let i = 0; i < esfera.length; i++) {
        const x = esfera[i][0];
        const z = esfera[i][2];
        esfera[i][0] = Math.cos(angulo) * (x - centro[0]) + Math.sin(angulo) * (z - centro[2]) + centro[0];
        esfera[i][2] = -Math.sin(angulo) * (x - centro[0]) + Math.cos(angulo) * (z - centro[2]) + centro[2];
    }
}

function rotarZ(esfera, angulo, centro = [canvas.width / 2, 0, canvas.height / 2]) {
    for (let i = 0; i < esfera.length; i++) {
        const x = esfera[i][0];
        const y = esfera[i][1];
        esfera[i][0] = Math.cos(angulo) * (x - centro[0]) - Math.sin(angulo) * (y - centro[1]) + centro[0];
        esfera[i][1] = Math.sin(angulo) * (x - centro[0]) + Math.cos(angulo) * (y - centro[1]) + centro[1];
    }
}

function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rotarX(e1, 0.01);
    rotarY(e1, 0.01);
    rotarZ(e1, 0.01);
    dibujarPuntos(e1);
    requestAnimationFrame(animar);
}

e1 = esfera(300, 55);

animar();