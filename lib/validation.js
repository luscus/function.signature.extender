/* jshint node:true */
'use strict';

var Util           = require('util'),
    FUNCTION_CHECK = /^function [a-zA-Z0-9_]+\(/,
    ARGUMENT_CHECK = /^[a-zA-Z0-9_]+$/;


function checkForFunctionString (_function) {

  if (!_function || typeof _function !== 'function') {
    throw new Error('you have to provide a function');
  }

  if (FUNCTION_CHECK.test(_function.toString())) {
    return true;
  }
  else {
    throw new Error('a function name should fulfil following RegExp: ' + ARGUMENT_CHECK);
  }
}

function checkArgumentName (_argumentName) {

  if (!_argumentName) {
    throw new Error('you have to provide arguments: one as String, multiple as Array of Strings');
  }

  if (ARGUMENT_CHECK.test(_argumentName)) {
    return true;
  }
  else {
    throw new Error('an argument name should fulfil following RegExp: ' + ARGUMENT_CHECK);
  }
}

function validate (_function, _arguments) {

  checkForFunctionString(_function);

  if (Util.isArray(_arguments)) {
    _arguments.forEach(function argumentIterator (argument) {

      // recursively check all arguments
      validate(_function, argument);
    });
  }
  else {
    checkArgumentName(_arguments);
  }

}

exports.checkForFunctionString = checkForFunctionString;
exports.checkArgumentName      = checkArgumentName;
exports.validate               = validate;
