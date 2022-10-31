const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

// helpers


// MIDLERARES   
const checkAuth = require('../middlewares/authenticar')
const { validarCampos } = require('../middlewares/validarCampos');
const { tieneRole, esAdminRol, esRolEmpleado } = require('../middlewares/validarRoles');
const { emailExiste,
    rolExiste,
    userIdExiste,
} = require('../helpers/db-validators')


// controllers
const {
    listarUsuarios,
    listarTodosLosusuarios,
    saveUser,
    obtenerUsuario,
    editarUsuario,
    eliminarUsuario

} = require('../controllers/userControllers')

// router.get('/', creandoSuperusuario  )
router.get('/', listarUsuarios);
router.get('/listar-usuarios', [
                    checkAuth,
                    esAdminRol,
                    validarCampos
                ],  listarTodosLosusuarios)
router.post('/', [
                    checkAuth,
                    check('firstName', 'campo vacio o invalido').not().isEmpty(),
                    check('lastName', 'campo vacio').not().isEmpty(),
                    check('password', 'La contraseña tiene que tener mas de 6 caracteres y como maximo 30').isLength({ min: 6, max: 30 }),
                    check('email', 'correo no valido').isEmail(),
                    check('email').custom(emailExiste),
                    tieneRole('ADMIN', 'EMPLEADO', 'CLIENTE'),
                    esAdminRol,
                    validarCampos
                ], saveUser)

router.get('/:id', [
                        checkAuth,
                        check('id', 'NO ES IN ID VALIDO').isMongoId(),
                        esRolEmpleado,
                    ], obtenerUsuario);

router.put('/:id', [
                        checkAuth,
                        check('id', 'NO ES IN ID VALIDO').isMongoId(),
                        check('firstName', 'campo vacio o invalido').not().isEmpty(),
                        check('lastName', 'campo vacio').not().isEmpty(),
                        check('email', 'correo no valido').isEmail(),
                        check('email').custom(emailExiste),
                        tieneRole('ADMIN', 'EMPLEADO', 'CLIENTE'),
                        esAdminRol
                    ], editarUsuario)

router.delete('/:id', [
                            checkAuth,
                            check('id', 'NO ES IN ID VALIDO').isMongoId(),
                            esAdminRol,
                     ], eliminarUsuario)



module.exports = router;