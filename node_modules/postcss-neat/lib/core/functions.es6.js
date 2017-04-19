'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var functions = {
  // Convert to percentage

  percentage: function percentage() {
    var value = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

    value = +value;
    return (value <= 1 ? (value * 100).toFixed(8) : value) + '%';
  },


  // Simple clearfix
  clearfix: function clearfix() {
    return {
      '*zoom': 1,
      '&:before, &:after': {
        'content': '" "',
        'display': 'table'
      },
      '&:after': {
        'clear': 'both'
      }
    };
  }
};

functions = Object.assign(functions, {
  // Sets layout direction and layout opposite direction to `@direction`
  // and `@opposite-direction` accordingly.

  getDirection: function getDirection(layout) {
    return {
      direction: layout === 'LTR' ? 'right' : 'left',
      oppositeDirection: layout === 'LTR' ? 'left' : 'right'
    };
  },


  // Sets neat grid column's width to `@column-width`.
  flexWidth: function flexWidth(columns, containerColumns, column, gutter) {
    columns = +columns;
    containerColumns = +containerColumns;
    column = +column.replace('em', '');
    gutter = +gutter.replace('em', '');

    var tmpWidth = columns * column + (columns - 1) * gutter;
    var tmpContainerWidth = containerColumns * column + (containerColumns - 1) * gutter;

    return tmpWidth / tmpContainerWidth; // columnWidth
  },


  // Sets neat grid column's gutter (the white space between two columns) to `@column-gutter`.
  flexGutter: function flexGutter(containerColumns, column, gutter) {
    containerColumns = +containerColumns;
    column = +column.replace('em', '');
    gutter = +gutter.replace('em', '');

    var tmpContainerWidth = containerColumns * column + (containerColumns - 1) * gutter;

    return gutter / tmpContainerWidth; // columnGutter
  }
});

exports.default = functions;
//# sourceMappingURL=functions.es6.js.map
