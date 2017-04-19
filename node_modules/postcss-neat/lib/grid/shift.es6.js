'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _variablesEs = require('../core/variables.es6.js');

var _variablesEs2 = _interopRequireDefault(_variablesEs);

var _functionsEs = require('../core/functions.es6.js');

var _functionsEs2 = _interopRequireDefault(_functionsEs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Translates an element horizontally by a number of columns, in a specific nesting context.
//
// @columns
//   The number of columns to shift (required).
//
// @container-columns
//   The number of columns of the parent element.
//
// @direction
//  Sets the layout direction. Can be `LTR` (left-to-right) or `RTL` (right-to-left).
//
// @example - PostCSS Usage
//   .element-neg {
//     @neat-shift -3 6;
//   }
//
//   .element-pos {
//     @neat-shift 2;
//   }
//
// @example - CSS output
//   .element-neg {
//     margin-left: -52.41457896%;
//   }
//
//   .element-pos {
//     margin-left: 17.0596086%;
//   }
//

var shift = function shift(columns, containerColumns, direction) {
  var options = arguments.length <= 3 || arguments[3] === undefined ? _variablesEs2.default : arguments[3];

  containerColumns = containerColumns || options.neatGridColumns;
  direction = direction || options.neatDefaultDirection;

  var directions = _functionsEs2.default.getDirection(direction);
  var columnWidth = _functionsEs2.default.flexWidth(1, containerColumns, options.neatColumnWidth, options.neatGutterWidth);
  var columnGutter = _functionsEs2.default.flexGutter(containerColumns, options.neatColumnWidth, options.neatGutterWidth);
  return _defineProperty({}, 'margin-' + directions.oppositeDirection, _functionsEs2.default.percentage(columns * columnWidth + columns * columnGutter));
};

exports.default = shift;
//# sourceMappingURL=shift.es6.js.map
