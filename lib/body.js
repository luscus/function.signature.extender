/* jshint node:true */
'use strict';

function getFunctionBody (functionText) {

  // ensure that functionText is a String
  functionText = (typeof functionText === 'function' ? functionText.toString() : functionText);

  var firstIndex   = functionText.indexOf('{') + 1,
      lastIndex    = functionText.lastIndexOf('}'),
      functionBody = functionText.substring(firstIndex, lastIndex);

  return functionBody;
}

module.exports = getFunctionBody;
