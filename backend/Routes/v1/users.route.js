const express = require('express');
const { getAllUser, loginUser, registerUser, updateUser, getUser } = require('../../Controllers/users.controllers');
const { verifyJWT } = require('../../MIddlewares/verifyJwt.middlewares');


const router = express.Router();

router.get('/', getAllUser);
router.post('/' , loginUser);
router.post('/register' , registerUser);
router.get('/:email' ,getUser);
router.patch('/:email', verifyJWT ,updateUser);

module.exports = router;