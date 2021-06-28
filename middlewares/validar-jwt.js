const jwt = require("jsonwebtoken");
const Usuario = require('../models/user');


const validarJWT = (req, res, next) => {

    // Leer el token
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();

    } catch (e) {

        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

}

const validarAdminRole = async (req, res, next) => {

    const uid = req.uid;
    try {

        const usuarioDb = await Usuario.findById(uid);

        if (!usuarioDb) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if (usuarioDb.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios'
            });
        }

        next();
    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


}


const validarAdminRole_o_MismoUsuario = async (req, res, next) => {

    const uid = req.uid;
    const id = req.params.id;
    try {

        const usuarioDb = await Usuario.findById(uid);

        if (!usuarioDb) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if (usuarioDb.role === 'ADMIN_ROLE' || uid === id) {
            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios'
            });

        }

    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


}

module.exports = {
    validarJWT,
    validarAdminRole,
    validarAdminRole_o_MismoUsuario
}