const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/movieApp')
.then(() => {
    console.log('SUCCESSFULLY CONNECTED!!!');
})
.catch ( err => {
    console.log('SORRYYYY!!!');
    console.log(err);
})

app.set('views', path.join(__dirname, 'views'));
app.set('views engine', 'ejs');

app.get('/dogs', (req, res) => {
    res.send("NNYYOOKKOOO")
})

const port = 3000;
app.listen(port, () => {
    console.log(`SERVER IS LISTENING TO ${port}`);
});
