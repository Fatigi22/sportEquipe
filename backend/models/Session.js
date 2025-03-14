const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  title: String,
  date: Date,
  availableSeats: Number,
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("Session", SessionSchema);