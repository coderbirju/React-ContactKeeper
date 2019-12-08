const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')
const { check, validationResult } = require('express-validator');

// @route          POST/api/users
router.post('/', [
    check('name','Name cannot be empty')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid Email')
        .isEmail(),
    check('password', 'Please Enter a password greater than 6 character')
        .isLength({ min: 6})
], async (req,res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const {name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if(user) {
            res.status(400).json({ msg: "user already exists" });
        }

        user = new User({
            name,
            email,
            password
        });
        
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload,config.get('jwtSecret'),
        {
            expiresIn: 3600
        }, 
        (err, token)=> {
            if(err) throw err;
            res.json({token})
        }
        );


    } catch(err) {
        console.log(err.message);
        res.status(500).send("server error")
    }
});

module.exports = router;