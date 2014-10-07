var components = components || {};

Truss.init(function(components) {
  components.ListView = Truss.createComponent({
    "class": "ListView",
    "template": "<h2></h2>" +
      "<div class='items'></div>",
    "properties": {
      "header": "h2",
      "items": ".items"
    }
  });
}, components);