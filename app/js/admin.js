var components = components || {};

Truss.init(function(components) {
  var DirectoryPicker = document.querySelector(".DirectoryPicker");

  DirectoryPicker.querySelector("input").addEventListener("change", function() {
    DirectoryPicker.querySelector(".picker").innerHTML = this.files[0].name;
  });

  DirectoryPicker.querySelector(".picker").addEventListener("click", function() {
    DirectoryPicker.querySelector("input").click();
  });

  DirectoryPicker.querySelector(".submit").addEventListener("click", function() {
    //window.console.log(process.mainModule.exports);
    //window.console.log(process.mainModule.exports.setDirectory);
    process.mainModule.exports.setDirectory(DirectoryPicker.querySelector("input").value);
  });

  var Player = document.getElementById("player");

}, components);
