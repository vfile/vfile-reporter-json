/**
 * @typedef {import('vfile').VFile} VFile
 * @typedef {import('vfile-message').VFileMessage} VFileMessage
 *
 * @typedef Options
 *   Configuration (optional).
 * @property {number|string|boolean} [pretty=0]
 *   Value of `space` of `JSON.stringify(x, null, space)`.
 * @property {boolean} [quiet=false]
 *   Do not show files without messages.
 * @property {boolean} [silent=false]
 *   Show errors only.
 *   This does not show info and warning messages.
 *   Also sets `quiet` to `true`.
 *
 * @typedef _JsonMessage
 * @property {string} reason
 * @property {number} line
 * @property {number} column
 * @property {VFileMessage['position']} position
 * @property {string} ruleId
 * @property {string} source
 * @property {boolean} fatal
 * @property {string} stack
 * @property {string} actual
 * @property {string|Array<string>} expected
 * @property {string} url
 * @property {string} note
 *
 * @typedef _JsonFile
 * @property {string} path
 * @property {string} cwd
 * @property {Array<string>} history
 * @property {Array<_JsonMessage>} messages
 */

/**
 * Create a report from one file or multiple files.
 *
 * @param {Array<VFile>|VFile} files
 *   File(s) to report.
 * @param {Options} options
 *   Configuration (optional).
 * @returns {string}
 *   Report (serialized JSON).
 */
export function reporterJson(files, options = {}) {
  const pretty = options.pretty || 0
  const data = filesToJson(Array.isArray(files) ? files : [files], options)

  return JSON.stringify(data, null, pretty === true ? 2 : pretty)
}

/**
 * @param {Array<VFile>} files
 * @param {Options} options
 * @returns {Array<_JsonFile>}
 */
function filesToJson(files, options) {
  let index = -1
  /** @type {Array<_JsonFile>} */
  const result = []

  while (++index < files.length) {
    /** @type {_JsonFile} */
    const file = {
      path: files[index].path,
      cwd: files[index].cwd,
      history: files[index].history,
      messages: messagesToJson(files[index].messages, options)
    }

    if ((!options.quiet && !options.silent) || file.messages.length > 0) {
      result.push(file)
    }
  }

  return result
}

/**
 * @param {Array<VFileMessage>} messages
 * @param {Options} options
 * @returns {Array<_JsonMessage>}
 */
function messagesToJson(messages, options) {
  let index = -1
  /** @type {Array<_JsonMessage>} */
  const result = []

  while (++index < messages.length) {
    const message = messages[index]

    if (!options.silent || message.fatal) {
      result.push({
        reason: message.reason,
        line: message.line,
        column: message.column,
        position: message.position,
        ruleId: message.ruleId || null,
        source: message.source || null,
        fatal: message.fatal,
        stack: message.stack || null,
        actual: message.actual || undefined,
        expected: message.expected || undefined,
        url: message.url || undefined,
        note: message.note || undefined
      })
    }
  }

  return result
}

export default reporterJson
