'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _variablesEs = require('../core/variables.es6.js');

var _variablesEs2 = _interopRequireDefault(_variablesEs);

var _functionsEs = require('../core/functions.es6.js');

var _functionsEs2 = _interopRequireDefault(_functionsEs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Makes an element a outer container by centring it in the viewport, clearing its floats, and setting its `max-width`.
// Although optional, using `outer-container` is recommended. The mixin can be called on more than one element per page,
// as long as they are not nested.
//
// @local-max-width
//   Max width to be applied to the element. Can be a percentage or a measure.
//
// @example - PostCSS Usage
//   .element {
//     @neat-outer-container 100%;
//   }
//
// @example - CSS Output
//   .element {
//     *zoom: 1;
//     max-width: 100%;
//     margin-left: auto;
//     margin-right: auto;
//   }
//
//   .element:before,
//   .element:after {
//     content: " ";
//     display: table;
//   }
//
//   .element:after {
//     clear: both;
//   }
//

var outerContainer = function outerContainer(maxWidth) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? _variablesEs2.default : arguments[1];

  maxWidth = maxWidth || options.neatMaxWidth;

  return Object.assign({
    'max-width': maxWidth,
    'margin-left': 'auto',
    'margin-right': 'auto'
  }, _functionsEs2.default.clearfix());
};

exports.default = outerContainer;
//# sourceMappingURL=outer-container.es6.js.map
