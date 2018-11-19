# vfile-reporter-json

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Chat][chat-badge]][chat]

Format [`vfile`][vfile]s as **stringified** JSON.

## Installation

[npm][]:

```bash
npm install vfile-reporter-json
```

## Usage

```javascript
var vfile = require('vfile')
var reporter = require('vfile-reporter-json')

var one = vfile({path: 'test/fixture/1.js'})
var two = vfile({path: 'test/fixture/2.js'})

one.message('Warning!', {line: 2, column: 4})

console.log(reporter([one, two]))
```

Yields:

```json
[{"path":"test/fixture/1.js","cwd":"/Users/tilde/projects/oss/vfile-reporter-json","history":["test/fixture/1.js"],"messages":[{"reason":"Warning!","line":2,"column":4,"location":{"start":{"line":2,"column":4},"end":{"line":null,"column":null}},"ruleId":null,"source":null,"fatal":false,"stack":null}]},{"path":"test/fixture/2.js","cwd":"/Users/tilde/projects/oss/vfile-reporter-json","history":["test/fixture/2.js"],"messages":[]}]
```

## API

### `reporter(files[, options])`

Generate **stringified** JSON for `files` ([`VFile`][vfile] or `Array.<VFile>`).

##### `options`

Optional object.

###### `options.quiet`

Do not output anything for a file which has no warnings or errors (`boolean`,
default: `false`).  The default behaviour is to show a success message.

###### `options.silent`

Do not output messages without `fatal` set to true (`boolean`, default:
`false`).  Also sets `quiet` to `true`.

###### `options.pretty`

Given as `space` to [`JSON.stringify()`][json-stringify] (`boolean`, `number`,
or `string`, default: `0`).  When `true`, defaults to `2`.

## Contribute

See [`contributing.md` in `vfile/vfile`][contributing] for ways to get started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/vfile/vfile-reporter-json.svg

[build]: https://travis-ci.org/vfile/vfile-reporter-json

[coverage-badge]: https://img.shields.io/codecov/c/github/vfile/vfile-reporter-json.svg

[coverage]: https://codecov.io/github/vfile/vfile-reporter-json

[downloads-badge]: https://img.shields.io/npm/dm/vfile-reporter-json.svg

[downloads]: https://www.npmjs.com/package/vfile-reporter-json

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/vfile

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[vfile]: https://github.com/vfile/vfile

[json-stringify]: https://developer.mozilla.org/JavaScript/Reference/Global_Objects/JSON/stringify

[contributing]: https://github.com/vfile/vfile/blob/master/contributing.md

[coc]: https://github.com/vfile/vfile/blob/master/code-of-conduct.md
