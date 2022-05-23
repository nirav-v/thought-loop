const mongoose = require("mongoose");
const { User, Thought} = require("../models");


module.exports = {
  // get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        return res.json(thoughts);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Get a single user
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        // add the thought _id to the associated user's thoughts array
        return User.findOneAndUpdate(
          // should provide a user id for a user the thought belongs to when creating a new thought. Pushes the thought id to that user's thoughts array.
          { _id: req.body.userId },
          // $addToSet same as $push but does not allow duplicate values in the array
          { $addToSet: { thoughts: thought._id } },
          // return user after their thoughts are updated
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Thought created, but found no user with that ID",
            })
          : res.json("created thought")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //update a thought by its _id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json({ message: "Thought deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },

  // create a new reaction and add it to a specific thoughts reactions array
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      // req params provides thoughtId property to add the new reaction
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      // validate the req body using the Reaction schema validators
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that thoughtId" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // remove a reaction by reactionId
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      // req params provides _id of the thought to remove a reaction from
      { _id: req.params.thoughtId },
      // $pull will remove specific reaction by _id from thought's reactions array
      { $pull: { reactions: req.body.reactionId} },
      // validate the req body using the Reaction schema validators
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought.reactions.reactionId
          ? res
              .status(404)
              .json({ message: "No reaction with that reactionId" })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)
      });
  },

  // end of module.exports
};
