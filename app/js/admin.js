var components = components || {};

Truss.init(function(components) {
  components.d = components.DirectoryPicker.new({});
  
  document.getElementById("musicApp").appendChild(components.d.element);
}, components);