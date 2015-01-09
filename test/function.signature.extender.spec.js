/* jshint node:true */
/* global describe */
/* global it */
'use strict';

require('chai').should();

var signatureExtender = require('../lib/function.signature.extender'),
    testFunction      = require('./testFunction'),
    myFunction;


describe('Extend function signature:', function(){

  it('add one argument', function(){
    myFunction = signatureExtender(testFunction, 'added');

    myFunction.should.be.a('function');
    myFunction.name.should.equal(testFunction.name);

    myFunction(1,2,3,4).should.equal('4321');
  });

  it('add multiple arguments', function(){
    myFunction = signatureExtender(testFunction, ['added1', 'added2']);

    myFunction.should.be.a('function');
    myFunction.name.should.equal(testFunction.name);

    myFunction(1,2,3,4,5).should.equal('54321');
  });

});
