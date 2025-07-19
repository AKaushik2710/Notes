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
    console.log(folderName, notes);
    const folder = new Folder({ folderName : folderName, notes : notes});
    const save =  await folder.save();
    res.status(201).json(folder);
    console.log("Done", folder, notes);
})

router.put('/', async(req,res)=>{
    const {_id, folderName, notes} = req.body;
    console.log(notes);
    const folder = await Folder.findByIdAndUpdate(_id,{folderName, notes}, {new : true});
    // await folder.save();
    res.status(200).json(folder);
})

router.get('/:id', async(req,res)=>{
    const {id} = req.params;
    const folder =  await Folder.findById(id).populate('notes');
    if(!folder){
        return res.status(404).json({_id : "", folderName : undefined, notes : []});
    }
    res.status(200).json(folder);
    console.log("Folder found", folder);
})

router.delete('/', async(req,res)=>{
    const {_id} = req.body;
    console.log("Delete this", _id);
    const folder = await Folder.findByIdAndDelete(_id);
    if(!folder){
        return res.status(404).json({message : "Folder Not Found"});
    }
    res.status(200).json(_id);
})
module.exports = router;