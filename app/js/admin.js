var components = components || {};

Truss.init(function(components) {
  var DirectoryPicker = document.querySelector(".DirectoryPicker");
  
  DirectoryPicker.querySelector(".picker").addEventListener("click", function() {
    DirectoryPicker.querySelector("input").click();
  });
  
  DirectoryPicker.querySelector(".submit").addEventListener("click", function() {
    //window.console.log(process.mainModule.exports);
    //window.console.log(process.mainModule.exports.setDirectory);
    process.mainModule.exports.setDirectory(DirectoryPicker.querySelector("input").value);
  });
}, components);