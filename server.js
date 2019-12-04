const express = require('express');

const app = express();

<<<<<<< Updated upstream
app.get('/', (req,res)=> {res.send('hello world')})
=======

// init Middlewar
app.use(express.json({extended : true}));

app.get('/', (req,res)=> {res.send('hello world')});
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

>>>>>>> Stashed changes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));