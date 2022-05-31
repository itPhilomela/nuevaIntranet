const express = require('express');
const router = express.Router();
const conexion = require('../database/db');
const authController = require('../controllers/authController.js');
const productoPais = require('../controllers/productoPais.js')

//router para las vistas principales.
router.get('/',(req,res)=>{
  res.render('index.ejs');
});

router.get('/acercaDe',(req,res)=>{
  res.render('acercaDe.ejs');
});

router.get('/registrosUsuarios', authController.isAuthenticated,authController.isAdmin,(req,res)=>{
  res.render('registrosUsuarios.ejs',{user:req.user});
});
router.get('/login',(req,res)=>{
  res.render('login.ejs',{alert:false});
})

router.get('/vistaOperador',authController.isAuthenticated,(req,res)=>{
  res.render('vistaOperador.ejs',{user:req.user});
});

router.get('/comentarioTipificacion',authController.isAuthenticated,(req,res)=>{
  res.render('comentarioTipificacion.ejs',{user:req.user});
});

router.get('/productos',authController.isAuthenticated,(req,res)=>{
  res.render('productos.ejs',{pais:req.codigoBase,nacion:req.nombreBase});
})

router.get('/productos1',authController.isAuthenticated,(req,res)=>{
  res.render('productos1.ejs',{pais:req.codigoBase,nacion:req.nombreBase});
})

router.get('/vistaStaff',authController.isAuthenticated,authController.isLevel,(req,res)=>{
  res.render('vistaStaff.ejs',{user:req.user,nivel:req.nivel});
});

router.get('/herramientasTeamLeader',authController.isAuthenticated,authController.isLevel,(req,res)=>{
  res.render('herramientasTeamLeader.ejs',{user:req.user});
});

router.get('/vistaAdministrador',authController.isAuthenticated,authController.isAdmin,(req,res)=>{
  res.render('vistaAdministrador.ejs',{user:req.user});
});

//Rutas de la Base de Datos.
    //Buscar usuarios.
router.get('/buscarUsuarios',(req,res)=>{

  conexion.query('SELECT codigoUsuario,correo,contrasena,nombreCompleto,codigoNivel FROM Usuarios',(error,results)=>{
    if(error){
      throw error;
    }else{
      res.render('busquedaUsuarios.ejs',{results:results});
    };
  });
});
    //Editar Registro de Usuario.
router.get('/edit/:id',authController.isAuthenticated,authController.isAdmin,(req,res)=>{
  const id= req.params.id;
  conexion.query("SELECT codigoUsuario,correo,contrasena,empresa,nombreCompleto,codigoNivel FROM Usuarios WHERE codigoUsuario ='"+id+"'",(error,results)=>{
    if(error){
      throw error;
    }else{
      res.render('editarUsuarios.ejs',{user:results[0]});
    };
  });
});
router.post('/update',authController.update);
    //Eliminar Usuarios.
router.get('/delete/:id',authController.isAuthenticated,authController.isAdmin,(req,res)=>{
  const id= req.params.id;
  conexion.query("DELETE FROM Usuarios WHERE codigoUsuario='"+id+"'",(error,results)=>{
    if(error){
      throw error;
    }else{
      res.redirect('/buscarUsuarios');
    };
  });
});


//Metodos para administración de de páginas y accesos
router.post('/registrosUsuarios',authController.registro);
router.post('/login',authController.login);
router.get('/logout',authController.logout);
//Meotods para Menu de productos por País

router.get('/productoGuatemala',authController.isAuthenticated,authController.guatemala);
router.get('/productoSalvador',authController.isAuthenticated,authController.elSalvador);
router.get('/productoHonduras',authController.isAuthenticated,authController.honduras);
router.get('/productoNicaragua',authController.isAuthenticated,authController.nicaragua);
router.get('/productoCostaRica',authController.isAuthenticated,authController.costaRica);
router.get('/productoPanama',authController.isAuthenticated,authController.panama);
router.get('/productoRepublicaDominicana',authController.isAuthenticated,authController.republicaDominicana);

//Metodos para Vistas de Productos
router.get('/productoEcoslim',authController.isAuthenticated,productoPais.ecoslim);
router.get('/productoBlackLatte',authController.isAuthenticated,productoPais.blackLatte);
router.get('/productoAbgyminic',authController.isAuthenticated,productoPais.abgyminic);
router.get('/productoTitanGel',authController.isAuthenticated,productoPais.titanGel);
router.get('/productoTitanGold',authController.isAuthenticated,productoPais.titanGold);
router.get('/productoMensDefence',authController.isAuthenticated,productoPais.mensDefence);
router.get('/productoGyronix',authController.isAuthenticated,productoPais.gyronix);
router.get('/productoTridentex',authController.isAuthenticated,productoPais.tridentex);
router.get('/productoFlekosteel',authController.isAuthenticated,productoPais.flekosteel);
router.get('/productoLuteVid',authController.isAuthenticated,productoPais.luteVid);
router.get('/productoVarikosette',authController.isAuthenticated,productoPais.varikosette);
router.get('/productoMultica',authController.isAuthenticated,productoPais.multica);
router.get('/productoNeoritm',authController.isAuthenticated,productoPais.neoritm);
router.get('/productoIncasol',authController.isAuthenticated,productoPais.incasol);
router.get('/productoGojiCream',authController.isAuthenticated,productoPais.gojiCream);
router.get('/productoInnoGialuron',authController.isAuthenticated,productoPais.innoGialuron);
router.get('/productoCleoBio',authController.isAuthenticated,productoPais.cleBio);
router.get('/productoRechiol',authController.isAuthenticated,productoPais.rechiol);
router.get('/productoUpSize',authController.isAuthenticated,productoPais.upSize);
router.get('/productoEnergySaver',authController.isAuthenticated,productoPais.energySaver);
router.get('/productoBeautyBar',authController.isAuthenticated,productoPais.beautyBar);
router.get('/productoMoneyAmulet',authController.isAuthenticated,productoPais.moneyAmulet);
module.exports = router;
