'use strict'

module.exports = reporter

function reporter(files, options) {
  var settings = options || {}
  var subset = applicableFiles('length' in files ? files : [files], settings)
  var data = filesToJson(subset, settings)
  var pretty = settings.pretty || 0

  if (typeof pretty !== 'string' && typeof pretty !== 'number') {
    pretty = 2
  }

  return JSON.stringify(data, null, pretty)
}

function filesToJson(files, options) {
  var length = files.length
  var index = -1
  var result = []

  while (++index < length) {
    result[index] = fileToJson(files[index], options)
  }

  return result
}

function fileToJson(file, options) {
  return {
    path: file.path,
    cwd: file.cwd,
    history: file.history,
    messages: messagesToJson(applicableMessages(file.messages, options))
  }
}

function messagesToJson(messages) {
  var length = messages.length
  var index = -1
  var result = []

  while (++index < length) {
    result[index] = messageToJson(messages[index])
  }

  return result
}

function messageToJson(message) {
  return {
    reason: message.reason,
    line: message.line,
    column: message.column,
    location: message.location,
    ruleId: message.ruleId || null,
    source: message.source || null,
    fatal: message.fatal,
    stack: message.stack || null
  }
}

function applicableFiles(files, options) {
  var result = []
  var length = files.length
  var index = -1
  var file

  if (!options.quiet && !options.silent) {
    return files.concat()
  }

  while (++index < length) {
    file = files[index]

    if (applicableMessages(file.messages, options).length > 0) {
      result.push(file)
    }
  }

  return result
}

// Get applicable messages.
function applicableMessages(messages, options) {
  var length = messages.length
  var index = -1
  var result = []

  if (options.silent) {
    while (++index < length) {
      if (messages[index].fatal) {
        result.push(messages[index])
      }
    }
  } else {
    result = messages.concat()
  }

  return result
}
