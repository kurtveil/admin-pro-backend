/**
 * Ofertas
 * 
 * Ruta:  '/api/ofertas'
 */


const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getOfertas,
    crearOferta,
    actualizarOferta,
    borrarOferta
} = require('../controllers/ofertas-controller');

router.get('/', getOfertas);


router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre de la oferta es necesario').not().isEmpty(),
        validateFields
    ],
    crearOferta
);

router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre de la oferta es necesario').not().isEmpty(),
        validateFields
    ],
    actualizarOferta
);

router.delete('/:id',
    validarJWT,
    borrarOferta
);






module.exports = router;