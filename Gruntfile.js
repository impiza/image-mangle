module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		srcDir: 'src',
		devCssDir: '<%= srcDir %>/css',
		devScssDir: '<%= devCssDir %>/scss',
		devJsDir: '<%= srcDir %>/js',
		distDir: 'dist',

		clean: {
			dist: ['<%= distDir %>/']
		},

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

		shell: {
			deploy: {
				command: 'appcfg.py update ./',
				options: {
					stdout: true,
					stderr: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-shell');

	grunt.registerTask('build', [
		'jshint',
		'clean',
		'sass:build'
	]);
	grunt.registerTask('run', [
		'sass:dev',
		'concurrent'
	]);
	grunt.registerTask('deploy', 'shell:deploy');
};