// 1. Definimos las clases primero
class Nivel {
    constructor(titulo, pistas, etiquetasFilas, restricciones) {
        this.titulo = titulo;
        this.pistas = pistas;
        this.etiquetasFilas = etiquetasFilas;
        this.restricciones = restricciones;
    }
}

class Murdoku {
    constructor(tamaño, nivel) {
        this.tamaño = tamaño;
        this.nivel = nivel;
        this.estadoCeldas = new Array(tamaño * tamaño).fill(0);
    }

    iniciarInterfaz() {
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

// 2. Variable global para guardar el juego
let juego; 

// 3. Función global que llama el botón del HTML
async function iniciarProceso() {
    try {
        const respuesta = await fetch('niveles/nivel1.json');
        const datos = await respuesta.json();

        // Creamos la instancia del nivel y del juego
        const nivel = new Nivel(datos.titulo, datos.pistas, datos.etiquetasFilas, datos.restricciones);
        
        // Asignamos a la variable global
        juego = new Murdoku(6, nivel);
        
        // Iniciamos la interfaz
        juego.iniciarInterfaz();
    } catch (error) {
        console.error("Error al cargar el nivel:", error);
    }
}
