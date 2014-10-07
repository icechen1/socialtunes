var components = components || {};

Truss.init(function(components) {
  var l = components.ListView.new({
    "header": "Library",
    "items": [
      components.ListItem.new({
        "art": "images/album.jpg",
        "song": "Song Name",
        "album": "Album Name",
        "artist": "Artist Name"
      }),
      components.ListItem.new({
        "art": "images/album.jpg",
        "song": "Song Name",
        "album": "Album Name",
        "artist": "Artist Name"
      }),
      components.ListItem.new({
        "art": "images/album.jpg",
        "song": "Song Name",
        "album": "Album Name",
        "artist": "Artist Name"
      }),
      components.ListItem.new({
        "art": "images/album.jpg",
        "song": "Song Name",
        "album": "Album Name",
        "artist": "Artist Name"
      }),
      components.ListItem.new({
        "art": "images/album.jpg",
        "song": "Song Name",
        "album": "Album Name",
        "artist": "Artist Name"
      }),
      components.ListItem.new({
        "art": "images/album.jpg",
        "song": "Song Name",
        "album": "Album Name",
        "artist": "Artist Name"
      }),
      components.ListItem.new({
        "art": "images/album.jpg",
        "song": "Song Name",
        "album": "Album Name",
        "artist": "Artist Name"
      }),
      components.ListItem.new({
        "art": "images/album.jpg",
        "song": "Song Name",
        "album": "Album Name",
        "artist": "Artist Name"
      }),
      components.ListItem.new({
        "art": "images/album.jpg",
        "song": "Song Name",
        "album": "Album Name",
        "artist": "Artist Name"
      }),
      components.ListItem.new({
        "art": "images/album.jpg",
        "song": "Song Name",
        "album": "Album Name",
        "artist": "Artist Name"
      })
    ]
  });
  document.getElementById("musicApp").appendChild(l.element);
  
  var q = components.ListView.new({
    "header": "Queue",
    "items": [
      components.ListItem.new({
        "art": "images/album.jpg",
        "song": "Song Name",
        "album": "Album Name",
        "artist": "Artist Name"
      }),
      components.ListItem.new({
        "art": "images/album.jpg",
        "song": "Song Name",
        "album": "Album Name",
        "artist": "Artist Name"
      }),
      components.ListItem.new({
        "art": "images/album.jpg",
        "song": "Song Name",
        "album": "Album Name",
        "artist": "Artist Name"
      }),
      components.ListItem.new({
        "art": "images/album.jpg",
        "song": "Song Name",
        "album": "Album Name",
        "artist": "Artist Name"
      })
    ]
  });
  document.getElementById("musicApp").appendChild(q.element);
  
  
  var playerBtn = components.ActionButton.new({
    "song": "Hooked on a Feeling",
    "artist": "David Hasselhoff",
    "art": "images/hasselhoff.jpg"
  });
  document.body.appendChild(playerBtn.element);
}, components);