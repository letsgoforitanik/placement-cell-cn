const gulp = require("gulp");
const gulpRun = require("gulp-run");
const del = require("del");
const minify = require("gulp-clean-css");
const uglify = require("gulp-uglify");



gulp.task('clean:dist', () => del(['dist/**/*']));
gulp.task('ts:browser->js', () => gulpRun(`tsc --project src/assets/ts/tsconfig.json`).exec());
gulp.task('ts:server->js', () => gulpRun(`tsc && tsc-alias`).exec());
gulp.task('sass->css', () => gulpRun(`sass --no-source-map src/assets/sass:dist/public/css`).exec());
gulp.task('copy:ejs', () => gulp.src('src/views/**/*.ejs').pipe(gulp.dest('dist/views')));
gulp.task('minify:css', () => gulp.src('dist/public/css/**/*.css').pipe(minify()).pipe(gulp.dest('dist/public/css')));
gulp.task('uglify:js', () => gulp.src('dist/public/js/**/*.js').pipe(uglify()).pipe(gulp.dest('dist/public/js')));



const tasklist = [
    'clean:dist',
    'ts:browser->js',
    'ts:server->js',
    'sass->css',
    'copy:ejs',
    'minify:css',
    'uglify:js'
];


gulp.task('build', gulp.series(tasklist));