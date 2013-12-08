var startsWith = function(string, substring) {
    return new RegExp('^' + substring).test(string);
};

var endsWith = function(string, substring) {
    return new RegExp(substring + '$').test(string);
};

exports.config = {
  files: {
    javascripts: {
      defaultExtension: 'js',
      joinTo: {
        'js/app.js': function(path) {
            return startsWith(path, 'app') && !endsWith(path, 'test.js');
        },
        'js/vendor.js': /^(bower_components|vendor)/
      },
      order: {
        before: [
          'app/application.js',
          'app/router.js',
          'app/todo/todo.js',
          'app/todo/todo_controller.js',
          'app/todo/todos_controller.js',
          'app/todo/todo_edit_view.js'
        ]
      },
      root: 'app'
    },
    stylesheets: {
      defaultExtension: 'css',
      joinTo: 'css/app.css',
      root: 'app'
    },
    templates: {
      defaultExtension: 'hbs',
      joinTo: {
        'js/app.js': /^app.*.hbs/
      },
      precompile: false,
      root: 'app'
    }
  },
  modules: {
    addSourceURLs: true,
    definition: false,
    wrapper: false
  },
  plugins: {
    jshint: {
      pattern: /^app\/.*\.js$/
    }
  },
  server: {
    port: 3333,
    base: '/',
    run: false
  }
};

