var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('sass', function(){
  return gulp.src('app/scss/app.scss')
		     .pipe(sass())
         .pipe(cssmin())
         .pipe(rename({suffix: '.min'}))
		     .pipe(gulp.dest('app/css'))
		     .pipe(browserSync.reload({
		      	stream: true
		     }))
});

gulp.task('browserSync', function() {
  browserSync.init({
  	browser: ["chrome"],
    server: {
      baseDir: 'app'
    },
  })
})

gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
})