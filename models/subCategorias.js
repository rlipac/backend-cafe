const { Schema, model, Types } = require('mongoose')

const subCategoriasSchema = Schema({
    name:{ type: String, required:[true, 'El nombre de la categoria es oblogatorio'], trim:true},
    descripcion:{ type:String, trim:true},
    categoria:{
        type:Types.ObjectId, // id categoria
        ref: "Categoria", // Modelo Categoria
    },
    estado:{ type:Boolean, default:true }
})


module.exports = model('SubCategoria', subCategoriasSchema);