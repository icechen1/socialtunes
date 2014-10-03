var Truss = (function() {
  
  var t={};
  
  t.init = function(f) {
    window.addEventListener("load", f);
  };
  
  t.setTemplate = function(element, child) {
    if (!child) return;
    if (typeof(child)=="string") {
      element.innerHTML += child;
    } else if (child.Truss) {
      element.appendChild(child.element);
    } else if (child.tagName) {
      element.appendChild(child);
    } else if (child instanceof Array) {
      Array.prototype.forEach.call(child, function(c) {
        t.setTemplate(element, c);
      });
    }
  };
  
  t.createComponent = function(settings) {
    var template = {};
    
    template.new = function(s) {
      
      var c = {};
      
      c.Truss = true;
      
      c.element = document.createElement("div");
      c.element.className = settings.class;
      c.element.innerHTML = settings.template;
      
      c.getElement = function(el) {
        return c.element.querySelector(el);
      };
      
      if (settings.properties) {
        for (var index in s) {
          if (settings.properties[index]) {
            if (settings.properties[index] == "$") {
              t.setTemplate(c.element, s[index]);
            } else if (settings.properties[index].indexOf(":")>=1) {
              var el = settings.properties[index].substring(0, settings.properties[index].indexOf(":"));
              var prop = settings.properties[index].substring(settings.properties[index].indexOf(":")+1);
              var element = c.element.querySelector(el);
              if (element && typeof(s[index] == "string")) {
                element.setAttribute(prop, s[index]);
              }
            } else {
              t.setTemplate(c.element.querySelector(settings.properties[index]), s[index]);
            }
          }
        }
      }
      
      if (settings.events) {
        for (var index in settings.events) {
          var el = index.substring(0, index.indexOf(":"));
          var ev = index.substring(index.indexOf(":")+1);
          if (el=="$") {
            c.element.addEventListener(ev, settings.events[index].bind(c));
          } else if (el) {
            c.element.querySelector(el).addEventListener(ev, settings.events[index].bind(c));
          }
        }
      }
      
      return c;
      
    };
    
    return template;
  };
  
  return t;
  
}());