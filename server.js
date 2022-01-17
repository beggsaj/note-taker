const PORT = process.env.PORT || 3001
const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const completeNotes = require('./Develop/db/db.json')
const { text } = require('body-parser')

const indexRoutes = require('./public/index.html');
const notesRoutes = require('./public/notes.html');

app.use(express.urlencoded({ extended:true }))
app.use(express.json())
app.use(express.static('public'))

app.get('/api/notes', (req,res) => {
    res.json(allNotes.slice(1))
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, indexRoutes))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, notesRoutes))
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, indexRoutes))
})

function addNote(body, textArray) {
    const note = body
    if (!Array.isArray(textArray))
    textArray = []

    if(textArray.length === 0)
    textArray.push(0)

    body.id = textArray[0]
    textArray[0]++

    textArray.push(note)
    fs.writeFile(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(textArray, null, 2)
    )
    return note
}

app.post('/api/notes', (req, res) => {
    const newNote = addNote(req.body, completeNotes)
    res.json(newNote)
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`)
})