const express = require('express');
const cors = require('cors');
const app = express();
const {Note, Folder} = require('./model');
const NoteAPI = require('./api/NoteAPI');
const FolderAPI = require('./api/FolderAPI');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/notes', NoteAPI)

app.use('/folders', FolderAPI);

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})