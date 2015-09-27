var components = components || {};

Truss.init(function(components) {
  components.ActionButton = Truss.createComponent({
    "class": "ActionButton",
    "template": "<a class='button'><i class='fa fa-play'></i><i class='fa fa-minus'></i></a>" +
      "<div class='player hidden'>" +
        "<img src='' />" +
        "<div class='info'>" +
          "<h2></h2>" +
          "<h3></h3>" +
          "<a class='pbutton'><i class='fa fa-play'></i><i class='fa fa-pause'></i></a>" +
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
      },
      ".pbutton:click": function() {
        if (this.element.className.indexOf("pause") == -1) {
          this.element.classList.add("pause");
        } else {
          this.element.classList.remove("pause");
        }
        components.player.pauseSong();
      }
    },
    "functions": {
      "hide": function() {
        this.element.style.bottom = "-90px";
      },
      "show": function() {
        this.element.style.bottom = "20px";
      }
    }
  });
}, components);