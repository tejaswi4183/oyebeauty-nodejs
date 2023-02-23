const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const Movie=require('./models/Movie')
// Set up body parser middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Tejaswi:test1234@cluster0.dkkurey.mongodb.net/NODEJS_TASK?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));



// Define POST /add-movie endpoint
app.post('/add-movie', async (req, res) => {
    const { title, year, director, genre } = req.body;
    const movie = new Movie({ title, year, director, genre });
    await movie.save();
    res.json(movie);
});

// Define GET /get-all endpoint
app.get('/get-all', async (req, res) => {
    const movies = await Movie.find();
    res.json(movies);
});

// Define GET /get-single endpoint
app.get('/get-single', async (req, res) => {
    const { id } = req.query;
    const movie = await Movie.findById(id);
    res.json(movie);
});

// Define GET /get-paginated endpoint
app.get('/get-paginated', async (req, res) => {
    const { page, size } = req.query;
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(size) || 10;
    const skip = (pageNumber - 1) * pageSize;
    const movies = await Movie.find().skip(skip).limit(pageSize);
    res.json(movies);
});

// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));
