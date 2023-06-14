/**
 * @typedef {import('vfile').VFile} VFile
 * @typedef {import('vfile-message').VFileMessage} VFileMessage
 */

/**
 * @typedef Options
 *   Configuration (optional).
 * @property {boolean | number | string | null | undefined} [pretty=0]
 *   Value of `space` of `JSON.stringify(x, undefined, space)` (default: `0`).
 * @property {boolean | null | undefined} [quiet=false]
 *   Do not show files without messages (default: `false`).
 * @property {boolean | null | undefined} [silent=false]
 *   Show errors only (default: `false`).
 *
 *   This does not show info and warning messages.
 *   Also sets `quiet` to `true`.
 *
 * @typedef JsonMessage
 *   JSON message.
 *
 *   > **Note**: `file` is not exposed.
 * @property {string | undefined} [stack]
 *   Stack of message.
 *
 *   This is used by normal errors to show where something happened in
 *   programming code.
 * @property {string} reason
 *   Reason for message.
 *
 *   > 👉 **Note**: you should use markdown.
 * @property {boolean | undefined} [fatal]
 *   State of problem.
 *
 *   * `true` — marks associated file as no longer processable (error)
 *   * `false` — necessitates a (potential) change (warning)
 *   * `undefined` — for things that might not need changing (info)
 * @property {number | undefined} [line]
 *   Starting line of error.
 * @property {number | undefined} [column]
 *   Starting column of error.
 * @property {VFileMessage['position']} [position]
 *   Full unist position.
 * @property {string | undefined} [source]
 *   Namespace of message (example: `'my-package'`).
 * @property {string | undefined} [ruleId]
 *   Category of message (example: `'my-rule'`).
 * @property {string | undefined} [actual]
 *   Specify the source value that’s being reported, which is deemed
 *   incorrect.
 * @property {Array<string> | undefined} [expected]
 *   Suggest acceptable values that can be used instead of `actual`.
 * @property {string | undefined} [url]
 *   Link to docs for the message.
 *
 *   > 👉 **Note**: this must be an absolute URL that can be passed as `x`
 *   > to `new URL(x)`.
 * @property {string | undefined} [note]
 *   Long form description of the message (should use markdown).
 *
 * @typedef JsonFile
 *   JSON file.
 * @property {string} path
 *   Full path (example: `'~/index.min.js'`).
 * @property {string} cwd
 *   Base of `path`.
 * @property {Array<string>} history
 *   List of filepaths the file moved between.
 *
 *   The first is the original path and the last is the current path.
 * @property {Array<JsonMessage>} messages
 *   JSON messages.
 */

/**
 * Create a **serialized** JSON report from one file or multiple files.
 *
 * @param {Array<VFile> | VFile} files
 *   File or files to report.
 * @param {Options | null | undefined} [options={}]
 *   Configuration (optional).
 * @returns {string}
 *   Report as serialized JSON.
 */
export function reporterJson(files, options) {
  const options_ = options || {}
  const pretty = options_.pretty || 0
  const data = filesToJson(Array.isArray(files) ? files : [files], options_)

  return JSON.stringify(data, undefined, pretty === true ? 2 : pretty)
}

/**
 * Turn `VFile`s into JSON.
 *
 * @param {Array<VFile>} files
 *   VFiles.
 * @param {Options} options
 *   Configuration.
 * @returns {Array<JsonFile>}
 *   JSON file or nothing if ignored.
 */
function filesToJson(files, options) {
  let index = -1
  /** @type {Array<JsonFile>} */
  const result = []

  while (++index < files.length) {
    const file = fileToJson(files[index], options)

    if (file) {
      result.push(file)
    }
  }

  return result
}

/**
 * Turn a `VFile` into JSON.
 *
 * @param {VFile} file
 *   VFile.
 * @param {Options} options
 *   Configuration.
 * @returns {JsonFile | undefined}
 *   JSON file or nothing if ignored.
 */
function fileToJson(file, options) {
  const messages = messagesToJson(file.messages, options)

  if ((!options.quiet && !options.silent) || messages.length > 0) {
    return {path: file.path, cwd: file.cwd, history: file.history, messages}
  }
}

/**
 * Turn a list of `VFileMessage`s into JSON messages.
 *
 * @param {Array<VFileMessage>} messages
 *   VFile messages.
 * @param {Options} options
 *   Configuration.
 * @returns {Array<JsonMessage>}
 *   JSON messages.
 */
function messagesToJson(messages, options) {
  let index = -1
  /** @type {Array<JsonMessage>} */
  const result = []

  while (++index < messages.length) {
    const message = messages[index]

    if (!options.silent || message.fatal) {
      result.push(messageToJson(message))
    }
  }

  return result
}

/**
 * Turn a `VFileMessage` into a JSON message.
 *
 * @param {VFileMessage} message
 *   VFile message.
 * @returns {JsonMessage}
 *   JSON Message.
 */
function messageToJson(message) {
  return {
    // To do: after updating, check if the fallbacks are still needed.
    reason: message.reason,
    line: message.line || undefined,
    column: message.column || undefined,
    position: message.position,
    ruleId: message.ruleId || undefined,
    source: message.source || undefined,
    fatal: typeof message.fatal === 'boolean' ? message.fatal : undefined,
    stack: message.stack || undefined,
    actual: message.actual || undefined,
    expected: message.expected || undefined,
    url: message.url || undefined,
    note: message.note || undefined
  }
}
