const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    // a user can have many thoughts and many friends, stored as arrays of object ids for each instance of the model being referenced
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    // include virtual properties when we res.json our user data
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
// virtual property for friend count to return the length of the user model's friends array
userSchema.virtual("friendCount").get(function friendCount() {
  return this.friends.length;
});

// initialize and export the user model
const User = model("user", userSchema);

module.exports = User;
