var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  cleanCSS = require('gulp-clean-css'),
  livereload = require('gulp-livereload'),
  less = require('gulp-less'),
  imagemin = require('gulp-imagemin');

var paths = {
  scripts: ['client/js/**/*.coffee', '!client/external/**/*.coffee'],
  images: 'client/img/**/*',
  css:['public/css/*.css']
};

gulp.task('less', function () {
  gulp.src('./public/**/css/*.less')
      .pipe(plumber())
      .pipe(less())
      .pipe(cleanCSS())
      .pipe(gulp.dest('./public/'))
      .pipe(livereload());
});
/*gulp.task('imagemin', function () {
  gulp.src('./public/!**!/css/img/!*')
      .pipe()
      .pipe(gulp.dest('./dist/assets/'))
      .pipe(livereload());
});*/
gulp.task('watch', function() {
  gulp.watch('./public/**/css/*.less', ['less']);
});

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js css coffee hbs',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});


/*
gulp.task('miniJs', ()=>
  gulp.src('./public/!**!/!*.js').
    pipe(uglify()).
    pipe(gulp.dest("./dist/"))
)
*/

gulp.task('default', [
  'less','develop','watch'
]);
