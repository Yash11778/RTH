const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: { type: String, enum: ['student', 'mentor'] },
  bio: String,
  expertise: [String],
  registeredAt: { type: Date, default: Date.now }
});

const ideaSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  status: { type: String, enum: ['pending', 'verified', 'rejected'] },
  submittedAt: { type: Date, default: Date.now },
  verifiedAt: Date,
  verificationComments: String
});

const mentorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  expertise: [String],
  availability: Boolean
});

const pitchSchema = new mongoose.Schema({
  ideaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Idea' },
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'] },
  pitchDate: { type: Date, default: Date.now },
  feedback: String
});

// Export models
const User = mongoose.model('User', userSchema);
const Idea = mongoose.model('Idea', ideaSchema);
const Mentor = mongoose.model('Mentor', mentorSchema);
const Pitch = mongoose.model('Pitch', pitchSchema);

module.exports = { User, Idea, Mentor, Pitch };