var gulp=require('gulp');
var config = require('./gulp_config.json');
var uglify=require('gulp-uglify');   //js压缩

var $=require('gulp-load-plugins')();//实例化 方便调用 gulp-minify-css gulp-uglify 
var open=require('open');   // 实例化open方法
var notify=require('gulp-notify');  //提示
var app={  
    srcPath:['sub/','doc/'],  //开发目录
    devPath:'dist/dev/', //生产目录
    testPath:'dist/test/', //测试目录
    uatPath:'dist/uat/', //UAT目录
    prdPath:'dist/prd/'//发布目录（用于发布）
};

// gulp.task('lib',function () {            //为事件命名
//     gulp.src('bower_comments/**/*.js')  //复制项目所依赖的js(如：通过bower安装的angular.js)
//     .pipe(gulp.dest(app.devPath+'vendor'))  //将文件黏贴到生产目录
//     .pipe(gulp.dest(app.prdPath+'vendor'))  //将文件黏贴到发布目录
//         .pipe($.connect.reload());          //监测文件改变后重新运行黏贴复制
// });
gulp.task('others',['other','manifest']);
// gulp.task('node_modules',function () {
//     gulp.src('node_modules/**')  //复制开发目录下的所有html文
//         .pipe(gulp.dest(app.devPath+'node_modules'))  
//         .pipe(gulp.dest(app.testPath+'node_modules')) 
//         .pipe(gulp.dest(app.uatPath+'node_modules')) 
//         .pipe(gulp.dest(app.prdPath+'node_modules'))  
//         // .pipe($.connect.reload());
// });
gulp.task('manifest',function(){
	gulp.src('manifest.yml')
		.pipe($.replace('name: agritech-platform-apidoc-test',config.dev.ymlname))
		.pipe($.replace('host: agritech-platform-apidoc-test',config.dev.ymlhost))
		.pipe(gulp.dest(app.devPath))
		.pipe($.replace(config.dev.ymlname,config.test.ymlname))
		.pipe($.replace(config.dev.ymlhost,config.test.ymlhost))
	    .pipe(gulp.dest(app.testPath))
	    .pipe($.replace(config.test.ymlname,config.uat.ymlname))
		.pipe($.replace(config.test.ymlhost,config.uat.ymlhost))
	    .pipe(gulp.dest(app.uatPath)) 
	    .pipe($.replace(config.uat.ymlname,config.prd.ymlname))
		.pipe($.replace(config.uat.ymlhost,config.prd.ymlhost))
	    .pipe(gulp.dest(app.prdPath))
})
gulp.task('other',function(){
	gulp.src(['app.js','LICENSE','package.json','README.md'])
	    .pipe(gulp.dest(app.devPath)) 
        .pipe(gulp.dest(app.testPath)) 
        .pipe(gulp.dest(app.uatPath)) 
        .pipe(gulp.dest(app.prdPath))
})
gulp.task('html',["html_sub","html_doc","html_akamai"]);
gulp.task('html_sub',function () {
    gulp.src(app.srcPath[0]+'*.html')  //复制开发目录下的所有html文
    .pipe($.replace('href="https://agritech-platform-marketing-test.mybluemix.net/software/br/pt/agritech/platform/market"','href="https://agritech-platform-marketing-dev.mybluemix.net/software/br/pt/agritech/platform/market"'))
        .pipe(gulp.dest(app.devPath+'/sub/'))  
        .pipe($.replace('href="https://agritech-platform-marketing-dev.mybluemix.net/software/br/pt/agritech/platform/market"','href="https://agritech-platform-marketing-test.mybluemix.net/software/br/pt/agritech/platform/market"'))
        .pipe(gulp.dest(app.testPath+'/sub/')) 
        .pipe($.replace('href="https://agritech-platform-marketing-test.mybluemix.net/software/br/pt/agritech/platform/market"','href="https://agritech-platform-marketing-uat.mybluemix.net/software/br/pt/agritech/platform/market"'))
        .pipe(gulp.dest(app.uatPath+'/sub/')) 
        .pipe($.replace('href="https://agritech-platform-marketing-uat.mybluemix.net/software/br/pt/agritech/platform/market"','href="https://agritech-platform-marketing.mybluemix.net/software/br/pt/agritech/platform/market"'))
        .pipe(gulp.dest(app.prdPath+'/sub/'))  
        // .pipe($.connect.reload());
});
gulp.task('html_doc',function () {
    gulp.src(app.srcPath[1]+'*.html')  
    .pipe($.replace('href="https://agritech-platform-marketing-test.mybluemix.net/software/br/pt/agritech/platform/market"','href="https://agritech-platform-marketing-dev.mybluemix.net/software/br/pt/agritech/platform/market"'))
        .pipe(gulp.dest(app.devPath+'/doc/'))  
         .pipe($.replace('href="https://agritech-platform-marketing-dev.mybluemix.net/software/br/pt/agritech/platform/market"','href="https://agritech-platform-marketing-test.mybluemix.net/software/br/pt/agritech/platform/market"'))
        .pipe(gulp.dest(app.testPath+'/doc/')) 
         .pipe($.replace('href="https://agritech-platform-marketing-test.mybluemix.net/software/br/pt/agritech/platform/market"','href="https://agritech-platform-marketing-uat.mybluemix.net/software/br/pt/agritech/platform/market"'))
        .pipe(gulp.dest(app.uatPath+'/doc/')) 
        .pipe($.replace('href="https://agritech-platform-marketing-uat.mybluemix.net/software/br/pt/agritech/platform/market"','href="https://agritech-platform-marketing.mybluemix.net/software/br/pt/agritech/platform/market"')) 
        .pipe(gulp.dest(app.prdPath+'/doc/')) 
        // .pipe($.connect.reload());
});


