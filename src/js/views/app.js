define([
	'jquery',
	'underscore',
	'backbone',
	'models/img',
	'collections/imgs',
	'views/img'
], function ($, _, Backbone, ImgModel, ImgsCollection, ImgView) {
	'use strict';

	var uploadedImgs,
		AppView = Backbone.View.extend({
			el: '.app',

			uploadTmpl: _.template($('#upload-tmpl').html()),

			events: {
				'dragenter .upload-field': 'handleDrag',
				'dragover .upload-field': 'handleDrag',
				'dragleave .upload-field': 'handleDrag',
				'drop .upload-field': 'handleFiles'
			},

			initialize: function() {
				this.render();

				uploadedImgs = new ImgsCollection();
				uploadedImgs.on('add', this.renderImgOutput, this);
			},

			render: function() {
				var div = document.createElement('div');

				if (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) {
					this.$el.append(this.uploadTmpl());

					this.$uploadField = this.$el.find('.upload-field');
				}

				return this;
			},

			handleDrag: function(event) {
				event.preventDefault();

				if (event.type === 'dragenter') {
					this.$uploadField.addClass('file-drag-active');
				} else if (event.type === 'dragleave') {
					this.$uploadField.removeClass('file-drag-active');
				}
			},

			handleFiles: function(event) {
				var files = event.originalEvent.dataTransfer.files,
					reader;

				event.preventDefault();

				this.$uploadField.removeClass('file-drag-active');

				if (window.File && window.FileReader && window.FileList) {
					_.each(files, function(file) {
						if (file.type.match('image.*')) {
							reader = new FileReader();

							reader.onload = (function(f) {
								return function(e) {
									uploadedImgs.add(new ImgModel({
										name: f.name,
										type: f.type,
										size: f.size,
										dataUrl: e.target.result
									}));
								};
							}(file));

							reader.readAsDataURL(file);
						}
					});
				}
			},

			renderImgOutput: function(model) {
				var view = new ImgView({
					model: model
				});

				this.$el.append(view.render().el);
			}
		});

	return AppView;
});