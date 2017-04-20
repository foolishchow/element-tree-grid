'use strict';

import variables from '../core/variables.es6.js';
import functions from '../core/functions.es6.js';

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

let shift = (columns, containerColumns, direction, options = variables) => {
  containerColumns = containerColumns || options.neatGridColumns;
  direction = direction || options.neatDefaultDirection;

  let directions = functions.getDirection(direction);
  let columnWidth = functions.flexWidth(1, containerColumns, options.neatColumnWidth, options.neatGutterWidth);
  let columnGutter = functions.flexGutter(containerColumns, options.neatColumnWidth, options.neatGutterWidth);
  return {
    [`margin-${directions.oppositeDirection}`]: functions.percentage(columns * columnWidth + columns * columnGutter)
  };
};

export default shift;
