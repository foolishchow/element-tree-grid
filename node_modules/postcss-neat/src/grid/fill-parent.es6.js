'use strict';

import variables from '../core/variables.es6.js';

// Forces the element to fill its parent container.
//
// @example - PostCSS Usage
//   .element {
//     @neat-fill-parent;
//   }
//
// @example - CSS Output
//   .element {
//     box-sizing: border-box;
//     width: 100%;
//   }
//

let fillParent = (options = variables) => {
  return {
    'box-sizing': 'border-box',
    'width': '100%'
  };
};

export default fillParent;
