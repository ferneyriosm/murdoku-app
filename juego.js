class Nivel {
    constructor(titulo, pistas, etiquetasFilas, etiquetasColumnas) {
        this.titulo = titulo;
        this.pistas = pistas;
        this.etiquetasFilas = etiquetasFilas;
        this.etiquetasColumnas = etiquetasColumnas;
    }
}

class Murdoku {
    constructor(tamaño, nivel) {
        this.tamaño = tamaño;
        this.nivel = nivel;
        this.estadoCeldas = new Array(tamaño * tamaño).fill(0);
    }

    renderizar() {
        this.renderizarPistas();
        this.renderizarEtiquetas();
        this.renderizarTablero();
    }

    renderizarPistas() {
        const contenedor = document.getElementById('pistas-container');
        contenedor.innerHTML = `<h2>${this.nivel.titulo}</h2><ul>` + 
            this.nivel.pistas.map(p => `<li>${p}</li>`).join('') + `</ul>`;
    }

    renderizarEtiquetas() {
        const rowHeader = document.getElementById('row-headers');
        const colHeader = document.getElementById('col-headers');

        rowHeader.innerHTML = this.nivel.etiquetasFilas.map(e => `<div class="header-cell">${e}</div>`).join('');
        colHeader.innerHTML = this.nivel.etiquetasColumnas.map(e => `<div class="header-cell">${e}</div>`).join('');
    }

    renderizarTablero() {
        const grid = document.getElementById('grid-container');
        grid.innerHTML = ''; 

        for (let i = 0; i < this.tamaño * this.tamaño; i++) {
            const celda = document.createElement('div');
            celda.style.border = '1px solid black';
            celda.style.width = '40px';
            celda.style.height = '40px';
            celda.style.display = 'flex';
            celda.style.justifyContent = 'center';
            celda.style.alignItems = 'center';
            celda.style.cursor = 'pointer';

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

// Inicialización con datos de ejemplo
const personajes = ["Austin", "Bárbara", "Charlotte", "Dean", "Enid", "Vaughn"];
const habitaciones = ["Dormitorio", "Baño", "Cocina", "Sala", "Patio", "Ático"];
const pistas = ["Vaughn es la víctima.", "Dean estaba en la cocina."];

const nivel1 = new Nivel("Netflix y Asesinato", pistas, personajes, habitaciones);
const juego = new Murdoku(6, nivel1);

juego.renderizar();
