const Usuario = require('../models/usuarios');

const emailExiste = async (email) =>{
  // buscar si correo existe
  const useEmail = await Usuario.findOne({email})

  if(useEmail){
    throw new Error(`EL EMAIL ${email}  YA ESTA REGISTRADO `);
  }
}

// const rolExiste = async (role="") =>{
//   const buscarRol = await Role.findOne({role});
//   if(!buscarRol){
//     throw new Error(`EL  ${role} NO ES UN ROL VALIDO `);
//   }
// }



const rolExiste = ( ...roles ) =>{ // ...roles crea un copia del array rol que le pasamos la ruta
  return ( req= request, res = reponse, next ) =>{

    if(!req.usuario){

      throw new Error('se requiere verificar primero el token si es valido')
      
    }
    if(!roles.includes( req.usuario.role ) ){
      throw new Error(`EL   NO ES UN ROL VALIDO `);
     
    }
    next();
  }
}


const userIdExiste = async (id)=>{
  const idExiste = await Usuario.findById(id);
  if(!idExiste){
    throw new Error(`EL  ${id} NO ES esta REGISTRADO `);
  }
}



module.exports={
  emailExiste,
  rolExiste,
  userIdExiste
  
}