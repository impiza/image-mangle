(function () {
	'use strict';

	require.config({
		baseUrl: 'js/',
		shim: {
			lodash: {
				exports: '_'
			},
			backbone: {
				deps: [
					'lodash',
					'jquery'
				],
				exports: 'Backbone'
			}
		},
		paths: {
			jquery: 'libs/jquery-2.0.3.min',
			lodash: 'libs/lodash.1.3.1.min',
			backbone: 'libs/backbone-1.0-min'
		}
	});

	require([
		'jquery',
		'views/app'
	], function ($, AppView) {
		$(function() {
			new AppView();
		});
	});
}());