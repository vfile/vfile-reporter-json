# vfile-reporter-json

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[vfile][] utility to create a report in machine readable JSON.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`reporterJson(files[, options])`](#reporterjsonfiles-options)
    *   [`JsonFile`](#jsonfile)
    *   [`JsonMessage`](#jsonmessage)
    *   [`Options`](#options)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is like [`vfile-reporter`][vfile-reporter] but it outputs machine
readable JSON.

## When should I use this?

You can use this when you need to serialize lint results for machines, use
`vfile-reporter` itself for humans.

## Install

This package is [ESM only][esm].
In Node.js (version 16+), install with [npm][]:

```sh
npm install vfile-reporter-json
```

In Deno with [`esm.sh`][esmsh]:

```js
import {reporterJson} from 'https://esm.sh/vfile-reporter-json@3'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {reporterJson} from 'https://esm.sh/vfile-reporter-json@3?bundle'
</script>
```

## Use

```js
import {VFile} from 'vfile'
import {reporterJson} from 'vfile-reporter-json'

const one = new VFile({path: 'test/fixture/1.js'})
const two = new VFile({path: 'test/fixture/2.js'})

one.message('Warning!', {line: 2, column: 4})

console.log(reporterJson([one, two]))
```

Yields:

```json
[{"path":"test/fixture/1.js","cwd":"/Users/tilde/Projects/oss/vfile-reporter-json","history":["test/fixture/1.js"],"messages":[{"column":4,"fatal":false,"line":2,"place":{"line":2,"column":4},"reason":"Warning!"}]},{"path":"test/fixture/2.js","cwd":"/Users/tilde/Projects/oss/vfile-reporter-json","history":["test/fixture/2.js"],"messages":[]}]
```

## API

This package exports the identifier [`reporterJson`][api-reporter-json].
That identifier is also the default export.

### `reporterJson(files[, options])`

Create a **serialized** JSON report from one file or multiple files.

###### Parameters

*   `files` ([`Array<VFile>`][vfile] or `VFile`)
    — file or files to report
*   `options` ([`Options`][api-options], default: `{}`)
    — configuration

###### Returns

Report as serialized JSON (`string`).

Reporters must return strings, which is why serialized JSON is exposed.
You can parse the result with `JSON.parse`, in which case you will get
[`Array<JsonFile>`][api-json-file].

### `JsonFile`

JSON file (TypeScript type).

###### Fields

*   `cwd` (`string`)
    — base of `path`
*   `history` (`Array<string>`)
    — list of filepaths the file moved between; the first is the original path
    and the last is the current path
*   `messages` ([`Array<JsonMessage>`][api-json-message])
    — list of filepaths the file moved between; the first is the original path
    and the last is the current path
*   `path` (`string`)
    — full path (example: `'~/index.min.js'`)

### `JsonMessage`

JSON message (TypeScript type).

###### Fields

*   `ancestors` ([`Array<Node>`][unist-node] or `undefined`)
    — stack of ancestor nodes surrounding the message
*   `column` (`number` or `undefined`)
    — starting column of message
*   `fatal` (`boolean` or `undefined`)
    — state of problem; `true`: error, file not usable; `false`: warning,
    change may be needed; `undefined`: change likely not needed
*   `line` (`number` or `undefined`)
    — starting line of message
*   `place` ([`Point`][unist-point], [`Position`][unist-position], or
    `undefined`)
    — place of message
*   `reason` (`string`)
    — reason for message, should use markdown
*   `ruleId` (`string | null`)
    — category of message (example: `'my-rule'`)
*   `source` (`string | null`)
    — namespace of message (example: `'my-package'`)
*   `actual` (`string | null | undefined`)
    — specify the source value that’s being reported, which is deemed incorrect
*   `expected` (`Array<string> | null | undefined`)
    — suggest acceptable values that can be used instead of `actual`
*   `note` (`string | null | undefined`)
    — long form description of the message, should use markdown
*   `url` (`string | null | undefined`)
    — link to docs for the message; this must be an absolute URL that can be
    passed as `x` to `new URL(x)`

### `Options`

Configuration (TypeScript type).

###### Fields

*   `pretty` (`boolean`, `number`, or `string`, default: `0`)
    — value of `space` of
    [`JSON.stringify(x, undefined, space)`][json-stringify]
*   `quiet` (`boolean`, default: `false`)
    — do not show files without messages
*   `silent` (`boolean`, default: `false`)
    — show errors only; this does not show info and warning messages; also sets
    `quiet` to `true`

## Types

This package is fully typed with [TypeScript][].
It exports the additional types [`JsonFile`][api-json-file],
[`JsonMessage`][api-json-message], and [`Options`][api-options].

## Compatibility

Projects maintained by the unified collective are compatible with maintained
versions of Node.js.

When we cut a new major release, we drop support for unmaintained versions of
Node.
This means we try to keep the current release line, `vfile-reporter-json@^3`,
compatible with Node.js 12.

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

[size-badge]: https://img.shields.io/badge/dynamic/json?label=minzipped%20size&query=$.size.compressedSize&url=https://deno.bundlejs.com/?q=vfile-reporter-json

[size]: https://bundlejs.com/?q=vfile-reporter-json

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/vfile/vfile/discussions

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[typescript]: https://www.typescriptlang.org

[contributing]: https://github.com/vfile/.github/blob/main/contributing.md

[support]: https://github.com/vfile/.github/blob/main/support.md

[health]: https://github.com/vfile/.github

[coc]: https://github.com/vfile/.github/blob/main/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[unist-node]: https://github.com/syntax-tree/unist#node

[unist-point]: https://github.com/syntax-tree/unist#point

[unist-position]: https://github.com/syntax-tree/unist#position

[vfile]: https://github.com/vfile/vfile

[vfile-reporter]: https://github.com/vfile/vfile-reporter

[json-stringify]: https://developer.mozilla.org/JavaScript/Reference/Global_Objects/JSON/stringify

[api-reporter-json]: #reporterjsonfiles-options

[api-json-file]: #jsonfile

[api-json-message]: #jsonmessage

[api-options]: #options
