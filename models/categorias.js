
const { Schema, model } = require('mongoose');



const CategoriaSchema = Schema({
    name:{ type: String, required:[true, 'El nombre de la categoria es oblogatorio'], trim:true,  unique:true},
    descripcion:{ type:String, trim:true},
    imagenUrl:{ type:String},
    estado:{ type:Boolean, default:true },
    creador:{
      type:Schema.Types.ObjectId,
      ref: 'Usuario'
  },


}, { timestamps: true }
);

CategoriaSchema.methods.toJSON = function(){
 
    const {__v, createdAt, updatedAt, ...viewCategoria} = this.toObject();
    // viewUsuario.uid = _id;
    return  viewCategoria;
  }
  

module.exports = model('Categoria', CategoriaSchema);



