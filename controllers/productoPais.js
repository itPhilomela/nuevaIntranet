const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const conexion = require('../database/db');
const {promisify} = require('util');
const enrutador=require('../routes/router.js');



//metodos para vistas de cada producto
exports.ecoslim = async(req,res)=>{
  const paisConsulta = await promisify(jwt.verify)(req.cookies.jwt2,process.env.JWT_SECRETO);
  const codigoPais=paisConsulta.id;
  const nombrePais=paisConsulta.nombre;
  console.log(codigoPais);
  return res.render('vistaProductos/ecoslim.ejs',{pais:codigoPais,nacion:nombrePais});
}

exports.blackLatte = async(req,res)=>{
  const paisConsulta = await promisify(jwt.verify)(req.cookies.jwt2,process.env.JWT_SECRETO);
  const codigoPais=paisConsulta.id;
  const nombrePais=paisConsulta.nombre;
  console.log(codigoPais);
  return res.render('vistaProductos/blackLatte.ejs',{pais:codigoPais,nacion:nombrePais});
}

exports.abgyminic = async(req,res)=>{
  const paisConsulta = await promisify(jwt.verify)(req.cookies.jwt2,process.env.JWT_SECRETO);
  const codigoPais=paisConsulta.id;
  const nombrePais=paisConsulta.nombre;
  console.log(codigoPais);
  return res.render('vistaProductos/abgyminic.ejs',{pais:codigoPais,nacion:nombrePais});
}

exports.titanGel = async(req,res)=>{
  const paisConsulta = await promisify(jwt.verify)(req.cookies.jwt2,process.env.JWT_SECRETO);
  const codigoPais=paisConsulta.id;
  const nombrePais=paisConsulta.nombre;
  console.log(codigoPais);
  return res.render('vistaProductos/titanGel.ejs',{pais:codigoPais,nacion:nombrePais});
}

exports.titanGold = async(req,res)=>{
  const paisConsulta = await promisify(jwt.verify)(req.cookies.jwt2,process.env.JWT_SECRETO);
  const codigoPais=paisConsulta.id;
  const nombrePais=paisConsulta.nombre;
  console.log(codigoPais);
  return res.render('vistaProductos/titanGold.ejs',{pais:codigoPais,nacion:nombrePais});
}

exports.mensDefence = async(req,res)=>{
  const paisConsulta = await promisify(jwt.verify)(req.cookies.jwt2,process.env.JWT_SECRETO);
  const codigoPais=paisConsulta.id;
  const nombrePais=paisConsulta.nombre;
  console.log(codigoPais);
  return res.render('vistaProductos/mensDefence.ejs',{pais:codigoPais,nacion:nombrePais});
}

exports.gyronix = async(req,res)=>{
  const paisConsulta = await promisify(jwt.verify)(req.cookies.jwt2,process.env.JWT_SECRETO);
  const codigoPais=paisConsulta.id;
  const nombrePais=paisConsulta.nombre;
  console.log(codigoPais);
  return res.render('vistaProductos/gyronix.ejs',{pais:codigoPais,nacion:nombrePais});
}

exports.tridentex = async(req,res)=>{
  const paisConsulta = await promisify(jwt.verify)(req.cookies.jwt2,process.env.JWT_SECRETO);
  const codigoPais=paisConsulta.id;
  const nombrePais=paisConsulta.nombre;
  console.log(codigoPais);
  return res.render('vistaProductos/tridentex.ejs',{pais:codigoPais,nacion:nombrePais});
}

exports.flekosteel = async(req,res)=>{
  const paisConsulta = await promisify(jwt.verify)(req.cookies.jwt2,process.env.JWT_SECRETO);
  const codigoPais=paisConsulta.id;
  const nombrePais=paisConsulta.nombre;
  console.log(codigoPais);
  return res.render('vistaProductos/flekosteel.ejs',{pais:codigoPais,nacion:nombrePais});
}

exports.luteVid = async(req,res)=>{
  const paisConsulta = await promisify(jwt.verify)(req.cookies.jwt2,process.env.JWT_SECRETO);
  const codigoPais=paisConsulta.id;
  const nombrePais=paisConsulta.nombre;
  console.log(codigoPais);
  return res.render('vistaProductos/luteVid.ejs',{pais:codigoPais,nacion:nombrePais});
}

exports.varikosette = async(req,res)=>{
  const paisConsulta = await promisify(jwt.verify)(req.cookies.jwt2,process.env.JWT_SECRETO);
  const codigoPais=paisConsulta.id;
  const nombrePais=paisConsulta.nombre;
  console.log(codigoPais);
  return res.render('vistaProductos/varikosette.ejs',{pais:codigoPais,nacion:nombrePais});
}

