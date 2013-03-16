(function () {
	'use strict';

	require.config({
		baseUrl: 'js/',
		shim: {
			underscore: {
				exports: '_'
			},
			backbone: {
				deps: [
					'underscore',
					'jquery'
				],
				exports: 'Backbone'
			}
		},
		paths: {
			jquery: 'libs/jquery-2.0.0b2',
			underscore: 'libs/underscore-1.4.4',
			backbone: 'libs/backbone-0.9.10'
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