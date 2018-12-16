const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const teamSchema = new Schema({
  name: { type: String, required: true, minlength: 2},
  participants: [String],
  startingAt: { type: Date, default: Date.now() },
  token: String,
  roomNb: { type: Number, default: 0}, // current room nb
  enteredAt: { type: Date, default: Date.now() }, // date when the current room was accessed
  messages: [{
    isFromTeam: Boolean,
    text: String,
  }]
});

const User = mongoose.model('User', teamSchema);
module.exports = User;
