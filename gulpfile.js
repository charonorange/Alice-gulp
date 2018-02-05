var gulp=require('gulp');
var config = require('./gulp_config.json');
var $=require('gulp-load-plugins')();
var uglify=require('gulp-uglify');   //js压缩
var open=require('open');
var app = {
    srcPath:'111/',
    devPath:'dist/alice'    
};

gulp.task('html',function(){
gulp.src(app.srcPath+'script.js')
.pipe(uglify())
.pipe(gulp.dest('111'))
});



// gulp.task('html',function(){    //重命名内容
//     gulp.src(app.srcPath+'*.html')
//           // .pipe($.replace('var marketBase;',config.dev.marketBase))
//         .pipe($.replace('Master Degree in Electronics and Communication Engineering','11111'))
//         .pipe(gulp.dest('dist'))
//         console.log('config.dev.one')
//         console.log(config.dev.one)

// });
// gulp.task('html',function(){     //把111文件下的所有HTML部署在dist下
//     gulp.src('111/*.html')
//   .pipe(gulp.dest('dist'))
// });

// gulp.src(app.prdPath[0]+'dist/prd/sub/main.js')//显示所有的文件信息

//     .on('data',function(file){

//     console.log(file.history[0])

// }); 


  gulp.task('clean',function () {   //清除 生产目录 和发布目录的全部文件
    gulp.src('/dist')
        .pipe($.clean())
});
  gulp.task('build',['html']);
  gulp.task('default',['clean']); 
