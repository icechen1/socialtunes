//Class to manage music queue 
var dbm;

var queue = [];

module.exports.init = function(manager){
    dbm = manager;
}

/*
 * Add a song to queue
 */
module.exports.add = function(songId){
    if (queue.indexOf(songId) == -1){
        //console.log("This is sparta " + song + " " + song.id)
        queue.push(songId);
        //console.log(queue);
        return true;
    }
    return false;

    // db.findOne({ _id: 'song.id' }, function (err, doc) {
    //     // If no document is found, doc is null
    //     if(doc == null){
    //         db.queue.insert(song, function (err, newDoc) {
    //             if (err){
    //                 console.log(err);
    //             }
    //         });
    //     }
    // });
};

/*
 * Remove a song from queue
 */
module.exports.remove = function(song){
    var index = queue.indexOf(song);
    if (index > -1) {
        queue.splice(index, 1);
        return true;
    }
    return false;
    // db.queue.remove({ _id: 'song.id' }, {}, function (err, numRemoved){
    //     //removed from db
    //     if (err){
    //         console.log(err);
    //     } else {
    //         console.log("Removed " + numRemoved + " items from queue");
    //     }
    // });
};

/*
 * Return queue
 */
module.exports.index = function(){
    return queue;
    // db.queue.remove({ _id: 'song.id' }, {}, function (err, numRemoved){
    //     //removed from db
    //     if (err){
    //         console.log(err);
    //     } else {
    //         console.log("Removed " + numRemoved + " items from queue");
    //     }
    // });
};

/*
 * Save queue to DB
 */

module.exports.saveQueue = function(){
    dbm.queue.insert(queue, function (err, newDocs) {
      // Two documents were inserted in the database
      // newDocs is an array with these documents, augmented with their _id
    });
};


/*
 * Clear Queue DB
 */

module.exports.clearDb = function(){
    db.queue.remove({ }, { multi: true }, function (err, numRemoved) {
        db.queue.loadDatabase(function (err) {
            // done
        });
    });
};
