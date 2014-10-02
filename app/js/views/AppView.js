var app = app || {};

(function () {
	
	app.AppView = Backbone.View.extend({

		el: document.getElementById("#musicApp"),

		initialize: function () {
			this.render();
		},

		render: function () {
			console.log("initialized");
		}
  });
  
})();