var components = components || {};

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

  //Library
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
              ajax("GET", "api/querysongs/", function(response) {
                items = JSON.parse(response);
                
                components.l.property("items")[1].setProperty("items", [components.l.property("items")[1].property("items")[0]]);
                
                Array.prototype.forEach.call(items, function(item) {
                  components.l.property("items")[1].addProperty("items", components.LibraryItem.new({
                    "art": "images/album.jpg",
                    "song": item.title,
                    "album": item.album,
                    "artist": item.artist
                  }));
                });
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
  document.getElementById("musicApp").appendChild(components.l.element);
  
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
  document.getElementById("musicApp").appendChild(components.q.element);
  
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
  document.body.appendChild(components.playerBtn.element);
  
  components.socket.on("vote_updated", function(msg) {
    console.log(msg);
  });

  components.socket.on("new_queue", function(msg){
    console.log("Received new song.");
    console.log(msg);
  });
}, components);