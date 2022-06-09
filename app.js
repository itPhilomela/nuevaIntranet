const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const app = express()

//seteo de las plantillas, es decir nuestro archivos .ejs
app.set('view engien','ejs');
//archivos estaticos, es decir: html, js, css.
app.use(express.static('public'));

//archivos dinámicos, es decir: formularios y paso de datos.
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//seteo de las variables de entorno
dotenv.config({path:'./env/.env'});

//trabajo con las cookie
app.use(cookieParser());

//Llamar al Router
app.use('/',require('./routes/router.js'));

//Eliminar cache y no retornar con back del navegador despues de un LOGOUT.
app.use(function(req,res,next){
  if(!req.user){
    res.header('Cache-Control','private, no-cache, no-store, must-revalidate');
    next();}
});

const PORT = process.env.PORT;


app.listen(PORT, function()=>{
  console.log('SERVER UP running in htt://heroku:', PORT);
});
