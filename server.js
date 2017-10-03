var express     = require ('express');
var bodyParser  = require ('body-parser');
var MongoClient = require ('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var app = express();
var db;

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
    db.collection('artists').find().toArray(function (err, docs) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        res.send(docs);
    });
});

app.get('/artists/:id', function (req, res) {
    db.collection('artists').findOne({ _id: ObjectID(req.params.id)}, function (err, doc) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        res.send(doc);
    });
});

app.post('/artists', function (req, res) {
    var newArtist = {
      name: req.body.name
    };

    db.collection('artists').insert(newArtist, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(newArtist);
    });
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


MongoClient.connect('mongodb://localhost:27017/myapi', function (err, database) {
    if (err) {
        return console.log (err);
    }
    db = database;
    app.listen(3012, function () {
        console.log('API app started')
    });
});
