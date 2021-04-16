const mongoose = require('mongoose');


const dbConection = async() => {

    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    
    } catch (error) {

        console.log(error);
        throw new Error('Error a la hora de iniciar la bd ver logs');
    }



}

module.exports = {
    dbConection
}