const { response, request } = require('express');

const esAdminRol = ( req, res = response, next ) =>{

  if(!req.usuario){
    return res.status(500).json({
      msg: 'se requiere verificar primero el token si es valido'
    });
  }
  const { role, firstName }= req.usuario;

  if( role != 'ADMIN' ){
    return res.status(401).json({
      msg: ` eL USUARIO ${firstName} no tiene los provilejos de ADMINISTRADOR`
    });
  }
  next();
}

const esRolEmpleado = ( req, res = response, next ) =>{

  if(!req.usuario){
    return res.status(500).json({
      msg: 'se requiere verificar primero el token si es valido'
    });
  }
  const { role, firstName }= req.usuario;
 

  if( role == 'EMPLEADO' || role == 'ADMIN' ){
    next();
   
  }else{
    return res.status(402).json({
      msg: ` eL USUARIO ${firstName} no tiene los provilejos de EMPLEADO ??`
    });
  }
 
}

const tieneRole = ( ...roles ) =>{ // ...roles crea un copia del array rol que le pasamos la ruta
  return ( req= request, res = reponse, next ) =>{

    if(!req.usuario){
      return res.status(500).json({
        msg: 'se requiere verificar primero el token si es valido'
      });
    }
    if(!roles.includes( req.usuario.role ) ){
      return res.status(402).json({
        msg: `se requiere ALGUNO DE ESTOS ROLES => ${roles}`
      });
    }
   
    console.log( 'rolde mi usuario ==> '.blue  + req.usuario.role);
    next();
  }
}


module.exports = {
  esAdminRol,
  tieneRole,
  esRolEmpleado
}
