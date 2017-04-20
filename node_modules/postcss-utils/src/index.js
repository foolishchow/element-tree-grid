'use strict';

import postcss from 'postcss';
import utils from './utils';
import humps from 'humps';

let ampInsertedNodes = {};

const unwrapAmp = (nodeSelector, node) => {
  if (nodeSelector.indexOf('&:') >= 0 && node.name !== 'media') {
    return node.selectors.map((selector) => {
      return nodeSelector.replace(/&/g, selector);
    }).join(',');
  }
  return nodeSelector;
};

const getGlobalSelector = (node) => {
  if (node.parent && node.parent.type === 'atrule') {
    return `${node.parent.name} ${node.parent.params} ${node.selector}`;
  } else if (node.name === 'media') {
    return getGlobalSelector(node.parent);
  }
  return node.selector;
};

const applyRuleSetToNode = (ruleSet, node, currentAtRule) => {
  Object.keys(ruleSet).forEach((prop) => {
    let rule = ruleSet[prop];
    if (typeof rule === 'object') {
      if (node.name !== 'media') {
        let extRule = postcss.rule({ selector: unwrapAmp(prop, node) });
        applyRuleSetToNode(rule, extRule);

        let globalSelector = getGlobalSelector(node);
        node.parent.insertAfter(ampInsertedNodes[globalSelector] || node, extRule);
        ampInsertedNodes[globalSelector] = extRule;
      } else {
        let mediaNestedRule = postcss.parse(`${prop} ${JSON.stringify(rule).replace(/"/g, '')}`);
        node.append(mediaNestedRule);
      }
    } else {
      if (currentAtRule) {
        node.insertBefore(currentAtRule, { prop: prop, value: rule });
      } else {
        node.append({ prop, value: rule });
      }
    }
  });
};

module.exports = postcss.plugin('postcss-utils', (opts) => {
  let options = Object.assign({}, opts);

  return (root) => {
    root.walkAtRules(/^utils-/i, (rule) => {
      let ruleName = rule.name.trim().replace('utils-', '');
      let ruleFun = utils[humps.camelize(ruleName)];

      if (ruleFun) {
        let params = rule.params.trim() ? rule.params.trim().split(' ') : [];

        applyRuleSetToNode(ruleFun(...params), rule.parent, rule);
        rule.remove();
      }
    });
  };
});
