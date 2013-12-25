/* jshint maxstatements: false, camelcase: false */
module.exports = function(grunt) {
  'use strict';

  //process.env.SELENIUM_LAUNCHER_PORT = 4444;

  grunt.initConfig({
    bower_concat: {
      all: {
        dest: 'public/js/bower.js'
      }
    },
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
      },
      vendor: {
        src: [
          'vendor/localstorage_adapter.js'
        ],
        dest: 'public/js/vendor.js'
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

    copy: {
      assets: {
        cwd: 'app/assets/',
        dest: 'public/',
        expand: true,
        src: '**'
      }
    },

    jshint: {
      all: {
        src: ['Gruntfile.js', 'app/**/*.js', 'test/**/*.js']
      },
      app: {
        src: ['app/**/*.js', '!**/*.test.js']
      },
      e2e: {
        src: ['test/e2e/**/*.js']
      },
      grunt: {
        src: ['Gruntfile.js']
      },
      unit: {
        src: ['app/**/*.test.js']
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
          growl: true,
          reporter: 'spec',
          require: ['expect.js', 'mocha'],
          slow: 5000,
          timeout: 10000,
          ui: 'bdd'
        },
        src: ['test/e2e/test-helper.js', 'test/e2e/**/*.js']
      }
    },

    pkg: grunt.file.readJSON('package.json'),

    watch: {
      app_js: {
        files: ['app/**/*.js', '!**/*.test.js'],
        tasks: ['jshint:app', 'karma:unit', 'concat:app', 'e2e-tests']
      },

      app_test_js: {
        files: ['app/**/*.test.js'],
        tasks: ['jshint:unit', 'karma:unit']
      },

      assets: {
        files: ['app/assets/**'],
        tasks: ['copy:assets', 'e2e-tests']
      },

      bower: {
        files: ['bower_components/**'],
        tasks: ['bower_concat:all', 'e2e-tests']
      },

      e2e_js: {
        files: ['test/e2e/**/*.js'],
        tasks: ['jshint:e2e','e2e-tests']
      },

      // Watch gruntfile to automatically reload.
      grunt: {
        files: ['Gruntfile.js'],
        tasks: ['jshint:grunt']
      },

      // Watch with empty file list to define a single set of tasks
      // to run at startup, prevents mulitple runs of overlapping tasks.
      STARTUP: {
        options: {
          atBegin: true
        },
        files: [],
        tasks: ['build']
      },

      options: {
        livereload: true,
        spawn: true
      }
    },
  });

  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-selenium-launcher');

  grunt.registerTask('e2e-tests', [ 'selenium-launch', 'mochaTest:e2e']);
  grunt.registerTask('build',
    ['jshint:all','karma:unit', 'copy:assets','bower_concat:all',
    'concat:vendor', 'concat:app','e2e-tests']);
  grunt.registerTask('dev', ['connect', 'watch']);
};

