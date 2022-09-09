const { Schema, model } =  require('mongoose');

const OfertaSchema = Schema({

    nombre: {
        type: String,
        require: true
    },
    descuento: {
        type: Number,
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    caducidad: {
        require: true,
        type: Date
    }

}, {collection: 'ofertas'});


OfertaSchema.method('toJSON', function() {
    const {__v, ...object} = this.toObject();


    return object;
})


module.exports = model( 'Oferta' , OfertaSchema );