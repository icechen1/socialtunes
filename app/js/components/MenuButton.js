var components = components || {};

Truss.init(function(components) {
  components.MenuButton = Truss.createComponent({
    "class": "MenuButton",
    "template": "<a class='button'></a>",
    "properties": {
      "icon": ".button"
    },
    "events": {
      ".button:click": function() {
        if (typeof this.property("open") == "function") {
          this.property("open")();
        }
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