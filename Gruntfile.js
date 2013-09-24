module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		srcDir: './src',
		devCssDir: '<%= srcDir %>/css',
		devScssDir: '<%= srcCssDir %>/scss',
		devJsDir: '<%= srcDir %>/js',

		jshint: {
			files: [
				'Gruntfile.js',
				'<%= srcDir %>/**/*.js'
			],
			options: {
				ignores: [
					'**/libs/*.js',
					'**/*.min.js',
					'<%= devJsDir %>/r.js',
					'<%= devJsDir %>/build.js'
				],
				boss: true,
				browser: true,
				curly: false,
				devel: true,
				eqnull: true,
				evil: true,
				immed: false,
				newcap: false,
				noarg: true,
				smarttabs: true,
				sub: true,
				undef: true,
				globals: {
					console: true,
					module: true,
					define: true,
					require: true,
					document: true
				}
			}
		},

		connect: {
			server: {
					options: {
					port: 9001,
					base: '<%= srcDir %>',
					keepalive: true 
				}
			}
		},

		sass: {
			dev: {
				files: {
					'<%= devScssDir %>/styles.scss': '<%= srcCssDir %>/styles.css'
				},
				options: {
					style: 'expanded'
				}
			},
			build: {
				files: {
					'<%= srcScssDir %>/styles.scss': '<%= srcCssDir %>/styles.css'
				},
				options: {
					style: 'compressed'
				}
			}
		},

		watch: {
			css: {
				files: [
					'<%= devScssDir %>/**/*.scss'
				],
				tasks: ['sass:dev']
			},
			scripts: {
				files: [
					'<%= devJsDir %>/**/*.js',
					'Gruntfile.js'
				],
				tasks: ['jshint']
			}
		},

		concurrent: {
			run: {
				tasks: ['watch', 'connect'],
				options: {
					logConcurrentOutput: true
				}
			}
		},
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');

	grunt.registerTask('build', ['jshint', 'sass:build']);
	grunt.registerTask('run', ['concurrent']);
};