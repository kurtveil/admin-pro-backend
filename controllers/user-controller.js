
const { response } = require('express');
const Usuario = require('../models/user');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [usuarios, total]  = await Promise.all([
     Usuario
        .find({}, 'nombre email role google img')
        .skip( desde )
        .limit( 5 ),
    Usuario.countDocuments()
    ]);

    res.json({
        ok: true,
        usuarios,
        total
    });

}

const createUser = async(req, res = response) => {

    const { email, password} = req.body;
 
    try {

        const exiteEmail = await Usuario.findOne({ email })

        if ( exiteEmail ){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registadro!'
            });
        }

        const usuario = new Usuario(req.body);

        // Encriptar contraseña 
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // Guardar Usaurio
        await usuario.save();
       // Generar un TOKEN -JWT
       const token = await generarJWT(usuario.id);
       
        res.json({
            ok: true,
            usuario,
            token
        });
    
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
  
}


const updateUser = async (req, res) => {
    
    // TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;
    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }
        
        
        // Actualizaciones
        const { password, google, email,...campos} = req.body;

        if (usuarioDB.email !== email){
       
            const exiteEmail = await Usuario.findOne({email })
            if (exiteEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya exite un usuario con ese email'
                });
            }
        }
        campos.email = email;
        // delete campos.password;
        // delete campos.google;
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, {new: true} );


        res.json({
            ok:true,
            usuario: usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado update user'
        });
    }
}

const deleteUser = async (req , res = response) => {
    const uid = req.params.id;
    try {

        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }
        await Usuario.findByIdAndDelete(uid);

        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte al administrador'
        })
    }
}
module.exports = {
    getUsuarios,
    createUser,
    updateUser,
    deleteUser
}