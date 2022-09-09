const { response } = require('express');
const Oferta = require('../models/oferta');


const getOfertas = async (req, res = response) => {
    const ofertas = await Oferta.find()
        .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        ofertas: ofertas
    });



}

const crearOferta = async (req, res = response) => {

    const uid = req.uid;
    const oferta = new Oferta({
        usuario: uid,
        ...req.body
    });

    try {

        const ofertaDB = await oferta.save();

        res.json({
            ok: true,
            oferta: ofertaDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


}

const actualizarOferta = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;
    try {
        const oferta = await Oferta.findById(id);
        if (!oferta) {
            return res.status(404).json({
                ok: true,
                msg: 'Oferta no encontrado por el id',
            });
        }

        // Actualizar el nombre
        const cambiosOferta = {
            ...req.body,
            usuario: uid
        };

        const ofertaActualizado = await Oferta.findByIdAndUpdate(id, cambiosOferta, { new: true });

        res.json({
            ok: true,
            oferta: ofertaActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


const borrarOferta = async (req, res = response) => {

    const id = req.params.id;
    try {
        const oferta = await Oferta.findById(id);
        if (!oferta) {
            return res.status(404).json({
                ok: true,
                msg: 'Oferta no encontrado por el id',
            });
        }

        await Oferta.findByIdAndDelete(id);


        res.json({
            ok: true,
            msg: "Oferta eliminada"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}



module.exports = {
    getOfertas,
    crearOferta,
    actualizarOferta,
    borrarOferta
}