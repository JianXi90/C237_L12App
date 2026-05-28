// Import required modules
const express = require('express');

// Create an Express application
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));

// Declare any necessary variables or in-memory data structures here


// TASK: Define appropriate routes below
// ---------------------------------------------------

//Define a route to render the index page
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/submit', (req, res) => {
    // Handle the vote submission logic here
    const { song, songTitle, genre, description, link, image } = req.body;
    songs.push({ song, songTitle, genre, description, link, image });
    res.redirect('/songs');
    // You can access the submitted data using req.body
    // For example, if you have a form field named 'song', you can access it with req.body.song
});
app.get('/songs', (req, res) => {
    res.render('songs');
});

app.get('/vote', (req, res) => {
    res.render('vote');
});

app.get('/rankings', (req, res) => {
    res.render('rankings');
});

app.get('/filter', (req, res) => {
    res.render('filter');
});
// ---------------------------------------------------

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});