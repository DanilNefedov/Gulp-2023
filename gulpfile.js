'use strict'

const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const delCommCss = require('gulp-strip-css-comments');
const autoPref = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const avif = require('gulp-avif');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const svg = require('gulp-svg-sprite');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');
const include = require('gulp-include');




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


function buildImages(){
    return src([
        'app/img/**/*.*', '!app/img/**/*.svg'
    ])
    .pipe(newer('app/img-dist'))
    .pipe(avif({ quality: 60 }))
    // in case the avif does not work, reset the values and makes in webp
    // --------//--------
    .pipe(src('app/img/**/*.*'))
    .pipe(newer('app/img-dist'))
    .pipe(webp())
    // --------//--------
    // in case the webp does not work, reset the values and makes to the standard
    // --------//--------
    .pipe(src('app/img/**/*.*'))
    .pipe(newer('app/img-dist'))
    .pipe(imagemin())
    // --------//--------
    .pipe(dest('app/img-dist'))
}


function spriteSvg(){
    return src('app/img-dist/**/*.svg')
    .pipe(svg({
        mode:{
            stack:{
                sprite:'../sprite.svg',
                example:true
            }
        }
    }))
    .pipe(dest('dist/img-dist'))
}


function buildFonts(){
    return src('app/fonts/**/*.*')
    .pipe(fonter({
        formats: ['woff', 'ttf']
    }))
    .pipe(src('app/fonts/dist/*.ttf'))
    .pipe(ttf2woff2())
    .pipe(dest('app/fonts/dist'))
}


function pagesHTML(){
    return src([
        'app/pages/**/*.html'
    ])
    .pipe(include({
        includePath: 'app/components'
    }))
    .pipe(dest('app'))
    .pipe(browserSync.stream())
}


function watching(){
    // function browsync
    browserSync.init({
        server:{
            baseDir:'app/'
        }
    })
    // function browsync
    watch(['app/styles/**/*.scss'], buildStyles)
    watch(['app/scripts/**/*.js'], buildScripts)
    watch(['app/img'], buildImages)
    watch(['app/components/**/*.html', 'app/pages/**/*.html'], pagesHTML)
    watch(['app/**/*.html']).on('change', browserSync.reload)
}


function cleanDist(){
    return src('dist')
    .pipe(clean())
}


function build(){
    return src([
        'app/styles/style.min.css',
        'app/scripts/main.min.js',
        'app/img-dist/**/*.*',
        '!app/img-dist/**/*.svg',
        'app/fonts/**/*.*',
        'app/pages/**/*.html',
        '!app/pages/index.html',
        'app/index.html'
    ], {base: 'app'})
    .pipe(dest('dist'))
}




exports.default = parallel(buildStyles, buildScripts, buildImages, pagesHTML, watching);

exports.build = series(cleanDist, build);
exports.spriteSvg = spriteSvg
exports.buildFonts = buildFonts

//first - gulp | w8
//second - gulp build  | w8
//third - gulp spriteSvg