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
    db.queue = new Datastore({filename:'queue.db', autoload:true });

    // You need to load each database (here we do it asynchronously)

    db.music.loadDatabase();
    db.settings.loadDatabase();
    db.queue.loadDatabase();
}


/**
 * A method to query existing songs through a callback
 * Currently returns ALL entries in the database
 *
 * Model:
 * - _id (unique)
 * - album
 * - artist
 * - title
 * - url (ABSOLUTE path to the music file)
 */
module.exports.querySong = function(callback){
    db.music.find({}, function (err, docs) {
        //probably should add some conditions later(limit, sort by artist)
        //console.log(docs);
        callback(docs);
    });
};

/*
 * Save a song
 */
module.exports.saveSong = function(song){
    db.music.insert(song, function (err, newDoc) {

    });
};

/*
 * Add a song
 */
module.exports.addSong = function(song){
    db.queue.insert(song, function (err, newDoc) {

    });
};

//Deletes everything
module.exports.clearDb = function(){
    db.music.remove({ }, { multi: true }, function (err, numRemoved) {
        db.music.loadDatabase(function (err) {
            // done
        });
    });
}
