/**
 * @typedef {import('vfile').VFile} VFile
 * @typedef {import('vfile-message').VFileMessage} VFileMessage
 *
 * @typedef Options
 * @property {number|string|boolean} [pretty=0]
 * @property {boolean} [quiet=false]
 * @property {boolean} [silent=false]
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
 *
 * @typedef _JsonFile
 * @property {string} path
 * @property {string} cwd
 * @property {Array.<string>} history
 * @property {Array.<_JsonMessage>} messages
 */

/**
 * @param {Array.<VFile>|VFile} files
 * @param {Options} options
 * @returns {string}
 */
export function reporterJson(files, options = {}) {
  var pretty = options.pretty || 0
  var data = filesToJson(Array.isArray(files) ? files : [files], options)

  return JSON.stringify(data, null, pretty === true ? 2 : pretty)
}

/**
 * @param {Array.<VFile>} files
 * @param {Options} options
 * @returns {Array.<_JsonFile>}
 */
function filesToJson(files, options) {
  var index = -1
  /** @type {Array.<_JsonFile>} */
  var result = []
  /** @type {_JsonFile} */
  var file

  while (++index < files.length) {
    file = {
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
 * @param {Array.<VFileMessage>} messages
 * @param {Options} options
 * @returns {Array.<_JsonMessage>}
 */
function messagesToJson(messages, options) {
  var index = -1
  /** @type {Array.<_JsonMessage>} */
  var result = []
  /** @type {VFileMessage} */
  var message

  while (++index < messages.length) {
    message = messages[index]

    if (!options.silent || message.fatal) {
      result.push({
        reason: message.reason,
        line: message.line,
        column: message.column,
        position: message.position,
        ruleId: message.ruleId || null,
        source: message.source || null,
        fatal: message.fatal,
        stack: message.stack || null
      })
    }
  }

  return result
}
