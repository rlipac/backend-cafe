
const { Router } = require('express');
// expres validator
const { check } = require('express-validator');


// MIDLERARES   
const  checkAuth  = require('../middlewares/authenticar')
const  { validarCampos } = require('../middlewares/validarCampos');
const {  esRolEmpleado, esAdminRol } = require('../middlewares/validarRoles');

// controllers
const { saveCategoria,
         listarCategorias,
         listaTodasLasCategorias,
         obtnerCategoria,
         UpdateCategoria,
         deleteCategoria
         } = require('../controllers/categoriaController');
const { listarTodosLosusuarios } = require('../controllers/userControllers');


const router = Router() // creando ruta

router.get('/',   listarCategorias);
router.get('/listar-categorias',[
                checkAuth,
                esAdminRol,
                validarCampos
               ], listaTodasLasCategorias);
router.post('/',[
                checkAuth,
                check('name', 'campo vacio o invalido')
                .not()
                .isEmpty(),
                check('descripcion', 'campo vacio o invalido')
                .not()
                .isEmpty(),
                esAdminRol,
                validarCampos
               ], saveCategoria);
               
router.get('/:id',  [
                    checkAuth,
                    check('id', 'NO ES IN ID VALIDO').isMongoId(),
                    esRolEmpleado,
                ], obtnerCategoria);
router.put('/:id', checkAuth, UpdateCategoria);
router.delete('/:id', checkAuth, deleteCategoria);





module.exports = router;