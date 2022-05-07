const express = require("express");
const fs = require("fs");
const router = express.Router();

const jsonBoks = fs.readFileSync('src/book.json', 'utf-8');
console.log(jsonBoks)

let books = JSON.parse(jsonBoks);
console.log(books);

router.get('/', (req, res) =>{
    res.render('index.ejs', {books} );
})
router.get('/entries', (req, res)=>{
    res.render('entries.ejs');
});

router.post('/entries', (req, res)=>{
    const {title, author, image, description} = req.body;
    if(!title || !author || !image || !description){
        res.status(400).send('escribe todas la entradas');
    }
    let newBook = {
        title:title,
        author:author,
        image:image,
        description:description
    }
    let id = books.length +1;
    newBook.id = id;
    books.push(newBook);

    const jsonBooks = JSON.stringify(books);
    fs.writeFileSync('src/book.json', jsonBooks, 'utf-8');
    
    res.redirect('/');
});

router.get('/delete/:id', (req, res) =>{
   books = books.filter(book=> book.id != req.params.id);
   const jsonBooks = JSON.stringify(books);
    fs.writeFileSync('src/book.json', jsonBooks, 'utf-8');
    res.redirect('/');
})

module.exports= router;