const Note = require('../models/Note');

const getNotes = async (req, res) => {
  try {
    const { tag, search } = req.query;
    let query = { userId: req.user._id };

    // Filter by tag
    if (tag) {
      query.tags = { $in: [tag] };
    }

    let notes = await Note.find(query)
      .sort({ createdAt: -1 })
      .select('title content tags createdAt');

    // Search in title and content
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      notes = notes.filter(note => 
        searchRegex.test(note.title) || searchRegex.test(note.content)
      );
    }

    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, content, tags = [] } = req.body;

    const note = new Note({
      userId: req.user._id,
      title,
      content,
      tags: tags.filter(tag => tag.trim()) // Remove empty tags
    });

    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const noteId = req.params.id;

    const note = await Note.findOneAndUpdate(
      { _id: noteId, userId: req.user._id },
      { 
        title, 
        content, 
        tags: tags ? tags.filter(tag => tag.trim()) : undefined 
      },
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTags = async (req, res) => {
  try {
    const tags = await Note.aggregate([
      { $match: { userId: req.user._id } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $project: { tag: '$_id', count: 1, _id: 0 } }
    ]);

    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  getAllTags
};