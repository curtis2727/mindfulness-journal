const express = require('express');
const Entry = require('../models/Entry');
const { body, validationResult } = require('express-validator');

const router = express.Router();

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized. Please log in.' });
};

router.get('/', isAuthenticated, async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.user.id }).sort({ date: -1 }); 
    res.status(200).json(entries);
  } catch (err) {
    console.error('Error fetching entries:', err);
    res.status(500).json({ message: 'Error fetching entries', error: err.message });
  }
});

router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { title, content, mood } = req.body;

    if (!title || !content || !mood) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const entry = new Entry({
      user: req.user.id,
      title,
      content,
      mood,
      date: new Date()
    });

    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    console.error('Error saving entry:', err);
    res.status(500).json({ message: 'Error saving entry', error: err.message });
  }
});

router.put(
  '/:id',
  isAuthenticated,
  [
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('content').optional().notEmpty().withMessage('Content cannot be empty'),
    body('mood')
      .optional()
      .isIn(['Happy', 'Sad', 'Angry', 'Calm', 'Neutral'])
      .withMessage('Mood must be one of: Happy, Sad, Angry, Calm, Neutral'),
  ],
  async (req, res) => {
    const { id } = req.params;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation error', errors: errors.array() });
    }

    try {
      const entry = await Entry.findOneAndUpdate(
        { _id: id, user: req.user.id },
        { $set: req.body },
        { new: true } 
      );

      if (!entry) {
        return res.status(404).json({ message: 'Entry not found or not authorized' });
      }

      res.status(200).json(entry);
    } catch (err) {
      console.error('Error updating entry:', err);
      res.status(500).json({ message: 'Error updating entry', error: err.message });
    }
  }
);

router.delete('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    const entry = await Entry.findOneAndDelete({ _id: id, user: req.user.id });

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found or not authorized' });
    }

    res.status(200).json({ message: 'Entry deleted successfully' });
  } catch (err) {
    console.error('Error deleting entry:', err);
    res.status(500).json({ message: 'Error deleting entry', error: err.message });
  }
});

module.exports = router;
