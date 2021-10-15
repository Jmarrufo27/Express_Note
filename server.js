const express = require('express');
const path = require('path')
const fs = require('fs');
const app = express();
const notes = require('./db/db.json')

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// var notes = [
//     {
//         "title":"Test Title",
//         "text":"Test text"
//     }
// ]

app.use(express.static("public"))
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

app.get('/api/notes', (req, res) => res.json(notes));

app.post('/api/notes', (req, res) => {
    console.log(req.body)
    notes.push(req.body)
    console.log(notes)

    fs.writeFileSync("./db/db.json", JSON.stringify(notes, null, 2))
    res.json(notes)
})







app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));