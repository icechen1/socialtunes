var components = components || {};

Truss.init(function(components) {
  components.DirectoryPicker = Truss.createComponent({
    "class": "DirectoryPicker",
    "template": "<h2>Choose a directory</h2>" +
        "<p>We'll search it and its subfolders for mp3 files to add to SocialTunes.</p>" +
        "<input type=\"file\" nwdirectory style=\"display:none;\" class=\"fileDialog\" />" +
        "<a class=\"button picker\">Pick directory</a>" +
        "<a class=\"button submit\">Submit</a>",
    "properties": {
      "message": "p"
    },
    "functions": {
      "hide": function() {
        this.element.style.overflow = "hidden";
        this.element.style.height = getComputedStyle(this.element).height;
        this.element.style.transition = 'height .5s ease';
        this.element.offsetHeight = "" + this.element.offsetHeight; // force repaint
        this.element.style.height = '0';
      },
      "show": function() {
        var prevHeight = "0";
        this.element.style.height = 'auto';
        var endHeight = getComputedStyle(this.element).height;
        this.element.style.height = prevHeight;
        this.element.offsetHeight = "" + this.element.offsetHeight; // force repaint
        this.element.style.transition = 'height .5s ease';
        this.element.style.height = endHeight;
        this.element.addEventListener('transitionend', function transitionEnd(event) {
          if (event.propertyName == 'height') {
            this.style.transition = '';
            this.style.height = 'auto';
            this.removeEventListener('transitionend', transitionEnd, false);
            this.style.overflow = "visible";
          }
        }, false);
      }
    },
    "events": {
      "$fileDialog:change": function() {
        console.log(this.element.querySelector("input").value);
      },
      "$picker:click": function() {
        this.element.querySelector("input").click();
      }
    }
  });
}, components);