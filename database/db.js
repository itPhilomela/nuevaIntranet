const mysql = require('mysql');
var db_config = {
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE,
};

var conexion = handleDisconnect();

function handleDisconnect(){
  console.log('Estoy ejectuando la base');
   const connection = mysql.createConnection(db_config);
  connection.connect(function(error){
    if(error){
      console.log('El error de la conexión la bd es: '+error);
      setTimeout(handleDisconnect(), 2000);
    }
    console.log('Conexión exitosa a la base.');
    return connection;
  });

  connection.on('error',function(err){
      console.log('db error',err);
      if(err.code==='PROTOCOL_CONNECTION_LOST'){
        handleDisconnect();
      }else{
        throw err;
      };
  });
  return connection;
};



module.exports = conexion;
