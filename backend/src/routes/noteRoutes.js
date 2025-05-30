import express from 'express';

const router = express.Router();

import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/notesContollers.js';

router.route('/').get(getAllNotes).post(createNote);
router.route('/:id').get(getNoteById).put(updateNote).delete(deleteNote);

export default router;
