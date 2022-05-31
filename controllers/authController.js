const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const conexion = require('../database/db');
const {promisify} = require('util');
const enrutador=require('../routes/router.js');
const menu=require('../public/js/menu.js');
const pais=menu.codigo;
//alerta

//metodo de registro

exports.registro = async(req,res)=>{
    try{
      const contraseña =req.body.contraseña;
      const correo = req.body.correo;
      const codigoEmpresa=req.body.codigoEmpresa;
      const codigoNivel=req.body.codigoNivel;
      const nombreCompleto=req.body.nombreCompleto
      let passHash = await bcryptjs.hash(contraseña, 8);
      console.log(' - '+passHash+' - '+correo+' - '+codigoEmpresa+' - '+codigoNivel+' - '+contraseña);
      const sqlInsert='INSERT INTO Usuarios (codigoUsuario,codigoNivel,correo,userPass,contrasena,empresa,nombreCompleto)';
      const sqlDatos = "VALUES('NULL','"+codigoNivel+"','"+correo+"','"+passHash+"','"+contraseña+"','"+codigoEmpresa+"','"+nombreCompleto+"')";
      const mariaDB=sqlInsert+sqlDatos;
      conexion.query(mariaDB,(error,result)=>{
            if(error){console.log(error);}
            console.log(result);
            res.redirect('/buscarUsuarios');
          });
        }catch(error){
      console.log(error);
    }
  };

//metodo para modificar usuarios registrados

exports.update = async(req,res)=>{
  const id=req.body.idUsuario;
  const contraseña =req.body.contraseña;
  const correo = req.body.correo;
  const codigoEmpresa=req.body.codigoEmpresa;
  const codigoNivel=req.body.codigoNivel;
  const nombreCompleto=req.body.nombreCompleto
  let passHash = await bcryptjs.hash(contraseña, 8);
  const sqlUpdate="UPDATE Usuarios SET codigoNivel='"+codigoNivel+"',correo='"+correo+"',userPass='"+passHash+"',contrasena='"+contraseña+"',empresa='"+codigoEmpresa+"',nombreCompleto='"+nombreCompleto+"' WHERE codigoUsuario='"+id+"'";
  console.log(id, nombreCompleto);
  conexion.query(sqlUpdate,(error,result)=>{
        if(error){console.log(error);}
        console.log(result);
        res.redirect('/buscarUsuarios');
      });
};

//metodo para loguear

exports.login = async(req,res)=>{

try{
  const user = req.body.user;
  const pass = req.body.pass;
  console.log(user+" - "+pass);
    if(!user || !pass){
      res.render('login.ejs',{alert:true,titulo:'Precaucion',icono:'info',texto:'No ingresaste tu Usuario o Contraseña',ruta:'login'});
      console.log("No ingreso nada login");
    }else{
      const sql= "SELECT userPass,codigoUsuario,codigoNivel FROM Usuarios WHERE correo ='"+user+"'";
      conexion.query(sql,async(error,results)=>{
        console.log('comprobando contraseña ',results);
        if(results.length == 0 || ! (await bcryptjs.compare(pass,results[0].userPass))){
          console.log("esto si pasa");
          res.render('login.ejs',{alert:true,titulo:"Error",texto: "Usuario y/o Password incorrectas",icono: 'error',ruta:'login'});
        }else{
          //inicio de sesion OK
          const id = results[0].codigoUsuario;
          const nivel=results[0].codigoNivel;
          console.log("id ingreso "+id+" codigo Nivel: "+nivel);
          const token= jwt.sign({id:id,nivel:nivel},process.env.JWT_SECRETO,{expiresIn: process.env.JWT_TIEMPO_EXPIRA});
          //generamos el token SIN fecha de expiracion
          //const token = ({id:id},process.env.JWT_SECRETO)
          console.log("TOKEN:"+token+" para el usuario: "+user);
          const cookiesOptions={expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES*24*60*60*1000),httpOnly:true};
          res.cookie('jwt',token, cookiesOptions);
          if(nivel==1 || nivel==0){
            res.render('login.ejs',{alert:true,titulo:"Bienvenido",texto: "Accesos Correctos",icono: 'success',ruta:'vistaOperador'});

          };
          if(nivel==2 || nivel == 3){
            res.render('login.ejs',{alert:true,titulo:"Bienvenido",texto: "Accesos Correctos",icono: 'success',ruta:'vistaStaff',nivel});
          };
          if(nivel==4){
            res.render('login.ejs',{alert:true,titulo:"Bienvenido",texto: "Accesos Correctos",icono: 'success',ruta:'vistaAdministrador',nivel});
          };
        };
      });
  }
}catch(error){
  console.log(error);
}

};

