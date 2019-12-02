const express = require('express');
const router = express.Router();

// @route          GET/api/auth
// @desc            get logged in user
router.get('/', (req,res)=> {
    res.send('get logged in user');
});
// @route          POST /api/auth
// @desc            Auth user 

router.post('/', (req,res)=> {
    res.send('Auth a user');
});


module.exports = router;