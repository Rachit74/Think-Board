import Note from "../models/Notes.js";
import Notes from "../models/Notes.js";


export async function getAllNotes(req, res) {
    try {
        const notes = await Notes.find();
        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function createNote(req, res) {
    try {

        const { title, content } = req.body;
        console.log(title, content);

        const note = new Note({title: title, content: content});

        const savedNote = await note.save();
        res.status(201).json(savedNote);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function updateNote(req, res) {
    try {
        const { title, content } = req.body;
        const noteId = req.params.id;
        const updatedNote = await Note.findByIdAndUpdate(
            noteId,
            {title, content},
            {new: true}
        );

        if (!updatedNote) return res.status(404).json({
            message: "Note not found"
        });


        res.status(200).json(updatedNote );
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export async function deleteNote(req, res) {
    try {
        const noteId = req.params.id;
        const note = await Note.findByIdAndDelete(noteId);

        if (!note) return res.status(404).json({
            message: "Note not found!"
        });

        res.status(200).json({
            message: "Note Deleted!",
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export async function getNoteById(req, res) {
    try {
        const noteId = req.params.id;

        const note = await Note.findById(noteId);

        if (!note) return res.status(404).json({
            message: "Note not found!",
        });

        res.status(200).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}