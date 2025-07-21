const express = require('express');
const router = express.Router();
const {Note} = require('../model');

// For sending all notes
router.get('/', async(req,res)=>{
    console.log(req.body);
    const data = await Note.find();
    res.status(200).json(data);
})

// For storing a new note
router.post('/',async(req,res)=>{
    const {heading, message} = req.body;
    if(heading === undefined && message === undefined){
        res.status(400).json({message: "Heading & Message are not defined"});
    }
    const note = new Note({ heading: heading, message: message});
    const save = await note.save();
    res.status(201).json(note);
})

// For deleting a note
router.delete('/', async(req,res)=>{
    const {_id} = req.body;
    const note = await Note.findByIdAndDelete(_id);
    console.log(_id)
    if(!note){
        console.error("Not found");
    }
    res.status(200).json(_id);
})

// For changing a note by ID
router.put('/', async (req, res) => {
    const { _id, heading, message } = req.body;
    console.log("Received PUT:", { _id, heading, message });

    const note = await Note.findByIdAndUpdate(_id, {heading, message}, {new : true});
    if (!note) {
        console.log("Note not found with ID:", _id);
        return res.status(404).json({ message: "Note not found" });
    }
    await note.save();
    res.status(200).json(note);
});

module.exports=router;