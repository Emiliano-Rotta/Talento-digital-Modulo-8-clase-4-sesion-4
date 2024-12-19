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
