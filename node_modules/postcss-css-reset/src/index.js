'use strict';

import postcss from 'postcss';
import resetCore from './resetCore';

const atRules = {
  'reset-global' (platefprm) {
    return resetCore.resetGlobal(platefprm);
  },
  'reset-nested' (...tags) {
    return resetCore.resetNested(tags);
  }
};

// const unwrapAmp = (nodeSelector, node) => {
//   if (nodeSelector.indexOf('&:') >= 0 && node.name !== 'media') {
//     return node.selectors.map((selector) => {
//       return nodeSelector.replace(/&/g, selector);
//     }).join(',');
//   }
//   return nodeSelector;
// };

// const getGlobalSelector = (node) => {
//   if (node.parent && node.parent.type === 'atrule') {
//     return `${node.parent.name} ${node.parent.params} ${node.selector}`;
//   } else if (node.name === 'media') {
//     return getGlobalSelector(node.parent);
//   }
//   return node.selector;
// };

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

module.exports = postcss.plugin('postcss-reset', (opts) => {
  let options = Object.assign({}, opts);

  return (root) => {
    let promises = [];
    
    root.walkAtRules(/^reset-/i, (rule) => {
      var parser = atRules[rule.name];

      if (parser) {
        let params = rule.params.trim() ? rule.params.trim().split(' ') : [];
        let promise = parser(...params);
        
        promises.push(promise);
        promise.then((resetRules) => {
          if (typeof resetRules === 'object') {
            applyRuleSetToNode(resetRules, rule.parent, rule);
          } else {
            root.prepend(resetRules);
          }
          rule.remove();
        }).catch(console.error);
      }
    });
    return Promise.all(promises);
  };
});
