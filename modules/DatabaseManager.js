//A module to manage database IO operations
var Datastore = require('nedb');
var db = {};

module.exports.init = function(){
    /**
     * Set up database using NeDB
     * See also https://github.com/louischatriot/nedb
     */

    // Type 4: Persistent datastore for a Node Webkit app
    // For example on Linux, the datafile will be ~/.config/nwtest/nedb-data/something.db
    // path.join(gui.App.dataPath, 'index.db')

    db.music = new Datastore({ filename:'index.db', autoload: true  });
    db.settings = new Datastore({ filename:'settings.db', autoload: true  });

    // You need to load each database (here we do it asynchronously)

    db.music.loadDatabase();
    db.settings.loadDatabase();
}


/**
 * A method to query existing songs
 * Currently returns ALL entries in the database
 *
 * Model:
 * - _id (unique)
 * - album
 * - artist
 * - title
 * - url (ABSOLUTE path to the music file)
 */
module.exports.querySong = function(){
    db.music.find({}, function (err, docs) {
        //probably should add some conditions later(limit, sort by artist)
        console.log(docs);
        return docs;
    });
};

/*
 * Save a song
 */
module.exports.saveSong = function(song){
db.music.insert(song, function (err, newDoc) {

    });
};
