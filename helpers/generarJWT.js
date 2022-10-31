const jwt = require("jsonwebtoken");

// recibe el id del usuario como parametro, para generar el token unico
  // para ese usuario jwt toma dos valores -> el nombre  del usuario y la palabra secreta del token 
const generarJWT = (id)=>{ 
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "10d", // expira en 10 dias
    }) 
}   

module.exports = generarJWT;