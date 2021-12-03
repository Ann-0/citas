const express = require('express')

const rutas = require('./routes.js')
const path = require('path');

const app = express();

const pathFolderPublic = path.resolve(__dirname, '../public')

console.log(pathFolderPublic)

app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use(express.static(pathFolderPublic))

app.use('/api', rutas)

app.listen(process.env.PORT || 3000,()=>{
    console.log('servidor corriendo ')
})