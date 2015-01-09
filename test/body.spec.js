/* jshint node:true */
/* jshint expr:true*/
/* global describe */
/* global it */
'use strict';

require('chai').should();

var getFunctionBody = require('../lib/body'),
    testFunction    = require('./testFunction');


describe('Retrieve function body:', function(){

  it('body has no signature', function(){
    var FUNCTION_CHECK = /^function [a-zA-Z0-9_]+\(/,
        body = getFunctionBody(testFunction);

    FUNCTION_CHECK.test(body).should.be.false;
  });

});
