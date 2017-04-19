/* jslint maxlen:80, es6:true, white:true */

/* jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
   freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
   nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
   es3:true, esnext:true, plusplus:true, maxparams:1, maxdepth:2,
   maxstatements:11, maxcomplexity:3 */

/* eslint strict: 1, max-lines: 1, symbol-description: 1, max-nested-callbacks: 1,
   max-statements: 1 */

/* global JSON:true, expect, module, require, describe, xit, it, returnExports,
  ArrayBuffer, Int16Array, Int32Array, Uint8Array, Uint16Array, Uint32Array,
  Float32Array, Float64Array */

;(function () { // eslint-disable-line no-extra-semi

  'use strict';

  var isArrayBuffer, ifHasArrayBuffer;
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
    isArrayBuffer = require('../../index.js');
  } else {
    isArrayBuffer = returnExports;
  }

  ifHasArrayBuffer = typeof ArrayBuffer === 'function' ? it : xit;

  describe('isArrayBuffer', function () {
    it('basic', function () {
      expect(isArrayBuffer()).toBe(false);
      expect(isArrayBuffer(undefined)).toBe(false);
      expect(isArrayBuffer(null)).toBe(false);
      expect(isArrayBuffer(1)).toBe(false);
      expect(isArrayBuffer(true)).toBe(false);
      expect(isArrayBuffer('abc')).toBe(false);
      expect(isArrayBuffer([])).toBe(false);
      expect(isArrayBuffer({})).toBe(false);
    });

    ifHasArrayBuffer('hasArrayBuffer', function () {
      expect(isArrayBuffer(new ArrayBuffer(4))).toBe(true);
      expect(isArrayBuffer(new Int16Array(4))).toBe(false);
      expect(isArrayBuffer(new Int32Array(4))).toBe(false);
      expect(isArrayBuffer(new Uint8Array(4))).toBe(false);
      expect(isArrayBuffer(new Uint16Array(4))).toBe(false);
      expect(isArrayBuffer(new Uint32Array(4))).toBe(false);
      expect(isArrayBuffer(new Float32Array(4))).toBe(false);
      expect(isArrayBuffer(new Float64Array(4))).toBe(false);
    });
  });
}());
