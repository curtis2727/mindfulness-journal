const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mood: {
    type: String,
    required: [true, 'Mood is required'],
    enum: ['Happy', 'Sad', 'Neutral', 'Excited'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
    maxlength: [1000, 'Entry content cannot exceed 1000 characters']
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

EntrySchema.index({ user: 1, date: -1 });
EntrySchema.statics.findByUserId = async function(userId) {
  try {
    return await this.find({ user: userId }).sort({ date: -1 });
  } catch (err) {
    throw new Error('Error finding entries');
  }
};

module.exports = mongoose.model('Entry', EntrySchema);