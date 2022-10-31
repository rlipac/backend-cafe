const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuarios')

const checkAuth =  async (req, res, next )=>{
    console.log("hola desde checkAuth")
    let token;

if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    try {
         token = req.headers.authorization.split(" ")[1]; // crea un array y elemina el espacio en blaco luego guarda solo el elemto en la pociion 1 del array
         const decoded = jwt.verify(token, process.env.JWT_SECRET  );// devueve un objeto decodificado con los datos del usuario
        //  req.usuario = await Usuario.findById(decoded.id).select("-email -password -token -confirmado",); // creacmo la variable usuario en el request con el ID que viene el el token  para poder manejar las sesiones de ese usuario
          req.usuario = await Usuario.findById(decoded.id).select("_id firstName email role");
           // select("coloca el o los campos que quieres ver en la respuesta o simbolo - si los ciqres exluir ejmp( -password )") 
        console.log(req.usuario) // req.usuario sirve para identificar al usuario/ se lansa al ejecutar cada ruta
        return next()
    }catch (error) {    
        console.log(error)
        return res.status(404).json({ msg: "Huboo Un Error "})
       
    } 
}
if(!token){
    const error = new Error("Token NO valido")
    return res.status(404).json({ msg: error.message })
}




    next() // ejecuta la siguiente funcion
}

module.exports = checkAuth;