var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var gutil = require('gutil');
var source = require('vinyl-source-stream');

var gulp = require('gulp');
var connect = require('gulp-connect');
// browserify的配置项
var browserifyOpts = {
    entries: 'main.js', // 入口文件
    debug: true,// 是否包含sourcemap
    cache: {},
    packageCache: {}
};
var bundle = function () {
    return watcher.bundle()
        .on('error', function (err) {
            console.log(err.message);
            console.log(err.stack);
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
};


var bundler = browserify(browserifyOpts)
    .transform(babelify,  {
        presets: ["es2015", "react"]
    });

var watcher = watchify(bundler)
    .on('update', bundle)
    .on('log', gutil.log);

gulp.task('watch-js', ['clean'], bundle);

gulp.task('connect', function () {
    connect.server({
        root: '.', // server的root目录
        port: 3001,  // server绑定的端口号
        livereload: true,   // 开启livereload的功能
        fallback: 'index.html'
    });
});

gulp.task('clean', function () {
    require('del')('./dist')
        .then(paths => {
            paths.forEach(path => console.log('delete: %s', path.replace(__dirname, '')));
        });
});

gulp.task('default', ['watch-js', 'connect', 'clean']);
