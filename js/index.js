define(["jquery"], function($){
    //侧边栏
    function leftNavDownload(){
        $.ajax({
            url: "../data/index.json",
            success: function(data){
                var slideArr = data.sideNav;
                for(var i = 0; i < slideArr.length; i++){
                    var node = $(`<dl class="game_item">
                <dt><i></i>${slideArr[i].title}<em></em></dt>
                    <dd>
                        <div class="game_type_${i}"></div>
                    </dd>
                 </dl>`);
                 node.appendTo(".nav .allgame");

                    var childArr = slideArr[i].child;
                    for(var j = 0; j < childArr.length; j++){
                        if(j % 8 == 0){
                            var newUl = $(`<ul class="list-col-${parseInt(j / 8)}"></ul>`);
                            newUl.appendTo($(".nav .allgame").find(`.game_type_${i}`));
                        }
                         $(`<li>
                        <a>
                            <span class="text">${childArr[j].title}</span>
                        </a>
                    </li>`).appendTo(newUl);
                    }   
                    $(".nav .allgame").on("mouseenter",`.game_item`, function(){
                        $(this).find("dd div").css("display","block");
                    }).on("mouseleave",`.game_item`, function(){
                        $(this).find("dd div").css("display","none");
                    })           
                } 
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }
    //轮播图
    function banner(){
        $.ajax({
            url : "../data/index.json",
            success : function(data){
                var banner = data.banner[0].child;
                for(var i = 0;i < banner.length;i++){
                    var node = $(`<div class="dev">
                    <a href=""><img src="${banner[i].images}" width="770" height="330"></a>
                    <s></s>
                    <p>${banner[i].text}</p>
                </div>`);
                     node.appendTo(".banner .pic");
                }

                var timer = null;
                var index = 0;
                $(".banner .dot a").hover(function(){
                    clearInterval(timer);
                    index = $(this).index();
                    tab();
                 }, function(){
                    timer = setInterval(function(){
                        index++;
                        tab();
                    }, 2000);
                })
 
                 timer = setInterval(function(){
                     index++;
                     tab();
                 }, 2000);
                 
                 $(".contentbox .bannerbox .banner .pic").hover(function(){
                     clearInterval(timer);
                 }, function(){
                     timer = setInterval(function(){
                         index++;
                         tab();
                     }, 2000);
                 })  
                function tab(){
                    $(".banner .dot a").removeClass("dot_bg").eq(index).addClass("dot_bg");
                    if(index == $(".banner .dot a").size()){
                        $(".banner .dot a").eq(0).addClass("dot_bg");
                    } 
                    $(".banner .pic").stop().animate({
                        left: -index * 770
                    }, 1000, function(){
                        if(index == $(".banner .dot a").size()){
                            index = 0;
                            $(".banner .pic").css("left", 0);
                        }
                    })
                }
            },
            error : function(msg){
                console.log(msg);
            }
        })
    }
    //热卖推荐
    function hot_sale(){
        $.ajax({
            url : "../data/index.json",
            success : function(data){
                var hot_sale = data.hot_sale[0].child;
                for(var i = 0;i < hot_sale.length;i++){
                    var node = $(`<dl>
                    <dt><a href=""><img src="${hot_sale[i].images}"></a></dt>
                    <dd>
                        <p><b>[英雄联盟]</b><a>${hot_sale[i].name}</a></p>
                            <p>QB价：<b style="color:#f74a4a">${hot_sale[i].QB}.00 QB</b></p>
                 <p>热卖推荐</p>        <a title="立即抢购" class="comm_btn" href="">立即抢购</a>
                    </dd>
                </dl>`);
                     node.appendTo(".main_1_left .bottom");
                }

            },
            error : function(msg){
                console.log(msg);
            }
        })
    }
    //猜你喜欢
    function guess_love(){
        $.ajax({
            url : "../data/index.json",
            success : function(data){
                var guess_love = data.guess_love[0].child;
                for(var i = 0;i < guess_love.length;i++){
                    var node = $(`
                <dl pos="12">     
                    <dt>
                        <a href="">      
                            <img src="${guess_love[i].images}">
                        </a>
                    </dt>     
                    <dd>      
                        <p><a href=""><b>[英雄联盟]</b>${guess_love[i].name}</a></p>   
                        <p class="red">商城价：<b>${guess_love[i].QB}.00 QB</b></p>   
                    </dd>    
                </dl>`);
                     node.appendTo(".main_2_left .bottom");
                }
            },
            error : function(msg){
                console.log(msg);
            }
        })
    }
    //精彩活动
    function activity(){
        $.ajax({
            url : "../data/index.json",
            success : function(data){
                var images = data.images[0].child;
                for(var i = 0;i < images.length;i++){
                    var node = $(`<li>
                    <a href="">
                        <img src="${images[i].images}" alt="">
                    </a>
                </li>`);
                     node.appendTo(".activity_list");
                }

            },
            error : function(msg){
                console.log(msg);
            }
        })
    }
    //LOL
    function LOL(){
        $.ajax({
            url : "../data/index.json",
            success : function(data){
                var LOL_images = data.LOL[0].images;
                var list_top = data.LOL[1].top;
                var list_bottom = data.LOL[1].bottom;
                var rank = data.LOL[2].child;
                $(`<a href="html/list.html" target="_blank">
                    <img src="${LOL_images}">
                    </a>`).appendTo(".main_4_left .bottom .pic");
                for(var i = 0;i < list_top.length;i++){
                    var node_top = $(`<li>
                    <a href="">
                        <span class="name"><strong>${list_top[i].name}</strong></span>
                        <span class="red">微信价：<b style="font-weight: bold;">${list_top[i].WeChat} 元</b></span>
                        <span class="">Q币价：${list_top[i].QB} QB</span>
                        <img src="${list_top[i].images}">
                    </a>
                </li>`);
                     node_top.appendTo(".main_4_left .bottom .list_top");
                }
                for(var j = 0;j < list_bottom.length;j++){
                    var node_bottom = $(`<li>
                    <a href=""><img src="${list_bottom[j].images}"></a>
                    <div class="txt">
                        <p><a href=" ">${list_bottom[j].name}</a></p>
                        <p class="red" >微信价:<b>${list_bottom[j].WeChat}元</b></p>
                        <p class="">Q币价:${list_bottom[j].QB}QB</p>
                    </div>
                </li>`);
                node_bottom.appendTo(".main_4_left .bottom .list_bottom");
                }
                for(var k = 0;k < rank.length;k++){
                    var node = $(`
                    <dd>
                        <i class="ico">0${k+1}</i>
                        <div class="txt">
                            <p><a href="" >${rank[k].name}</a></p>
                            <p class="red"><b>${rank[k].QB} QB</b></p>
                        </div>
                        <a href=""><img src="${rank[k].images}"></a>
                    </dd>`);
                node.appendTo(".main_4_left .bottom .rank");
                }
                $(".main_4_left .bottom .rank dd:first-child i").html("排行01");
            },
            error : function(msg){
                console.log(msg);
            }
        })
    }
    //CF
    function CF(){
        $.ajax({
            url : "../data/index.json",
            success : function(data){
                var LOL_images = data.LOL[0].images;
                var list_top = data.LOL[1].top;
                var list_bottom = data.LOL[1].bottom;
                var rank = data.LOL[2].child;
                $(`<a href="/lol" target="_blank">
                    <img src="${LOL_images}">
                    </a>`).appendTo(".main_5_left .bottom .pic");
                for(var i = 0;i < list_top.length;i++){
                    var node_top = $(`<li>
                    <a href="">
                        <span class="name"><strong>${list_top[i].name}</strong></span>
                        <span class="red">微信价：<b style="font-weight: bold;">${list_top[i].WeChat} 元</b></span>
                        <span class="">Q币价：${list_top[i].QB} QB</span>
                        <img src="${list_top[i].images}">
                    </a>
                </li>`);
                     node_top.appendTo(".main_5_left .bottom .list_top");
                }
                for(var j = 0;j < list_bottom.length;j++){
                    var node_bottom = $(`<li>
                    <a href=""><img src="${list_bottom[j].images}"></a>
                    <div class="txt">
                        <p><a href=" ">${list_bottom[j].name}</a></p>
                        <p class="red" >微信价:<b>${list_bottom[j].WeChat}元</b></p>
                        <p class="">Q币价:${list_bottom[j].QB}QB</p>
                    </div>
                </li>`);
                node_bottom.appendTo(".main_5_left .bottom .list_bottom");
                }
                for(var k = 0;k < rank.length;k++){
                    var node = $(`
                    <dd>
                        <i class="ico">0${k+1}</i>
                        <div class="txt">
                            <p><a href="" >${rank[k].name}</a></p>
                            <p class="red"><b>${rank[k].QB} QB</b></p>
                        </div>
                        <a href=""><img src="${rank[k].images}"></a>
                    </dd>`);
                node.appendTo(".main_5_left .bottom .rank");
                }
                $(".main_5_left .bottom .rank dd:first-child i").html("排行01");
            },
            error : function(msg){
                console.log(msg);
            }
        })
    }
    //Blade_Soul
    function Blade_Soul(){
        $.ajax({
            url : "../data/index.json",
            success : function(data){
                var LOL_images = data.LOL[0].images;
                var list_top = data.LOL[1].top;
                var list_bottom = data.LOL[1].bottom;
                var rank = data.LOL[2].child;
                $(`<a href="/lol" target="_blank">
                    <img src="${LOL_images}">
                    </a>`).appendTo(".main_6_left .bottom .pic");
                for(var i = 0;i < list_top.length;i++){
                    var node_top = $(`<li>
                    <a href="">
                        <span class="name"><strong>${list_top[i].name}</strong></span>
                        <span class="red">微信价：<b style="font-weight: bold;">${list_top[i].WeChat} 元</b></span>
                        <span class="">Q币价：${list_top[i].QB} QB</span>
                        <img src="${list_top[i].images}">
                    </a>
                </li>`);
                     node_top.appendTo(".main_6_left .bottom .list_top");
                }
                for(var j = 0;j < list_bottom.length;j++){
                    var node_bottom = $(`<li>
                    <a href=""><img src="${list_bottom[j].images}"></a>
                    <div class="txt">
                        <p><a href=" ">${list_bottom[j].name}</a></p>
                        <p class="red" >微信价:<b>${list_bottom[j].WeChat}元</b></p>
                        <p class="">Q币价:${list_bottom[j].QB}QB</p>
                    </div>
                </li>`);
                node_bottom.appendTo(".main_6_left .bottom .list_bottom");
                }
                for(var k = 0;k < rank.length;k++){
                    var node = $(`
                    <dd>
                        <i class="ico">0${k+1}</i>
                        <div class="txt">
                            <p><a href="" >${rank[k].name}</a></p>
                            <p class="red"><b>${rank[k].QB} QB</b></p>
                        </div>
                        <a href=""><img src="${rank[k].images}"></a>
                    </dd>`);
                node.appendTo(".main_6_left .bottom .rank");
                }
                $(".main_6_left .bottom .rank dd:first-child i").html("排行01");
            },
            error : function(msg){
                console.log(msg);
            }
        })
    }
    //X_GAME
    function X_GAME(){
        $.ajax({
            url : "../data/index.json",
            success : function(data){
                var LOL_images = data.LOL[0].images;
                var list_top = data.LOL[1].top;
                var list_bottom = data.LOL[1].bottom;
                var rank = data.LOL[2].child;
                $(`<a href="/lol" target="_blank">
                    <img src="${LOL_images}">
                    </a>`).appendTo(".main_7_left .bottom .pic");
                for(var i = 0;i < list_top.length;i++){
                    var node_top = $(`<li>
                    <a href="">
                        <span class="name"><strong>${list_top[i].name}</strong></span>
                        <span class="red">微信价：<b style="font-weight: bold;">${list_top[i].WeChat} 元</b></span>
                        <span class="">Q币价：${list_top[i].QB} QB</span>
                        <img src="${list_top[i].images}">
                    </a>
                </li>`);
                     node_top.appendTo(".main_7_left .bottom .list_top");
                }
                for(var j = 0;j < list_bottom.length;j++){
                    var node_bottom = $(`<li>
                    <a href=""><img src="${list_bottom[j].images}"></a>
                    <div class="txt">
                        <p><a href=" ">${list_bottom[j].name}</a></p>
                        <p class="red" >微信价:<b>${list_bottom[j].WeChat}元</b></p>
                        <p class="">Q币价:${list_bottom[j].QB}QB</p>
                    </div>
                </li>`);
                node_bottom.appendTo(".main_7_left .bottom .list_bottom");
                }
                for(var k = 0;k < rank.length;k++){
                    var node = $(`
                    <dd>
                        <i class="ico">0${k+1}</i>
                        <div class="txt">
                            <p><a href="" >${rank[k].name}</a></p>
                            <p class="red"><b>${rank[k].QB} QB</b></p>
                        </div>
                        <a href=""><img src="${rank[k].images}"></a>
                    </dd>`);
                node.appendTo(".main_7_left .bottom .rank");
                }
                $(".main_7_left .bottom .rank dd:first-child i").html("排行01");
            },
            error : function(msg){
                console.log(msg);
            }
        })
    }
    //底部图片
    function bottom_images(){
        $.ajax({
            url : "../data/index.json",
            success : function(data){
                var images = data.images[1].child;
                for(var i = 0;i < images.length;i++){
                    var node = $(`<li>
                    <a href="">
                        <img src="${images[i].images}" alt="">
                    </a>
                </li>`);
                     node.appendTo(".main_8 ul");
                }

            },
            error : function(msg){
                console.log(msg);
            }
        })
    }
    return {
        leftNavDownload: leftNavDownload,
        banner : banner,
        CF : CF ,
        LOL : LOL,
        Blade_Soul : Blade_Soul,
        X_GAME : X_GAME,
        activity : activity,
        hot_sale : hot_sale,
        guess_love : guess_love,
        bottom_images : bottom_images
    }
})