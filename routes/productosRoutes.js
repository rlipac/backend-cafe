
const { Router } = require('express');
const { check } = require('express-validator');

const router = Router() // lanzando la ruta

// MIDLERARES   
const  checkAuth  = require('../middlewares/authenticar')
const  { validarCampos } = require('../middlewares/validarCampos');
const {  esRolEmpleado } = require('../middlewares/validarRoles');


// controllers
const { listarProductos,
        saveProducto,
        updateProducto,
        editProducto,
        delProducto } = require('../controllers/productoController');




router.get('/', listarProductos)
router.post('/',[
                checkAuth,
                check('name', 'campo vacio o invalido')
                .not()
                .isEmpty(),
                check('descripcion', 'campo vacio o invalido')
                .not()
                .isEmpty(),
                check('subCategoria', 'No es in id invalido').isMongoId(),
                esRolEmpleado,
                validarCampos
            ], saveProducto); 

router.get('/', editProducto )
router.put('/', updateProducto )
router.delete('/', delProducto )

module.exports = router