//metodo de Autenticación de Staff.
exports.isLevel = async(req, res, next)=>{
  if(req.cookies.jwt){
    try{
      console.log();
      const decodificada = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRETO);
      if(decodificada.nivel>1){
        req.nivel=decodificada.nivel;
  console.log("nivel de usuario "+decodificada.id);
  return next();
}else{
  res.clearCookie('jwt')
  res.render('login.ejs',{alert:true,titulo:"Acceso Denegado",texto: "No tienes permiso",icono: 'error',ruta:'login'});
};
    }catch(error){
      console.log(error)
      return next();
    }
  }else{
    res.render('login.ejs',{alert:true,titulo:"Acceso Denegado",texto: "No tienes permiso",icono: 'error',ruta:'login'});
  }
};

//metodo de Autenticación de Administrador.
exports.isAdmin = async(req, res, next)=>{
  if(req.cookies.jwt){
    try{
      console.log();
      const decodificada = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRETO);
      if(decodificada.nivel>3){
        req.nivel=decodificada.nivel;
  console.log("nivel de usuario "+decodificada.id);
  return next();
}else{
  res.clearCookie('jwt')
  res.render('login.ejs',{alert:true,titulo:"Acceso Denegado",texto: "No tienes permiso",icono: 'error',ruta:'login'});
};
    }catch(error){
      console.log(error)
      return next();
    }
  }else{
    res.redirect('/login');
  }
};

//metodo de Autenticación de Usuario.
exports.isAuthenticated = async(req, res, next)=>{
  if(req.cookies.jwt){
    try{
      console.log();
      const decodificada = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRETO);
      const sqlAutentico= "SELECT correo,codigoUsuario,codigoNivel,nombreCompleto FROM Usuarios WHERE codigoUsuario ='"+decodificada.id+"'";
      console.log(sqlAutentico);
      conexion.query(sqlAutentico,(error,results)=>{
        console.log(results)
        if(!results){
          console.log("esto si pasa2");
          res.clearCookie('jwt');
          res.clearCookie('jwt2');
          return next()};
        req.user = results[0];
        console.log("esto si pasa "+req.user.correo);
        return next();
      });
    }catch(error){
      console.log(error)
      return next();
    }
  }else{
    res.redirect('/login');
  }
};

//metodo para Logout
exports.logout = (req,res)=>{
  res.clearCookie('jwt');
  res.clearCookie('jwt2');
  return res.redirect('/');
};

//metodos para ver productos por Pais

exports.guatemala = async(req,res)=>{
  console.log("llegamos a producto Guatemala");
  const codigo=1;
  try{

    const sqlPais= "SELECT codigoPais,nombrePais FROM Paises WHERE codigoPais ='"+codigo+"'";
    conexion.query(sqlPais,async(error,results)=>{
      console.log(results);
      if(results){
        const codigoBase=results[0].codigoPais;
        const nombreBase=results[0].nombrePais;
        const token2=jwt.sign({id:codigoBase,nombre:nombreBase},process.env.JWT_SECRETO,{expiresIn: process.env.JWT_TIEMPO_EXPIRA});
       console.log("TOKEN2:"+token2+" para guatemala.");
       const cookiesOptions={expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES*24*60*60*1000),httpOnly:true};
       res.cookie('jwt2',token2, cookiesOptions);
        res.render('productos.ejs',{pais:codigoBase,nacion:nombreBase});
      }
    });
  }catch{
    console.log("error de try")
  };
};

exports.elSalvador = async(req,res)=>{
 console.log("llegamos a producto 2");
 const codigo=2;
 try{

   const sqlPais= "SELECT codigoPais,nombrePais FROM Paises WHERE codigoPais ='"+codigo+"'";
   conexion.query(sqlPais,async(error,results)=>{
     console.log(results);
     if(results){
       const codigoBase=results[0].codigoPais;
       const nombreBase=results[0].nombrePais;
       const token2=jwt.sign({id:codigoBase,nombre:nombreBase},process.env.JWT_SECRETO,{expiresIn: process.env.JWT_TIEMPO_EXPIRA});
      console.log("TOKEN2:"+token2+" para el salvador.");
      const cookiesOptions={expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES*24*60*60*1000),httpOnly:true};
      res.cookie('jwt2',token2, cookiesOptions);
       res.render('productos.ejs',{pais:codigoBase,nacion:nombreBase});
     }
   });
 }catch{
   console.log("error de try")
 };
};

