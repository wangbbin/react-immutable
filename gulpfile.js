'use strict';
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const errorify = require('errorify');
const gutil = require('gulp-util');
const source = require('vinyl-source-stream');
const _ = require('lodash');
const gulpIf = require('gulp-if');

const NODE_ENV = process.env.NODE_ENV || 'development';
const DEBUG = NODE_ENV === 'development';

const gulp = require('gulp');
const connect = require('gulp-connect');

const dist = './dist';
const dist_js = dist + '/bundle.js';
const distReactClass = './dist@react-class';

const publish = './publish';

// browserify的配置项
const browserifyOpts = {
    entries: 'main.js', // 入口文件
    debug: true,// 是否包含sourcemap
    cache: {},
    packageCache: {}/*,
    insertGlobals: true,
    insertGlobalVars: _.reduce(
        ['Error', 'TypeError', 'RangeError', 'URIError'],
        (result, Error) => _.set(result, Error, (file, basedir) => {
            const path = JSON.stringify(require('path').relative(basedir, file));
            return `function(message){const error=new ${Error}(message, ${path});error.fileName=${path};return error;}`;
        }),
        {}
    )//if set vars[name] to undefined to not insert a variable */
};

const browserifyOptsReactClass = _.extend({}, browserifyOpts, {entries: 'mainReactClass.js'});

function browserifyPaload(browserifyOptions) {
    const bundler = browserify(browserifyOptions)
        .transform(babelify,  {
            presets: ["es2015", "react", "stage-0"],
            plugins: ["transform-decorators-legacy", require('babel-plugin-dev-expression'), 'transform-runtime', 'transform-strict-mode']
        })
        /*.transform('envify', {
         _: 'purge',
         NODE_ENV,
         DEBUG: false,
         //global: true//for replace all file NODE_ENV,if ignore or false, exclude node_modules
         })
         .transform(require('uglifyify'), {
         compress: false
         }) // for production*/
        //.transform(require('unreachable-branch-transform'))
        .transform('brfs');//for fs
    return bundler;
}

function bundlePayload(bundler, dist, needReload) {
    needReload = !!needReload;
    return () => {
        return bundler.bundle()
            .on('error', function (err) {
                console.log(err.message);
                console.log('error from bundle',err.stack);
            })
            .pipe(source('bundle.js'))
            .pipe(gulpIf(!DEBUG, require('vinyl-buffer')()))
            .pipe(gulpIf(!DEBUG, require('gulp-envify')({
                NODE_ENV: 'production'
             })))//for replace  NODE_ENV,Gulp plugin for envify without browserify */
            .pipe(gulp.dest(dist))
            .pipe(gulpIf(needReload, connect.reload()));
    };
}

function watchPayload(browserifyOptions, dist) {
    return ()=> {
        const bundler = browserifyPaload(browserifyOptions);

        //bundler.plugin(errorify);

        let watcher = watchify(bundler, {
            delay: 100,
            ignoreWatch: ['**/node_modules/**'],
            poll: false
        })
            .on('update', () => bundle())
            .on('log', gutil.log);

        const bundle = bundlePayload(watcher, dist, true);

        return bundle();
    }
}

gulp.task('bundle', bundlePayload(browserifyPaload(browserifyOpts), dist));

gulp.task('watch-js', ['clean'], watchPayload(browserifyOpts, dist));
gulp.task('watch-js-react-class', ['watch-js'], watchPayload(browserifyOptsReactClass, distReactClass));

gulp.task('connect', function () {
    connect.server({
        root: '.', // server的root目录
        port: 3001,  // server绑定的端口号
        livereload: true,   // 开启livereload的功能
        fallback: 'index.html'
    });
});

gulp.task('clean', function () {
    return require('del')([dist, distReactClass, publish])
        .then(paths => {
            paths.forEach(path => console.log('delete: %s', path.replace(__dirname, '')));
        });
});

//use gulp to minify
gulp.task('publish', () =>
    gulp.src([dist_js])
        .pipe(require('gulp-uglify')({
            compress: false,
            output: {
                ascii_only: true
            }
        }))
        .pipe(gulp.dest(publish))
);

function testMultiEntryFiles() {
    const es = require('event-stream');
    const rename = require('gulp-rename');
    gulp.task('oneBundle', function() {
        return browserify({ entries: ['multi-entry/main1.js'] })
            .bundle()
            .pipe(source('main.bundled.js'))
            .pipe(gulp.dest('dist/multi-entry'));
    });

    gulp.task('moreBundle', function() {
        // we define our input files, which we want to have
        // bundled:
        const files = [
            './multi-entry/main1.js',
            './multi-entry/main2.js'
        ];
        // map them to our stream function
        const tasks = files.map(function(entry) {
            return browserify({ entries: [entry] })
                .bundle()
                .pipe(source(entry))
                // rename them to have "bundle as postfix"
                .pipe(rename({
                    extname: '.bundle.js'
                }))
                .pipe(gulp.dest('dist'));
        });
        // create a merged stream
        return es.merge.apply(null, tasks);
    });

    const glob = require('glob');

    gulp.task('globMoreBundle', function(done) {
        glob('./multi-entry/main*.js', function(err, files) {
            if(err) done(err);

            var tasks = files.map(function(entry) {
                return browserify({ entries: [entry] })
                    .bundle()
                    .pipe(source(entry))
                    .pipe(rename({
                        extname: '.bundle.js'
                    }))
                    .pipe(gulp.dest('dist'));
            });
            es.merge(tasks).on('end', done);
        })
    });

    gulp.task('entryFiles', ()=>{
        return browserify({ entries: ['multi-entry/main1.js', 'multi-entry/main2.js'] })
            .bundle()
            .pipe(source('main.bundled.js'))
            .pipe(gulp.dest('dist/multi-entry'));
    });
}

testMultiEntryFiles();


gulp.task('default', ['watch-js', 'connect', 'clean', 'watch-js-react-class']);