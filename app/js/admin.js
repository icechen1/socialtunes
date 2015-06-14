var components = components || {};
var fs = require('fs');

function AudioPlayer(audio) {
  var current = audio;

  var songFinishedCallback = function() {};

  //set what the player does after song finish

  this.onSongFinished = function(callback) {
    songFinishedCallback = callback;
  };

  //call songFinishedCallBack after song is finished

  current.addEventListener("ended", function() {
    songFinishedCallback();
  });

  current.addEventListener("error", function() {
    console.error(current.error);
  });

  //play song based on url

  this.setSong = function(song) {
    current.src = song.url;
    current.play();
  };

  this.pauseSong = function() {
    if (current.paused) {
      current.play();
    } else {
      current.pause();
    }
  }
}

function ajax(method, url, callback) {
    var xmlhttp;

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 ) {
           if(xmlhttp.status == 200){
               callback(xmlhttp.responseText);
           } else if(xmlhttp.status == 400) {
              console.error('There was an error 400');
           } else {
               console.error('something else other than 200 was returned');
           }
        }
    }

    xmlhttp.open(method, url, true);
    xmlhttp.send();
}

Truss.init(function(components) {

  components.player = new AudioPlayer(document.getElementById("player"));

  //Library view

  components.l = components.ListView.new({
    "header": "Library",
    "items": [

      //Views in the library

      //1st view contains the songs option
      components.LibraryView.new({
        "show": true,
        "items": [

          // Submenu containing songs
          components.LibrarySubmenu.new({
            "name": "Songs",
            "icon": "<i class='fa fa-chevron-right'></i>",

            //Display songs in the DB when opened
            "open": function() {
              ajax("GET", "http://localhost:3005/api/querysongs/", function(response) {
                items = JSON.parse(response);

                components.l.property("items")[1].setProperty("items", [components.l.property("items")[1].property("items")[0]]);
                var count = 1;
                Array.prototype.forEach.call(items, function(item) {
                  components.l.property("items")[1].addProperty("items", components.LibraryItem.new({
                    "art": "images/album.jpg",
                    "song": item.song,
                    "album": item.album,
                    "artist": item.artist
                  }));
                  components.l.property("items")[1].property("items")[count++].addProperty("id", item._id);
                });
                // var i;
                // for (i = 0; i < components.l.property("items")[1].property("items").length; i++){
                //   console.log(components.l.property("items")[1].property("items")[i].properties());
                //   console.log(components.l.property("items")[1].property("items")[i].property("id"));
                // }
                components.l.property("items")[1].show();
              });
            }
          })
        ]
      }),

      // 2nd view is just a "back" button to go back to library
      components.LibraryView.new({
        "items": [
          components.LibrarySubmenu.new({
            "name": "Back",
            "icon": "<i class='fa fa-chevron-up'></i>",
            "open": function() {
              components.l.property("items")[0].show();
            }
          }),
        ]
      })
    ]
  });
  document.getElementById("library").appendChild(components.l.element);

  //Queue
  components.q = components.ListView.new({
    "header": "Queue",
    "items": [],
    "hide": true
  });
  document.getElementById("library").appendChild(components.q.element);

  //Directory Picker button
  components.dirb = components.MenuButton.new({
    "icon": "<i class='fa fa-eject'></i>",
    "open": function() {
      if (!components.DirPicker.property("open")) {
        components.l.hide();
        components.q.hide();
        components.qb.hide();
        components.playerBtn.hide();
        components.DirPicker.show();
        this.setProperty("icon", "<i class='fa fa-arrow-left'></i>");
        this.element.classList.add("toggled");
        document.getElementById("library").style.display = "none";
        // document.getElementById("controls").style.display = "none";
      } else {

        document.getElementById("library").style.display = "block";
        // document.getElementById("controls").style.display = "block";
        components.l.show();
        components.qb.show();
        components.playerBtn.show();
        components.DirPicker.hide();
        this.setProperty("icon", "<i class='fa fa-eject'></i>");
        this.element.classList.remove("toggled");
      }
    }
  });
  document.getElementById("menu").appendChild(components.dirb.element);

  //Queue Menu button
  components.qb = components.MenuButton.new({
    "icon": "<i class='fa fa-list'></i>",
    "open": function() {
      if (!components.q.property("open")) {
        components.q.show();
        components.l.hide();
        this.setProperty("icon", "<i class='fa fa-close'></i>");
        this.element.classList.add("toggled");
      } else {
        components.q.hide();
        components.l.show();
        this.setProperty("icon", "<i class='fa fa-list'></i>");
        this.element.classList.remove("toggled");
      }
    }
  });
  document.getElementById("menu").appendChild(components.qb.element);

  //Now Playing
  components.playerBtn = components.ActionButton.new({
    "song": "Hooked on a Feeling",
    "artist": "David Hasselhoff",
    "art": "images/hasselhoff.jpg"
  });
  document.getElementById("controls").appendChild(components.playerBtn.element);

  //Directory picker

  components.DirPicker = components.DirectoryPicker.new({
    "message": "",
    "click": function() {
      document.getElementById("library").style.display = "block";
      // document.getElementById("controls").style.display = "block";
      components.l.show();
      components.qb.show();
      components.dirb.show();
      components.playerBtn.show();
      components.DirPicker.hide();
    }
  });

  document.getElementById("dirPicker").appendChild(components.DirPicker.element);

  document.getElementById("library").style.display = "none";

  try {
    var tempPath;

    ajax("GET", "http://localhost:3005/api/querypath/", function(response) {
      console.log(response);
      if (response == '""') {
          console.log("Empty JSON response!")
          return;
      }
      var temp = JSON.parse(response);
      tempPath = temp.path;
      console.log(tempPath);

      //Query the entry
      var stats = fs.lstatSync(tempPath);

      //Is it a directory?
      if (stats.isDirectory()) {
          components.DirPicker.setDir(tempPath);
          document.getElementById("library").style.display = "block";
          components.l.show();
          components.qb.show();
          components.dirb.show();
          components.playerBtn.show();
          components.DirPicker.hide();
      }
    });
  }
  catch (e) {
    console.log(e);
    components.l.hide();
    components.qb.hide();
    components.dirb.hide();
    components.playerBtn.hide();
  }

  // var Player = document.getElementById("player");
  // Player.src = "Miniskirt.mp3";
  // Player.play();



  var queue = [
    {
      url: "AOA.mp3"
    }
  ];

  components.player.onSongFinished(function() {
    var newSong = queue.shift();

    if (newSong) {
      components.player.setSong(newSong);
    }
  });

  components.player.setSong(queue[0]);

  components.socket.on("current_queue", function(msg) {
    //code for what to do with queue as connection is established
    msg.forEach(function(songid){
      ajax("GET", "http://localhost:3005/api/querySong/" + songid, function(response) {
        item = JSON.parse(response);
        components.q.addProperty("items", components.ListItem.new({
          "art": item[0].art,
          "song": item[0].song,
          "album": item[0].album,
          "artist": item[0].artist
        }));
      });
      //Toggle for each item already in the queue
      Array.prototype.forEach.call(components.l.property("items")[1].property("items"), function(item){
        if (item.property("id") != null){
          if (item.property("id").valueOf() == songid.valueOf()){
            item.toggle();
          }
        }
      });
    });
  });

  components.socket.on("vote_updated", function(msg) {
    console.log(msg);
  });

  components.socket.on("new_queue_item", function(msg){
    //received a new song to dd to queue
    //console.log("Received new song.");
    console.log("http://localhost:3005/api/querySong/" + msg);
    ajax("GET", "http://localhost:3005/api/querySong/" + msg, function(response) {
      item = JSON.parse(response);
      components.q.addProperty("items", components.ListItem.new({
        "art": item[0].art,
        "song": item[0].song,
        "album": item[0].album,
        "artist": item[0].artist
      }));
      queue.push({"url": item[0].url});
    });
    //Toggle for each item already in the queue
    Array.prototype.forEach.call(components.l.property("items")[1].property("items"), function(item){
      if (item.property("id") != null){
        if (item.property("id").valueOf() == msg.valueOf()){
          item.toggle();
        }
      }
    });
  });

}, components);
