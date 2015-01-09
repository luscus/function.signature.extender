/* jshint node:true */
'use strict';

var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
var FN_ARG_SPLIT = /,/;
var SANITIZE = /((\/\/.*$)|(\/\*[\s\S]*?\*\/)|([\n\r])|(\s+|\t+))/mg;

function getFunctionArguments (functionText) {

  // ensure that functionText is a String
  functionText = (typeof functionText === 'function' ? functionText.toString() : functionText);

  // remove comments, new lines and tabs or spaces
  functionText = functionText.replace(SANITIZE, '');

  // get signature arguments
  var signatureArguments = functionText.match(FN_ARGS)[1];

  // return array
  return (signatureArguments ? signatureArguments.split(FN_ARG_SPLIT) : []);
}

module.exports = getFunctionArguments;
