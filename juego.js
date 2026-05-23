// (Mantén tus clases Nivel y Murdoku igual, pero cambia la parte final)

// Nueva función para cargar el nivel desde el archivo
async function cargarJuego(nombreArchivo) {
    const respuesta = await fetch(`niveles/${nombreArchivo}.json`);
    const datos = await respuesta.json();

    // Creamos el nivel con los datos cargados
    const nivel = new Nivel(datos.titulo, datos.pistas, datos.etiquetasFilas, datos.restricciones);
    const juego = new Murdoku(6, nivel);

    juego.iniciarJuego();
}

// Iniciamos llamando al nivel 1
cargarJuego('nivel1');
