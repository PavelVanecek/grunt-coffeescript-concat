'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.coffeescript_concat = {
  plain_files: function(test) {
    var actual = grunt.file.read('./tmp/plain_files');
    var expected = grunt.file.read('test/expected/plain_files');
    test.equal(actual, expected, 'should correctly concatenate plain files');

    test.done();
  },
  classes: function(test) {

    var actual = grunt.file.read('./tmp/classes');
    var expected = grunt.file.read('test/expected/classes');
    test.equal(actual, expected, 'should correctly concatenate classes');
    test.done();
  },
  include: function(test) {

    var actual = grunt.file.read('./tmp/include');
    var expected = grunt.file.read('test/expected/include');
    test.equal(actual, expected, 'should correctly concatenate included folders');
    test.done();
  }
};
