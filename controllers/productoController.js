const { request, response } = require('express');

// models
const Producto =require('../models/productos');

const listarProductos = async(req, res ) =>{
     console.log('listar subCatego...')
    try {
        const productos = await Producto.find().populate('categoria', 'name -_id')
                                               .populate('subCategoria', 'name -_id')
                                               .populate('creador', 'email role -_id')
        res.status(200).json({
            msg:`Listando categorias`,
            productos
        })
    } catch (error) {
       return res.status(401).json({
            msg:` ${error} en  Listando Productos`,
           
        })
    }   
     res.end()
}
const saveProducto = async(req, res ) =>{
    console.log(' nuevo Producto...');

  try {

        const creador = req.usuario._id.toString();
        const { name, marca, descripcion,precio, stock, categoria, subCategoria } = req.body
        console.log(name, descripcion,precio, stock, categoria, subCategoria, creador )
         // buscar subcategoria name cuando la categoria de la Subcategoria  sea igual al  categoria del body      
       const productoExiste = await Producto.findOne({name:name})
                                            .where('categoria').equals(categoria)
                                            .where('subCategoria').equals(subCategoria)
      
       console.log(productoExiste);
     
       if(productoExiste){
        return res.status(401).json({
            msg:` El Producto   ${name} en  ya existe en esta sub Categoria con el ID ${subCategoria}`,
           
        })
       }
     
        const nuevoProducto = new Producto({ name, marca, descripcion, precio, stock, categoria, subCategoria, creador });
        await nuevoProducto.save();
        return res.status(200).json({
           
            msg:`EL Producto ${name} se creo correctamente`,
            nuevoProducto
        })
        
    } catch (error) {
        res.status(401).json({
            msg:` ${error} en  Guardar categorias`,
           
        }) 
    }
    res.end()
}

const editProducto = async(req, res ) =>{
    console.log('lista Sub catego..')
    res.end()
}
const updateProducto = async(req, res ) =>{
    console.log('lista Sub catego..')
    res.end()
}
const delProducto = async(req, res ) =>{
    console.log('lista Sub catego..')
    res.end()
}

module.exports = {
    listarProductos,
    saveProducto,
    editProducto,
    updateProducto,
    delProducto
}
