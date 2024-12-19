const express = require('express')
const fileupload = require('express-fileupload')
const path = require('path') //no instalarlo, porque es un modulo nativo de node.js

const app = express();
const PORT = 3000
app.use(express.static(path.join(__dirname, 'public'))) //para conectandos con index.html que esta en public

//si quiero subir cualquier tamaño
// app.use(fileupload());
//si quiero subir max 5mb
app.use(fileupload({
    limits:{fileSize: 5 * 1024 * 1024},//5mb
    abortOnLimit: true// corta la conexión si el archivo excede el límite
}));

app.post('/upload', (req, res) => {

    //validamos que req.files(el archivo recibido), existe
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: "No se ha subido ningun archivo" }) //error 400porque es culpa del cliente, no del servidor
    }
    const archivo = req.files.archivo //porque en index.html pusimos name="archivo"


    //validamos extensiones
    const extensionesPermitidas = ['jpeg', 'png', 'webp', 'jpg']
    //archivo.name 'imagen.png'
    const extension = archivo.name.split('.').pop().toLowerCase()

    if (!extensionesPermitidas.includes(extension)) {
        return res.status(400).json({ message: 'Extension no permitida.' })
    }

    const uploadPath = path.join(__dirname, 'uploads', archivo.name);
    // __dirname es la ruta actual, que tiene una carpeta llamada uploads donde se van a guardar los archivos con el nombre que el archivo tenia (archivo.name)


    archivo.mv(uploadPath, (err)=>{  // archivo.mv(uploadPath, callback): Mueve el archivo subido desde su ubicación temporal a la ruta especificada (uploadPath)
        if(err){
            return res.status(500).json({message: 'Error al guardar el archivo.', error: err})
        } //si en el camino hay un error, ese error es del servidor por eso es 500
        res.json({ message: 'Archivo subido exitosamente.', path: uploadPath })

    })
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`)
}) 