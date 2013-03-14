var app = app || {};

(function($, Backbone, _, window, document) {
	'use strict';

	$(function() {
		app.app = new app.AppView();
	});
}(jQuery, Backbone, _, window, document));