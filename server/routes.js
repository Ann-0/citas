const express = require('express')

const router =express.Router()

let citas =[]

router.get('/obtenerCitas', (request, response)=>{
    response.json(citas)

})

router.post('/enviarCita', (request, response) =>{
    const cita = {
        nombre: request.body.nombre,
        apellidos: request.body.apellidos,
        telefono: request.body.telefono,
        email: request.body.email,
        fecha: request.body.fecha,
        hora: request.body.hora,
        descripcion: request.body.descripcion,

    };

    citas.push(cita)
    console.log(cita)

   
    response.json(cita)

})

module.exports = router;