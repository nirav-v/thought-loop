const { Schema, Types} = require("mongoose");
const {formatTime} = require('../utils/formatTime')
const reactionSchema = new Schema(
  {
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
      type: String,
      required: true,
      maxlength: 280
  },
  username: {
      type: String,
      required: true
  },
 createdAt: {
    type: Date,
    default: Date.now(),
    // TODO Use a getter method to format the timestamp on query
    get: formatTime
  },
},
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;