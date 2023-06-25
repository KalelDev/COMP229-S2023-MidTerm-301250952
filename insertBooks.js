const mongoose = require('mongoose');
const Book = require('./server/models/books');
const { URI } = require('./server/config/db'); // Import the URI from db.js

// Connect to MongoDB
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');

    // Specify the number of books to generate
    const numberOfBooks = 10;

    // Create an array to hold the generated books
    const books = [];

    // Generate random books
    for (let i = 0; i < numberOfBooks; i++) {
      const book = {
        Title: `Book ${i + 1}`,
        Description: `Description of Book ${i + 1}`,
        Price: getRandomPrice(5, 50),
        Author: `Author ${i + 1}`,
        Genre: `Genre ${i + 1}`,
      };
      books.push(book);
    }

    // Insert the books into the database
    Book.insertMany(books)
      .then(() => {
        console.log(`${numberOfBooks} books inserted successfully`);
        mongoose.disconnect(); // Close the connection
      })
      .catch((err) => {
        console.error('Error inserting books:', err);
        mongoose.disconnect(); // Close the connection
      });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Helper function to generate a random price between min and max (inclusive)
function getRandomPrice(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
