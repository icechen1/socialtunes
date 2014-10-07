var components = components || {};

Truss.init(function(components) {
  components.LibraryItem = Truss.createComponent({
    "class": "ListItem",
    "template": "<img />" +
      "<div class='info'>" +
        "<h2></h2>" +
        "<p class='artist'></p>" +
        "<p class='album'></p>" +
      "</div>" +
      "<a class='add'>+</a>",
    "properties": {
      "art": "img:src",
      "song": "h2",
      "album": ".album",
      "artist": ".artist"
    },
    "events": {
      ".add:click": function() {
        components.q.addProperty("items", components.ListItem.new({
          "art": this.property("art"),
          "song": this.property("song"),
          "album": this.property("album"),
          "artist": this.property("artist")
        }));
      }
    }
  });
}, components);