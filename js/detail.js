define(['jquery',"jquery-cookie"], function($){
    function magnifying(){
        $(".main .right .top").on("mouseenter",".goods_img",function(){
            $(".mask").css("display","block");
            $(".magnifying").css("display","block");
        })

        $(".main .right .top").on("mouseleave",".goods_img",function(){
            $(".mask").css("display","none")
            $(".magnifying").css("display","none");
        }) 
                
        $(".main .right .top").on("mousemove",".goods_img",function(ev){
            var l = ev.pageX - $(".goods_img img").offset().left - 50;
            if(l <= 0){
                l = 0;
            }
            if(l >= 160){
                l = 160;
            }
            var t = ev.pageY - $(".goods_img img").offset().top - 50;
            if(t <= 0){
                t = 0;
            }
            if(t >= 54){
                t = 54;
            }
            console.log(t);
            $(".mask").css({
                left: l,
                top: t
            })

            $(".magnifying img").css({
                left: -3 * l,
                top: -3 * t
            })
        }) 
    }
    function detail(){
        $.ajax({
            type: "get",
            url : "../data/list.json",
            success : function(data){
                sc_num();
                var list = data.goods_list[0].child;
                var i = location.search.substr(4);
                console.log(i);
                var node = $(`<div class="goods_img">
                    <div class="mask"></div>
                    <img src="${list[i-1].detail_images}" alt="">
                    <a href="">收藏商品</a>
                    <i></i>
                </div>
                <div class="goods_buy">
                    <h2>${list[i-1].name}</h2>
                    <div class="price">
                        <dl class="Q-coins">
                            <dt>Q币价：</dt>
                            <dd>
                                <span>${list[i-1].QB}</span>
                                <span>&nbsp;Q币</span>
                            </dd>
                        </dl>
                        <dl class="WeChat">
                            <dt>微信价：</dt>
                            <dd>
                                <span>￥${list[i-1].WeChat}</span>
                            </dd>
                        </dl >
                    </div>
                    <div class="limit">
                        <dl>
                            <dt>期限：</dt>
                            <dd>
                                <span>永久</span>
                            </dd>
                        </dl>
                    </div>
                    <div class="goods_btn">
                        <input type="button" value="加入购物车" id="${list[i-1].id}" class="btn_addcart">
                        <input type="button" value="赠送" class="btn_grant">
                    </div>
                </div>
                <div class="magnifying">
                    <img src="${list[i-1].detail_images}" alt="">
                </div>`);
                node.appendTo(".main .right .top");

                $(".particular").html(`${list[i-1].name}`);

                $(".main .right .top").on("click", ".btn_addcart", function(){
                    var id = this.id;
                    //1、判断是否是第一次添加
                    var first = $.cookie("goods") == null ? true : false;
                    if(first){
                        //第一次添加
                        var arr = [{id: id, num: 1}];;
                        $.cookie("goods",JSON.stringify(arr), {
                            expires: 7
                        })
                    }else{
                        //2、之前是否添加过
                        var cookieStr = $.cookie("goods");
                        var cookieArr = JSON.parse(cookieStr);
                        var same = false; //假设没有添加过
                        for(var i = 0; i < cookieArr.length; i++){
                            if(cookieArr[i].id == id){
                                //添加过，数量+1
                                same = true;
                                cookieArr[i].num++;
                                break;
                            }
                        }
                        //3、如果没有添加过，新增一条数据
                        if(!same){
                            var obj = {id: id, num: 1};
                            cookieArr.push(obj);
                        }
                        $.cookie("goods", JSON.stringify(cookieArr), {
                            expires: 7
                        })
                    }  
                    sc_num();
                    window.location.assign("cart.html");
                })
            },
            error : function(msg){
                console.log(msg);
            }
        })

        function sc_num(){
            var cookieStr = $.cookie("goods");
            if(cookieStr){
                var cookieArr = JSON.parse(cookieStr);

                var sum = 0;

                for(var i = 0; i < cookieArr.length; i++){
                    sum += cookieArr[i].num;
                }

                $("#cartNum").html("("+sum+")");
            }else{
                $("#cartNum").html("("+0+")");
            }
        }
    }
    return {
        magnifying: magnifying,
        detail : detail
    }
})