const express = require('express');

const cors = require('cors'); // permite que el baken se comunique con el fonten
// const fileUpload = require('express-fileupload'); // permite ller los archivos subidos por el cliente

const { dbConexion } = require('../database/conexionDB.js');

class Server { // creamos el servidor con las rutas y la bd
    constructor() {
        this.app = express(); // permite usuar express en la app.js
        this.port = process.env.PORT || 5000;

        //importamos las rutas
        this.authRoutes = require('../routes/authRoutes');
        this.usersRoutes = require('../routes/userRoutes');
        this.categoriasRoutes = require('../routes/categoriaRoutes');
        this.subCategoriasRoutes = require('../routes/subCategoriaRoutes');
        this.productosRoutes = require('../routes/productosRoutes');
      

        // rutas base
        this.ruta = {
            auth: '/API/auth',
            users: '/API/users',
            categoria: '/API/categorias',
            subCatego: '/API/subcatgorias',
            producto: '/API/productos'
           
        }

        // llamamos al la conexion de BD
        // this.conectarBD();
        this.conectarBD()

        // pasomos los Middlewares
        this.middlewares()

        // LLamamos a las rutas de la app
        this.routes()

    }

    // creamos la funcion para cotectar ala bd
    async conectarBD() {
        await dbConexion();
    }

    // Creamos los Moddlewares
    middlewares() {
        // CORS
        this.app.use(cors());
        // leer el body
        this.app.use(express.json());

        //this.app.use(express.urlencoded({ extended: true }));
        //acceso dircto al la carpeta Public
        this.app.use(express.static('public'));
        //

    }
    routes() {
        this.app.use(this.ruta.auth, this.authRoutes);
        this.app.use(this.ruta.users, this.usersRoutes);
        this.app.use(this.ruta.categoria, this.categoriasRoutes);
        this.app.use(this.ruta.subCatego, this.subCategoriasRoutes);
        this.app.use(this.ruta.producto, this.productosRoutes);
       
    }

    // levantando el servidor
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo el el puerto', this.port)
        })
    }
}


module.exports = Server;