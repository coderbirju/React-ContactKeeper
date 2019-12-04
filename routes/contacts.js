const express = require('express');
const router = express.Router();

// @route          GET/api/contacts
// @desc            get all contacts for a user
router.get('/', (req,res)=> {
    res.send('get all contacts for a user');
});


// @route          POST /api/auth
// @desc            Create Contact 
// @acces           Private
router.post('/', (req,res)=> {
    res.send('Add a new contact');
});



// @route          PUT /api/auth/:id
// @desc            Update contact 
// @acces           Private
router.put('/:id', (req,res)=> {
    res.send('Update a contact');
});


// @route          DELETE /api/auth/:id
// @desc            Delete contact 
// @acces           Private
router.delete('/:id', (req,res)=> {
    res.send('Delete a contact');
});


module.exports = router;