var components = components || {};

Truss.init(function(components) {
  components.ListView = Truss.createComponent({
    "class": "ListView",
    "template": "<h2></h2>" +
      "<div class='items'></div>",
    "properties": {
      "header": "h2",
      "items": ".items"
    },
    "functions": {
      "hide": function() {
        this.element.style.overflow = "hidden";
        this.element.style.height = getComputedStyle(this.element).height;
        this.element.style.transition = 'all .5s ease';
        this.element.offsetHeight = "" + this.element.offsetHeight; // force repaint
        this.element.style.height = '0';
        this.element.style.marginTop = "0";
        this.element.style.marginBottom = "0";
        this.setProperty("open", false);
      },
      "show": function() {
        var prevHeight = "0";
        this.element.style.height = 'auto';
        var endHeight = getComputedStyle(this.element).height;
        this.element.style.height = prevHeight;
        this.element.offsetHeight = "" + this.element.offsetHeight; // force repaint
        this.element.style.transition = 'all .5s ease';
        this.element.style.height = endHeight;
        this.element.style.marginTop = "";
        this.element.style.marginBottom = "";
        this.setProperty("open", true);
        this.element.addEventListener('transitionend', function transitionEnd(event) {
          if (event.propertyName == 'height') {
            this.style.transition = '';
            this.style.height = 'auto';
            this.removeEventListener('transitionend', transitionEnd, false);
            this.style.overflow = "visible";
          }
        }, false);
      },
      /*"removeItem": function(songId) {
        // for (var i = 0; i < this.property("items"); i++) {
        //   if (item.property("id") == songId) {
        //     this.removeProperty("items", item);
        //   }
        // }
        Array.prototype.forEach.call(this.property("items"), function(item) {
          if (item.property("id") == songId) {
            this.removeProperty("items", item);
          }
        }); 
      }*/
    },
    "events": {
      "init": function() {
        if (this.property("hide")) {
          this.setProperty("open", false);
          this.element.style.height = '0';
          this.element.style.overflow = "hidden";
          this.element.style.marginTop = "0";
          this.element.style.marginBottom = "0";
        }
      }
    }
  });
}, components);