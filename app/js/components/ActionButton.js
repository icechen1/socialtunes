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
        this.element.style.overflow = "hidden";
        this.element.style.height = getComputedStyle(this.element).height;
        this.element.style.transition = 'height .5s ease';
        this.element.offsetHeight = "" + this.element.offsetHeight; // force repaint
        this.element.style.height = '0';
      },
      "show": function() {
        var prevHeight = "0";
        this.element.style.height = 'auto';
        var endHeight = getComputedStyle(this.element).height;
        this.element.style.height = prevHeight;
        this.element.offsetHeight = "" + this.element.offsetHeight; // force repaint
        this.element.style.transition = 'height .5s ease';
        this.element.style.height = endHeight;
        this.element.addEventListener('transitionend', function transitionEnd(event) {
          if (event.propertyName == 'height') {
            this.style.transition = '';
            this.style.height = 'auto';
            this.removeEventListener('transitionend', transitionEnd, false);
            this.style.overflow = "visible";
          }
        }, false);
      }
    }
  });
}, components);