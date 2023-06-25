// modules required for routing
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// define the book model
const Book = require('../models/books');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: ''
  });
});

module.exports = router;
