var Launcher = (function() {

  var l={};

  l.launchApp = function() {

    //If the app window is already open, bring it to the front
    if (l.windowId && chrome.app.window.get(l.windowId)) {
      chrome.app.window.get(l.windowId).focus();

    //Otherwise, create the window
    } else {
      chrome.app.window.create('app/index.html', {
        'bounds': {
            'width': 900,
            'height': 600
        },
        'resizable': true,
        'id': "socialtunes"
      }, function(window) {

        //Save the id so we can bring it to front later
        l.windowId = window.id;
      });
    }
  };

  l.init = function() {
    chrome.app.runtime.onLaunched.addListener(l.launchApp);
    l.launchApp();
  };

  return l;

}());

Launcher.init();

