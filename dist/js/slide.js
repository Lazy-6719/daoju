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
        activity : activity,
        bottom_images : bottom_images
    }
})