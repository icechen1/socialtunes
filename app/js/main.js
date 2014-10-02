Truss.init(function() {
  var ListItem = Truss.createComponent({
    "class": "ListItem",
    "template": "<img /><div class='info'><h2></h2><p class='artist'></p><p class='album'></p></div>",
    "properties": {
      "art": "img:src",
      "song": "h2",
      "album": ".album",
      "artist": ".artist"
    }
  });
  
  var ListView = Truss.createComponent({
    "class": "ListView",
    "template": "",
    "properties": {
      "items": "$"
    }
  });

  var l = ListView.new({
    "items": [
      ListItem.new({
        "art": "images/album.jpg",
        "song": "Song Name",
        "album": "Album Name",
        "artist": "Artist Name"
      }),
      ListItem.new({
        "art": "images/album.jpg",
        "song": "Song Name",
        "album": "Album Name",
        "artist": "Artist Name"
      }),
      ListItem.new({
        "art": "images/album.jpg",
        "song": "Song Name",
        "album": "Album Name",
        "artist": "Artist Name"
      })
    ]
  });
  document.getElementById("musicApp").appendChild(l.element);
});