/**
 * Medicos
 * 
 * Ruta:  '/api/medicos'
 */


const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById
} = require('../controllers/medicos-controller');

router.get('/', validarJWT ,getMedicos);


router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El id del hospital debe ser valido').isMongoId(),
        validateFields
    ],
    crearMedico
);

router.put('/:id',
    [

        validarJWT,
        check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El id del hospital debe ser valido').isMongoId(),
        validateFields
    ],
    actualizarMedico
);

router.delete('/:id',
    validarJWT,
    borrarMedico
);

router.get('/:id',
    validarJWT,
    getMedicoById
);






module.exports = router;