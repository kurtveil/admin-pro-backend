const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/user');
const { generarJWT } = require('../helpers/jwt');

const login = async (req, res = response) => {

    const {email, password} = req.body;
    try {
        // Verifica el email 
        const usuarioDB = await Usuario.findOne({email});
        if (!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Valida la contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if (!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            });
        }

        // Generar un TOKEN -JWT
        const token = await generarJWT(usuarioDB._id);


        res.json({
            ok: true,
            token
        });
    } catch (e) {

        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    login
}