# vfile-reporter-json

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

Format [`vfile`][vfile]s as **stringified** JSON.

## Install

[npm][]:

```sh
npm install vfile-reporter-json
```

## Use

```js
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

###### `options.quiet`

Do not output anything for a file which has no warnings or errors (`boolean`,
default: `false`).
The default behavior is to show a success message.

###### `options.silent`

Do not output messages without `fatal` set to true (`boolean`, default:
`false`).
Also sets `quiet` to `true`.

###### `options.pretty`

Given as `space` to [`JSON.stringify()`][json-stringify] (`boolean`, `number`,
or `string`, default: `0`).
When `true`, defaults to `2`.

## Contribute

See [`contributing.md`][contributing] in [`vfile/.github`][health] for ways to
get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/vfile/vfile-reporter-json/workflows/main/badge.svg

[build]: https://github.com/vfile/vfile-reporter-json/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/vfile/vfile-reporter-json.svg

[coverage]: https://codecov.io/github/vfile/vfile-reporter-json

[downloads-badge]: https://img.shields.io/npm/dm/vfile-reporter-json.svg

[downloads]: https://www.npmjs.com/package/vfile-reporter-json

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/vfile/vfile/discussions

[npm]: https://docs.npmjs.com/cli/install

[contributing]: https://github.com/vfile/.github/blob/HEAD/contributing.md

[support]: https://github.com/vfile/.github/blob/HEAD/support.md

[health]: https://github.com/vfile/.github

[coc]: https://github.com/vfile/.github/blob/HEAD/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[vfile]: https://github.com/vfile/vfile

[json-stringify]: https://developer.mozilla.org/JavaScript/Reference/Global_Objects/JSON/stringify
