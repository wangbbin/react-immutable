const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const gutil = require('gulp-util');
const source = require('vinyl-source-stream');
const _ = require('lodash');

const gulp = require('gulp');
const connect = require('gulp-connect');

const dist = './dist';
const distReactClass = './dist@react-class';

// browserify的配置项
const browserifyOpts = {
    entries: 'main.js', // 入口文件
    debug: true,// 是否包含sourcemap
    cache: {},
    packageCache: {}/*,
    insertGlobals: true,
    insertGlobalconsts: _.reduce(
        ['Error', 'TypeError', 'RangeError', 'URIError'],
        (result, Error) => _.set(result, Error, (file, basedir) => {
            const path = JSON.stringify(require('path').relative(basedir, file));
            return `function(message){const error=new ${Error}(message, ${path});error.fileName=${path};return error;}`;
        }),
        {}
    )*/
};

const browserifyOptsReactClass = _.extend({}, browserifyOpts, {entries: 'mainReactClass.js'});
console.dir(browserifyOptsReactClass)

function watchPayload(browserifyOptions, dist) {
    const bundler = browserify(browserifyOptions)
        .transform(babelify,  {
            presets: ["es2015", "react", "stage-0"],
            plugins: ["transform-decorators-legacy"]
        })
        .transform('brfs');//for fs

    const bundle = function () {
        return watcher.bundle()
            .on('error', function (err) {
                console.log(err.message);
                console.log(err.stack);
            })
            .pipe(source('bundle.js'))
            .pipe(gulp.dest(dist))
            .pipe(connect.reload());
    };

    const watcher = watchify(bundler, {
        delay: 100,
        ignoreWatch: ['**/node_modules/**'],
        poll: false
    })
        .on('update', bundle)
        .on('log', gutil.log);

    return bundle;
}

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
    return require('del')([dist, distReactClass])
        .then(paths => {
            paths.forEach(path => console.log('delete: %s', path.replace(__dirname, '')));
        });
});

gulp.task('default', ['watch-js', 'connect', 'clean', 'watch-js-react-class']);