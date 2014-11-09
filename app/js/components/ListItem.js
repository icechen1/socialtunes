var components = components || {};

Truss.init(function(components) {
  components.ListItem = Truss.createComponent({
    "class": "ListItem animated",
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
      "artist": ".artist",
      "id": "$:id"
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
          components.socket.emit("vote_up", this.property("id"));
        } else {
          upvote.classList.remove("selected");
          components.socket.emit("vote_cancel", this.property("id"));
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
          components.socket.emit("vote_down", this.property("id"));
        } else {
          downvote.classList.remove("selected");
          components.socket.emit("vote_cancel", this.property("id"));
        }
      },
      "init": function() {
        this.setProperty("id", Math.round(Math.random()*100000));
        var t = setTimeout(function() {
          this.element.classList.remove("animated");
        }.bind(this), 1000);
      }
    }
  });
}, components);