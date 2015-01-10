var components = components || {};

function AudioPlayer() {
  var current = new Audio();

  var songFinishedCallback = function() {};

  this.onSongFinished = function(callback) {
    songFinishedCallback = callback;
  };

  current.addEventListener("ended", function() {
    songFinishedCallback();
  });

  current.addEventListener("error", function() {
    console.error(current.error);
  });

  this.setSong = function(song) {
    current.src = song.url;
    current.play();
  };
}


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




  var player = new AudioPlayer();

  var queue = [
    {
      "url": "c:\\Users\\YuChen\\Downloads\\hooked on a feeling bottles (4).mp3"
    },
    {
      "url": "01 Disintegration.wav"
    }
  ];

  player.onSongFinished(function() {
    var newSong = queue.shift();

    if (newSong) {
      player.setSong(newSong);
    }
  });

  player.setSong(queue[0]);

}, components);
