const { response, request } = require('express');

//Model
const Usuario = require('../models/usuarios');

//Helpers
const generarTokenId = require('../helpers/generarTokenId.js')






const creandoSuperusuario = async (req = request, res = response) => {
    console.log('CREANDO SUPER USUARIO.....')
    // console.log(req.body, '==>')


    try {

        const firstName = 'super';
        const lastName = 'usuario';
        const email = 'superusuario@gmail.com';
        const password = '123456';
        const role = 'ADMIN';
        const token = generarTokenId()

        //  const {firstName,lastName,email,password,role}=req.body

        const superUsuario = await new Usuario({ firstName, lastName, email, password, role, token });

        const SuperExiste = await Usuario.findOne({ email: email })
        if (!SuperExiste) {

            await superUsuario.save();

            return console.log(superUsuario)
            console.log(' FELICITACIONES!!... SUPER USUARIO SE GURADO USUARIO');
        }
        console.log(`el role ${role} ya a sido creado`)


    } catch (error) {
        console.log(`Este es el error ==> ${error} `)
    }
}

creandoSuperusuario()

const listarUsuarios = async (req, res) => {
    console.log('listar usuarios')
    try {
        // //?otra manera de hacerlo //Usuario.find().$where('this.email != "superusuario@gmail.com"')//$where actua diferente que where
        const usuarios = await Usuario.find({email:{$ne:'superusuario@gmail.com'}})//$ne seleciona todos menos el elemento asignado
                                      .where({ estado: true })
                                      .select('-estado -password -token -createdAt -updatedAt  -__v')
                                     // .skip(1)// ignora el prier elemento

        //contar Usuarios

        let conteo = []
        for (let elemento in usuarios) {
            conteo.push(elemento)
        }
        const totalUsers = conteo.length;



        //fin contar categorias

        return res.status(200).json({
            msg: 'Lista de usurios',
            totalUsers,
            usuarios
        })

    } catch (error) {
        return res.status(403).json({
            msg: ` error ${error} =>`
        })
    }
    res.end()
}

const listarTodosLosusuarios = async (req, res) => {
    console.log('listando usuearios..')

    try {
        const usuarios = await Usuario.find({email:{$ne:'superusuario@gmail.com'}});


        let conteo = []
        for (let elemento in usuarios) {
            conteo.push(elemento)
        }
        const totalUsers = conteo.length;

        res.status(200).json({
            totalUsers,
            usuarios
        })
        console.log(usuarios)
    } catch (error) {

    }

}


const saveUser = async (req, res) => {
    console.log('Guardar. usuarios')
    try {
        const { firstName, lastName, email, password, role } = req.body;

        const newUser = new Usuario({ firstName, lastName, email, password, role });
        console.log(firstName, lastName, password, email, role)
        const userExiste = await Usuario.findOne({ email: email });

        if (userExiste) {
            return res.status(301).json({ msg: `El usuario ${email} ya existe en esta BD` })
        }
        await newUser.save()

        res.status(200).json({
            Usuario: newUser,
            msg: `el usuario ${email} se creo correctamente`
        }

        );

    } catch (error) {
        console.log(error)
        res.status(401).json({ msg: `${error}` })
    }

    res.end()
}

const obtenerUsuario = async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findById(id)

    if (!usuario) {
        return res.status(403).json({
            msg: ` no existe un usuario con el id ${id} o esta desabilitado`
        })
    }
    return res.status(200).json({
        msg: `Respuesta existosa`,
        usuario
    })

}

const editarUsuario = async (req, res) => {
    console.log('editando usuario..')

    try {
        const { id } = req.params;
        const { password, token, email, ...data } = req.body;
        // const updateUsuario = new Usuario({ firstName, lastName, email, role});

        const updateUsuario = await Usuario.findByIdAndUpdate(id, data, { new: true }) // {new: true} -> comnado de MongoDB que guarda lso cambios en la Bd

        return res.status(200).json({
            msg: `el Usuario ${data.email} a sido actualizado correctamente`,
            updateUsuario
        })
    } catch (error) {
        return res.status(403).json({
            msg: `${error}`

        })
    }
    res.end()
}

const eliminarUsuario = async (req, res) => {

    console.log('Eliminando usuario...')
    try {
        const { id } = req.params;


        const usuarioEliminado = await Usuario.findByIdAndUpdate(id, { estado: false }, { new: true }) // {new: true} -> comnado de MongoDB que guarda lso cambios en la Bd

        return res.status(200).json({
            msg: `el Usuario ${usuarioEliminado.email} a sido ELIMINADO correctamente`,
            usuarioEliminado
        })
    } catch (error) {
        return res.status(403).json({
            msg: `${error}`

        })
    }
    res.end()
}



module.exports = {
    listarTodosLosusuarios,
    listarUsuarios,
    saveUser,
    obtenerUsuario,
    editarUsuario,
    eliminarUsuario
}