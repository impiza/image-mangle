var app = app || {};

(function($, Backbone, _, window, document) {
	app.ImgModel = Backbone.Model.extend();

	app.ImgsCollection = Backbone.Collection.extend({
		model: app.ImgModel
	});

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
			this.$el.append(this.uploadTmpl());

			this.$uploadField = this.$el.find('.upload-field');

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
				i = files.length,
				file,
				reader;

			event.preventDefault();

			this.$uploadField.removeClass('file-drag-active');

			while (--i >= 0) {
				file = files[i];
		
				if (file.type.match('image.*')) {
					reader = new FileReader();

					window.console.log(file);

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
			}
		},

		renderImgOutput: function(model) {
			window.console.log('render image output');
			var view = new app.ImgView({
				model: model
			});

			this.$el.append(view.render().el);
		}
	});

	$(function() {
		app.app = new app.AppView();
	});
}(jQuery, Backbone, _, window, document));