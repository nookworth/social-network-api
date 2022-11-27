const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
  reactionId: { type: ObjectId, default: new ObjectId() },
  reactionBody: { type: String, required: true, maxLength: 280 },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

reactionSchema.methods.formatTime = function () {};

const thoughtSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: { type: String, requied: true },
  reactions: [reactionSchema],
});

thoughtSchema.methods.formatTime = function () {
    
}

userSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = mongoose.model("thought", thoughtSchema);

module.exports = Thought;
