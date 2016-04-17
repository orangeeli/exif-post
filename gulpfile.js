var browserify = require('browserify'),
    watchify = require('watchify'),
    gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sourceFile = './js/app.js',
    destFolder = './js/',
    destFile = 'app-bundle.js',
    sourceFile2 = './js/app2.js',
    destFile2 = 'app-bundle-2.js',
    sourceFile3 = './js/app2.js',
    destFile3 = 'app-bundle-3.js',
    pump = require('pump');

var tasks = {
  browserify : function(){
    return browserify(sourceFile)
    .bundle()
    .pipe(source(destFile))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(destFolder));
  },
  browserify2 : function(){
    return browserify(sourceFile2)
    .bundle()
    .pipe(source(destFile2))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(destFolder));
  },
  browserify3 : function(){
    return browserify(sourceFile3)
    .bundle()
    .pipe(source(destFile3))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(destFolder));
  },
  compressAll : function(cb) {
      pump([
        gulp.src('./js/app-bundle.js'),
        uglify(),
        gulp.dest('./js')
      ],
      cb
    );
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

// gulp.task('watch', tasks.watch);

gulp.task('default', ['browserify','browserify2','browserify3']);
