/**
 * Path: '/api/login'
 */

const { Router } = require('express');
const { login, googleSingIn } = require('../controllers/auth-controller');
const { validateFields } = require('../middlewares/validate-fields');
const { check } = require('express-validator');

const router = Router();


router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validateFields
    ],
    login
);


router.post('/google',
    [
        check('token', 'El token de Google es obligatorio').not().isEmpty(),
        validateFields
    ],
    googleSingIn
);






module.exports = router;    