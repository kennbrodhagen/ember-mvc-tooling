exports.config = {
    files: {
        javascripts: {
            defaultExtension: 'js',
            joinTo: {
                'javascripts/app.js': /^app/,
                'javascripts/vendor.js': /^vendor/
            }
        },

        stylesheets: {
            defaultExtension: 'css',
            joinTo: 'stylesheets/app.css'
        },

        templates: {
            defaultExtension: 'hbs',
            joinTo: {
                'javascripts/app.js': /^app/
            },
            precompile: true
        }
    }
};