gulp.task('html_akamai',function () {
    gulp.src('akamai/*.html')  
        .pipe(gulp.dest(app.devPath+'/akamai/'))  
        .pipe(gulp.dest(app.testPath+'/akamai/')) 
        .pipe(gulp.dest(app.uatPath+'/akamai/'))  
        .pipe(gulp.dest(app.prdPath+'/akamai/')) 
        // .pipe($.connect.reload());
});
// gulp.task('json',function () {
//     gulp.src(app.srcPath+'data/**/*.json')   //复制开发目录下的所有json文件
//         .pipe(gulp.dest(app.devPath+'data'))
//         .pipe(gulp.dest(app.prdPath+'data'))
//         .pipe($.connect.reload());
// });


// gulp.task('less',function () {
//    gulp.src(app.srcPath+'style/index.less')
//        .pipe($.less())                      //将less文件编译为css
//        .pipe(gulp.dest(app.devPath+'css'))  //将编译后的css文件黏贴到生产目录
//        .pipe($.minifyCss())   //用gulp-minify-css压缩css文件
//        .pipe(gulp.dest(app.prdPath+'css'))  //
//        .pipe($.connect.reload());
// });

//build all css
gulp.task('css',["css_sub","css_doc"]);
gulp.task('css_sub',function () {
   gulp.src(app.srcPath[0]+"css/*.css")
   	   .pipe(gulp.dest(app.devPath+"sub/css"))
   	   .pipe(gulp.dest(app.testPath+"sub/css"))
   	   .pipe(gulp.dest(app.uatPath+"sub/css"))
       .pipe(gulp.dest(app.prdPath+'sub/css'))
       
       // .pipe($.connect.reload());
});
gulp.task('css_doc',function () {
   gulp.src(app.srcPath[1]+"css/*.css")
       .pipe(gulp.dest(app.devPath+'doc/css'))
       .pipe(gulp.dest(app.testPath+'doc/css'))
       .pipe(gulp.dest(app.uatPath+'doc/css'))
       .pipe(gulp.dest(app.prdPath+'doc/css'))
       // .pipe($.connect.reload());
});

// build all js
gulp.task('js',['js_sub','js_doc','js_sub_main']);
gulp.task('js_sub',function () {
    gulp.src([app.srcPath[0]+'js/cnpj.min.js',app.srcPath[0]+'js/CPF.min.js',app.srcPath[0]+'js/jquery.mask.min.js'])
        .pipe(gulp.dest(app.devPath+'sub/js'))
        .pipe(gulp.dest(app.testPath+'sub/js'))
        .pipe(gulp.dest(app.uatPath+'sub/js'))
        .pipe(gulp.dest(app.prdPath+'sub/js'))
});
gulp.task('js_sub_main',function () {
    gulp.src(app.srcPath[0]+'js/main.js')
        .pipe($.replace('var serviceBase;',config.dev.serviceBase))
        .pipe($.replace('var marketBase;',config.dev.marketBase))
        .pipe($.replace('var docBase;',config.dev.docBase))
        .pipe(gulp.dest(app.devPath+'sub/js'))
        .pipe($.replace(config.dev.serviceBase,config.test.serviceBase))
        .pipe($.replace(config.dev.marketBase,config.test.marketBase))
        .pipe($.replace(config.dev.docBase,config.test.docBase))
        .pipe(gulp.dest(app.testPath+'sub/js'))
        .pipe($.babel())
        .pipe($.replace(config.test.serviceBase,config.uat.serviceBase))
        .pipe($.replace(config.test.marketBase,config.uat.marketBase))
        .pipe($.replace(config.test.docBase,config.uat.docBase))
        .pipe(gulp.dest(app.uatPath+'sub/js'))
        .pipe($.replace(config.uat.serviceBase,config.prd.serviceBase))
        .pipe($.replace(config.uat.marketBase,config.prd.marketBase))
        .pipe($.replace(config.uat.docBase,config.prd.docBase))
        // in prd there's a link should be changed, replace with https://wwwtest.ibm.com/account/profile/us?page=chpro with  https://www.ibm.com/ibmweb/myibm/profile/profile-edit.jsp
        .pipe($.replace('href="https://wwwtest.ibm.com/account/profile/us?page=chpro"','href="https://www.ibm.com/ibmweb/myibm/profile/profile-edit.jsp"'))
        .pipe($.uglify().on('error', function(uglify) {
            console.error(uglify);
            this.emit('end');
        }))
        .pipe(gulp.dest(app.prdPath+'sub/js'))
});


