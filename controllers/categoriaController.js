const { request, response } = require('express');

// model
const Categoria = require('../models/categorias')



const listarCategorias = async (req, res) => {
    console.log('Listar categorias...')

    const categorias = await Categoria.find().populate('creador', 'lastName email role -_id').where({estado:true});// exluimos el _id del creador
    //contar categorias 
        let conteo = []
        for(let elemento in categorias) {
        conteo.push(elemento)
        }
        const totalCategorias = conteo.length;
     //fin contar categorias
    return res.status(200).json({
        totalCategorias,
        categorias,
        msg: `categorias Lista`
    })
    res.end()
}
const listaTodasLasCategorias = async (req, res) => {
    console.log('Listar categorias')

    const categorias = await Categoria.find().populate('creador', 'lastName email role -_id');// exluimos el _id del creador
    
    //contar categorias

        let conteo = []
        for(let elemento in categorias) {
        conteo.push(elemento)
        }
        const totalCategorias = conteo.length;
        
   

    //fin contar categorias

    return res.status(200).json({
        totalCategorias,
        categorias,
        msg: `categorias Lista`
    })
    res.end()
}
const saveCategoria = async (req, res) => {
    console.log('Savectegoria....')
 
    try {

    const creador = req.usuario._id.toString();
    const { name, descripcion } = req.body
    console.log(name, descripcion, creador)
        const categoria = await Categoria.findOne({ name: `${name}` });

        if (categoria) {
            return res.status(401).json({
                msg: `La catgoria '${name}' ya existe, intente denuevo o consute con el administrador (error Controller)`
            })
        }


        const nuevaCategoria = new Categoria({ name, descripcion, creador });
        await nuevaCategoria.save();

        return res.status(200).json({
            nuevaCategoria
        })
    } catch (error) {
        return console.log(error)
    }

    res.end()

}

const obtnerCategoria = async (req, res) => {
    console.log('obtener categoria')
    try {
            const {id } = req.params;
            const categoria = await Categoria.findById(id)
            
            if(!categoria){
                return res.status(403).json({
                    msg:`La categoria  con el id ${id} no existe o esta desabilitada`
                })
            }
            return res.status(200).json({
                msg:`Respuesta existosa`,
                categoria
            })
    } catch (error) {
            return res.status(405).json({
                msg:`${error} `
            })
    }
    
}
const UpdateCategoria = async (req, res) => {
    console.log('edit categoria')
        try {
                const {id } = req.params;
                const { creador, ...data }= req.body;
                const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });
                
                if(!categoria){
                    return res.status(403).json({
                        msg:`La categoria  con el id ${id} no existe`
                    })
                }

                return res.status(200).json({
                    msg:`La categoria ${categoria.name} a sido actualizada correctamente c`,
                    categoria
                })
        } catch (error) {
                return res.status(405).json({
                    msg:`${error} `
                })
        }

}
const deleteCategoria =async (req, res) => {
    console.log('obtener categoria')
    try {
            const {id } = req.params;
            const categoria =  Categoria.findById(id)
           
            
            if(!categoria){
                return res.status(403).json({
                    msg:`La categoria  con el id ${id} no existe `
                })
            }
            if(categoria.estado == false){
                return res.status(403).json({
                    msg:`La categoria  con el  esta desabilitada`
                }) 
            }
            const categoriaEliminada = await Categoria.findByIdAndUpdate(id,{ estado:false}, { new: true })
            return res.status(200).json({
                msg:`La categoris ${categoria.name} a sido elimininada`,
                 categoriaEliminada
            })
    } catch (error) {
            return res.status(405).json({
                msg:`${error} `
            })
    }
    
}





module.exports = {
    saveCategoria,
    listarCategorias,
    listaTodasLasCategorias,
    obtnerCategoria,
    UpdateCategoria,
    deleteCategoria
}