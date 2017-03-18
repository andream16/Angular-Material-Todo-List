/**
 * Created by andream16 on 18.03.17.
 */
'use strict';

var path = require('path');
var gulp = require('gulp');
var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

var _         = require('lodash');

gulp.task('inject', ['scripts' ], function () {
    var injectStyles = gulp.src([
        path.join(conf.paths.tmp, '/serve/app/!**!/!*.css'),
        path.join('!' + conf.paths.tmp, '/serve/app/vendor.css')
    ], { read: false });

    var injectScripts = gulp.src([
        path.join(conf.paths.src, '/app/**/*.module.js'),
        path.join(conf.paths.src, '/app/**/*.controller.js'),
        path.join(conf.paths.src, '/app/**/*.directive.js'),
        path.join(conf.paths.src, '/app/**/*.service.js'),
        path.join(conf.paths.src, '/app/**/*.factory.js'),
        path.join(conf.paths.src, '/app/**/*.route.js'),
        path.join(conf.paths.src, '/app/config/app-configuration-modules/*.js'),
        path.join(conf.paths.src, '/app/**/*.js')
    ])
        .pipe(angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

    var injectOptions = {
        ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
        addRootSlash: false
    };

    return gulp.src(path.join(conf.paths.src, '/*.html'))
        .pipe($.inject(injectStyles, injectOptions))
        .pipe($.inject(injectScripts, injectOptions))
        .pipe(wiredep(_.extend({}, conf.wiredep)))
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});