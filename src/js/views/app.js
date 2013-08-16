define([
	'jquery',
	'underscore',
	'backbone',
	'models/img',
	'collections/imgs',
	'views/img'
], function ($, _, Backbone, ImgModel, ImgsCollection, ImgView) {
	'use strict';

	var AppView = Backbone.View.extend({
		el: '.app',

		uploadTmpl: _.template($('#upload-tmpl').html()),

		events: {
			'dragenter .upload-field': 'handleDrag',
			'dragover .upload-field': 'handleDrag',
			'dragleave .upload-field': 'handleDrag',
			'drop .upload-field': 'handleFiles'
		},

		initialize: function () {
			this.render();

			this.$mainContent = this.$el.find('.main-content');

			this.draggedImgs = new ImgsCollection();
			this.draggedImgs.on('add', this.renderImgOutput, this);
		},

		render: function () {
			var div = document.createElement('div');

			if (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) {
				this.$el.append(this.uploadTmpl());

				this.$uploadField = this.$el.find('.upload-field');
			}

			return this;
		},

		handleDrag: function (event) {
			var originalText;

			event.preventDefault();

			if (event.type === 'dragenter') {
				originalText = this.$uploadField.text();

				this.$uploadField
					.addClass('file-drag-active')
					.data('original-text', originalText)
					.find('.upload-field__text')
					.text('Drop \'em!');
			} else if (event.type === 'dragleave') {
				originalText = this.$uploadField.data('original-text');

				this.$uploadField
					.removeClass('file-drag-active')
					.find('.upload-field__text')
					.text(originalText);
			}
		},

		handleFiles: function (event) {
			var self = this,
				files = event.originalEvent.dataTransfer.files;

			event.preventDefault();

			this.$uploadField
				.removeClass('file-drag-active')
				.find('.upload-field__text')
				.text(this.$uploadField.data('original-text'));

			if (window.File && window.FileReader && window.FileList) {
				_.each(files, function (file) {
					var reader;

					if (file.type.match('image.*')) {
						reader = new FileReader();

						reader.onload = (function (f) {
							return function (e) {
								self.draggedImgs.add(new ImgModel({
									name: f.name,
									type: f.type,
									fileSize: f.size,
									dataUrl: e.target.result
								}));
							};
						}(file));

						reader.readAsDataURL(file);
					}
				});
			}
		},

		renderImgOutput: function (model) {
			var view = new ImgView({
				model: model
			});

			this.$mainContent.append(view.render().el);
		}
	});

	return AppView;
});