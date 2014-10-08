var components = components || {};

Truss.init(function(components) {
  components.l = components.ListView.new({
    "header": "Library",
    "items": [
      components.LibraryView.new({
        "items": [
          components.LibrarySubmenu.new({
            "name": "Songs"
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
          })
        ]
      })
    ]
  });
  document.getElementById("musicApp").appendChild(components.l.element);
  
  components.q = components.ListView.new({
    "header": "Queue",
    "items": [
      components.ListItem.new({
        "art": "images/hasselhoff.jpg",
        "song": "Song Name",
        "album": "Album Name",
        "artist": "Artist Name"
      })
      /*components.ListItem.new({
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
      })*/
    ]
  });
  document.getElementById("musicApp").appendChild(components.q.element);
  
  
  components.playerBtn = components.ActionButton.new({
    "song": "Hooked on a Feeling",
    "artist": "David Hasselhoff",
    "art": "images/hasselhoff.jpg"
  });
  document.body.appendChild(components.playerBtn.element);
}, components);