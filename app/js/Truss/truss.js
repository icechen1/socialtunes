var Truss = (function() {
  
  var t={};
  
  t.init = function(f) {
    window.addEventListener("load", f);
  };
  
  //Return a component template object
  t.createComponent = function(settings) {
    var template = {};
    
    //Returns a new instance of the template
    template.new = function(s) {
      
      var c = {};
      
      var responses = {};
      
      c.Truss = true;
      
      //The element's item in the DOM
      c.element = document.createElement("div");
      c.element.className = settings.class;
      c.element.innerHTML = settings.template;
      
      c.getElement = function(el) {
        return c.element.querySelector(el);
      };
      
      //Fill the template with the specified values
      var setTemplate = function(element, child) {
        if (!child) return;
        if (typeof(child)=="string") {
          element.innerHTML += child;
        } else if (child.Truss) {
          element.appendChild(child.element);
        } else if (child.tagName) {
          element.appendChild(child);
        } else if (child instanceof Array) {
          Array.prototype.forEach.call(child, function(ch) {
            setTemplate(element, ch);
          });
        }
      };
      
      //Manage event listeners
      c.addListener = function(action, response) {
        
        //If there's nothing listening for that action, make a list for it
        if (!responses[action]) {
          responses[action] = [response];
          
          //Set up DOM event listeners if necessary
          var el = action.substring(0, index.indexOf(":"));
          var ev = action.substring(index.indexOf(":")+1);
          if (el) {
            if (el.indexOf("$") == -1) {
              c.element.querySelector(el).addEventListener(ev, function() {
                c.triggerEvent(action);
              });
            } else {
              if (el=="$") {
                c.element.addEventListener(ev, function() {
                  c.triggerEvent(action, this);
                });
              } else {
                var prop = el.substring(1);
                if (settings.properties[prop] && s[prop]) {
                  if (s[prop].Truss) {
                    s[prop].addListener(ev, function() {
                      c.triggerEvent(action, s.properties[prop]);
                    });
                  } else if (s[prop] instanceof Array) {
                    Array.prototype.forEach.call(s[prop], function(ch) {
                      ch.addListener(ev, function() {
                        c.triggerEvent(action, ch);
                      });
                    });
                  }
                }
              }
            }
          }
          
        } else {
            
          //Add it to the existing list if it isn't already there
          for (var i=0; i<responses[action].length; i++) {
            if (responses[action][i] == response) return;
          }
          responses[action].push(response);
        }
      };
      
      c.removeListener = function(action, response) {
        //Find and remove the response from the list
        if (responses[action]) {
          for (var i=0; i<responses[action].length; i++) {
            if (responses[action][i] == response) {
              responses[action].splice(i, 1);
              return;
            }
          }
        }
      };
      
      c.triggerEvent = function(action, current) {
        //If there are responses for this action, run them all
        if (action && responses[action]) {
          for (var i=0; i<responses[action].length; i++) {
            (responses[action][i])(current);
          }
        }
      };
      
      var index="";
      if (settings.properties) {
        for (index in s) {
          if (settings.properties[index]) {
            if (settings.properties[index] == "$") {
              setTemplate(c.element, s[index]);
            } else if (settings.properties[index].indexOf(":")>=1) {
              var el = settings.properties[index].substring(0, settings.properties[index].indexOf(":"));
              var prop = settings.properties[index].substring(settings.properties[index].indexOf(":")+1);
              var element = c.element.querySelector(el);
              if (element && typeof(s[index] == "string")) {
                element.setAttribute(prop, s[index]);
              }
            } else {
              setTemplate(c.element.querySelector(settings.properties[index]), s[index]);
            }
          }
        }
      }
      
      if (settings.events) {
        for (index in settings.events) {
          c.addListener(index, settings.events[index].bind(c));
        }
      }
      
      if (settings.functions) {
        for (index in settings.functions) {
          c[index] = settings.functions[index];
        }
      }
      
      return c;
      
    };
    
    return template;
  };
  
  return t;
  
}());