var tests = {
  rect: 'rect test passed',
  circle: 'circle test passed',
  triangle: 'trianglele test passed'
};

var dir = './test/';
var fs = require('fs');
var path = require('path');
var plugin = require('./');
var tape = require('tape');

tape('postcss-shape', function(t) {
  var features = Object.keys(tests);

  t.plan(features.length);

  features.forEach(function(feature) {
    var inputPath = path.resolve(dir + feature + '.css');
    var expectedPath = path.resolve(dir + feature + '.expected.css');

    var inputCSS = '';
    var expectedCSS = '';
    var message = tests[feature];

    try {
      inputCSS = fs.readFileSync(inputPath,  'utf8');
    } catch (error) {
      fs.writeFileSync(inputPath, inputCSS);
    }

    try {
      expectedCSS = fs.readFileSync(expectedPath,  'utf8');
    } catch (error) {
      fs.writeFileSync(expectedPath, expectedCSS);
    }

    plugin.process(inputCSS, {from: inputPath}).then(function (result) {
      var actualCSS = result.css;

      t.equal(actualCSS, expectedCSS, message);
    });
  });
});
