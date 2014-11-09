var components = components || {};

Truss.init(function(components) {
  components.socket = io.connect();
}, components);