const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { protect } = require('../middleware/authMiddleware');

// Protect all note routes with JWT
router.use(protect);

// ==========================================
// 1. GET ALL NOTES FOR LOGGED-IN USER
// Endpoint: GET /api/notes
// Optional Query: /api/notes?category=study or /api/notes?search=javascript
// ==========================================
router.get('/', async (req, res) => {
  try {
    const filter = { user: req.user._id };

    // Optional category filter
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // Optional search keyword
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      filter.$or = [{ title: searchRegex }, { content: searchRegex }];
    }

    const notes = await Note.find(filter).sort({ isPinned: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notes',
      error: error.message,
    });
  }
});

// ==========================================
// 2. GET SINGLE NOTE BY ID
// Endpoint: GET /api/notes/:id
// ==========================================
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found',
      });
    }

    // Authorization check: User can only access their own note
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this note',
      });
    }

    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid note ID format',
      error: error.message,
    });
  }
});

// ==========================================
// 3. CREATE A NEW NOTE
// Endpoint: POST /api/notes
// Body: { "title": "React Hooks", "content": "useState and useEffect notes...", "category": "Frontend" }
// ==========================================
router.post('/', async (req, res) => {
  try {
    const { title, content, category, isPinned } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both title and content for the note',
      });
    }

    const newNote = await Note.create({
      user: req.user._id, // Tied to the logged-in user
      title: title.trim(),
      content: content.trim(),
      category: category || 'General',
      isPinned: isPinned || false,
    });

    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      data: newNote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create note',
      error: error.message,
    });
  }
});

// ==========================================
// 4. UPDATE A NOTE
// Endpoint: PUT /api/notes/:id
// Body: { "title": "Updated Title", "content": "Updated content..." }
// ==========================================
router.put('/:id', async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found',
      });
    }

    // Authorization check
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this note',
      });
    }

    note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Note updated successfully',
      data: note,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update note',
      error: error.message,
    });
  }
});

// ==========================================
// 5. DELETE A NOTE
// Endpoint: DELETE /api/notes/:id
// ==========================================
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found',
      });
    }

    // Authorization check
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this note',
      });
    }

    await Note.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Note deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to delete note',
      error: error.message,
    });
  }
});

module.exports = router;
