var components = components || {};

Truss.init(function(components) {
  var DirectoryPicker = document.querySelector(".DirectoryPicker");
  
  DirectoryPicker.querySelector(".picker").addEventListener("click", function() {
    DirectoryPicker.querySelector("input").click();
  });
  
  DirectoryPicker.querySelector("submit").addEventListener("click", function() {
    process.mainModule.setDirectory(DirectoryPicker.querySelector("input").value);
  });
}, components);