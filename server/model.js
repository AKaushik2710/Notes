const mongoose = require('mongoose');
const connectDB = require('./db');
require('dotenv').config();
connectDB(process.env.uri);


const noteSchema = new mongoose.Schema({
    heading : {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
});

const folderSchema = new mongoose.Schema({
    folderName : {
        type : String,
        required : true
    },
    notes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Note'
    }]
})

const Note = mongoose.model('Note', noteSchema);
const Folder = mongoose.model('Folder', folderSchema);
module.exports = {Note, Folder};