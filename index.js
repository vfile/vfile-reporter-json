'use strict'

module.exports = reporter

function reporter(files, options) {
  var settings = options || {}
  var subset = applicableFiles('length' in files ? files : [files], settings)
  var data = filesToJSON(subset, settings)
  var pretty = settings.pretty || 0

  if (typeof pretty !== 'string' && typeof pretty !== 'number') {
    pretty = 2
  }

  return JSON.stringify(data, null, pretty)
}

function filesToJSON(files, options) {
  var length = files.length
  var index = -1
  var result = []

  while (++index < length) {
    result[index] = fileToJSON(files[index], options)
  }

  return result
}

function fileToJSON(file, options) {
  return {
    path: current(file),
    cwd: file.cwd,
    history: file.history,
    messages: messagesToJSON(applicableMessages(file.messages, options))
  }
}

function messagesToJSON(messages) {
  var length = messages.length
  var index = -1
  var result = []

  while (++index < length) {
    result[index] = messageToJSON(messages[index])
  }

  return result
}

function messageToJSON(message) {
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

    if (applicableMessages(file.messages, options).length !== 0) {
      result.push(file)
    }
  }

  return result
}

/* Get applicable messages. */
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

function current(file) {
  /* istanbul ignore if - Previous `vfile` version. */
  if (file.filePath) {
    return file.filePath()
  }

  return file.path
}
