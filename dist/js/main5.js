console.log("加载完成");
/* 
    配置当前项目引入的模块
*/
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "cart": "cart",
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

require(["cart"], function(cart){
    cart.cart();
})