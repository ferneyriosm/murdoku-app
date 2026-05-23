// 1. Clase para manejar los datos del nivel
class Nivel {
    constructor(titulo, pistas) {
        this.titulo = titulo;
        this.pistas = pistas;
    }
}

// 2. Clase para manejar la lógica del juego
class Murdoku {
    constructor(tamaño, nivel) {
        this.tamaño = tamaño;
        this.nivel = nivel;
        this.estadoCeldas = new Array(tamaño * tamaño).fill(0); // 0: Vacío, 1: Marcado, 2: Descartado
    }

    renderizarPistas() {
        const contenedor = document.getElementById('pistas-container');
        contenedor.innerHTML = `<h2>${this.nivel.titulo}</h2><ul>` + 
            this.nivel.pistas.map(p => `<li>${p}</li>`).join('') + `</ul>`;
    }

    renderizarTablero() {
        const grid = document.getElementById('grid-container');
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = `repeat(${this.tamaño}, 40px)`;
        grid.innerHTML = ''; // Limpiamos para redibujar

        for (let i = 0; i < this.tamaño * this.tamaño; i++) {
            const celda = document.createElement('div');
            celda.style.border = '1px solid black';
            celda.style.width = '40px';
            celda.style.height = '40px';
            celda.style.display = 'flex';
            celda.style.justifyContent = 'center';
            celda.style.alignItems = 'center';
            celda.style.cursor = 'pointer';

            // Dibujar el estado actual
            if (this.estadoCeldas[i] === 1) celda.innerText = 'O';
            if (this.estadoCeldas[i] === 2) celda.innerText = 'X';

            celda.onclick = () => this.manejarClick(i);
            grid.appendChild(celda);
        }
    }

    manejarClick(index) {
        this.estadoCeldas[index] = (this.estadoCeldas[index] + 1) % 3;
        this.renderizarTablero();
    }
}

// 3. Inicialización (donde el juego cobra vida)
const pistasNivel1 = ["Vaughn es la víctima.", "Dean estaba en la cocina."];
const nivel1 = new Nivel("Netflix y Asesinato", pistasNivel1);
const juego = new Murdoku(6, nivel1);

juego.renderizarPistas();
juego.renderizarTablero();
