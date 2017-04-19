var postcss = require("postcss");
var balanced = require("balanced-match");
var Color = require("color");
var helpers = require("postcss-message-helpers");

var functions = {
  mix: function(one, two, weight) {
    weight = weight || 0.5;
    if(typeof weight == "string" && weight.indexOf("%") > 0) {
      weight = parseInt(weight, 10) / 100;
    }
    return Color(toSimpleColor(one)).mix(Color(toSimpleColor(two)), weight).rgbString();
  },
  rgba: function() {
    if(arguments.length > 2) {
      // It's the actual rgba function, not the sass version
      return "rgba("+[].slice.call(arguments).join(",")+")";
    }
    return Color(toSimpleColor(arguments[0])).alpha(arguments[1]).rgbString();
  },
  darken: function(color, amount) {
    if(typeof amount == "string" && amount.indexOf("%") > 0) {
      amount = parseInt(amount, 10) / 100;
    }
    return Color(toSimpleColor(color)).darken(amount).rgbString();
  },
  lighten: function(color, amount) {
    if(typeof amount == "string" && amount.indexOf("%") > 0) {
      amount = parseInt(amount, 10) / 100;
    }
    return Color(toSimpleColor(color)).lighten(amount).rgbString();
  },
  tint: function(color, amount) {
    return functions['mix']("white", color, amount);
  },
  shade: function(color, amount) {
    return functions['mix']("black", color, amount);
  },
  transparentize: function(color, amount) {
    color = Color(toSimpleColor(color))
    amount = parseFloat(amount.trim())
    var alpha = Math.round((color.alpha() - amount) * 100) / 100;
    return color.alpha(alpha).rgbString();
  },
  opacify: function(color, amount) {
    color = Color(toSimpleColor(color))
    amount = parseFloat(amount.trim())
    var alpha = Math.round((color.alpha() + amount) * 100) / 100;
    return color.alpha(alpha).rgbString();
  }
};

function toSimpleColor(color) {
  if(functionsRegex.test(color)) {
    return handleFunction(color);
  } else {
    return color.trim();
  }
}

var functionsRegex = new RegExp(
  "(^|[^\\w\\-])" +
  "(" +
  Object.keys(functions).reduce(function(prev, curr) {
    return (prev ? prev + "|" : "") + curr
  }, false) +
  ")\\(");

/**
 * PostCSS plugin to transform color()
 */
module.exports = postcss.plugin("postcss-sass-color-functions", function() {
  return function(style) {
    style.walkDecls(function transformDecl(decl) {
      if (!decl.value || !functionsRegex.test(decl.value)) {
        return;
      }

      decl.value = helpers.try(function() {
        return handleFunction(decl.value, decl.source);
      }, decl.source)
    })
  }
});

/**
 * Transform FUNCTION() to rgba?()
 *
 * @param  {String} string declaration value
 * @return {String} converted declaration value to rgba?()
 */
function handleFunction(string, source) {
  var match = functionsRegex.exec(string);
  if(!match) {
    return string
  }
  var index = match.index;
  var sassFn = match[2];

  // NOTE: regexp search beginning of line of non char symbol before `FUNCTION(`.
  //       Offset used for second case.
  index = index === 0 ? index : index + 1

  var fn = string.slice(index)
  var balancedMatches = balanced("(", ")", fn)
  if (!balancedMatches) {
    throw new Error("Missing closing parentheses in '" + string + "'", source)
  }

  return string.slice(0, index)
    + functions[sassFn].apply( null, balancedMatches.body.split(/,(?![^\(]*\))/) )
    + handleFunction(balancedMatches.post, source)
}
