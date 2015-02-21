/*
 * grunt-coffeescript-concat
 * https://github.com/PavelVanecek/grunt-coffeescript-concat
 *
 * Copyright (c) 2014 Pavel Vanecek
 * Licensed under the MIT license.
 */

'use strict';

// TODO: rewrite the coffeescript-concat so it is launchable directly, without executing
var exec = require('child_process').exec,
    coffeescript_concatPath = require.resolve('coffeescript-concat'),
    Q = require('q');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('coffeescript_concat', 'Grunt plugin for coffeescript-concat by fairfieldt', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      recursive: true,
      includeFolders: []
    });

    var allTasksDone = this.async(),
        deferreds = [];

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var files = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      var include = '';
      if (options.includeFolders && options.includeFolders.length) {
        include = ' -I ' + options.includeFolders.join(' ');
      }

      var optionMaxBuffer = 200 * 1024;
      if (options.maxBuffer && typeof options.maxBuffer === 'number') {
        optionMaxBuffer = options.maxBuffer;
      }

          var deferred = Q.defer();
          deferreds.push(deferred);
      exec('node ' + coffeescript_concatPath + ' ' + include + ' ' + files.join(" "), {maxBuffer: optionMaxBuffer}, function (error, stdout) {
          if (error) {
            grunt.log.error(error);
            return deferred.reject(error);
          }
          // coffeescript-concat library itself can write to file too via -o command, but grunt can create directories as well, preventing ENOENT errors
          grunt.file.write(f.dest, stdout);
          // Print a success message.
          grunt.log.writeln('File "' + f.dest + '" created.');
          deferred.resolve();
      });
    });

    Q.all(deferreds.map(function(d) { return d.promise; })).fin(function() {
      allTasksDone();
    });
  });

};
