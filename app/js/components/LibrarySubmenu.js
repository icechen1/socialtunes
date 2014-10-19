var components = components || {};

Truss.init(function(components) {
  components.LibrarySubmenu = Truss.createComponent({
    "class": "ListItem Submenu",
    "template": "<div class='info'>" +
        "<h2></h2>" +
      "</div>" +
      "<a class='open'></a>",
    "properties": {
      "name": "h2",
      "icon": ".open"
    },
    "events": {
      "$:click": function() {
        this.triggerEvent("close");
        if (typeof this.property("open") == "function") {
          this.property("open")();
        }
      }
    }
  });
}, components);