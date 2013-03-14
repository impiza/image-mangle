var app = app || {};

(function(Backbone, _, $, window, document) {
	'use strict';

	app.AppView = Backbone.View.extend({
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

			app.imgs = new app.ImgsCollection();
			app.imgs.on('add', this.renderImgOutput, this);
		},

		render: function() {
			if ('draggable' in document.createElement('span')) {
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
								app.imgs.add(new app.ImgModel({
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
			var view = new app.ImgView({
				model: model
			});

			this.$el.append(view.render().el);
		}
	});
}(Backbone, _, jQuery, window, document));