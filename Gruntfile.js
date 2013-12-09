module.exports = function(grunt) {
	'use strict';
	grunt.initConfig({
		concat: {
			app: {
				src: [
					'app/application.js',
					'app/router.js',
					'app/todo/todo.js',
					'app/todo/todo_controller.js',
					'app/todo/todos_controller.js',
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
			options: {
				jshintrc: './.jshintrc'
			}
		},

		karma: {
			unit: {
				configFile: 'test/karma.conf.js'
			}
		},

		pkg: grunt.file.readJSON('package.json'),

		watch: {
			APP_JS: {
				files: ['app/**/*.js'],
				tasks: [
					'jshint:all',
					'karma:unit:run',
					'concat:app'
				]
			},

			options: {
				atBegin: true,
				livereload: true
			}
		},
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-karma');

	grunt.registerTask('dev', ['connect', 'watch']);
};

