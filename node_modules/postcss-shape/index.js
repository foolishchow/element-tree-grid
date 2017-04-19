var postcss = require('postcss');

module.exports = postcss.plugin('postcss-shape', function (options) {
  var shapeRegex = new RegExp('^(circle|rect|triangle|ring)$');
  var directionMap = {top: 'bottom', bottom: 'top', left: 'right', right: 'left'};

  return function (css) {
    css.walkDecls(shapeRegex, function (decl) {
      var shape = decl.prop;
      var values = postcss.list.space(decl.value);

      if (values.length) {
        // rect
        if (shape === 'rect' && values.length === 3) {
          var width = values[0];
          var height = values[1];
          var bgc = values[2];

          if (width !== '*') {
            decl.cloneBefore({ prop: 'width', value: values[0] });
          }

          if (height !== '*') {
            decl.cloneBefore({ prop: 'height', value: height });
          }

          if (bgc !== '*') {
            decl.cloneBefore({ prop: 'background-color', value: bgc });
          }
        }
        // triangle (dosen't accept * as value)
        if (shape === 'triangle' && values.length === 3) {
          decl.cloneBefore({ prop: 'display', value: 'inline-block' });
          decl.cloneBefore({ prop: 'width', value: '0' });
          decl.cloneBefore({ prop: 'height', value: '0' });
          decl.cloneBefore({ prop: 'border', value: 'solid transparent' });
          decl.cloneBefore({ prop: 'border-width', value: values[0] });
          decl.cloneBefore({ prop: 'border-' + directionMap[values[1]] + '-color', value: values[2] });
        }
        // circle
        if (shape === 'circle' && values.length === 2) {
          if (values[0] !== '*') {
            decl.cloneBefore({ prop: 'width', value: values[0] });
            decl.cloneBefore({ prop: 'height', value: values[0] });
          }

          decl.cloneBefore({ prop: 'border-radius', value: '50%' });

          if (values[1] !== '*') {
            decl.cloneBefore({ prop: 'background-color', value: values[1] });
          }
        }
      }

      decl.remove();
    });
  };
});
