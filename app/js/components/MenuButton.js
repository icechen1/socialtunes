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
    }
  });
}, components);