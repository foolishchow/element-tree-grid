'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _variablesEs = require('../core/variables.es6.js');

var _variablesEs2 = _interopRequireDefault(_variablesEs);

var _functionsEs = require('../core/functions.es6.js');

var _functionsEs2 = _interopRequireDefault(_functionsEs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Adds padding to the element.
//
// @padding
//   A list of padding value(s) to use. Passing `default` in the list will result
//    in using the gutter width as a padding value.
//
// @example - PostCSS Usage
//   .element {
//     @neat-pad 30px -20px 10px default;
//   }
//
// @example - CSS Output
//   .element {
//     padding: 30px -20px 10px 2.3576516%;
//   }
//

var pad = function pad() {
  var padding = arguments.length <= 0 || arguments[0] === undefined ? 'default' : arguments[0];
  var options = arguments.length <= 1 || arguments[1] === undefined ? _variablesEs2.default : arguments[1];

  var columnGutter = _functionsEs2.default.percentage(_functionsEs2.default.flexGutter(options.neatGridColumns, options.neatColumnWidth, options.neatGutterWidth));
  var parts = Array.isArray(padding) ? padding : padding.split(' ');

  if (!parts.length) {
    parts.push('default');
  }

  return {
    'padding': parts.reduce(function (aggr, value) {
      aggr.push(value === 'default' ? columnGutter : value);
      return aggr;
    }, []).join(' ')
  };
};

exports.default = pad;
//# sourceMappingURL=pad.es6.js.map
