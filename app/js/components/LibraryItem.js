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
      "<a class='icon'></a>",
    "properties": {
      "art": "img:src",
      "song": "h2",
      "album": ".album",
      "artist": ".artist",
      "icon": ".icon"
    },
    "events": {
      "init": function() {
        this.setProperty("icon", "<i class='fa fa-plus'></i>");
      },
      "$:click": function() {
        this.setProperty("icon", "<i class='fa fa-minus'>");
        this.element.classList.add("animated");
        this.element.classList.add("added");
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