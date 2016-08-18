var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  cleanCSS = require('gulp-clean-css'),
  livereload = require('gulp-livereload');

var paths = {
  scripts: ['client/js/**/*.coffee', '!client/external/**/*.coffee'],
  images: 'client/img/**/*',
  css:['public/css/*.css']
};

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js css coffee handlebars',
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

gulp.task('minify-css', function() {
  return gulp.src(paths.css)
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/assets/css'))
});

gulp.task('miniJs', ()=>
  gulp.src('./public/**/*.js').
    pipe(uglify()).
    pipe(gulp.dest("./dist/"))
)

gulp.task('default', [
  'develop','minify-css'
]);
