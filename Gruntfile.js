/*
 * grunt-coffeescript-concat
 * https://github.com/PavelVanecek/grunt-coffeescript-concat
 *
 * Copyright (c) 2014 Pavel Vanecek
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    coffeescript_concat: {
      plain_files: {
        options: {},
        files: {
          'tmp/plain_files': [
            'test/fixtures/files/a.coffee',
            'test/fixtures/files/b.coffee',
            'test/fixtures/files/c.coffee'
          ],
        }
      },
      classes: {
        files: {
          'tmp/classes': [
            'test/fixtures/classes/classA.coffee',
            'test/fixtures/classes/classB.coffee',
            'test/fixtures/classes/classC.coffee'
          ]
        }
      },
      include: {
        options:  {
          includeFolders: [
            'test/fixtures/include/folderA'
          ],
        },
        files: {
          'tmp/include': [
            'test/fixtures/include/folderB/beta.coffee'
          ]
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'coffeescript_concat', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
