const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  name: { type: String, required: true, minlength: 1 },
  participants: [String],
  startingAt: { type: Date, default: Date.now },
  token: String,
  roomIndex: { type: Number, default: 0 }, // current room nb
  enteredAt: { type: Date, default: Date.now }, // date when the current room was accessed
  messages: [{
    isFromTeam: Boolean,
    text: String,
    roomIndex: Number
  }]
});

teamSchema.methods.getTime = function () {
  return (this.enteredAt - this.startingAt)
};



const User = mongoose.model('User', teamSchema);
module.exports = User;
