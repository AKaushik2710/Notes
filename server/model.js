const mongoose = require('mongoose');
const connectDB = require('./db');
require('dotenv').config();
connectDB(process.env.uri);

// Note Schema
const noteSchema = new mongoose.Schema({
    heading : {
        type: String
    },
    message: {
        type: String
    }
});

// Folder Schema
const folderSchema = new mongoose.Schema({
    folderName : {
        type : String
    },
    notes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Note'
    }]
})

// Create models for Note and Folder 
const Note = mongoose.model('Note', noteSchema);
const Folder = mongoose.model('Folder', folderSchema);
module.exports = {Note, Folder};