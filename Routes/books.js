const express = require('express');
const router = express.Router();
const Book = require('../Models/Books');


router.post('/', async (req, res) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.status(201).json(newBook);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to add book' });
    }
});

router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch books' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBook);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update book' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: 'Book deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete book' });
    }
});


module.exports = router;