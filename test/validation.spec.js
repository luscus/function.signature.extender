/* jshint node:true */
/* jshint expr:true*/
/* global describe */
/* global it */
'use strict';

require('chai').should();

var validation = require('../lib/validation');


describe('Function validation:', function(){

  it('reject undefined function', function(){
    validation.checkForFunctionString.should.Throw(Error);
  });

  it('validate camelized', function(){
    validation.checkForFunctionString(function myTest() {}).should.be.true;
  });

  it('validate all allowed characters', function(){
    validation.checkForFunctionString(function myTest_12() {}).should.be.true;
  });
});

describe('Naming validation:', function(){

  it('reject undefined function', function(){
    validation.checkArgumentName.should.Throw(Error);
  });

  it('validate camelized', function(){
    validation.checkArgumentName('myTest').should.be.true;
  });

  it('validate leading undescore', function(){
    validation.checkArgumentName('__myTest').should.be.true;
  });

  it('validate all allowed characters', function(){
    validation.checkArgumentName('myTest_12').should.be.true;

  });

  it('reject name with unalloyed characters', function(){
    try {
      validation.checkArgumentName('myTeüst_%+&12');
    }
    catch (error) {
      (error instanceof Error).should.be.true;
    }
  });
});
