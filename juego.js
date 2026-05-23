//11
class Murdoku {
    constructor(tamaño, nivel) {
        this.tamaño = tamaño;
        this.nivel = nivel;
        this.estadoCeldas = new Array(tamaño * tamaño).fill(0);
        this.puntos = 0;
    }

    // ... (Mantén el resto de métodos igual: iniciarInterfaz, renderizarPistas)

    renderizar() {
        document.getElementById('titulo-nivel').innerText = this.nivel.titulo;
        this.actualizarPuntos(); // Actualiza el span de puntos
        this.renderizarPistas();
        this.renderizarTablero();
    }

    actualizarPuntos() {
        document.getElementById('puntos').innerText = this.puntos;
    }

    renderizarTablero() {
        const grid = document.getElementById('grid-container');
        grid.style.gridTemplateColumns = `repeat(${this.tamaño}, 55px)`;
        grid.innerHTML = ''; 

        for (let i = 0; i < this.tamaño * this.tamaño; i++) {
            const celda = document.createElement('div');
            const restriccion = this.nivel.restricciones.find(r => r.index === i);
            
            celda.className = 'cell';
            celda.onclick = () => this.manejarClick(i);

            if (restriccion) {
                const label = document.createElement('span');
                label.className = 'object-name';
                label.innerText = restriccion.nombre;
                celda.appendChild(label);
                
                if (restriccion.tipo === 'bloqueado') {
                    celda.classList.add('bloqueado');
                    celda.onclick = null; 
                }
            }

            if (this.estadoCeldas[i] !== 0) {
                const mark = document.createElement('span');
                mark.className = 'mark';
                mark.innerText = this.estadoCeldas[i] === 1 ? 'O' : 'X';
                celda.appendChild(mark);
            }

            grid.appendChild(celda);
        }
    }

    manejarClick(index) {
        this.estadoCeldas[index] = (this.estadoCeldas[index] + 1) % 3;
        this.renderizarTablero();
    }

    comprobar() {
        const esCorrecto = JSON.stringify(this.estadoCeldas) === JSON.stringify(this.nivel.solucion);
        if (esCorrecto) {
            this.puntos += 100;
            this.actualizarPuntos(); // Llamamos al actualizador
            document.getElementById('btn-siguiente').classList.remove('hidden');
            alert("¡Felicidades!");
        } else {
            alert("Sigue intentándolo.");
        }
    }
}
// ... resto del archivo igual
