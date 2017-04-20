'use strict';

import variables from '../core/variables.es6.js';
import functions from '../core/functions.es6.js';

// Creates a debugging grid for the parent of columns. Works in conjunction with `@neat-outer-container`.
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
// @location
//   The location of where the grid will be applied to: ['before', 'after' or 'background']
//
// @example - PostCSS Usage
//    .element {
//      @neat-outer-container;
//      @neat-show-grid 4 12;
//    }
//
// @example - CSS Output
//    .element {
//      *zoom: 1;
//      max-width: 128em;
//      margin-left: auto;
//      margin-right: auto;
//    }
//    .element:before,
//    .element:after {
//      content: " ";
//      display: table;
//    }
//    .element:after {
//      clear: both;
//      background: linear-gradient(to right,
//        #ecf0f1 0, #ecf0f1 31.7615656%,
//        transparent 31.7615656%, transparent 34.1192172%,
//        #ecf0f1 34.1192172%, #ecf0f1 65.88078280%,
//        transparent 65.88078280%, transparent 68.2384344%,
//        #ecf0f1 68.2384344%, #ecf0f1 100%);
//      bottom: 0;
//      display: block;
//      left: 0;
//      position: absolute;
//      right: 0;
//      top: 0
//    }
//

const generateArray = (length = 0) => {
  return Array.from(new Array(length), (x, i) => i);
};

let showGrid = (columns, containerColumns, location, direction, options = variables) => {
  columns = columns || options.neatElementColumns;
  containerColumns = containerColumns || options.neatGridColumns;
  location = location || options.debugGridLocation;
  direction = direction || options.neatDefaultDirection;

  let columnsCount = +(containerColumns / columns);
  let directions = functions.getDirection(direction);
  let columnWidth = functions.flexWidth(columns, containerColumns, options.neatColumnWidth, options.neatGutterWidth);
  let columnGutter = functions.flexGutter(containerColumns, options.neatColumnWidth, options.neatGutterWidth);

  let gradient = generateArray(columnsCount).reduce((memo, idx) => {
    let startColor = columnWidth * idx + columnGutter * idx;
    let endColor = columnWidth * (idx + 1) + columnGutter * idx;
    let startBlank = endColor;
    let endBlank = columnWidth * (idx + 1) + columnGutter * (idx + 1);
    memo.push(`${options.debugGridColor} ${functions.percentage(startColor)}, ${options.debugGridColor} ${functions.percentage(endColor)}`);
    if (idx < columnsCount - 1) {
      memo.push(`transparent ${functions.percentage(startBlank)}, transparent ${functions.percentage(endBlank)}`);
    }
    return memo;
  }, [directions.direction === 'right' ? 'to right' : 'to left']);

  // 'before', 'after' or 'background'
  if (location === 'background') {
    return {
      'background': `linear-gradient(${gradient.join(',')})`
    };
  } else if (location === 'before' || location === 'after') {
    return {
      [`&:${location}`]: {
        'background': `linear-gradient(${gradient.join(',')})`,
        'bottom': '0',
        'display': 'block',
        'left': '0',
        'position': 'absolute',
        'right': '0',
        'top': '0'
      }
    };
  }
};

export default showGrid;
