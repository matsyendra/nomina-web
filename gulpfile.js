'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');

gulp.task('gen-sw', function(callback) {
  var path = require('path');
  var swPrecache = require('sw-precache');
  var rootDir = 'public';

  swPrecache.write(path.join(rootDir, 'sw.js'), {
    staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif,woff2,woff}'],
    stripPrefix: rootDir
  }, callback);
});