<a name="module_to-string-tag-x"></a>

## to-string-tag-x
<a href="https://travis-ci.org/Xotic750/to-string-tag-x"
title="Travis status">
<img src="https://travis-ci.org/Xotic750/to-string-tag-x.svg?branch=master"
alt="Travis status" height="18">
</a>
<a href="https://david-dm.org/Xotic750/to-string-tag-x"
title="Dependency status">
<img src="https://david-dm.org/Xotic750/to-string-tag-x.svg"
alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/to-string-tag-x#info=devDependencies"
title="devDependency status">
<img src="https://david-dm.org/Xotic750/to-string-tag-x/dev-status.svg"
alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/to-string-tag-x" title="npm version">
<img src="https://badge.fury.io/js/to-string-tag-x.svg"
alt="npm version" height="18">
</a>

Get an object's @@toStringTag. Includes fixes to correct ES3 differences
for the following.
- undefined => '[object Undefined]'
- null => '[object Null]'

No other fixes are included, so legacy `arguments` will
give `[object Object]`, and many older native objects
give `[object Object]`. There are also other environmental bugs
for example `RegExp` gives `[object Function]` and `Uint8Array`
gives `[object Object]` on certain engines. While these and more could
be fixed, it was decided that this should be a very raw version and it
is left to the coder to use other `is` implimentations for detection.
It is also worth noting that as of ES6 `Symbol.toStringTag` can be set on
an object and therefore can report any string that it wishes.

<h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
`es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
methods that can be faithfully emulated with a legacy JavaScript engine.

`es5-sham.js` monkey-patches other ES5 methods as closely as possible.
For these methods, as closely as possible to ES5 is not very close.
Many of these shams are intended only to allow code to be written to ES5
without causing run-time errors in older engines. In many cases,
this means that these shams cause many ES5 methods to silently fail.
Decide carefully whether this is what you want. Note: es5-sham.js requires
es5-shim.js to be able to work properly.

`json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.

`es6.shim.js` provides compatibility shims so that legacy JavaScript engines
behave as closely as possible to ECMAScript 6 (Harmony).

**Version**: 1.1.0  
**Author:** Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  
<a name="exp_module_to-string-tag-x--module.exports"></a>

### `module.exports(value)` ⇒ <code>string</code> ⏏
The `toStringTag` method returns "[object type]", where type is the
object type.

**Kind**: Exported function  
**Returns**: <code>string</code> - The object type string.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The object of which to get the object type string. |

**Example**  
```js
var o = new Object();

toStringTag(o); // returns '[object Object]'
```