exports.honduras = async(req,res)=>{
 console.log("llegamos a producto 3");
 const codigo=3;
 try{

   const sqlPais= "SELECT codigoPais,nombrePais FROM Paises WHERE codigoPais ='"+codigo+"'";
   conexion.query(sqlPais,async(error,results)=>{
     console.log(results);
     if(results){
       const codigoBase=results[0].codigoPais;
       const nombreBase=results[0].nombrePais;
       const token2=jwt.sign({id:codigoBase,nombre:nombreBase},process.env.JWT_SECRETO,{expiresIn: process.env.JWT_TIEMPO_EXPIRA});
      console.log("TOKEN2:"+token2+" para guatemala.");
      const cookiesOptions={expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES*24*60*60*1000),httpOnly:true};
      res.cookie('jwt2',token2, cookiesOptions);
       res.render('productos.ejs',{pais:codigoBase,nacion:nombreBase});
     }
   });
 }catch{
   console.log("error de try")
 };
};

exports.nicaragua = async(req,res)=>{
 console.log("llegamos a producto 4");
 const codigo=4;
 try{

   const sqlPais= "SELECT codigoPais,nombrePais FROM Paises WHERE codigoPais ='"+codigo+"'";
   conexion.query(sqlPais,async(error,results)=>{
     console.log(results);
     if(results){
       const codigoBase=results[0].codigoPais;
       const nombreBase=results[0].nombrePais;
       const token2=jwt.sign({id:codigoBase,nombre:nombreBase},process.env.JWT_SECRETO,{expiresIn: process.env.JWT_TIEMPO_EXPIRA});
      console.log("TOKEN2:"+token2+" para guatemala.");
      const cookiesOptions={expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES*24*60*60*1000),httpOnly:true};
      res.cookie('jwt2',token2, cookiesOptions);
       res.render('productos.ejs',{pais:codigoBase,nacion:nombreBase});
     }
   });
 }catch{
   console.log("error de try")
 };
};

exports.costaRica = async(req,res)=>{
 console.log("llegamos a producto 5");
 const codigo=5;
 try{
   const sqlPais= "SELECT codigoPais,nombrePais FROM Paises WHERE codigoPais ='"+codigo+"'";
   conexion.query(sqlPais,async(error,results)=>{
     console.log(results);
     if(results){
       const codigoBase=results[0].codigoPais;
       const nombreBase=results[0].nombrePais;
       const token2=jwt.sign({id:codigoBase,nombre:nombreBase},process.env.JWT_SECRETO,{expiresIn: process.env.JWT_TIEMPO_EXPIRA});
      console.log("TOKEN2:"+token2+" para el salvador.");
      const cookiesOptions={expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES*24*60*60*1000),httpOnly:true};
      res.cookie('jwt2',token2, cookiesOptions);
       res.render('productos.ejs',{pais:codigoBase,nacion:nombreBase});
     }
   });
 }catch{
   console.log("error de try")
 };
};

exports.panama = async(req,res)=>{
 console.log("llegamos a producto 6");
 const codigo=6;
 try{

   const sqlPais= "SELECT codigoPais,nombrePais FROM Paises WHERE codigoPais ='"+codigo+"'";
   conexion.query(sqlPais,async(error,results)=>{
     console.log(results);
     if(results){
       const codigoBase=results[0].codigoPais;
       const nombreBase=results[0].nombrePais;
       const token2=jwt.sign({id:codigoBase,nombre:nombreBase},process.env.JWT_SECRETO,{expiresIn: process.env.JWT_TIEMPO_EXPIRA});
      console.log("TOKEN2:"+token2+" para guatemala.");
      const cookiesOptions={expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES*24*60*60*1000),httpOnly:true};
      res.cookie('jwt2',token2, cookiesOptions);
       res.render('productos.ejs',{pais:codigoBase,nacion:nombreBase});
     }
   });
 }catch{
   console.log("error de try")
 };
};

exports.republicaDominicana = async(req,res)=>{
 console.log("llegamos a producto 7");
 const codigo=7;
 try{

   const sqlPais= "SELECT codigoPais,nombrePais FROM Paises WHERE codigoPais ='"+codigo+"'";
   conexion.query(sqlPais,async(error,results)=>{
     console.log(results);
     if(results){
       const codigoBase=results[0].codigoPais;
       const nombreBase=results[0].nombrePais;
       const token2=jwt.sign({id:codigoBase,nombre:nombreBase},process.env.JWT_SECRETO,{expiresIn: process.env.JWT_TIEMPO_EXPIRA});
      console.log("TOKEN2:"+token2+" para guatemala.");
      const cookiesOptions={expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES*24*60*60*1000),httpOnly:true};
      res.cookie('jwt2',token2, cookiesOptions);
       res.render('productos.ejs',{pais:codigoBase,nacion:nombreBase});
     }
   });
 }catch{
   console.log("error de try")
 };
};
