/**
 * Hospitales
 * 
 * Ruta:  '/api/hospitales'
 */


 const { Router } = require('express');
 const { check } = require('express-validator');
 const { validateFields } = require('../middlewares/validate-fields');

 const router = Router();

 const { validarJWT } = require('../middlewares/validar-jwt');
 
 const {
        getHospitales,
        crearHospital,
        actualizarHospital,
        borrarHospital
 } = require('../controllers/hospitales-controller');

 router.get('/', getHospitales);
 
 
 router.post('/',
     [
         validarJWT,
         check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
         validateFields
    ],
     crearHospital
 );
 
 router.put('/:id',
     [],
     actualizarHospital
 );
 
 router.delete('/:id',
     borrarHospital
 );
 
 
 
 
 
 
 module.exports = router;