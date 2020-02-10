const gulp = require("gulp");

gulp.task("copy-html", function(){
    return gulp.src("html/*.html")
    .pipe(gulp.dest("dist/html"))
    .pipe(connect.reload());
})
gulp.task("copy-index", function(){
    return gulp.src("*.html")
    .pipe(gulp.dest("dist/"))
    .pipe(connect.reload());
})
gulp.task("images", function(){
    return gulp.src("images/**/*")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());
})
gulp.task("php", function(){
    return gulp.src("php/**/*")
    .pipe(gulp.dest("dist/php"))
    .pipe(connect.reload());
})
gulp.task("data", function(){
    return gulp.src("data/*.json")
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload());
})
gulp.task("scripts", function(){
    return gulp.src(["js/*.js", "!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
})
const scss = require("gulp-sass");	
const minifyCSS = require("gulp-minify-css");
const rename = require("gulp-rename"); 
gulp.task("scss", function(){
    return gulp.src("css/register.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("register.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})

gulp.task("build", ["php","copy-html", "images", "scss","data","scripts","copy-index"], function(){
    console.log("编译成功");
})

gulp.task("watch", function(){
    gulp.watch("*.html", ["copy-index"]);
    gulp.watch("html/*.html", ["copy-html"]);
    gulp.watch("images/**/*", ['images']);
    gulp.watch("css/register.scss", ['scss']);
    gulp.watch("data/**/*", ['data']);
    gulp.watch("php/**/*", ['php']);
    gulp.watch("js/*.js", ['scripts']);

})
const connect = require("gulp-connect"); //连接服务器
gulp.task("server", function(){
    connect.server({
        root: "dist", //服务器的根目录
        port: 8888,
        livereload: true//设置实时刷新
    })
})
gulp.task("default", ["watch", "server"]);