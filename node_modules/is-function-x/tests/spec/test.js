/* jslint maxlen:80, es6:true, white:true */

/* jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
   freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
   nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
   es3:false, esnext:true, plusplus:true, maxparams:1, maxdepth:2,
   maxstatements:12, maxcomplexity:4 */

/* eslint strict: 1, max-lines: 1, symbol-description: 1, max-nested-callbacks: 1,
   max-statements: 1 */

/* global JSON:true, expect, module, require, describe, it, returnExports */

;(function () { // eslint-disable-line no-extra-semi

  'use strict';

  var isFunction;
  if (typeof module === 'object' && module.exports) {
    require('es5-shim');
    require('es5-shim/es5-sham');
    if (typeof JSON === 'undefined') {
      JSON = {};
    }
    require('json3').runInContext(null, JSON);
    require('es6-shim');
    var es7 = require('es7-shim');
    Object.keys(es7).forEach(function (key) {
      var obj = es7[key];
      if (typeof obj.shim === 'function') {
        obj.shim();
      }
    });
    isFunction = require('../../index.js');
  } else {
    isFunction = returnExports;
  }

  describe('Basic tests', function () {
    it('should return `false` for everything', function () {
      var values = [true, 'abc', 1, null, undefined, new Date(), [], /r/];
      var expected = values.map(function () {
        return false;
      });
      var actual = values.map(isFunction);
      expect(actual).toEqual(expected);
    });

    it('should return `true` for everything', function () {
      var values = [
        Object,
        String,
        Boolean,
        Array,
        Function,
          /* jscs:disable */
        function () {},
          /* jshint unused:false */
        function test(a) {}, // eslint-disable-line no-unused-vars
          /* jshint evil:true */
        new Function(), // eslint-disable-line no-new-func
          /* jshint evil:false */
        function test1(a, b) {}, // eslint-disable-line no-unused-vars
        function test2(a/* , foo*/) {}, // eslint-disable-line no-unused-vars
        function test3(a/* , foo*/, b) { }, // eslint-disable-line no-unused-vars
        function test4(a/* , foo*/, b) { }, // eslint-disable-line no-unused-vars
        function/* foo*/test5(a/* , foo*/, b) {}, // eslint-disable-line no-unused-vars
        function/* foo*/test6/* bar*/(a/* , foo*/, b) {}, // eslint-disable-line no-unused-vars
        function/* foo*/test7/* bar*/(/* baz*/) {},
        /* fum*/function/* foo*/ // blah
            test8(/* baz*/a // eslint-disable-line no-unused-vars
             ) {}
            /* jscs:enable */
      ];
      var expected = values.map(function () {
        return true;
      });
      var actual = values.map(isFunction);
      expect(actual).toEqual(expected);

      var fat;
      try {
        /* jshint evil:true */
        fat = new Function('return (x, y) => {return this;};')(); // eslint-disable-line no-new-func
        expect(isFunction(fat)).toBe(true);
      } catch (ignore) {}

      var gen;
      try {
        /* jshint evil:true */
        gen = new Function('return function* idMaker(x, y){};')(); // eslint-disable-line no-new-func
        expect(isFunction(gen)).toBe(true);
      } catch (ignore) {}

      var classes;
      try {
        /* jshint evil:true */
        classes = new Function('"use strict"; return class My {};')(); // eslint-disable-line no-new-func
        expect(isFunction(classes)).toBe(true);
      } catch (ignore) {}
    });
  });
}());
