var components = components || {};

Truss.init(function(components) {
  components.socket = io('http://localhost:3005');
}, components);