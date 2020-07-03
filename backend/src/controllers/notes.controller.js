const notesCtrl = {}

const Note = require('../models/Note')

notesCtrl.getNotes = async(req,res) => {
    const notes = await Note.find();
    res.json(notes)
}

notesCtrl.getNote = async(req,res) => {
    const {id} = req.params
    const note = await Note.findById(id)

    res.json(note)
};

notesCtrl.createNote = async (req,res) => {
    const {title,content,date, author} = req.body;
    const newNote = new Note({
        title,
        content,
        date,
        author
    })
    await newNote.save();
    res.json({message: "note created"})
}

notesCtrl.updateNote = async (req,res) => {
    const {id} = req.params
    const {title,content, author,date} = req.body;
    await Note.findOneAndUpdate(id,{
        title,
        content,
        author,
        date
    })
    res.json({message: "note updated satisfactory"})
}

notesCtrl.deleteNote = async(req,res) => {
    const {id} = req.params
    await Note.findByIdAndRemove(id)
    res.json({message: "note deleted"})
}



module.exports = notesCtrl;
