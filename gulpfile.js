var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    mainBowerFiles = require('main-bower-files'),
    less = require('gulp-less'),
    filter = require('gulp-filter'),
    spritesmith = require('gulp.spritesmith'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    rigger = require('gulp-rigger'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');

var svgstore = require('gulp-svgstore');
var concat = require('gulp-concat');
var svgmin = require('gulp-svgmin');
var path = require('path');
var inject = require('gulp-inject');

var paths = {
    bower: mainBowerFiles(),
    src:{
        html: 'src/*.html',
        js: 'src/scripts/*.js',
        css: 'src/styles/main.less',
        img: 'src/img/**/*',
        fonts: 'src/fonts/**/*.*',
        sprites: 'src/img/sprites/*.png',
        svg: 'src/icons/*.svg'
    },
    build:{
        html: 'build/',
        js: 'build/js',
        css: 'build/css',
        img: 'build/img/',
        fonts: 'build/fonts',
        spritesImg: 'build/img/',
        spritesCss: 'src/styles/',
        svg: 'build/icons/',
    },
    watch:{
        html: 'src/*.html',
        js: 'src/scripts/*.js',
        css: 'src/styles/*.less',
        img: 'src/img/*.*',
        fonts: 'src/fonts/*.*',
        sprites: 'src/img/sprites/*.png'
    }
};


var imagemin_options={
    progressive: true,
    use: [pngquant()]
};

gulp.task('build:svg', function () {
    return gulp
        .src(paths.src.svg)
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest(paths.build.svg));
});

gulp.task('build:svgtopng', function () {
    return gulp
        .src(paths.src.svg, {base: 'src/icons'})
        //.pipe(svgfallback())
        .pipe(gulp.dest('build/icons/'));
});

gulp.task('build:html', function(){
    gulp.src(paths.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(paths.build.html))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('build:js', function(){
    gulp.src(paths.bower.concat(paths.src.js))
        .pipe(filter(['**/*.js']))
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.build.js))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('build:css', function(){
    gulp.src(paths.src.css)
        .pipe(less())
        .pipe(concat('main.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(gulp.dest(paths.build.css))
        .pipe(browserSync.reload({stream:true}));

});

gulp.task('build:img', function(){
    gulp.src(paths.src.img)
        .pipe(imagemin(imagemin_options))
        .pipe(gulp.dest(paths.build.img))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('build:sprites', function () {
    var spriteData = gulp.src(paths.src.sprites).pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.less',
        imgPath: '../img/sprite.png',
        padding: 5
    }));
    // Pipe image stream through image optimizer and onto disk
    spriteData.img
        .pipe(gulp.dest(paths.build.spritesImg));

    // Pipe CSS stream through CSS optimizer and onto disk
    spriteData.css
        .pipe(gulp.dest(paths.build.spritesCss));
});

gulp.task('build:fonts', function(){
    gulp.src(paths.bower.concat([paths.src.fonts]))
        .pipe(filter(['**/*.eot', '**/*.otf', '**/*.woff', '**/*.ttf', '**/*.svg']))
        .pipe(gulp.dest(paths.build.fonts))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('build', ['build:svg', 'build:svgtopng', 'build:html', 'build:js','build:sprites', 'build:css', 'build:img', 'build:fonts']);

gulp.task('reload', browserSync.reload);

gulp.task('clean', function(cb){
    del('build/', cb);
});

gulp.task('serve', function(){
    browserSync({
      server: 'build/'
    });

    gulp.watch(paths.watch.html, ['build:html']);
    gulp.watch(paths.watch.js, ['build:js']);
    gulp.watch(paths.watch.css, ['build:css']);
    gulp.watch(paths.watch.img, ['build:img']);
    gulp.watch(paths.watch.sprites, ['build:sprites']);
    gulp.watch(paths.src.svg, ['build:svg', 'build:svgtopng', 'build:html']);
});

gulp.task('default', ['build', 'serve']);