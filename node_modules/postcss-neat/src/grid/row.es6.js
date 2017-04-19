'use strict';

import variables from '../core/variables.es6.js';
import functions from '../core/functions.es6.js';
import fillParent from './fill-parent.es6.js';

// Designates the element as a row of columns in the grid layout. It clears the floats on the element and
// sets its display property. Rows can't be nested, but there can be more than one row element
// with different display properties per layout.
//
// @display
//  Sets the display property of the element and the display context that
//  will be used by its children. Can be `block` or `table`.
//
// @direction
//  Sets the layout direction. Can be `LTR` (left-to-right) or `RTL` (right-to-left).
//
// @example - PostCSS Usage
//  .element {
//    @neat-row;
//  }
//
// @example - CSS Output
//  .element {
//    *zoom: 1;
//    display: block;
//  }
//
// .element:before,
// .element:after {
//   content: " ";
//   display: table;
// }
//
// .element:after {
//   clear: both;
// }
//

let row = (display, options = variables) => {
  display = display || options.neatDefaultDisplay;

  if (display === 'table') {
    return Object.assign({
      'display': 'table',
      'table-layout': 'fixed'
    }, fillParent());
  } else {
    return Object.assign({
      'display': 'block'
    }, functions.clearfix());
  }
};

export default row;
