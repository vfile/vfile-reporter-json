'use strict';

var test = require('tape');
var vfile = require('vfile');
var reporter = require('./index.js');

var cwd = process.cwd();

/* Tests. */
test('vfile-reporter-json', function (t) {
  var file;

  t.throws(
    function () {
      reporter();
    },
    /^TypeError: Cannot use 'in' operator to search for 'length' in undefined$/,
    'fail without file'
  );

  t.equal(
    reporter([]),
    '[]',
    'empty stringified array without files'
  );

  file = vfile({path: 'a.js'});

  t.equal(
    reporter(file),
    JSON.stringify([{
      path: 'a.js',
      cwd: cwd,
      history: ['a.js'],
      messages: []
    }]),
    'should support a file'
  );

  file = vfile({path: 'a.js'});

  t.equal(
    reporter(file, {pretty: true}),
    JSON.stringify([{
      path: 'a.js',
      cwd: cwd,
      history: ['a.js'],
      messages: []
    }], null, 2),
    'should support `pretty: true`'
  );

  t.equal(
    reporter(file, {pretty: 4}),
    JSON.stringify([{
      path: 'a.js',
      cwd: cwd,
      history: ['a.js'],
      messages: []
    }], null, 4),
    'should support `pretty: 4`'
  );

  t.equal(
    reporter(file, {pretty: '\t'}),
    JSON.stringify([{
      path: 'a.js',
      cwd: cwd,
      history: ['a.js'],
      messages: []
    }], null, '\t'),
    'should support `pretty: \'\\t\'`'
  );

  t.equal(
    reporter(file, {quiet: true}),
    JSON.stringify([]),
    'should support `quiet: true` on successful files'
  );

  t.equal(
    reporter(file, {silent: true}),
    JSON.stringify([]),
    'should support `silent: true` on successful files'
  );

  file.warn('Warning!');

  t.equal(
    reporter(file, {quiet: true}),
    JSON.stringify([{
      path: 'a.js',
      cwd: cwd,
      history: ['a.js'],
      messages: [{
        reason: 'Warning!',
        line: null,
        column: null,
        location: {
          start: {line: null, column: null},
          end: {line: null, column: null}
        },
        ruleId: null,
        source: null,
        fatal: false,
        stack: null
      }]
    }]),
    'should support `quiet: true` on files with warnings'
  );

  t.equal(
    reporter(file, {silent: true}),
    JSON.stringify([]),
    'should support `silent: true` on files with warnings'
  );

  file.messages = [];

  try {
    file.fail('Error!');
  } catch (err) {}

  t.equal(
    reporter(file, {quiet: true}),
    JSON.stringify([{
      path: 'a.js',
      cwd: cwd,
      history: ['a.js'],
      messages: [{
        reason: 'Error!',
        line: null,
        column: null,
        location: {
          start: {line: null, column: null},
          end: {line: null, column: null}
        },
        ruleId: null,
        source: null,
        fatal: true,
        stack: null
      }]
    }]),
    'should support `quiet: true` on fatal files'
  );

  t.equal(
    reporter(file, {silent: true}),
    JSON.stringify([{
      path: 'a.js',
      cwd: cwd,
      history: ['a.js'],
      messages: [{
        reason: 'Error!',
        line: null,
        column: null,
        location: {
          start: {line: null, column: null},
          end: {line: null, column: null}
        },
        ruleId: null,
        source: null,
        fatal: true,
        stack: null
      }]
    }]),
    'should support `silent: true` on fatal files'
  );

  file.messages = [];

  try {
    file.fail('Error!');
  } catch (err) {}

  t.equal(
    reporter(file),
    JSON.stringify([{
      path: 'a.js',
      cwd: cwd,
      history: ['a.js'],
      messages: [{
        reason: 'Error!',
        line: null,
        column: null,
        location: {
          start: {line: null, column: null},
          end: {line: null, column: null}
        },
        ruleId: null,
        source: null,
        fatal: true,
        stack: null
      }]
    }]),
    'should support a fatal message on a file'
  );

  file.messages = [];
  file.message('Warning!');

  t.equal(
    reporter(file),
    JSON.stringify([{
      path: 'a.js',
      cwd: cwd,
      history: ['a.js'],
      messages: [{
        reason: 'Warning!',
        line: null,
        column: null,
        location: {
          start: {line: null, column: null},
          end: {line: null, column: null}
        },
        ruleId: null,
        source: null,
        fatal: false,
        stack: null
      }]
    }]),
    'should support a warning message on a file'
  );

  t.equal(
    reporter([
      vfile({path: 'a.js'}),
      vfile({path: 'b.js'})
    ]),
    JSON.stringify([
      {
        path: 'a.js',
        cwd: cwd,
        history: ['a.js'],
        messages: []
      },
      {
        path: 'b.js',
        cwd: cwd,
        history: ['b.js'],
        messages: []
      }
    ]
    ),
    'should work on files without messages'
  );

  file = vfile({path: 'a.js'});
  file.message('Warning!');

  t.equal(
    reporter([file]),
    JSON.stringify([{
      path: 'a.js',
      cwd: cwd,
      history: ['a.js'],
      messages: [{
        reason: 'Warning!',
        line: null,
        column: null,
        location: {
          start: {line: null, column: null},
          end: {line: null, column: null}
        },
        ruleId: null,
        source: null,
        fatal: false,
        stack: null
      }]
    }]
    ),
    'should work on files with warning messages'
  );

  file = vfile({path: 'a.js'});
  try {
    file.fail('Error!');
  } catch (err) {}

  t.equal(
    reporter([file]),
    JSON.stringify([{
      path: 'a.js',
      cwd: cwd,
      history: ['a.js'],
      messages: [{
        reason: 'Error!',
        line: null,
        column: null,
        location: {
          start: {line: null, column: null},
          end: {line: null, column: null}
        },
        ruleId: null,
        source: null,
        fatal: true,
        stack: null
      }]
    }]
    ),
    'should work on files with fatal messages'
  );

  t.end();
});
