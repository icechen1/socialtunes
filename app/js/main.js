Truss.init(function() {
  var ActionButton = Truss.createComponent({
    "class": "ActionButton",
    "template": "<a class='button'>&lt;</a>" +
      "<div class='player hidden'>" +
        "<img src='' />" +
        "<div class='info'>" +
          "<h2></h2>" +
          "<h3></h3>" +
        "</div>" +
      "</div>",
    "properties": {
      "song": "h2",
      "artist": "h3",
      "art": "img:src"
    },
    "events": {
      ".button:click": function() {
        if (this.element.className.indexOf("open") == -1) {
          this.element.classList.add("open");
        } else {
          this.element.classList.remove("open");
        }
      }
    }
  });
  
  var ListItem = Truss.createComponent({
    "class": "ListItem",
    "template": "<img />" +
      "<div class='info'>" +
        "<h2></h2>" +
        "<p class='artist'></p>" +
        "<p class='album'></p>" +
      "</div>" +
      "<div class='votes'>" +
        "<a class='upvote animated'></a>" +
        "<a class='downvote animated'></a>" +
      "</div>",
    "properties": {
      "art": "img:src",
      "song": "h2",
      "album": ".album",
      "artist": ".artist"
    },
    "events": {
      ".upvote:click": function() {
        var upvote = this.getElement(".upvote");
        var downvote = this.getElement(".downvote");
        if (downvote.className.indexOf("selected") != -1) {
          downvote.classList.remove("selected");
        }
        if (upvote.className.indexOf("selected") == -1) {
          upvote.classList.add("selected");
        } else {
          upvote.classList.remove("selected");
        }
      },
      ".downvote:click": function() {
        var upvote = this.getElement(".upvote");
        var downvote = this.getElement(".downvote");
        if (upvote.className.indexOf("selected") != -1) {
          upvote.classList.remove("selected");
        }
        if (downvote.className.indexOf("selected") == -1) {
          downvote.classList.add("selected");
        } else {
          downvote.classList.remove("selected");
        }
      }
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
  
  
  var playerBtn = ActionButton.new({
    "song": "Hooked on a Feeling",
    "artist": "David Hasselhoff",
    "art": "images/hasselhoff.jpg"
  });
  document.body.appendChild(playerBtn.element);
});