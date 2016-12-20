# vfile-reporter-json [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Format [**vfile**][vfile]s as **stringified** JSON.

## Installation

[npm][]:

```bash
npm install vfile-reporter-json
```

## Usage

Dependencies:

```javascript
var vfile = require('vfile');
var reporter = require('vfile-reporter-json');

var one = vfile({path: 'test/fixture/1.js'});
var two = vfile({path: 'test/fixture/2.js'});

one.message('Warning!', {line: 2, column: 4});

var report = reporter([one, two]);
```

Yields:

```json
[{"path":"test/fixture/1.js","cwd":"/Users/tilde/projects/oss/vfile-reporter-json","history":["test/fixture/1.js"],"messages":[{"reason":"Warning!","line":2,"column":4,"location":{"start":{"line":2,"column":4},"end":{"line":null,"column":null}},"ruleId":null,"source":null,"fatal":false,"stack":null}]},{"path":"test/fixture/2.js","cwd":"/Users/tilde/projects/oss/vfile-reporter-json","history":["test/fixture/2.js"],"messages":[]}]
```

## API

### `reporter(files[, options])`

Generate **stringified** JSON for `files`.

###### Parameters

*   `files` ([`VFile`][vfile] or `Array.<VFile>`).
*   `options` (`object`, optional):
    *   `quiet` (`boolean`, default: `false`)
        — Do not output anything for a file which has no warnings or
        errors.  The default behaviour is to show a success message.
    *   `silent` (`boolean`, default: `false`)
        — Do not output messages without `fatal` set to true.
        Also sets `quiet` to `true`.
    *   `pretty` (`boolean`, `number`, or `string`, default: `0`)
        — When `true`, defaults to `2`.
        Given as `space` to [`JSON.stringify()`][json-stringify].

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/vfile/vfile-reporter-json.svg

[travis]: https://travis-ci.org/vfile/vfile-reporter-json

[codecov-badge]: https://img.shields.io/codecov/c/github/vfile/vfile-reporter-json.svg

[codecov]: https://codecov.io/github/vfile/vfile-reporter-json

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[vfile]: https://github.com/vfile/vfile

[json-stringify]: https://developer.mozilla.org/JavaScript/Reference/Global_Objects/JSON/stringify
