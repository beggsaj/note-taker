//dependencies
const express = require('express')
const bodyParser = require('body-parser')

const path = require('path')
const util = require('util')
const fs = require('fs')
//const { v4: uuidv4 } = require('uuid')

const apiRoot = '/api/notes';
const app = express()
app.use(bodyParser.json())

const port = process.env.PORT || 3001

app.use(express.static(path.join(__dirname, 'public')));

//adding savenote file
const saveNote = require('./db/saveNote')

const router = express.Router();
router.get('/', (req, res) => {
    saveNote
    .retrieveNotes()
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err))
});
router.post('/', (req, res) => {
    saveNote
        .addNote(req.body)
        .then((note) => res.json(note))
        .catch(err => res.status(500).json(err))
});
app.use(apiRoot, router);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});