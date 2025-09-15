const express = require('express');
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  getAllTags
} = require('../controllers/notesController');
const auth = require('../middleware/auth');
const router = express.Router();

// All routes are protected
router.use(auth);

router.get('/', getNotes);
router.post('/', createNote);
router.patch('/:id', updateNote);
router.delete('/:id', deleteNote);
router.get('/tags/all', getAllTags);

module.exports = router;