var components = components || {};

Truss.init(function(components) {
  components.LibraryView = Truss.createComponent({
    "class": "LibraryView",
    "template": "",
    "properties": {
      "items": "$"
    },
    "functions": {
      "hide": function() {
        this.element.style.height = getComputedStyle(this.element).height;
        this.element.style.transition = 'height .5s ease';
        this.element.offsetHeight = this.element.offsetHeight; // force repaint
        this.element.style.height = '0';
      },
      "show": function() {
        var prevHeight = this.element.style.height;
        this.element.style.height = 'auto';
        var endHeight = getComputedStyle(this.element).height;
        this.element.style.height = prevHeight;
        this.element.offsetHeight = this.element.offsetHeight; // force repaint
        this.element.style.transition = 'height .3s ease';
        this.element.style.height = endHeight;
        this.element.addEventListener('transitionend', function transitionEnd(event) {
          if (event.propertyName == 'height') {
            this.element.style.transition = '';
            this.element.style.height = 'auto';
            this.element.removeEventListener('transitionend', transitionEnd, false);
          }
        }, false);
      }
    },
    "events": {
      "$items:close": function() {
        this.hide();
      }
    }
  });
}, components);