var app = app || {};

(function(Backbone) {
	'use strict';

	app.ImgsCollection = Backbone.Collection.extend({
		model: app.ImgModel
	});
}(Backbone));