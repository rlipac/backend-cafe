
const { Schema, model, Types } = require('mongoose')

const productosSchema = Schema({
    name:{ type: String, required:[true, 'El nombre de la categoria es oblogatorio'], trim:true},
    descripcion:{ type:String, trim:true},
    marca:{type: String, required: true, trim: true},
    precio:{ type:Number},
    stock:{ type:Number},
    imageUrl:{ 
        type:String,
        default:'https://cdn-icons-png.flaticon.com/512/2835/2835571.png'
    },
    categoria:{
        type:Types.ObjectId, // id del categoria
        ref: "Categoria", // Modelo categoria
    },
    subCategoria:{
        type:Types.ObjectId, // id del SubCategoria
        ref: "SubCategoria", // Modelo  SubCategoria
    },
    creador:{
        type:Types.ObjectId,
        ref:'Usuario'
    },
    estado:{ type:Boolean, default:true }
})


module.exports = model('Producto', productosSchema);