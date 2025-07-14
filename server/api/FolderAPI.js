const express = require('express');
const router = express.Router();
const {Folder} = require('../model');

// For Sending All Folders
router.get('/', async(req,res)=>{
    const folders = await Folder.find();
    res.status(200).json(folders);
})

// For Adding a New Folder
router.post('/', async(req,res)=>{
    const {folderName, notes} = req.body;
    const folder = new Folder({ folderName : folderName, notes : notes});
    const save =  await folder.save();
    res.status(201).json(folder);
    console.log("Done", folder, notes);
})

router.put('/', async(req,res)=>{
    const {_id, folderName, notes} = req.body;
    const folder = Folder.findByIdAndUpdate(_id,{folderName, notes}, {new : true});
    await folder.save();
    res.status(200).json(folder);
})
module.exports = router;