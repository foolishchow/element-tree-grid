'use strict';
const path = require('path'),
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    rollup = require('gulp-rollup'),
    vue = require('./bin/vue/index'),
    css = require('./bin/post-css'),
    babel = require('rollup-plugin-babel'),
    nodeResolve = require('rollup-plugin-node-resolve'),
    // commonjs = require('rollup-plugin-commonjs'),
    // replace = require('rollup-plugin-replace'),
    salad = require('postcss-salad'),
    uglify = require('rollup-plugin-uglify');

const rollupConfig = {
    entry: './src/index.js',
    globals: { 'vue': 'Vue' },
    moduleName: 'ELEMENT_TREE_COLUMN',
    plugins: [
        vue({
            compileTemplate: true,
            styleToImports: true
        }),
        nodeResolve({
            browser: true,
            // jsnext: true,
            main: true,
            skip: ['vue']
        }),
        css({
            output: './dist/tree-table.css',
            postcss: [
                salad()
            ]
        }),
        babel({ runtimeHelpers: false }),
    ],
    format: 'umd'
}

gulp.task('dev', () => {
    return gulp.src(['./src/*.js', './src/*.vue'])
        .pipe(rollup(rollupConfig))
        .pipe(rename('tree-table.js'))
        .pipe(gulp.dest('./dist'))
})

gulp.task('watch',()=>{
    gulp.watch(['./src/*.js', './src/*.vue'],['dev'])
})

gulp.task('default',['dev','watch'])