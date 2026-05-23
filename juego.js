class Nivel {
    constructor(titulo, pistas, etiquetasFilas, restricciones) {
        this.titulo = titulo;
        this.pistas = pistas; // Array de objetos {personaje, texto}
        this.etiquetasFilas = etiquetasFilas;
        this.restricciones = restricciones; // Array de índices de celdas bloqueadas
    }
}

class Murdoku {
    constructor(tamaño, nivel) {
        this.tamaño = tamaño;
        this.nivel = nivel;
        this.estadoCeldas = new Array(tamaño * tamaño).fill(0);
    }

    iniciarJuego() {
        document.getElementById('pantalla-inicio').classList.add('hidden');
        document.getElementById('pantalla-juego').classList.remove('hidden');
        this.renderizar();
    }

    renderizar() {
        document.getElementById('titulo-nivel').innerText = this.nivel.titulo;
        this.renderizarPistas();
        this.renderizarEtiquetas();
        this.renderizarTablero();
    }

    renderizarPistas() {
        const contenedor = document.getElementById('pistas-container');
        contenedor.innerHTML = '<h3>Pistas:</h3><ul>' + 
            this.nivel.pistas.map(p => `<li><strong>${p.personaje}:</strong> ${p.texto}</li>`).join('') + '</ul>';
    }

    renderizarEtiquetas() {
        const rowHeader = document.getElementById('row-headers');
        rowHeader.style.display = 'grid';
        rowHeader.style.gridTemplateRows = `repeat(${this.tamaño}, 40px)`;
        rowHeader.innerHTML = this.nivel.etiquetasFilas.map(e => `<div class="header-cell">${e}</div>`).join('');
    }

    renderizarTablero() {
        const grid = document.getElementById('grid-container');
        grid.style.gridTemplateColumns = `repeat(${this.tamaño}, 40px)`;
        grid.innerHTML = ''; 

        for (let i = 0; i < this.tamaño * this.tamaño; i++) {
            const celda = document.createElement('div');
            celda.className = 'cell';

            // Lógica de restricciones
            if (this.nivel.restricciones.includes(i)) {
                celda.classList.add('restricted');
            } else {
                if (this.estadoCeldas[i] === 1) celda.innerText = 'O';
                if (this.estadoCeldas[i] === 2) celda.innerText = 'X';
                celda.onclick = () => this.manejarClick(i);
            }
            grid.appendChild(celda);
        }
    }

    manejarClick(index) {
        this.estadoCeldas[index] = (this.estadoCeldas[index] + 1) % 3;
        this.renderizarTablero();
    }
}

// Datos del Nivel 1 (Netflix y Asesinato)
const pistasNivel1 = [
    {personaje: "Austin", texto: "Estaba al lado de un estante."},
    {personaje: "Bárbara", texto: "Estaba en la cama."},
    {personaje: "Charlotte", texto: "Era la única persona sentada en una silla."},
    {personaje: "Dean", texto: "Estaba en la cocina."},
    {personaje: "Enid", texto: "Estaba al lado del televisor."},
    {personaje: "Vaughn", texto: "La víctima."}
];

const personajes = ["Austin", "Bárbara", "Charlotte", "Dean", "Enid", "Vaughn"];
const celdasRestringidas = [0, 5, 35]; // Ejemplo: índices que no se pueden tocar

const nivel1 = new Nivel("Netflix y Asesinato", pistasNivel1, personajes, celdasRestringidas);
const juego = new Murdoku(6, nivel1);
