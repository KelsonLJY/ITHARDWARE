const express = require('express');
const mongoose=require('mongoose');
const path = require('path');
const dotenv = require('dotenv');


const app = express();
const port = process.env.PORT || 3000;
dotenv.config({ path: './app.env' })
/**
 * Connect To the database
 */
mongoose.connect("mongodb+srv://amydev:Amy123!*@cluster0.ogfnn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology: true
});

// Middleware
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.set('view engine','ejs');

app.use(require("./routes/index"))


app.listen(port, function () {
    console.log('Server started on port ' + port);
});