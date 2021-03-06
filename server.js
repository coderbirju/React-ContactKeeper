const express = require('express');
const connectDB = require('./config/db');


//connect DB
connectDB();

const app = express();


app.get('/', (req,res)=> {res.send('hello world')})

// init Middlewar
app.use(express.json({extended : true}));


app.get('/', (req,res)=> {res.send('hello world')});
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));