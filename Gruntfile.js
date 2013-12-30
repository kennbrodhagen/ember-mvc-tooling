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

    browserify: {
      public: {
        files: {
          'public/js/app.js': ['app/application.js']
        }
      }
    },

    clean: {
      public: ['public/**/*']
    },

    concat: {
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

    emberTemplates: {
      compile: {
        options: {
          templateBasePath: /app\//
        },
        files: {
          'public/js/templates.js': 'app/**/*.hbs'
        }
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
        src: ['test/karma.conf.js', 'app/**/*.test.js']
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
          require: ['mocha'],
          slow: 5000,
          timeout: 10000,
          ui: 'bdd'
        },
        src: ['test/e2e/test-helper.js', 'test/e2e/**/*.js']
      }
    },

    pkg: grunt.file.readJSON('package.json'),

    watch: {
      app: {
        files: ['app/**/*.js', '!**/*.test.js'],
        tasks: ['build:app', 'test:all']
      },

      unit: {
        files: ['app/**/*.test.js', 'test/karma.conf.js'],
        tasks: ['build:unit', 'test:unit']
      },

      assets: {
        files: ['app/assets/**'],
        tasks: ['build:assets', 'test:e2e']
      },

      vendor: {
        files: ['bower_components/**'],
        tasks: ['build:vendor', 'test:all']
      },

      e2e: {
        files: ['test/e2e/**/*.js'],
        tasks: ['build:e2e','test:e2e']
      },

      // Watch gruntfile to automatically reload.
      grunt: {
        files: ['Gruntfile.js'],
        tasks: ['build:grunt']
      },

      templates: {
        files: ['app/**/*.hbs'],
        tasks: ['build:templates', 'test:all']
      },

      // Watch with empty file list to define a single set of tasks
      // to run at startup, prevents mulitple runs of overlapping tasks.
      STARTUP: {
        options: {
          atBegin: true
        },
        files: [],
        tasks: ['clean:public', 'make:all']
      },

      options: {
        livereload: true,
        spawn: true
      }
    },
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('build:app', ['jshint:app', 'browserify']);
  grunt.registerTask('build:assets', ['copy:assets']);
  grunt.registerTask('build:e2e', ['jshint:e2e']);
  grunt.registerTask('build:grunt', ['jshint:grunt']);
  grunt.registerTask('build:templates', ['emberTemplates']);
  grunt.registerTask('build:unit', ['jshint:unit']);
  grunt.registerTask('build:vendor', ['bower_concat:all', 'concat:vendor']);
  grunt.registerTask('build:all',
    ['build:grunt', 'build:app', 'build:templates', 'build:assets', 'build:vendor',
     'build:e2e', 'build:unit']);

  grunt.registerTask('test:e2e', ['selenium-launch', 'mochaTest:e2e']);
  grunt.registerTask('test:unit', ['karma:unit']);
  grunt.registerTask('test:all',
    ['test:unit', 'test:e2e']);

  grunt.registerTask('make:unit',
    ['build:unit', 'test:unit']);
  grunt.registerTask('make:e2e',
    ['build:e2e', 'test:e2e']);
  grunt.registerTask('make:all',
    ['build:all', 'test:all']);

  grunt.registerTask('dev', ['connect', 'watch']);


};

