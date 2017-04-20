'use strict';

import variables from '../core/variables.es6.js';
import functions from '../core/functions.es6.js';

// Removes the element's gutter margin, regardless of its position in the grid hierarchy or display property.
// It can target a specific element, or every `nth-child` occurrence. Works only with `block` layouts.
//
// @query
//   Supported arguments are `nth-child` selectors (targets a specific pseudo element) and `auto` (targets `last-child`).
//
//   When passed an `nth-child` argument of type `*n` with `block` display, the omega mixin automatically
//   adds a clear to the `*n+1` th element.
//
//   Note that composite arguments such as `2n+1` do not support this feature.
//
// @direction
//  Sets the layout direction. Can be `LTR` (left-to-right) or `RTL` (right-to-left).
//
// @example - PostCSS Usage
//   .element {
//     @neat-omega;
//   }
//
//   .nth-element {
//     @neat-omega 4n;
//   }
//
//   .auto-element {
//     @neat-omega auto;
//   }
//
// @example - CSS Output
//   .element {
//     margin-right: 0;
//   }
//
//   .nth-element:nth-child(4n) {
//     margin-right: 0;
//   }
//
//   .nth-element:nth-child(4n+1) {
//     clear: left;
//   }
//
//   .auto-element:last-child {
//     margin-right: 0;
//   }
//

let omega = (query, direction, options = variables) => {
  direction = direction || options.neatDefaultDirection;

  let directions = functions.getDirection(direction);
  if (!query) {
    return {
      [`margin-${directions.direction}`]: 0
    };
  } else if (query === 'auto') {
    return {
      '&:last-child': {
        [`margin-${directions.direction}`]: 0
      }
    };
  } else if (query) {
    let result = {
      [`&:nth-child(${query})`]: {
        [`margin-${directions.direction}`]: 0
      }
    };

    if (query.indexOf('n') >= 0) {
      result[`&:nth-child(${query} + 1)`] = {
        'clear': directions.oppositeDirection
      };
    }

    return result;
  }
};

export default omega;
