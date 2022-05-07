//require
const express = require("express"),
    app = express(),
    morgan = require("morgan"),
    ejs = require("ejs");

//setting
app.set('port', process.env.PORT || 3000);
app.set('views',`${__dirname}/views`);
app.set('views engine', 'ejs');

//middlewares

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//routes

app.use(require(`./routes/index`));

//statics

app.use(express.static(`${__dirname}/public`));

//404

app.use((req, res, next) =>{
    res.status(404).send('404 not found');
});

module.exports = app;