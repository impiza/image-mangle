module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: [
				'Gruntfile.js',
				'src/**/*.js',
				// 'tests/**/*.js',
				'!**/libs/*.js'
			],
			options: {
				globals: {
					jQuery: true,
					console: true,
					module: true,
					define: true,
					require: true,
					document: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default', ['jshint']);
};