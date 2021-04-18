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
        borrarMedico
 } = require('../controllers/medicos-controller');

 router.get('/', getMedicos);
 
 
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
     [ ],
     actualizarMedico
 );
 
 router.delete('/:id',
    borrarMedico
 );
 
 
 
 
 
 
 module.exports = router;