import Note from '../models/Note.js';

export const getAllNotes = async (_, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ msg: 'something went wrong' });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ msg: 'Note not found' });

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ msg: 'Internal server error' });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const newNote = new Note({ title, content });

    await newNote.save();
    res.status(201).json({ newNote });
  } catch (error) {
    res.status(500).json({ msg: 'something went wrong!' });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!updatedNote) return res.status(404).json({ msg: 'Note not found' });

    res.status(200).json({ updatedNote });
  } catch (error) {
    res.status(500).json({ msg: 'something went wrong!' });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) return res.status(404).json({ msg: 'Note not found' });

    res.status(200).json({ deletedNote });
  } catch (error) {
    res.status(500).json({ msg: 'something went wrong!' });
  }
};
