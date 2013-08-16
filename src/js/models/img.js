define([
	'backbone'
], function (Backbone) {
	'use strict';

	var ImgModel = Backbone.Model.extend({
		initialize: function () {
			var fileSize = this.get('fileSize');

			this.set('formattedFileSize', this.formatFileSize(fileSize));
		},

		formatFileSize: function (fileSize) {
			var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
				i = 0;

			while (fileSize >= 1024) {
				fileSize /= 1024;

				i += 1;
			}

			fileSize = fileSize.toFixed(1) + ' ' + units[i];

			return fileSize;
		}
	});

	return ImgModel;
});