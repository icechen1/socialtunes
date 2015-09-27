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
    db.path = new Datastore({filename:'path.db', autoload:true });

    // You need to load each database (here we do it asynchronously)

    db.music.loadDatabase();
    db.settings.loadDatabase();
    db.queue.loadDatabase();
    db.path.loadDatabase();
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

module.exports.querySongByID = function(id,callback){
    db.music.find({_id:id}, function (err, docs) {
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
 * Add a song to queue
 */
module.exports.queueSong = function(song){
    db.findOne({ _id: 'song.id' }, function (err, doc) {
        // If no document is found, doc is null
        if(doc == null){
            db.queue.insert(song, function (err, newDoc) {
                if (err){
                    console.log(err);
                }
            });
        }
    });
};

/*
 * Remove a song from queue
 */
module.exports.rmQueueSong = function(song){
    db.queue.remove({ _id: 'song.id' }, {}, function (err, numRemoved){
        //removed from db
        if (err){
            console.log(err);
        } else {
            console.log("Removed " + numRemoved + " items from queue");
        }
    });
};

/*
 * Save a path
 */

module.exports.savePath = function(path){
    db.path.remove({});
    db.path.insert({ path: path }, function (err, newDoc) {
    });
};

/*
 * Return a path
 */
module.exports.queryPath = function(callback){
    db.path.findOne({}, function (err, docs) {
        callback(docs);
    });
};

//Deletes all music
module.exports.clearDb = function(){
    db.music.remove({ }, { multi: true }, function (err, numRemoved) {
        db.music.loadDatabase(function (err) {
            // done
        });
    });
    db.queue.remove({ }, { multi: true }, function (err, numRemoved) {
        db.queue.loadDatabase(function (err) {
            // done
        });
    });
};
