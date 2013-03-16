define([
	'jquery',
	'underscore',
	'backbone'
], function ($, _, Backbone) {
	'use strict';

	var ImgView = Backbone.View.extend({
		tagName: 'div',

		className: 'output',

		outputTmpl: _.template($('#output-tmpl').html()),

		events: {
			'focus .data-url': 'selectOutputValue'
		},

		render: function () {
			this.$el.html(this.outputTmpl(this.model.attributes));

			this.$textArea = this.$el.find('.data-url');
			this.$textArea.on('mouseup', function (event) {
				// Fix for Chrome
				event.preventDefault();
			});

			return this;
		},

		selectOutputValue: function () {
			this.$textArea.select();
		}
	});

	return ImgView;
});