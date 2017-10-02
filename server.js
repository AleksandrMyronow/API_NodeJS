var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var artists = [
    {
        id: 1,
        artist: 'Pink Floyd'
    },
    {
        id: 2,
        artist: 'Era'
    },
    {
        id: 3,
        artist: 'The Beatles'
    }
];

app.get('/artists', function (req, res) {
    res.send(artists)
});

app.get('/artists/:id', function (req, res) {
    var artist = artists.find(function (artist) {
        return artist.id === Number(req.params.id);
    });
    res.send(artist);
});

app.post('/artists', function (req, res) {
    var newArtist = {
      id: 4,
      name: req.body.name
    };
    artists.push(newArtist);
    res.send(newArtist);
});

app.put('/artists/:id', function (req, res) {
    var modifyArtist = artists.find(function (artist) {
        return artist.id === Number(req.params.id)
    });
    modifyArtist.artist = req.body.artist;
    res.sendStatus(200);
});

app.delete('/artists/:id', function (req, res) {
    artists = artists.filter(function (artist) {
        return artist.id !== Number(req.params.id);
    });
    res.sendStatus(200);
});


app.listen(3012, function () {
    console.log('API app started')
});