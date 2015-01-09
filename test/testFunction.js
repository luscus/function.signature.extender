/* jshint node:true */
'use strict';

module.exports = function testFunction (
  arg1, // this is arg1
  arg2_3, /* this is arg2 */
  arg3  // guess what...
) {

  // some comment
  if (true) {
    /** more comments:
     *    - comment
     *    - comment
     */
    var index = testFunction.length,
        result = '';

    while (index--) {
      result += arguments[index];
    }

    return result;
  }
};