gulp.task('js_doc',function () {
    gulp.src(app.srcPath[1]+'js/*')
        .pipe($.replace('var serviceBase;',config.dev.serviceBase))
        .pipe($.replace('var marketBase;',config.dev.marketBase))
        .pipe($.replace('var docBase;',config.dev.docBase))
        .pipe(gulp.dest(app.devPath+'doc/js'))
        .pipe($.replace(config.dev.serviceBase,config.test.serviceBase))
        .pipe($.replace(config.dev.marketBase,config.test.marketBase))
        .pipe($.replace(config.dev.docBase,config.test.docBase))
        .pipe(gulp.dest(app.testPath+'doc/js'))
        .pipe($.babel())
        .pipe($.replace(config.test.serviceBase,config.uat.serviceBase))
        .pipe($.replace(config.test.marketBase,config.uat.marketBase))
        .pipe($.replace(config.test.docBase,config.uat.docBase))
        .pipe(gulp.dest(app.uatPath+'doc/js'))
        .pipe($.replace(config.uat.serviceBase,config.prd.serviceBase))
        .pipe($.replace(config.uat.marketBase,config.prd.marketBase))
        .pipe($.replace(config.uat.docBase,config.prd.docBase))
        .pipe($.uglify().on('error', function(uglify) {
        console.error(uglify);
        this.emit('end');
    }))           //用gulp-uglify压缩js文件
        .pipe(gulp.dest(app.prdPath+'doc/js'))
});


gulp.task('img',["img_sub","img_doc"]);
gulp.task('img_sub',function () {
    gulp.src(app.srcPath[0]+'images/**/*')
        .pipe($.imagemin())    //通过 gulp-imagemin 压缩图片文件
        .pipe(gulp.dest(app.devPath+"sub/images"))
        .pipe(gulp.dest(app.testPath+"sub/images"))
        .pipe(gulp.dest(app.uatPath+"sub/images"))
        .pipe(gulp.dest(app.prdPath+'sub/images'))
        // .pipe($.connect.reload());
});
gulp.task('img_doc',function () {
    gulp.src(app.srcPath[1]+'images/*')
        .pipe($.imagemin())    //通过 gulp-imagemin 压缩图片文件
        .pipe(gulp.dest(app.devPath+"doc/images"))
        .pipe(gulp.dest(app.testPath+"doc/images"))
        .pipe(gulp.dest(app.uatPath+"doc/images"))
        .pipe(gulp.dest(app.prdPath+'doc/images'))
        // .pipe($.connect.reload());      
});

gulp.task('build',['img','js','html','css','others']);  //将多个命令整合为一个命令方便运行
// gulp.task('serve',['build'],function () {   //开启一个本地服务器，方便浏览调试
//     $.connect.server({           //
//         root:[app.prdPath],     // 设置服务器根目录
//         livereload:true,    //启动服务，自动打开浏览器(低端浏览不支持)
//         port:1234       //定义本地浏览器端口号(不与其他端口冲突任意定义)
//     });
//     open('http://localhost:1234');   //打开本地服务器的主页
//     gulp.watch(app.srcPath+'script/**/*.js',['js']);   //监听js文件目录,文件改变重新启动 js 任务
//     // gulp.watch('bower_comments/**/*',['lib']);       
//     gulp.watch(app.srcPath+'style/**/*.less',['less']);//监听less文件目录,文件改变重新启动 less 任务
//     gulp.watch(app.srcPath+'**/*.html',['html']);
//     gulp.watch(app.srcPath+'data/**/*.json',['json']);
//     gulp.watch(app.srcPath+'image/**/*',['img']);

// });

gulp.task('clean',function () {   //清除 生产目录 和发布目录的全部文件
    gulp.src([app.devPath,app.testPath,app.uatPath,app.prdPath])
        .pipe($.clean())
});

gulp.task('default',['clean']);   //定义一个默认任务， 在命令行中只需要 输入 gulp  不需要 跟任务名
