// gulpfile.js
const gulp = require("gulp");
const sass = require("gulp-sass");

// a task to generate the css with sass
gulp.task('css', function () {
    return gulp.src('./assets/scss/style.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        })
            .on('error', sass.logError))
        .pipe(gulp.dest('./_includes/css/style.css'));
});

/*
  Watch folders for changes
*/
gulp.task("watch", function () {
    gulp.watch('./assets/scss/**/*.scss', gulp.parallel('css'));
});


/*
Let's build this sucker.
*/
gulp.task('build', gulp.parallel(
    'css'
));