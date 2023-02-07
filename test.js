import assert from 'node:assert/strict'
import process from 'node:process'
import test from 'node:test'
import {VFile} from 'vfile'
import {reporterJson} from './index.js'

const cwd = process.cwd()

test('reporterJson', function () {
  /** @type {VFile} */
  let file

  assert.throws(function () {
    // @ts-ignore runtime
    reporterJson()
  }, 'fail without file')

  assert.equal(reporterJson([]), '[]', 'empty stringified array without files')

  file = new VFile({path: 'a.js'})

  assert.equal(
    reporterJson(file),
    JSON.stringify([
      {
        path: 'a.js',
        cwd,
        history: ['a.js'],
        messages: []
      }
    ]),
    'should support a file'
  )

  file = new VFile({path: 'a.js'})

  assert.equal(
    reporterJson(file, {pretty: true}),
    JSON.stringify(
      [
        {
          path: 'a.js',
          cwd,
          history: ['a.js'],
          messages: []
        }
      ],
      null,
      2
    ),
    'should support `pretty: true`'
  )

  assert.equal(
    reporterJson(file, {pretty: 4}),
    JSON.stringify(
      [
        {
          path: 'a.js',
          cwd,
          history: ['a.js'],
          messages: []
        }
      ],
      null,
      4
    ),
    'should support `pretty: 4`'
  )

  assert.equal(
    reporterJson(file, {pretty: '\t'}),
    JSON.stringify(
      [
        {
          path: 'a.js',
          cwd,
          history: ['a.js'],
          messages: []
        }
      ],
      null,
      '\t'
    ),
    "should support `pretty: '\\t'`"
  )

  assert.equal(
    reporterJson(file, {quiet: true}),
    JSON.stringify([]),
    'should support `quiet: true` on successful files'
  )

  assert.equal(
    reporterJson(file, {silent: true}),
    JSON.stringify([]),
    'should support `silent: true` on successful files'
  )

  file.message('Warning!')

  assert.equal(
    reporterJson(file, {quiet: true}),
    JSON.stringify([
      {
        path: 'a.js',
        cwd,
        history: ['a.js'],
        messages: [
          {
            reason: 'Warning!',
            line: null,
            column: null,
            position: {
              start: {line: null, column: null},
              end: {line: null, column: null}
            },
            ruleId: null,
            source: null,
            fatal: false,
            stack: null
          }
        ]
      }
    ]),
    'should support `quiet: true` on files with warnings'
  )

  assert.equal(
    reporterJson(file, {silent: true}),
    JSON.stringify([]),
    'should support `silent: true` on files with warnings'
  )

  file.messages = []

  try {
    file.fail('Error!')
  } catch {}

  assert.equal(
    reporterJson(file, {quiet: true}),
    JSON.stringify([
      {
        path: 'a.js',
        cwd,
        history: ['a.js'],
        messages: [
          {
            reason: 'Error!',
            line: null,
            column: null,
            position: {
              start: {line: null, column: null},
              end: {line: null, column: null}
            },
            ruleId: null,
            source: null,
            fatal: true,
            stack: null
          }
        ]
      }
    ]),
    'should support `quiet: true` on fatal files'
  )

  assert.equal(
    reporterJson(file, {silent: true}),
    JSON.stringify([
      {
        path: 'a.js',
        cwd,
        history: ['a.js'],
        messages: [
          {
            reason: 'Error!',
            line: null,
            column: null,
            position: {
              start: {line: null, column: null},
              end: {line: null, column: null}
            },
            ruleId: null,
            source: null,
            fatal: true,
            stack: null
          }
        ]
      }
    ]),
    'should support `silent: true` on fatal files'
  )

  file.messages = []

  try {
    file.fail('Error!')
  } catch {}

  assert.equal(
    reporterJson(file),
    JSON.stringify([
      {
        path: 'a.js',
        cwd,
        history: ['a.js'],
        messages: [
          {
            reason: 'Error!',
            line: null,
            column: null,
            position: {
              start: {line: null, column: null},
              end: {line: null, column: null}
            },
            ruleId: null,
            source: null,
            fatal: true,
            stack: null
          }
        ]
      }
    ]),
    'should support a fatal message on a file'
  )

  file.messages = []
  file.message('Warning!')

  assert.equal(
    reporterJson(file),
    JSON.stringify([
      {
        path: 'a.js',
        cwd,
        history: ['a.js'],
        messages: [
          {
            reason: 'Warning!',
            line: null,
            column: null,
            position: {
              start: {line: null, column: null},
              end: {line: null, column: null}
            },
            ruleId: null,
            source: null,
            fatal: false,
            stack: null
          }
        ]
      }
    ]),
    'should support a warning message on a file'
  )

  assert.equal(
    reporterJson([new VFile({path: 'a.js'}), new VFile({path: 'b.js'})]),
    JSON.stringify([
      {
        path: 'a.js',
        cwd,
        history: ['a.js'],
        messages: []
      },
      {
        path: 'b.js',
        cwd,
        history: ['b.js'],
        messages: []
      }
    ]),
    'should work on files without messages'
  )

  file = new VFile({path: 'a.js'})
  file.message('Warning!')

  assert.equal(
    reporterJson([file]),
    JSON.stringify([
      {
        path: 'a.js',
        cwd,
        history: ['a.js'],
        messages: [
          {
            reason: 'Warning!',
            line: null,
            column: null,
            position: {
              start: {line: null, column: null},
              end: {line: null, column: null}
            },
            ruleId: null,
            source: null,
            fatal: false,
            stack: null
          }
        ]
      }
    ]),
    'should work on files with warning messages'
  )

  file = new VFile({path: 'a.js'})
  try {
    file.fail('Error!')
  } catch {}

  assert.equal(
    reporterJson([file]),
    JSON.stringify([
      {
        path: 'a.js',
        cwd,
        history: ['a.js'],
        messages: [
          {
            reason: 'Error!',
            line: null,
            column: null,
            position: {
              start: {line: null, column: null},
              end: {line: null, column: null}
            },
            ruleId: null,
            source: null,
            fatal: true,
            stack: null
          }
        ]
      }
    ]),
    'should work on files with fatal messages'
  )

  file.messages = []
  file.message('Warning!')
  file.messages[0].url = 'https://example.com'

  assert.equal(
    reporterJson(file),
    JSON.stringify([
      {
        path: 'a.js',
        cwd,
        history: ['a.js'],
        messages: [
          {
            reason: 'Warning!',
            line: null,
            column: null,
            position: {
              start: {line: null, column: null},
              end: {line: null, column: null}
            },
            ruleId: null,
            source: null,
            fatal: false,
            stack: null,
            url: 'https://example.com'
          }
        ]
      }
    ]),
    'should support well-known fields'
  )
})
