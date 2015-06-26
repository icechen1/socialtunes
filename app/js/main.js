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
              //TODO: not have to call each time
              components.l.property("items")[1].show();
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
          })
        ]
      })
    ]
  });

  ajax("GET", "api/querysongs/", function(response) {
    items = JSON.parse(response);
    //Resets the library view to only include "Back" 
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
  });

  document.getElementById("musicApp").appendChild(components.l.element);
  
  //Queue
  components.q = components.ListView.new({
    "header": "Queue",
    "items": [],
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
  components.playerBtn = components.InfoButton.new({
    "song": "Hooked on a Feeling",
    "artist": "David Hasselhoff",
    "art": "images/hasselhoff.jpg"
  });
  document.body.appendChild(components.playerBtn.element);
  
  components.socket.on("current_queue", function(msg) {
    console.log(msg);
    var count = 0;
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
        components.q.property("items")[count++].addProperty("id", msg);
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
    //console.log("http://localhost:3005/api/querySong/" + msg);
    ajax("GET", "http://localhost:3005/api/querySong/" + msg, function(response) {
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
        if (item.property("id").valueOf() == msg.valueOf()){
          item.toggle();
        }
      }
    });
  });
}, components);