'use strict'

const { src, dest, watch, parallel, series } = require('gulp');

// const gulp = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const delCommCss = require('gulp-strip-css-comments');
const autoPref = require('gulp-autoprefixer');
const clean = require('gulp-clean');




function buildStyles(){
    return src([//for another files form libraries or something else
        'app/styles/**/*.scss',
        '!app/styles/**/*.min.scss'
    ])
    .pipe(concat('style.min.css'))
    .pipe(autoPref({ overrideBrowserslist: ['last 10 version'] }))
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(delCommCss())
    .pipe(dest('app/styles'))
    .pipe(browserSync.stream())
}


function buildScripts(){
    return src([//for another files form libraries or something else
        'app/scripts/**/*.js',
        '!app/scripts/**/*.min.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/scripts'))
    .pipe(browserSync.stream())
}


function watching(){
    watch(['app/styles/**/*.scss'], buildStyles)
    watch(['app/scripts/**/*.js'], buildScripts)
    watch(['app/**/*.html']).on('change', browserSync.reload)
}


function browserSyncBuild(){
    browserSync.init({
        server:{
            baseDir:'app/'
        }
    })
}


function cleanDist(){
    return src('dist')
    .pipe(clean())
}


function build(){
    return src([
        'app/styles/style.min.css',
        'app/scripts/main.min.js',
        'app/**/*.html'
    ], {base: 'app'})
    .pipe(dest('dist'))
}


exports.build = series(cleanDist, build);

exports.default = parallel(buildStyles, buildScripts, browserSyncBuild, watching);