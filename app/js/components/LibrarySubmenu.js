var components = components || {};

Truss.init(function(components) {
  components.LibrarySubmenu = Truss.createComponent({
    "class": "ListItem Submenu",
    "template": "<div class='info'>" +
        "<h2></h2>" +
      "</div>" +
      "<a class='open'>&gt;</a>",
    "properties": {
      "name": "h2",
    },
    "events": {
      ".open:click": function() {
        this.triggerEvent("close");
      }
    }
  });
}, components);