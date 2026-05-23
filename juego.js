class Nivel {
    constructor(titulo, pistas, restricciones) {
        this.titulo = titulo;
        this.pistas = pistas;
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
        this.renderizarTablero();
    }

    renderizarPistas() {
        const contenedor = document.getElementById('pistas-container');
        contenedor.innerHTML = '<h3>Pistas:</h3><ul>' + 
            this.nivel.pistas.map(p => `<li><strong>${p.personaje}:</strong> ${p.texto}</li>`).join('') + '</ul>';
    }

    renderizarTablero() {
        const grid = document.getElementById('grid-container');
        grid.style.gridTemplateColumns = `repeat(${this.tamaño}, 50px)`;
        grid.innerHTML = ''; 

        for (let i = 0; i < this.tamaño * this.tamaño; i++) {
            const celda = document.createElement('div');
            
            const restriccion = this.nivel.restricciones.find(r => r.index === i);

            if (restriccion) {
                celda.innerText = restriccion.nombre;
                if (restriccion.tipo === 'bloqueado') {
                    celda.className = 'cell bloqueado';
                } else {
                    celda.className = 'cell usable';
                    celda.onclick = () => this.manejarClick(i);
                }
            } else {
                celda.className = 'cell';
                if (this.estadoCeldas[i] === 1) celda.innerText = 'O';
                if (this.estadoCeldas[i] === 2) celda.innerText = 'X';
                celda.onclick = () => this.manejarClick(i);
            }
            grid.appendChild(celda);
        }
    }

    manejarClick(index) {
        // Solo cambiar si no es un objeto bloqueado
        const restriccion = this.nivel.restricciones.find(r => r.index === index);
        if (restriccion && restriccion.tipo === 'bloqueado') return;

        this.estadoCeldas[index] = (this.estadoCeldas[index] + 1) % 3;
        this.renderizarTablero();
    }
}

let juego; 

async function iniciarProceso() {
    try {
        const respuesta = await fetch('niveles/nivel1.json');
        const datos = await respuesta.json();
        const nivel = new Nivel(datos.titulo, datos.pistas, datos.restricciones);
        juego = new Murdoku(6, nivel);
        juego.iniciarInterfaz();
    } catch (error) {
        console.error("Error al cargar el nivel:", error);
    }
}
