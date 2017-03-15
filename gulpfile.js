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
    uglify = require('gulp-uglify');

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
        babel({ runtimeHelpers: false }),
    ],
    format: 'umd'
}

const rollupConfigCommon = {
    entry: './src/index.js',
    globals: { 'vue': 'Vue' },
    moduleName: 'ELEMENT_TREE_COLUMN',
    plugins: [
        vue({
            //there is sth. wrong with compileTemplate  ,so use `template` instead
            compileTemplate: false,
            styleToImports: true
        }),
        nodeResolve({
            browser: true,
            // jsnext: true,
            main: true,
            skip: ['vue']
        }),
        babel({ runtimeHelpers: false }),
    ],
    format: 'cjs'
};

gulp.task('commonjs',()=>{
    return gulp.src(['./src/*.js', './src/*.vue'])
        .pipe(rollup(rollupConfigCommon))
        .pipe(rename('tree-table.common.js'))
        .pipe(gulp.dest('./dist'))
});

gulp.task('dev', () => {
    return gulp.src(['./src/*.js', './src/*.vue'])
        .pipe(rollup(rollupConfig))
        .pipe(rename('tree-table.js'))
        .pipe(gulp.dest('./dist'))
});

gulp.task('dev-min', () => {
    return gulp.src(['./src/*.js', './src/*.vue'])
        .pipe(rollup(rollupConfig))
        .pipe(uglify())
        .pipe(rename('tree-table.min.js'))
        .pipe(gulp.dest('./dist'))
});

gulp.task('watch',()=>{
    gulp.watch(['./src/*.js', './src/*.vue'],['dev','dev-min','commonjs'])
})

gulp.task('default',['dev','dev-min','watch'])