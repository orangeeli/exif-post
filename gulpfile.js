var browserify = require('browserify'),
    watchify = require('watchify'),
    gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    sourceFile = './js/app.js',
    destFolder = './js/',
    destFile = 'app-bundle.js',
    sourceFile2 = './js/app2.js',
    destFile2 = 'app-bundle-2.js',
    sourceFile3 = './js/app2.js',
    destFile3 = 'app-bundle-3.js';

var tasks = {
  browserify : function(){
    return browserify(sourceFile)
    .bundle()
    .pipe(source(destFile))
    .pipe(gulp.dest(destFolder));
  },
  browserify2 : function(){
    return browserify(sourceFile2)
    .bundle()
    .pipe(source(destFile2))
    .pipe(gulp.dest(destFolder));
  },
  browserify3 : function(){
    return browserify(sourceFile3)
    .bundle()
    .pipe(source(destFile3))
    .pipe(gulp.dest(destFolder));
  },
  watch : function() {
    var bundler = watchify(sourceFile);
    bundler.on('update', rebundle);

    function rebundle() {
      return bundler.bundle()
        .pipe(source(destFile))
        .pipe(gulp.dest(destFolder));
    }

    return rebundle();
  }
}

gulp.task('browserify', tasks.browserify);
gulp.task('browserify2', tasks.browserify2);
gulp.task('browserify3', tasks.browserify3);
gulp.task('watch', tasks.watch);

gulp.task('default', ['browserify', 'browserify2','browserify3']);
