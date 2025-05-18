// guardar como generarArchivos.js

const fs = require('fs/promises');
const path = require('path');

const NUM_ARCHIVOS = 10000;
const OUTPUT_DIR = path.join(__dirname, 'archivos');

// Asegura que el directorio exista
async function crearDirectorio() {
    try {
        await fs.mkdir(OUTPUT_DIR, { recursive: true });
    } catch (err) {
        console.error('Error creando el directorio:', err);
    }
}

// Función para generar un solo archivo
async function crearArchivo(i) {
    const filePath = path.join(OUTPUT_DIR, `archivo_${i}.txt`);
    const contenido = `Este es el contenido del archivo número ${i}\n`;
    await fs.writeFile(filePath, contenido);
}

// Generar todos los archivos en paralelo
async function generarArchivos() {
    console.time('Tiempo total');

    await crearDirectorio();

    const tareas = [];
    for (let i = 1; i <= NUM_ARCHIVOS; i++) {
        tareas.push(crearArchivo(i));
    }

    await Promise.all(tareas);

    console.timeEnd('Tiempo total');
    console.log(`${NUM_ARCHIVOS} archivos creados.`);
}

generarArchivos().catch(console.error);