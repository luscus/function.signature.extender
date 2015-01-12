/* jshint node:true */
/* jshint -W054 */
'use strict';

var Util                 = require('util'),
    getFunctionArguments = require('./arguments'),
    getFunctionBody      = require('./body'),
    validation           = require('./validation');

module.exports = function signatureExtender (_function, _newArguments) {

  validation.validate(_function, _newArguments);

  var signatureArguments = getFunctionArguments(_function),
      functionBody       = getFunctionBody(_function);

  if (Util.isArray(_newArguments)) {
    // add multiple new arguments
    signatureArguments = _newArguments.concat(signatureArguments);
  }
  else {
    // add a single argument
    signatureArguments.unshift(_newArguments);
  }

  // we need this trick in order to avoid
  // the creation of an anonymous function
  var newFunctionText  = new Function(signatureArguments, functionBody).toString();
  newFunctionText      = newFunctionText.replace('function anonymous(', 'function ' + _function.name + ' (');

  return new Function(
    "return "+newFunctionText
  )();
};
