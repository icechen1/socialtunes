var components = components || {};

function AudioPlayer(audio) {
  var current = audio;

  var songFinishedCallback = function() {};

  this.onSongFinished = function(callback) {
    songFinishedCallback = callback;
  };

  current.addEventListener("ended", function() {
    songFinishedCallback();
  });

  current.addEventListener("error", function() {
    console.error(current.error);
  });

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
  // var DirectoryPicker = document.querySelector(".DirectoryPicker");

  // DirectoryPicker.querySelector("input").addEventListener("change", function() {
  //   DirectoryPicker.querySelector(".picker").innerHTML = this.files[0].name;
  // });

  // DirectoryPicker.querySelector(".picker").addEventListener("click", function() {
  //   DirectoryPicker.querySelector("input").click();
  // });

  // DirectoryPicker.querySelector(".submit").addEventListener("click", function() {
  //   //window.console.log(process.mainModule.exports);
  //   //window.console.log(process.mainModule.exports.setDirectory);
  //   process.mainModule.exports.setDirectory(DirectoryPicker.querySelector("input").value);
  //   DirectoryPicker.style.display = "none";
  // });

  components.player = new AudioPlayer(document.getElementById("player"));

  components.l = components.ListView.new({
    "header": "Library",
    "items": [
      components.LibraryView.new({
        "show": true,
        "items": [
          components.LibrarySubmenu.new({
            "name": "Songs",
            "icon": "<i class='fa fa-chevron-right'></i>",
            "open": function() {
              ajax("GET", "http://localhost:3005/api/querysongs/", function(response) {
                items = JSON.parse(response);
                
                components.l.property("items")[1].setProperty("items", [components.l.property("items")[1].property("items")[0]]);
                var count = 1;
                Array.prototype.forEach.call(items, function(item) {
                  components.l.property("items")[1].addProperty("items", components.LibraryItem.new({
                    "art": "images/album.jpg",
                    "song": item.title,
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
      components.LibraryView.new({
        "items": [
          components.LibrarySubmenu.new({
            "name": "Back",
            "icon": "<i class='fa fa-chevron-up'></i>",
            "open": function() {
              components.l.property("items")[0].show();
            }
          }),
          /* components.LibraryItem.new({
            "art": "images/album.jpg",
            "song": "Song Name",
            "album": "Album Name",
            "artist": "Artist Name"
          }),
          components.LibraryItem.new({
            "art": "images/album.jpg",
            "song": "Song Name",
            "album": "Album Name",
            "artist": "Artist Name"
          }),
          components.LibraryItem.new({
            "art": "images/album.jpg",
            "song": "Song Name",
            "album": "Album Name",
            "artist": "Artist Name"
          }) */
        ]
      })
    ]
  });
  document.getElementById("library").appendChild(components.l.element);
  
  //Queue
  components.q = components.ListView.new({
    "header": "Queue",
    "items": [
      components.ListItem.new({
        "art": "images/hasselhoff.jpg",
        "song": "Song Name",
        "album": "Album Name",
        "artist": "Artist Name"
      })
    ],
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

  components.DirPicker = components.DirectoryPicker.new({
    "message": "",
    "click": function() {
      console.log("HELLO?!!!");
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
  // document.getElementById("controls").style.display = "none";
  components.l.hide();
  components.qb.hide();
  components.dirb.hide();
  components.playerBtn.hide();

  // var Player = document.getElementById("player");
  // Player.src = "Miniskirt.mp3";
  // Player.play();

  

  var queue = [
    {
      "url": "AOA.mp3"
    }
  ];

  components.player.onSongFinished(function() {
    var newSong = queue.shift();

    if (newSong) {
      components.player.setSong(newSong);
    }
  });

  components.player.setSong(queue[0]);

  components.socket.on("vote_updated", function(msg) {
    console.log(msg);
  });

  components.socket.on("new_queue", function(msg){
    console.log("Received new song.");
    console.log(msg);
    Array.prototype.forEach.call(components.l.property("items")[1].property("items"), function(item) {
      if (item.property("id") == msg){
        if (!item.property("added")){
          item.triggerEvent("$:click");
        }
      }
    });
  });
}, components);
