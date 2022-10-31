const { Router } = require('express');
// expres validator
const { check } = require('express-validator');

const router = Router();

// MIDLERARES   
const  checkAuth  = require('../middlewares/authenticar')
const  { validarCampos } = require('../middlewares/validarCampos');
const {  esRolEmpleado, esAdminRol } = require('../middlewares/validarRoles');


// controllers
const {  listSubCatego,
         todasLasSubCategorias,
        newSubCatego,
        obtenerSubCatego,
        updateSubCatego,
        delSubCatego } = require('../controllers/subCategoriaController');


router.get('/', listSubCatego );
router.get('/listar-subcategorias',[
                checkAuth,
                esAdminRol,
                validarCampos
               ], todasLasSubCategorias )
router.post('/',[
                    checkAuth,
                    check('name', 'campo vacio o invalido')
                    .not()
                    .isEmpty(),
                    check('descripcion', 'campo vacio o invalido')
                    .not()
                    .isEmpty(),
                    check('categoria', 'No es in id invalido').isMongoId(),
                    esRolEmpleado,
                    validarCampos
                ], newSubCatego); 

     router.get('/:id',  [
                            checkAuth,
                            check('id', 'NO ES IN ID VALIDO').isMongoId(),
                            esRolEmpleado,
                        ], obtenerSubCatego )
 router.put('/:id',[
                        checkAuth,
                        check('name', 'campo vacio o invalido')
                        .not()
                        .isEmpty(),
                        check('descripcion', 'campo vacio o invalido')
                        .not()
                        .isEmpty(),
                        esRolEmpleado,
                        validarCampos
                    ], updateSubCatego )
// router.delete('/:id', checkAuth, delSubCatego )

module.exports = router