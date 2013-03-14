var app = app || {};

(function(Backbone, _) {
	'use strict';

	app.ImgView = Backbone.View.extend({
		tagName: 'div',

		className: 'output',

		outputTmpl: _.template($('#output-tmpl').html()),

		events: {
			'focus .data-url': 'selectOutputValue'
		},

		render: function() {
			this.$el.html(this.outputTmpl(this.model.attributes));

			this.$textArea = this.$el.find('.data-url');
			this.$textArea.on('mouseup', function(event) {
				// Fix for Chrome
				event.preventDefault();
			});

			return this;
		},

		selectOutputValue: function() {
			this.$textArea.select();
		}
	});
}(Backbone, _));