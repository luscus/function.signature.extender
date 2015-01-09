/* jshint node:true */
/* global describe */
/* global it */
'use strict';

require('chai').should();

var getFunctionArguments = require('../lib/arguments'),
    testFunction         = require('./testFunction'),
    awaitedArray         = ['arg1', 'arg2_3', 'arg3'];


describe('Parse argument names:', function(){

  it('retrieve arguments', function(){
    getFunctionArguments(testFunction).should.deep.equal(awaitedArray);
  });

  it('support function with no arguments', function(){
    getFunctionArguments(function () {}).should.deep.equal([]);
  });

});
