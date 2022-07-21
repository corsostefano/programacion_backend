const express = require('express')
const router = require('../Routes/routes.js')
const app = express()
const PORT = 8080

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/productos', router)
// Server conectado exitosamente
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
// Server con error
server.on("error", (err) => {
  console.log( `El servidor a tenido un error:${error}`)
  `El servidor a tenido un error:${error}`
})
