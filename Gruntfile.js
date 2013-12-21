/* jshint maxstatements: false */
module.exports = function(grunt) {
	'use strict';

	process.env.SELENIUM_LAUNCHER_PORT = 4444;

	grunt.initConfig({
		concat: {
			app: {
				src: [
					'app/application.js',
					'app/router.js',
					'app/todo/todo.js',
					'app/todo/todo_controller.js',
					'app/todos/todos_controller.js',
					'app/todo/todo_edit_view.js'
				],
				dest: 'public/js/app.js'
			}
		},

		connect: {
			server: {
				options: {
					port: 3000,
					base: './public'
				}
			}
		},

		jshint: {
			all: {
				src: ['Gruntfile.js', 'app/**/*.js', 'test/**/*.js']
			},
			e2e: {
				src: ['test/e2e/**/*.js']
			},
			options: {
				jshintrc: './.jshintrc'
			}
		},

		karma: {
			unit: {
				configFile: 'test/karma.conf.js'
			}
		},

		mochaTest: {
			e2e: {
				options: {
					bail: true,
					growl: true,
					reporter: 'spec',
					require: ['expect.js', 'mocha'],
					timeout: 10000,
					ui: 'bdd'
				},
				src: ['test/e2e/test-helper.js', 'test/e2e/**/*.js']
			}
		},

		pkg: grunt.file.readJSON('package.json'),

		watch: {
			APP_JS: {
				files: ['app/**/*.js'],
				tasks: ['build']
			},

			E2E_JS: {
				files: ['test/e2e/**/*.js'],
				tasks: [
					'jshint:e2e',
					'e2e-tests'
				]
			},

			options: {
				livereload: true
			}
		},
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-selenium-launcher');

	grunt.registerTask('e2e-tests', [ 'selenium-launch', 'mochaTest:e2e' ]);
	grunt.registerTask('build', ['jshint:all','karma:unit','concat:app','e2e-tests']);
	grunt.registerTask('dev', ['connect', 'build', 'watch']);
};

