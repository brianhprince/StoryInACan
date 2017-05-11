var express = require('express');
var app = express();

// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var DocumentDBClient = require('documentdb').DocumentClient,
  config = require('../Shared/config'),
  fs = require('fs'),
  async = require('async'),
  databaseId = config.names.database,
  collectionId = config.names.collection,
  dbLink = 'dbs/' + databaseId,
  collLink = dbLink + '/colls/' + collectionId;

var host = config.connection.endpoint;
var masterKey = config.connection.authKey;
var client = new DocumentDBClient( host, { masterKey: masterKey });


app.get('/stories/top', function (req, res) {
    console.log("get top stories called");
    
    var querySpec = {
        query: 'SELECT * FROM Videos v where v.isTop=1'
    };

    client.queryDocuments(collLink, querySpec).toArray(function (err, results) {
        if (err) {
            handleError(err);
        } else if (results.length == 0) {
            throw ("No top stories found.");
        } else {
            res.json(results);
        };
    });
});

app.get('/stories', function (req, res) {
    console.log("getAllStories called");
    GetAllStories(collLink, function (stories) {
        res.json(stories);
    });
});

app.get('/story/:id', function (req, res) {
    var storyId = req.params.id;
    var docLink = collLink + '/docs/' + storyId;    
    
    console.log("getting id " + storyId);
    
    readDocument(docLink, function (aStory) {
        res.json(aStory);
    });
});

app.get('/tag', function (req, res) {
    console.log("get all tags called");
    
    var querySpec = {
        query: 'SELECT Videos.tags FROM Videos'
    };

    client.queryDocuments(collLink, querySpec).toArray(function (err, results) {
        if (err) {
            handleError(err);
        } else if (results.length == 0) {
            throw ("No tags found.");
        } else {
            res.json(results);
        };
    });
});

// TODO: make this an env variable for Azure
app.listen(3000, function () {
  console.log('API host running on port 3000');
})


function insertDocuments(collLink, callback) {
    var createdList = [];

    async.each(
        documentDefinitions(), 

        function iterator(documentDefinition, cb) {
            client.createDocument(collLink, documentDefinition, function (err, document) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('created ' + document.id);
                    createdList.push(document);
                    cb();
                }
            });
        },

        function (err) {
            console.log('iterating done ' + createdList.length);
            callback(createdList);
        }
    );
}

function GetAllStories(collLink, callback) {
    var queryIterator = client.readDocuments(collLink).toArray(function (err, docs) {
        if (err) {
            handleError(err);
        } else {
            callback(docs);
        }
    });
}

function readDocument(docLink, callback) {
    client.readDocument(docLink, function (err, doc, headers) {
        if (err) {
            handleError(err);
        } else {
            console.log('Document \'' + docLink + '\' found');
            callback(doc);
        }
    });
}

function deleteDatabase(dbLink) {
    client.deleteDatabase(dbLink, function (err) {
        if (err) {
            handleError(err);
        }
    });
}

function getOrCreateCollection(dbLink, id, callback) {
    var querySpec = {
        query: 'SELECT * FROM root r WHERE r.id=@id',
        parameters: [
            {
                name: '@id',
                value: id
            }
        ]
    };

    client.queryCollections(dbLink, querySpec).toArray(function (err, results) {
        if (err) {
            handleError(err);
        //collection not found, create it
        } else if (results.length === 0) {
            var collDef = { id: id };

            client.createCollection(dbLink, collDef, function (err, created) {
                if (err) {
                    handleError(err);
                } else {                    
                    callback(created);
                }
            });

        //collection found, return it
        } else {
            callback(results[0]);
        }
    });
}

function getOrCreateDatabase(id, callback) {
    var querySpec = {
        query: 'SELECT * FROM root r WHERE r.id=@id',
        parameters: [
            {
                name: '@id',
                value: id
            }
        ]
    };

    client.queryDatabases(querySpec).toArray(function (err, results) {
        if (err) {
            handleError(err);
        //database not found, create it
        } else if (results.length === 0) {
            var databaseDef = { id: id };
            client.createDatabase(databaseDef, function (err, created) {
                if (err) {
                    handleError(err);
                } else {                    
                    callback(created);
                }
            });

        //database found, return it
        } else {
            callback(results[0]);
        }
    });
}

function handleError(error) {
    console.log('\nAn error with code \'' + error.code + '\' has occurred:');
    console.log('\t' + JSON.parse(error.body).message);
}
