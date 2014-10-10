var Launcher = (function() {

  var l={};

  l.launchApp = function() {
    //TODO make this less stupid: this manually sets the hosting folder each time
    //var entry = "C:\Users\YuChen\Dropbox\Photos"
    //window.entry = entry
    //window.fs = new FileSystem(entry)

    //Defines a handler to be used for the webserver
    function MainHandler() {
        BaseHandler.prototype.constructor.call(this)
    }
    _.extend(MainHandler.prototype, {
        get: function() {
            // handle get request
            this.write('OK!, ' + this.request.uri)
        }
    })
    for (var key in BaseHandler.prototype) {
        MainHandler.prototype[key] = BaseHandler.prototype[key]
    }

    var handlers = [
//        ['.*', MainHandler]
//        ['.*', PackageFilesHandler]
        ['.*', DirectoryEntryHandler]
    ]
    //Set up a web server with these settings and start it
    var app = new chrome.WebApplication({handlers:handlers, port:8080})
    app.start()
    
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

chrome.app.runtime.onLaunched.addListener(function(launchData) {

    var app = new chrome.WebApplication({handlers:handlers, port:8887})
    app.start()
});
Launcher.init();

//Some listeners for web server events
chrome.runtime.onSuspend.addListener( function(evt) {
    console.error('onSuspend',evt)
    app.stop()
})


function reload() { chrome.runtime.reload() }
chrome.runtime.onSuspendCanceled.addListener( function(evt) {
    console.error('onSuspendCanceled',evt)
})

chrome.app.window.onClosed.addListener(function(evt) {
    console.log('window closed. shutdown server, unload background page? hm?')
})

function reload() { chrome.runtime.reload() }
