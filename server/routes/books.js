// modules required for routing
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// define the book model
const Book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  Book.find((err, books) => {
    if (err) {
      return console.error(err);
    } else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });
});

// GET the Book Details page in order to add a new Book
router.get('/details/add', (req, res, next) => {
  res.render('books/add', {
    title: 'Add a Book'
  });
});


// POST process the Book Details page and create a new Book - CREATE
router.post('/details/add', (req, res, next) => {
  const newBook = new Book({
    Title: req.body.title,
    Description: req.body.description,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre
  });

  newBook.save((err) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.redirect('/books');
    }
  });
});

// GET the Book Details page in order to edit an existing Book
router.get('/details/edit/:id', (req, res, next) => {
  // Retrieve the book ID from the request parameters
  const id = req.params.id;

  // Find the book by ID in the database
  Book.findById(id, (err, foundBook) => {
    if (err) {
      console.error(err);
      res.redirect('/books'); // Redirect to books list if an error occurs
    } else {
      res.render('books/edit', {
        title: 'Edit Book',
        book: foundBook
      });
    }
  });
});

// POST - process the book update
router.post('/details/edit/:id', (req, res, next) => {
  const id = req.params.id;

  // Find the book by ID and update its details
  Book.findByIdAndUpdate(
    id,
    {
      Title: req.body.title,
      Description: req.body.description,
      Price: req.body.price,
      Author: req.body.author,
      Genre: req.body.genre
    },
    (err, updatedBook) => {
      if (err) {
        console.error(err);
        res.redirect('/books'); // Redirect to books list if an error occurs
      } else {
        res.redirect('/books'); // Redirect to books list after successful update
      }
    }
  );
});

// GET - process the delete by book id
router.get('/delete/:id', (req, res, next) => {
  const id = req.params.id;

  Book.deleteOne({ _id: id }, (err) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.redirect('/books');
    }
  });
});

module.exports = router;
