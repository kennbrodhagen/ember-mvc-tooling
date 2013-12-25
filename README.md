ember-mvc-tooling
=================

The Ember MVC demo app with karma unit tests, mocha/wd/webdriverjs e2e tests, and grunt automated build/test.

I created this repo to spike automated build/test using ember.  I started trying to use the brunch toolset but 
found that it did not have testing baked in so I wound up switching over to grunt since it looked like I was
going to have to use something like that anyway.  

Here is the current state of things here:

Automated build /test
=====================
Run 'grunt dev' to kick off a build and then watch changes.  It will automatically run karma/mocha unit tests and
e2e tests using mocha & wd/webdriverjs.  

Unit Tests
==========
Using karma + mocha + sinon for mocking.  Not too many unit tests just yet.

e2e Tests
=========
Using mocha + wd + webdriver + chai + chai-as-promised + mocha-as-promised

Build
=====
Just doing a basic concat to public folder right now.  Dependencies are managed in Gruntfile.js.  I hope to add
using browserify or something similar shortly.
