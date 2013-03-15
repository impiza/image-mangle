define([
	'backbone',
	'models/img'
], function (Backbone, ImgModel) {
	'use strict';

	var ImgsCollection = Backbone.Collection.extend({
		model: ImgModel
	});
	
	return ImgsCollection;
});