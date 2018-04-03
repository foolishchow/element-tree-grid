const babel = require('rollup-plugin-babel'),
  nodeResolve = require('rollup-plugin-node-resolve'),
  Ts = require('rollup-typescript'),
  commonjs = require('rollup-plugin-commonjs'),
  uglify = require('rollup-plugin-uglify');

export default {
  entry: './src/index.tsx',
  moduleName: 'ElTableTreeColumn',
  plugins: [
    Ts(),
    nodeResolve({
      browser: true,
      module: true,
      // jsnext: true,
      main: true,
      skip: ['vue']
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    babel({ runtimeHelpers: false }),
  ],
  targets: [
    { dest: 'dist/tree-table.common.js', format: 'cjs' },
    { dest: 'dist/tree-table.js', format: 'umd' }
  ]
}