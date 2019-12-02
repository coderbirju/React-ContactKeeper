const mongoose = require('mongoose');
const config  = require('config');
const db = config.get('mongoURI');

const connectDB = () => {
    mongoose
    .connect(db, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: true
    })
    .then(()=> {
        console.log('Mongo connected')
    })
    .catch(err => {
        console.log(err.message);
    })
}

module.exports = connectDB;