'use strict';

const locals = {
  defaultEmSize: 1,
  goldenRatio: 1.618
};

let variables = {
  // Sets the default display mode. Can be `block`, `table` or `block-collapse`.
  neatDefaultDisplay: 'block',

  // Sets the default layout direction of the grid. Can be `LTR` or `RTL`.
  neatDefaultDirection: 'LTR',

  // Sets the number of columns the element spans. Its value can be overridden inside a mixin using the `@columns` variable.
  neatElementColumns: 1,

  // Sets the total number of columns in the grid. Its value can be overridden inside a mixin using the `@container-columns` variable.
  neatGridColumns: 12,

  // Sets the relative width of a single grid column. The unit used should be the same one used to define `@neat-gutter-width`.
  neatColumnWidth: (((locals.defaultEmSize * locals.goldenRatio) * locals.goldenRatio) * locals.goldenRatio).toString() + 'em',

  // Sets the relative width of a single grid gutter. The unit used should be the same one used to define `@neat-column-width`.
  neatGutterWidth: (locals.defaultEmSize * locals.goldenRatio).toString() + 'em',

  // Sets the max-width property of the element that includes `@neat-outer-container`.
  neatMaxWidth: ((1024 / 16) * locals.defaultEmSize).toString() + 'em',

  // Sets the background color for the debugging grid.
  debugGridColor: '#ecf0f1',

  // Sets the default location of the debugging grid.
  debugGridLocation: 'after'
};

export default variables;
