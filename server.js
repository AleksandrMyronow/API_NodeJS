var express = require('express');

var app = express();

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

app.get('/artists/:id', function (req, res) {
    var artist = artists.find(function (artist) {
        return artist.id === Number(req.params.id);
    });
    res.send(artist);
});

app.listen(3012, function () {
    console.log('API app started')
});