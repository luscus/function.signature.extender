# function.signature.extender
[![NPM version](https://badge.fury.io/js/function.signature.extender.svg)](http://badge.fury.io/js/function.signature.extender)
[![dependencies](https://david-dm.org/luscus/function.signature.extender.svg)](https://david-dm.org/luscus/function.signature.extender)
[![devDependency Status](https://david-dm.org/luscus/function.signature.extender/dev-status.svg?theme=shields.io)](https://david-dm.org/luscus/function.signature.extender#info=devDependencies)

Allows to extend the signature of any function with new arguments.

The new arguments are appended at the start of the signature:

    fx(arg1, arg2) ==> add new1 ==> fx(new1, arg1, arg2)

Use case: you write a [automaton plugin](https://github.com/luscus/application.mixin.automaton) extending a application
object using state templates that overwrite the app methods when they are activated. A `state` method is added to
query the current state, but the object has no `changeToState` method:

- methods should still run in app context in order to have `this` still referencing the app Object
- A `state` method is added to the app Object to query the current state, but the object has no `changeToState` method - user of app should not be able to change the state themselves
- developers should be able to use changeState in their state method bodies, but should not be bothered with handling it

Context and closures are useless here, we have to inject the `changeToState` at runtime to make it available in the body.

    // developer writes
    function stateMethod (arg1, arg2) {
        if (condition) {
            changeToState(xyz); // should to an error here
        }
    }

    // loading state modifies signature (purpose of the function.signature.extender)
    function changedStateMethod (changeToState, arg1, arg2) {
        if (condition) {
            changeToState(xyz); // changeToState now exists in run context
        }
    }

    // call to someMethod does
    app.someMethod = function () {
        arguments[arguments.length] = automatonLib.changeToState;
        return changedStateMethod.apply(arguments); // code runs without error
    }

# Usage

## Set dependency

    npm install function.signature.extender --save


## Extend function signature

    var signatureExtender = require('function.signature.extender');

    // add one new argument
    var newSimpleFunction = signatureExtender(simpleFunction, 'myNewArgument');

    // add multiple new arguments
    var newMultiFunction = signatureExtender(multiFunction, ['myNewArgument', 'andAnother]);


## Inject argument values

    // inject single argument
    var extendedArguments = Array.prototype.concat.call(['value for myNewArgument'], arguments);
    newSimpleFunction.apply(extendedArguments);


    // inject multiple arguments (has to match the order of the new signature arguments)
    extendedArguments = Array.prototype.concat.call(['value for myNewArgument', 'value for andAnother'], arguments);
    newMultiFunction.apply(extendedArguments);



-------------------
Copyright (c) 2014 Luscus (luscus.redbeard@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
