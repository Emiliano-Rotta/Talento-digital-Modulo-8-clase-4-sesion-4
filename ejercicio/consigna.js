// Consigna:

// Desarrolla una API REST utilizando Express y el paquete express-fileupload. 
// 
// La API debe permitir la subida de imágenes a un servidor local y cumplir con los siguientes requisitos:

// Ruta: /api/upload-image (método POST).

// Validaciones:
// Asegurarse de que el archivo fue enviado en la solicitud.

// Solo permitir archivos con extensiones png, jpg o jpeg.

// Limitar el tamaño máximo del archivo a 2 MB.

// Guardar:
// Las imágenes deben guardarse en una carpeta llamada uploads. Si no existe, debe ser creada automáticamente.(recordar fileSistem)
// Respuesta:
// En caso de éxito, devolver un JSON con el mensaje "Archivo subido exitosamente" y la ruta del archivo.
// En caso de error, devolver un código HTTP adecuado y el mensaje correspondiente.



const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
app.use(express.static(path.join(__dirname, 'public')))
// Middleware para manejo de archivos
app.use(fileUpload({
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
    abortOnLimit: true
}));

// Ruta para subir imágenes
app.post('/api/upload-image', (req, res) => {
    // Validar si se envió un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: 'No se ha subido ningún archivo.' });
    }

    const archivo = req.files.archivo;
    const extensionesPermitidas = ['png', 'jpg', 'jpeg'];
    const extension = archivo.name.split('.').pop().toLowerCase();

    // Validar extensión
    if (!extensionesPermitidas.includes(extension)) {
        return res.status(400).json({ message: 'Extensión no permitida. Solo se aceptan png, jpg o jpeg.' });
    }

    // Crear carpeta 'uploads' si no existe
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    // Definir ruta para guardar el archivo
    const uploadPath = path.join(uploadDir, archivo.name);

    // Mover el archivo al servidor
    archivo.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error al guardar el archivo.', error: err });
        }

        res.status(200).json({
            message: 'Archivo subido exitosamente.',
            filePath: `/uploads/${archivo.name}`,
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