exports.multica = async(req,res)=>{
  const paisConsulta = await promisify(jwt.verify)(req.cookies.jwt2,process.env.JWT_SECRETO);
  const codigoPais=paisConsulta.id;
  const nombrePais=paisConsulta.nombre;
  console.log(codigoPais);
  return res.render('vistaProductos/multica.ejs',{pais:codigoPais,nacion:nombrePais});
}

exports.neoritm = async(req,res)=>{
  const paisConsulta = await promisify(jwt.verify)(req.cookies.jwt2,process.env.JWT_SECRETO);
  const codigoPais=paisConsulta.id;
  const nombrePais=paisConsulta.nombre;
  console.log(codigoPais);
  return res.render('vistaProductos/neoritm.ejs',{pais:codigoPais,nacion:nombrePais});
}

exports.incasol = async(req,res)=>{
  const paisConsulta = await promisify(jwt.verify)(req.cookies.jwt2,process.env.JWT_SECRETO);
  const codigoPais=paisConsulta.id;
  const nombrePais=paisConsulta.nombre;
  console.log(codigoPais);
  return res.render('vistaProductos/incasol.ejs',{pais:codigoPais,nacion:nombrePais});
}

exports.gojiCream = async(req,res)=>{
  const paisConsulta = await promisify(jwt.verify)(req.cookies.jwt2,process.env.JWT_SECRETO);
  const codigoPais=paisConsulta.id;
  const nombrePais=paisConsulta.nombre;
  console.log(codigoPais);
  return res.render('vistaProductos/gojiCream.ejs',{pais:codigoPais,nacion:nombrePais});
}

exports.innoGialuron = async(req,res)=>{
  const paisConsulta = await promisify(jwt.verify)(req.cookies.jwt2,process.env.JWT_SECRETO);
  const codigoPais=paisConsulta.id;
  const nombrePais=paisConsulta.nombre;
  console.log(codigoPais);
  return res.render('vistaProductos/innoGialuron.ejs',{pais:codigoPais,nacion:nombrePais});
}

exports.cleBio = async(req,res)=>{
  const paisConsulta = await promisify(jwt.verify)(req.cookies.jwt2,process.env.JWT_SECRETO);
  const codigoPais=paisConsulta.id;
  const nombrePais=paisConsulta.nombre;
  console.log(codigoPais);
  return res.render('vistaProductos/cleBio.ejs',{pais:codigoPais,nacion:nombrePais});
}

exports.rechiol = async(req,res)=>{
  const paisConsulta = await promisify(jwt.verify)(req.cookies.jwt2,process.env.JWT_SECRETO);
  const codigoPais=paisConsulta.id;
  const nombrePais=paisConsulta.nombre;
  console.log(codigoPais);
  return res.render('vistaProductos/rechiol.ejs',{pais:codigoPais,nacion:nombrePais});
}

exports.upSize = async(req,res)=>{
  const paisConsulta = await promisify(jwt.verify)(req.cookies.jwt2,process.env.JWT_SECRETO);
  const codigoPais=paisConsulta.id;
  const nombrePais=paisConsulta.nombre;
  console.log(codigoPais);
  return res.render('vistaProductos/upSize.ejs',{pais:codigoPais,nacion:nombrePais});
}

exports.energySaver = async(req,res)=>{
  const paisConsulta = await promisify(jwt.verify)(req.cookies.jwt2,process.env.JWT_SECRETO);
  const codigoPais=paisConsulta.id;
  const nombrePais=paisConsulta.nombre;
  console.log(codigoPais);
  return res.render('vistaProductos/energySaver.ejs',{pais:codigoPais,nacion:nombrePais});
}

exports.beautyBar = async(req,res)=>{
  const paisConsulta = await promisify(jwt.verify)(req.cookies.jwt2,process.env.JWT_SECRETO);
  const codigoPais=paisConsulta.id;
  const nombrePais=paisConsulta.nombre;
  console.log(codigoPais);
  return res.render('vistaProductos/beautyBar.ejs',{pais:codigoPais,nacion:nombrePais});
}

exports.moneyAmulet = async(req,res)=>{
  const paisConsulta = await promisify(jwt.verify)(req.cookies.jwt2,process.env.JWT_SECRETO);
  const codigoPais=paisConsulta.id;
  const nombrePais=paisConsulta.nombre;
  console.log(codigoPais);
  return res.render('vistaProductos/moneyAmulet.ejs',{pais:codigoPais,nacion:nombrePais});
}
