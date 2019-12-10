const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/Users');
const Contact = require('../models/Contact');


// @route          GET/api/contacts
// @desc            get all contacts for a user
router.get('/', auth, async (req,res)=> {
    try{
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contacts);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route          POST /api/auth
// @desc            Create Contact 
// @acces           Private
router.post('/', 
        [
        auth, [
        check('name', 'Name is required')
        .not()
        .isEmpty()
        ]
    ],
 async (req,res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const {name, email, phone, type } = req.body;
    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        });
        const contact = await newContact.save();
        res.json(contact);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



// @route          PUT /api/auth/:id
// @desc            Update contact 
// @acces           Private
router.put('/:id', auth,  async (req,res)=> {
    const {name, email, phone, type } = req.body;
    const contactFeilds = {};
    if(name) contactFeilds.name = name;
    if(email) contactFeilds.email = email;
    if(phone) contactFeilds.phone = phone;
    if(type) contactFeilds.type = type;

    try {
        let contact = await Contact.findById(req.params.id);
        if(!contact)
        {
            return res.status(404).json({ msg: "Contact not found" });
        }
        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "not Authorized" });
        }

        contact = await Contact.findByIdAndUpdate(req.params.id, { $set: contactFeilds }, {new : true});
        res.json(contact);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route          DELETE /api/auth/:id
// @desc            Delete contact 
// @acces           Private
router.delete('/:id', auth, async (req,res)=> {

    try {
        let contact = await Contact.findById(req.params.id);
        if(!contact)
        {
            return res.status(404).json({ msg: "Contact not found" });
        }
        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "not Authorized" });
        }

        await Contact.findByIdAndRemove(req.params.id);
        res.json({msg: "contact deleted"});
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;