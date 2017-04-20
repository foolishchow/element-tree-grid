'use strict';

import variables from '../core/variables.es6.js';
import functions from '../core/functions.es6.js';

// Specifies the number of columns an element should span. If the selector is nested the number of columns
// of its parent element should be passed as an argument as well.
//
// @columns
//   The unitless number of columns the element spans. If is not passed, it is equal to `@neatElementColumns`.
//   `@columns` also accepts decimals for when it's necessary to break out of the standard grid.
//   E.g. Passing `2.4` in a standard 12 column grid will divide the row into 5 columns.
//
// @container-columns
//   The number of columns the parent element spans. If is not passed, it is equal to `@neatGridColumns`,
//   the total number of columns in the grid.
//
// @display
//   Sets the display property of the element. By default it sets the display property of the element to `block`.
//   If passed `block-collapse`, it also removes the margin gutter by adding it to the element width.
//   If passed `table`, it sets the display property to `table-cell` and calculates the width of the
//   element without taking gutters into consideration. The result does not align with the block-based grid.
//
// @example - PostCSS Usage
//   .element {
//     @neat-span-columns 6;
//
//    .nested-element {
//      @neat-span-columns 2 6;
//    }
//  }
//
// @example - CSS Output
//   .element {
//     display: block;
//     float: left;
//     margin-right: 2.3576516%;
//     width: 48.8211742%;
//   }
//
//   .element:last-child {
//     margin-right: 0;
//   }
//
//   .element .nested-element {
//     display: block;
//     float: left;
//     margin-right: 4.82915791%;
//     width: 30.11389472%;
//   }
//
//   .element .nested-element:last-child {
//     margin-right: 0;
//   }
//

let spanColumns = (columns, containerColumns, display, direction, options = variables) => {
  columns = columns || options.neatElementColumns;
  containerColumns = containerColumns || options.neatGridColumns;
  display = display || options.neatDefaultDisplay;
  direction = direction || options.neatDefaultDirection;

  let directions = functions.getDirection(direction);
  let columnWidth = functions.flexWidth(columns, containerColumns, options.neatColumnWidth, options.neatGutterWidth);
  let columnGutter = functions.flexGutter(containerColumns, options.neatColumnWidth, options.neatGutterWidth);

  if (display === 'table') {
    return {
      'display': 'table-cell',
      'width': functions.percentage(columns / containerColumns)
    };
  } else if (display === 'block-collapse') {
    return {
      'display': 'block',
      'float': directions.oppositeDirection,
      'width': functions.percentage(columnWidth + columnGutter),
      // ---
      '&:last-child': {
        'width': functions.percentage(columnWidth)
      }
    };
  } else {
    return {
      'display': 'block',
      'float': directions.oppositeDirection,
      [`margin-${directions.direction}`]: functions.percentage(columnGutter),
      'width': functions.percentage(columnWidth),
      // ---
      '&:last-child': {
        [`margin-${directions.direction}`]: 0
      }
    };
  }
};

export default spanColumns;
