//12
class Nivel {
    constructor(titulo, pistas, restricciones, solucion) {
        this.titulo = titulo;
        this.pistas = pistas;
        this.restricciones = restricciones;
        this.solucion = solucion;
    }
}

class Murdoku {
    constructor(tamaño, nivel) {
        this.tamaño = tamaño;
        this.nivel = nivel;
        this.estadoCeldas = new Array(tamaño * tamaño).fill(0);
        this.puntos = 0;
        this.nivelCompletado = false; // Bandera para controlar puntos
    }

    iniciarInterfaz() {
        document.getElementById('pantalla-inicio').classList.add('hidden');
        document.getElementById('pantalla-juego').classList.remove('hidden');
        this.renderizar();
    }

    renderizar() {
        document.getElementById('titulo-nivel').innerText = this.nivel.titulo;
        this.actualizarPuntos();
        this.renderizarPistas();
        this.renderizarTablero();
    }

    actualizarPuntos() {
        document.getElementById('puntos').innerText = this.puntos;
    }

    renderizarPistas() {
        const contenedor = document.getElementById('pistas-container');
        contenedor.innerHTML = '<h3>Pistas:</h3><ul>' + 
            this.nivel.pistas.map(p => `<li><strong>${p.personaje}:</strong> ${p.texto}</li>`).join('') + '</ul>';
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
        // No permitir clics si el nivel ya está completado
        if (this.nivelCompletado) return;
        
        this.estadoCeldas[index] = (this.estadoCeldas[index] + 1) % 3;
        this.renderizarTablero();
    }

    comprobar() {
        // Bloqueo de seguridad extra: si ya está completado, no hace nada
        if (this.nivelCompletado) return; 

        const esCorrecto = JSON.stringify(this.estadoCeldas) === JSON.stringify(this.nivel.solucion);
        
        if (esCorrecto) {
            this.puntos += 100;
            this.nivelCompletado = true; // Marcamos como completado
            this.actualizarPuntos();
            
            // 1. Ocultar el botón
            const btnComprobar = document.getElementById('btn-comprobar');
            btnComprobar.classList.add('hidden');
            // 2. Deshabilitar para que no se pueda clickear ni por error
            btnComprobar.disabled = true;

            document.getElementById('btn-siguiente').classList.remove('hidden');
            alert("¡Felicidades! Has resuelto el misterio.");
        } else {
            alert("Aún no es correcto. Recuerda marcar 'O' donde van las personas.");
        }
    }

    limpiarYReiniciar() {
        // Resetear datos
        this.estadoCeldas = new Array(this.tamaño * this.tamaño).fill(0);
        this.nivelCompletado = false; // Importante: volvemos a permitir ganar puntos
        
        // Resetear botones UI
        const btnComprobar = document.getElementById('btn-comprobar');
        btnComprobar.classList.remove('hidden');
        btnComprobar.disabled = false; // ¡Volvemos a habilitar el botón!
        
        document.getElementById('btn-siguiente').classList.add('hidden');
        
        // Volver a dibujar
        this.renderizar();
    }
}

let juego; 

async function iniciarProceso() {
    try {
        const respuesta = await fetch('niveles/nivel1.json');
        const datos = await respuesta.json();
        const nivel = new Nivel(datos.titulo, datos.pistas, datos.restricciones, datos.solucion);
        juego = new Murdoku(6, nivel);
        juego.iniciarInterfaz();
    } catch (error) {
        console.error("Error al cargar el nivel:", error);
    }
}
