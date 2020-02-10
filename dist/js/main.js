console.log("加载完成");
/* 
    配置当前项目引入的模块
*/
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "index": "index",
    },
    shim: {
        //设置依赖关系  先引入jquery.js  然后在隐去jquery-cookie
        "jquery-cookie": ["jquery"],
        //声明当前模块不遵从AMD
        "parabola": {
			exports: "_"
		}
    }
})

require(["index"], function(index){
    // //加载商品数据 
    index.leftNavDownload();
    index.activity();
    index.bottom_images();
    index.hot_sale();
    index.guess_love();
    index.LOL();
    index.CF();
    index.Blade_Soul();
    index.X_GAME();
    index.banner();
})