// Import required modules
const express = require('express');

// Create an Express application
const app = express();

// Create a session for express
const session = require('express-session');

app.use(session({
    secret: 'musevote_secret',
    resave: false,
    saveUninitialized: true
}));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));


// Declare any necessary variables or in-memory data structures here
let songs = [];

// TASK: Define appropriate routes below
// ---------------------------------------------------

//Define a route to render the index page


app.post('/addSong', (req, res) => {
    const newSong = {
        name: req.body.name,
        song: req.body.song,
        genre: req.body.genre,
        description: req.body.description,
        previewUrl: req.body.previewUrl,
        albumCoverUrl: req.body.albumCoverUrl
    };
    songs.push(newSong);
    res.redirect('/listofsongs');
});

app.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    songs.splice(id, 1);
    res.redirect('/listofsongs');
});

app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const updatedSong = {
        name: req.body.name,
        song: req.body.song,
        genre: req.body.genre,
        description: req.body.description,
        previewUrl: req.body.previewUrl,
        albumCoverUrl: req.body.albumCoverUrl
    };
    songs[id] = updatedSong;
    res.redirect('/listofsongs');
});

app.post('/update/:id', (req, res) => {
    const id = req.params.id;
    songs[id] = {
        name: req.body.name,
        song: req.body.song,
        genre: req.body.genre,
        description: req.body.description,
        albumCoverUrl: req.body.albumCoverUrl,
        previewUrl: req.body.previewUrl
    };
    res.redirect('/listofsongs');
});

app.post('/vote/:id', (req, res) => {
    const id = req.params.id;
    // Creates session storage if not exists
    if (!req.session.votedSongs) {
        req.session.votedSongs = [];
    }

    // Check if already voted for this song
    if (req.session.votedSongs.includes(id)) {
        return res.redirect('/vote');
    }

    // Add vote
    songs[id].votes = (songs[id].votes || 0) + 1;

    // Mark this song as voted
    req.session.votedSongs.push(id);

    res.redirect('/vote');
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/songs', (req, res) => {
    res.render('songs');
});

app.get('/listofsongs', (req, res) => {
    res.render('listofsongs', { songs });
});

app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    res.render('edit', { song: songs[id], id });
});

app.get('/view/:id', (req, res) => {
    const id = req.params.id;
    const song = songs[id];
    res.render('view', { song: songs[id] });
});


app.get('/vote', (req, res) => {
    res.render('vote', { songs, session: req.session });
});

app.get('/rankings', (req, res) => {
    let rankedSongs = [...songs];
    rankedSongs.sort((a, b) => (b.votes || 0) - (a.votes || 0));
    res.render('rankings', { rankedSongs });
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