const router = require('express').Router();

const {getThoughts, getSingleThought, createThought} = require("../../controllers/thoughtController");
const Thought = require('../../models/Thought');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

router.route(':/thoughtId').get(getSingleThought)

module.exports = router;
