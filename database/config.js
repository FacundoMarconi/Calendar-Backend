const mongoose = require("mongoose");


const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('db_online')
    } catch (error) {
        console.log('Error initializing DB')
    }
}


module.exports = {
    dbConnection
}