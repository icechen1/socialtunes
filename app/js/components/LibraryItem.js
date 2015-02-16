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
        if (!this.property("added")) {
          this.setProperty("icon", "<i class='fa fa-minus'>");
          this.setProperty("added", true);
          this.element.classList.add("animated");
          this.element.classList.remove("removed");
          this.element.classList.add("added");
          this.setProperty("queueItem", components.ListItem.new({
            "art": this.property("art"),
            "song": this.property("song"),
            "album": this.property("album"),
            "artist": this.property("artist")
          }));
          components.q.addProperty("items", this.property("queueItem"));
          //this is not working
          // process.mainModule.exports.addSongToQueue(this.property("properties"));
          console.log(this.property("properties"));
          components.socket.emit("new_queue", this.property("properties"));
        } else {
          this.setProperty("icon", "<i class='fa fa-plus'>");
          this.setProperty("added", false);
          this.element.classList.remove("added");
          this.element.classList.add("removed");

          this.property("queueItem").element.style.overflow = "hidden";
          this.property("queueItem").element.style.height = getComputedStyle(this.property("queueItem").element).height;
          this.property("queueItem").element.style.transition = 'all .5s ease';
          this.property("queueItem").element.offsetHeight = "" + this.property("queueItem").element.offsetHeight; // force repaint
          this.property("queueItem").element.style.height = '0';
          this.property("queueItem").element.style.minHeight = '0';
          this.property("queueItem").element.style.paddingTop = "0";
          this.property("queueItem").element.style.paddingBottom = "0";
          this.property("queueItem").element.addEventListener("transitionend", function transitionEnd(event) {
            if (event.propertyName == 'height') {
              this.property("queueItem").element.removeEventListener('transitionend', transitionEnd.bind(this), false);
              //components.q.removeProperty("items", this.property("queueItem"));
            }
          }.bind(this), false);
        }
      }
    }
  });
}, components);