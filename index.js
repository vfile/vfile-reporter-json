'use strict'

module.exports = reporter

function reporter(files, options) {
  var settings = options || {}
  var pretty = settings.pretty || 0
  var data = filesToJson('length' in files ? files : [files], settings)

  return JSON.stringify(data, null, pretty === true ? 2 : pretty)
}

function filesToJson(files, options) {
  var index = -1
  var result = []
  var file

  while (++index < files.length) {
    file = files[index]

    file = {
      path: file.path,
      cwd: file.cwd,
      history: file.history,
      messages: messagesToJson(file.messages, options)
    }

    if ((!options.quiet && !options.silent) || file.messages.length > 0) {
      result.push(file)
    }
  }

  return result
}

function messagesToJson(messages, options) {
  var index = -1
  var result = []
  var message

  while (++index < messages.length) {
    message = messages[index]

    message = {
      reason: message.reason,
      line: message.line,
      column: message.column,
      location: message.location,
      ruleId: message.ruleId || null,
      source: message.source || null,
      fatal: message.fatal,
      stack: message.stack || null
    }

    if (!options.silent || message.fatal) {
      result.push(message)
    }
  }

  return result
}
