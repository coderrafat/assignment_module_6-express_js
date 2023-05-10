const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

// Enable JSON body parsing
app.use(bodyParser.json());

// Array to store the books
let books = [];

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Get all books
app.get('/books', (req, res) => {
    res.json(books);
});

// Add a book
app.post('/books', (req, res) => {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({ error: 'Title and author are required' });
    }

    const book = {
        id: generateUniqueId(),
        title,
        author,
        publishedDate: new Date()
    };

    books.push(book);

    res.json(book);
});

// Delete a book
app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const index = books.findIndex(book => book.id === bookId);

    if (index === -1) {
        return res.status(404).json({ message: `Book Id '${bookId}' not found` });
    }

    books.splice(index, 1);

    res.json({ message: `Book Id '${bookId}' deleted successfully` });
});

// Helper function to generate unique IDs
function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
