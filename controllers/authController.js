
const Usuario = require('../models/usuarios');
// helpers
const generarJWT = require('../helpers/generarJWT')

const Login = async (req, res )=>{
    console.log('Login..  Usuario....')
    
    try {
        
        const { email, password }= req.body;

    const usuario= await Usuario.findOne({email:email});
    if(!usuario){
        return res.status(401).json({ msg: `El usuario ${email} no existe en esta BD`})
    }
    if( await usuario.comprobarPassword(password)){
        return res.status(200).json({
            _id:usuario._id,
            firstName: usuario.firstName,
            lastname:usuario.lastName,
            email:usuario.email,
            jwToken: generarJWT(usuario._id),
            msg:'usuario Logeado correactamente'
        })
    }else{
        res.status(403).json({
            msg:`el password o el usuario no son correactos`
        })
    }
    
    console.log(usuario)

    } catch (error) {
        console.log(error)
    }

    

}


const perfil = (req, res) => {
  
    const { usuario } = req;
    res.status(200).json(usuario)
 }


module.exports ={
    
    Login,
    perfil
}