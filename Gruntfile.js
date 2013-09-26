module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		srcDir: 'src',
		devCssDir: '<%= srcDir %>/css',
		devScssDir: '<%= devCssDir %>/scss',
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
					'<%= devCssDir %>/styles.css': '<%= devScssDir %>/styles.scss'
				},
				options: {
					style: 'expanded'
				}
			},
			build: {
				files: {
					'<%= devCssDir %>/styles.css': '<%= devScssDir %>/styles.scss'
				},
				options: {
					style: 'compressed'
				}
			}
		},

		/*autoprefixer: {
			options: {
				browsers: ['last 2 version']
			},

			// single_file: {
			// 	src: 'src/css/file.css',
			// 	dest: 'dest/css/file.css'
			// },

			multiple_files: {
				// expand: true,
				// flatten: true,
				src: 'src/css/*.css', // -> src/css/file1.css, src/css/file2.css
				dest: 'src/css/*.css'
			}

			// concat: {
			// 	src: 'src/css/*.css', // -> src/css/file1.css, src/css/file2.css
			// 	dest: 'dest/css/concatenated.css' // -> dest/css/concatenated.css
			// }
		},*/

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
				tasks: ['watch', 'jshint', 'connect'],
				options: {
					logConcurrentOutput: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
	// grunt.loadNpmTasks('grunt-autoprefixer');

	grunt.registerTask('build', ['jshint', 'sass:build']);
	grunt.registerTask('run', [
		'sass:dev',
		'concurrent'
	]);
	// grunt.registerTask('ap', ['autoprefixer']);
};