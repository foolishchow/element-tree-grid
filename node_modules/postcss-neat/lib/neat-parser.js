'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

var _grid = require('./grid');

var _grid2 = _interopRequireDefault(_grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

require('babel-polyfill');

var options = {};
var ampInsertedNodes = {};

var atRules = {
  'fill-parent': function fillParent() {
    return _grid2.default.fillParent(options);
  },
  'omega': function omega(query, direction) {
    return _grid2.default.omega(query, direction, options);
  },
  'outer-container': function outerContainer(maxWidth) {
    return _grid2.default.outerContainer(maxWidth, options);
  },
  'pad': function pad() {
    for (var _len = arguments.length, padding = Array(_len), _key = 0; _key < _len; _key++) {
      padding[_key] = arguments[_key];
    }

    return _grid2.default.pad(padding, options);
  },
  'row': function row(display) {
    return _grid2.default.row(display, options);
  },
  'shift': function shift(columns, containerColumns, direction) {
    return _grid2.default.shift(columns, containerColumns, direction, options);
  },
  'show-grid': function showGrid(columns, containerColumns, location, direction) {
    return _grid2.default.showGrid(columns, containerColumns, location, direction, options);
  },
  'span-columns': function spanColumns(columns, containerColumns, display, direction) {
    return _grid2.default.spanColumns(columns, containerColumns, display, direction, options);
  }
};

var unwrapAmp = function unwrapAmp(nodeSelector, node) {
  if (nodeSelector.indexOf('&:') >= 0 && node.name !== 'media') {
    return node.selectors.map(function (selector) {
      return nodeSelector.replace(/&/g, selector);
    }).join(',');
  }
  return nodeSelector;
};

var getGlobalSelector = function getGlobalSelector(node) {
  if (node.parent && node.parent.type === 'atrule') {
    return node.parent.name + ' ' + node.parent.params + ' ' + node.selector;
  } else if (node.name === 'media') {
    return getGlobalSelector(node.parent);
  }
  return node.selector;
};

var applyRuleSetToNode = function applyRuleSetToNode(ruleSet, node, currentAtRule) {
  Object.keys(ruleSet).forEach(function (prop) {
    var rule = ruleSet[prop];
    if ((typeof rule === 'undefined' ? 'undefined' : _typeof(rule)) === 'object') {
      if (node.name !== 'media') {
        var extRule = _postcss2.default.rule({ selector: unwrapAmp(prop, node) });
        applyRuleSetToNode(rule, extRule);

        var globalSelector = getGlobalSelector(node);
        node.parent.insertAfter(ampInsertedNodes[globalSelector] || node, extRule);
        ampInsertedNodes[globalSelector] = extRule;
      } else {
        var mediaNestedRule = _postcss2.default.parse(prop + ' ' + JSON.stringify(rule).replace(/"/g, ''));
        node.append(mediaNestedRule);
      }
    } else {
      if (currentAtRule) {
        node.insertBefore(currentAtRule, { prop: prop, value: rule });
      } else {
        node.append({ prop: prop, value: rule });
      }
    }
  });
};

exports.default = _postcss2.default.plugin('postcss-neat', function (opts) {
  options = Object.assign({}, _core2.default.variables, opts);
  return function (root) {
    ampInsertedNodes = {};
    root.walkAtRules(/^neat-/i, function (rule) {
      var atRule = rule.name.trim().replace('neat-', '');
      if (atRules[atRule]) {
        var params = rule.params.trim() ? rule.params.trim().split(' ') : [];
        var ruleSet = atRules[atRule].apply(atRules, _toConsumableArray(params));
        applyRuleSetToNode(ruleSet, rule.parent, rule);
      }
      rule.remove();
    });
  };
});
//# sourceMappingURL=neat-parser.js.map
