let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let less = require('gulp-less');
let browserSync = require('browser-sync');
let plumber = require('gulp-plumber');
let postCSS = require('gulp-postcss');
let autoprefixer = require("autoprefixer");

gulp.task('less', function(){
    gulp.src('./less/style.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(postCSS([
        autoprefixer()
    ]))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

gulp.task("server", ["less"], function() {
    browserSync.init({
      server: ".",
      notify: false,
      open: true,
      cors: true,
      ui: false
    });

    gulp.watch("less/**/*.less", ["less"]);
    gulp.watch("*.html").on("change", browserSync.reload);
});

gulp.task('minify-css', function(){
    return gulp.src('./css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'))
    
    
});

gulp.task('default', ['less' ,'watch']);