var Truss = (function() {
  
  var t={};
  
  t.init = function() {
    var args = Array.prototype.slice.call(arguments);
    window.addEventListener("load", function() {
      args[0].apply(this, args.slice(1));
    });
  };
  
  //Return a component template object
  t.createComponent = function(settings) {
    var template = {};
    
    //Returns a new instance of the template
    template.new = function(s) {
      
      s = s || {};
      
      var c = {};
      
      var responses = {};
      var properties = {};
      
      c.Truss = true;
      
      //The element's item in the DOM
      c.element = document.createElement("div");
      c.element.className = settings.class;
      c.element.innerHTML = settings.template;
      
      c.getElement = function(el) {
        return c.element.querySelector(el);
      };
      
      //Fill the template with the specified values
      var setTemplate = function(element, child, add) {
        if (!add) element.innerHTML = "";
        if (!child) return;
        if (typeof(child)=="string") {
          element.innerHTML += child;
        } else if (child.Truss) {
          element.appendChild(child.element);
        } else if (child.tagName) {
          element.appendChild(child);
        } else if (child instanceof Array) {
          Array.prototype.forEach.call(child, function(ch) {
            setTemplate(element, ch, add);
          });
        }
      };
      
      //Manage event listeners
      c.addListener = function(action, response) {
        
        //If there's nothing listening for that action, make a list for it
        if (!responses[action]) {
          responses[action] = [response];
          
          if (action.indexOf(":") != -1) {
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
      
      c.setProperty = function(property, value, add) {
        var p = settings.properties[property];
        if (properties[property] && properties[property] instanceof Array && add) {
          properties[property].push(value);
        } else {
          if (typeof value == "function") {
            properties[property]=value.bind(this);
          } else {
            properties[property]=value;
          }
        }
        if (p) {
          if (p == "$") {
            setTemplate(c.element, value, add);
          } else if (p.indexOf(":")>=1) {
            var el = p.substring(0, p.indexOf(":"));
            var prop = p.substring(p.indexOf(":")+1);
            var element;
            if (el == "$") {
              element = c.element;
            } else {
              element = c.element.querySelector(el);
            }
            if (element && typeof(value == "string")) {
              element.setAttribute(prop, value);
            }
          } else {
            setTemplate(c.element.querySelector(p), value, add);
          }
        }
      };
      
      c.removeProperty = function(property, value) {
        if (properties[property]) {
          if (properties[property] == value) {
            delete properties[property];
          } else if (properties[property] instanceof Array) {
            for (var i=0; i<properties[property].length; i++) {
              if (properties[property][i] == value) {
                properties[property].splice(i, 1);
                if (value.Truss && value.element.parentElement) {
                  value.element.parentElement.removeChild(value.element);
                } else if (value.tagName && value.parentElement) {
                  value.parentElement.removeChild(value);
                }
              }
            }
          }
        }
      }
      
      c.addProperty = function(property, value) {
        c.setProperty(property, value, true);
      };
      
      c.property = function(property) {
        return properties[property];
      };

      c.properties = function() {
        return properties;
      };
      
      var index="";
      if (settings.properties) {
        for (index in s) {
          c.addProperty(index, s[index]);
        }
      }
      
      if (settings.events) {
        for (index in settings.events) {
          c.addListener(index, settings.events[index].bind(c));
        }
      }
      
      if (s.events) {
        for (index in s.events) {
          c.addListener(index, s.events[index].bind(c));
        }
      }

      if (settings.functions) {
        for (index in settings.functions) {
          c[index] = settings.functions[index];
        }
      }
      
      c.triggerEvent("init");
      
      return c;
      
    };
    
    return template;
  };
  
  return t;
  
}());