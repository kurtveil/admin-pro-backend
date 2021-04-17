/**
 * Ruta: /api/usuarios
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { getUsuarios, createUser, updateUser, deleteUser } = require('../controllers/user-controller');
const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');


router.get('/', validarJWT,getUsuarios);


router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validateFields
    ],
    createUser
);

router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validateFields
    ],

    updateUser
);

router.delete('/:id',
    validarJWT,
    deleteUser
);






module.exports = router;