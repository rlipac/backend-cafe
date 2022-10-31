const { response, request } = require('express');
//Modelos


const SubCategoria = require('../models/subCategorias');

const todasLasSubCategorias = async(req, res)=>{
    console.log('listar todas subCatego...')
    try {
        const subCategorias = await SubCategoria.find().populate('categoria', 'name creador ').select('-__v');
       
     //contar categorias

        let conteo = []
        for(let elemento in subCategorias) {
        conteo.push(elemento)
        }
        const totalSubCategorias = conteo.length;  

    //fin contar categorias

      return  res.status(200).json({
            msg:`Listando categorias`,
            totalSubCategorias,
            subCategorias
        })
    } catch (error) {
       return res.status(401).json({
            msg:` ${error} en  Listando categorias`,
           
        })
    }   
    res.end()
}

const listSubCatego = async(req, res ) =>{
    console.log('listar subCatego...')
    try {
        const subCategorias = await SubCategoria.find()
                                                .where({estado:true})
                                                .populate('categoria', 'name').select('-__v')
                                               
       //contar categorias

       let conteo = []
       for(let elemento in subCategorias) {
       conteo.push(elemento)
       }
       const totalSubCategorias = conteo.length;  

   //fin contar categorias

       res.status(200).json({
           msg:`Listando categorias`,
           totalSubCategorias,
           subCategorias
       })
    } catch (error) {
       return res.status(401).json({
            msg:` ${error} en  Listando categorias`,
           
        })
    }   
    res.end()
}
const newSubCatego = async(req, res ) =>{
    console.log(' nueva categoria...');
 try {

        const { name, descripcion, categoria } = req.body;
        // buscar subcategoria name cuando la categoria de la Subcategoria  sea igual al  categoria del body
       const yaExiste = await SubCategoria.findOne({ name: `${name}` }).where('categoria').equals(categoria)
       
       console.log(yaExiste);

       if(yaExiste){
        return res.status(401).json({
            msg:` la  subCategoria con  ${name} en  ya existe en la categoria con el ID ${categoria}`,
           
        })
       }
     
        const newSubCategoria = new SubCategoria({ name, descripcion, categoria});

        await newSubCategoria.save();
        return res.status(200).json({
            newSubCategoria,
            msg:`la subcategoris ${name} se creo correctamente`
        })
        
    } catch (error) {
        res.status(401).json({
            msg:` ${error} en  Guardar categorias`,
           
        }) 
    }
    res.end()
}

const obtenerSubCatego = async(req, res ) =>{
    console.log('lista Sub catego..')
    try {
        const { id }= req.params;
        const subCategorias = await SubCategoria.findById(id).populate('categoria', 'name').select('-__v')
        if(!subCategorias){
            return res.status(401).json({
                msg:` La sub subCatgoria con el id ${id} no existe`,
               
            }) 
        }                                 
      return res.status(200).json({
           msg:`sub categoria`,
           subCategorias
       })
    } catch (error) {
       return res.status(401).json({
            msg:` ${error} en  Listando categorias`,
           
        })
    } 
    res.end()
}
const updateSubCatego = async(req, res ) =>{
    console.log('update.. Sub catego..')

    try {
        const { id }= req.params;
        const {_id, ...data} = req.body;
        const upSubCatego = await SubCategoria.findByIdAndUpdate(id, data, { new: true }) 

        return res.status(200).json({
            msg:`sub categoria`,
            upSubCatego
        })

    } catch (error) {
        return res.status(401).json({
            msg:` ${error} en  update subCategorias`,
           
        })
    }
    res.end()
}
const delSubCatego = async(req, res ) =>{
    console.log('lista Sub catego..')
    res.end()
}


module.exports ={
    listSubCatego,
    todasLasSubCategorias,
    newSubCatego,
    obtenerSubCatego,
    updateSubCatego,
    delSubCatego
}