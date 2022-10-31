
const { Schema, model } = require('mongoose');

const bcrypt = require('bcrypt')

const UsuarioSchema = Schema({
      firstName:{
        type: String,
        required: [ true, 'El nombre es obligatorio']
      },
      lastName:{
        type: String,
        required: [ true, 'El nombre es obligatorio']
      },
      email:{
        type: String,
        required: [ true, 'email obligatorio'],
        unique:true
      },
      password:{
        type: String,
        required: [ true, 'El pasword es obligatorio']
      },
      imagenUrl:{ 
        type:String,
        default:'https://cdn-icons-png.flaticon.com/512/149/149071.png'
      },
      role:{
        type: String,
        required: [ true, 'Definir Rol es obligatorio'],
        default: 'CLIENTE',
        emun: [ 'ADMIN', 'EMPLEADO', 'CLIENTE' ]
      },
      token:{ type:String },
      estado:{
        type: Boolean,
      default: true
      }
      
}, { timestamps: true }
);

// se ejecuta anes de gguardar usuario
UsuarioSchema.pre('save', async function(next){
  // si el password NO se modifica el password sigue adelante y se guarda sino se hasshea de nuevo
  if(!this.isModified('password'))return next()

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt);// el password es ifual al la funcion hash( que reccibe como parametros al password y al salt)
  next()// siguiente
});
// comprobando password
UsuarioSchema.methods.comprobarPassword = async function(passwordIngresado){
  return await bcrypt.compare(passwordIngresado, this.password)// compara el password ingresado con el de la bada con la funcion bcryct
}


// UsuarioSchema.methods.toJSON = function(){
 
//   const {__v, password, imagenUrl, ...viewUsuario} = this.toObject();
//   // viewUsuario.uid = _id;
//   return  viewUsuario;
// }




module.exports = model( 'Usuario', UsuarioSchema );