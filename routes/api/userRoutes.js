const router = require('express').Router();

const {getUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, removeFriend} = require('../../controllers/userController')

router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
<<<<<<< HEAD
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend)
=======
>>>>>>> 073eb853c479c4f8aef26a89455c66ea2a7a71e3

module.exports = router;