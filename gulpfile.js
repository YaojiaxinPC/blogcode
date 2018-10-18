var gulp = require('gulp');
var del = require('del');
var mv = require('mv');
var copy = require('copy');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var htmlclean = require('gulp-htmlclean');
var imagemin = require('gulp-imagemin');
 
 
// Clean  任务执行前，先清除之前生成的缓存文件
gulp.task('clean', function(cb) {
   return del(['./public1/**'], cb)
});

// move  任务执行完成后，从主目录复制文件过来缓存目录
//(此时会自动删除主目录),然后再复制回去（因为不能覆盖，所以不能从缓存目录直接过去主目录进行覆盖）
gulp.task('filedone',['copy-all'],()=>{gulp.start('filedone-dealREADME');});
//将public下的文件复制到缓存文件夹下
gulp.task('copy-all', function(cb) {
   return mv('./public', './public1',{clobber: false}, cb)
});

//复制README.md。处理完成后才进行重命名
gulp.task('filedone-dealREADME',['copy-readme'],()=>{gulp.start('backcopy');});

//复制README.md
gulp.task('copy-readme', function(cb) {
   return copy('README.md', './public1', cb);
});
gulp.task('backcopy', function(cb) {
   return mv('./public1', './public',{clobber: false}, cb)
});


// 压缩html
gulp.task('minify-html', function() {
    return gulp.src('./public/**/*.html')
        .pipe(htmlclean())
        .pipe(htmlmin({
            removeComments: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        }))
        .pipe(gulp.dest('./public1'))
});
// 压缩css
gulp.task('minify-css', function() {
    return gulp.src('./public/**/*.css')
        .pipe(minifycss({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('./public1'));
});
// 压缩js
gulp.task('minify-js', function() {
    return gulp.src('./public/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public1'));
});
// 压缩主题图片
gulp.task('minify-images', function() {
    return gulp.src('./public/images/**/*.*')
        .pipe(imagemin(
        [imagemin.gifsicle({'optimizationLevel': 3}), 
        imagemin.jpegtran({'progressive': true}), 
        imagemin.optipng({'optimizationLevel': 7}), 
        imagemin.svgo()],
        {'verbose': true}))
        .pipe(gulp.dest('./public1/images'))
});
// 压缩文章图片
gulp.task('minify-contentimg', function() {
    return gulp.src('./public/contentimg/**/*.*')
        .pipe(imagemin(
        [imagemin.gifsicle({'optimizationLevel': 3}), 
        imagemin.jpegtran({'progressive': true}), 
        imagemin.optipng({'optimizationLevel': 7}), 
        imagemin.svgo()],
        {'verbose': true}))
        .pipe(gulp.dest('./public1/contentimg'))
});
//压缩字体文件（实际没看出效果）
gulp.task('fontttf', function() {
    gulp.src('./public/lib/font-awesome/fonts/*.*')
    .pipe(gulp.dest('./public1/lib/font-awesome/fonts'));
});

//build完后复制文件回去
gulp.task('build', ['minify-html','minify-css','minify-js','minify-images','minify-contentimg','fontttf'],()=>{gulp.start('filedone');});

// 执行清理任务后才build
gulp.task('default', ['clean'],()=>{gulp.start('build');});
