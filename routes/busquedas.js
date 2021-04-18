/**
 * Busquedas
 * 
 * Ruta: api/todo
 * 
 */

 const { Router } = require('express');
 const { check } = require('express-validator');
 const { validateFields } = require('../middlewares/validate-fields');

 const router = Router();

 const { validarJWT } = require('../middlewares/validar-jwt');
 const {
    getBusqueda,
    getCollection
} = require('../controllers/busqueda-controller');

 router.get('/:busqueda', validarJWT , getBusqueda);
 
 
 router.get('/coleccion/:tabla/:busqueda', validarJWT , getCollection);


 module.exports = router;