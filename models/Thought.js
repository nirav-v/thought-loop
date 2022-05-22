const { Schema, model } = require("mongoose");
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    // TODO Use a getter method to format the timestamp on query
  },
  username: {
    type: String,
    required: true,
  },
  // reactions is an array of nested subdocuments created from the reactionSchema
  reactions: [reactionSchema],
});

// initialize and export the thought model
const Thought = model('thought', thoughtSchema)

module.exports = Thought;
