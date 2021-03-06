var gulp         = require("gulp"),
    sass         = require("gulp-sass"),
    concat       = require("gulp-concat"),
    watch        = require("gulp-watch"),
    plumber      = require("gulp-plumber"),
    minify_css   = require("gulp-minify-css"),
    uglify       = require("gulp-uglify"),
    prefixer     = require("gulp-autoprefixer"),
    imagemin     = require("gulp-imagemin"),
    browserSync  = require("browser-sync"),
	sourceMaps   = require("gulp-sourcemaps");
    
//------------------------------------------------------------

var dest_js = "js/uglify";
var dest_css = "css";
var dest_img = "assets/build/img";
var src_sass = "sass/**/*.scss";
var src_js = "js/**/*.js";
var src_img = "assets/img/**/*";
var files = [
    src_sass,
    './**/*.html'
];
//------------------------------------------------------------

// SASS TO CSS
gulp.task('single', function(){
   return gulp.src('sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(prefixer('last 2 versions'))
    .pipe(concat('style.css'))
    .pipe(gulp.dest(dest_css))
    .pipe(minify_css())
    .pipe(gulp.dest(dest_css))
    .pipe(browserSync.reload({stream:true}));
});
// only save style sass
gulp.task('sass', function(){
   return gulp.src(src_sass)
    .pipe(plumber())
    .pipe(sass())
    .pipe(prefixer('last 2 versions'))
    .pipe(concat('style.css'))
    .pipe(gulp.dest(dest_css))
    .pipe(minify_css())
	.pipe(sourceMaps.write('./'))
    .pipe(gulp.dest(dest_css));
});
// Compile JS
gulp.task('js', function(){
    return gulp.src(src_js)
        .pipe(plumber())
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(dest_js));
});
// Compile JS
gulp.task('image', function(){
    return gulp.src(src_img)
        .pipe(imagemin())
        .pipe(gulp.dest(dest_img));
});
// WATCH tasks
gulp.task('watch', function(){

     //gulp.watch(src_js, ['js']);
     gulp.watch(src_sass,['sass']);
});

// Watch default 
gulp.task('default', ['js','sass', 'watch']);
//------------------------------------------------------------

