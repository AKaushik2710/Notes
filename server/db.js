const mongoose = require('mongoose');

const connectDB = async (uri)=>{
    try{
        return mongoose.connect(uri)
    }
    catch(err){
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); // Exit process with failure
    }
}

module.exports = connectDB;
