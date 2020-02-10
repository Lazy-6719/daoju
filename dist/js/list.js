define(["jquery","jquery-cookie"], function($){
    //热门排行
    function rank(){
        $.ajax({
            url : "../data/list.json",
            success : function(data){
                var rank = data.rank[0].child;
                for(var i = 0;i < rank.length;i++){
                    var node = $(`<li>
                    <a href="">
                        <div class="ico_rank">0${i+1}</div>
                        <div class="img">
                            <img src="${rank[i].images}" width="76" height="76" alt="腥红之月 烬">
                        </div>
                        <div class="info">
                            <p class="name">${rank[i].name}</p>
                            <p class="QB">Q币价：${rank[i].QB} Q币</p>
                            <p class="WeChat">微信价：<strong style="font-weight: bold;">￥${rank[i].WeChat} </strong ></p>
                        </div>
                    </a>
                </li>`);
                     node.appendTo(".left_1 ul");
                }

            },
            error : function(msg){
                console.log(msg);
            }
        })
    }
    //商品列表
    function list(){
        $.ajax({
            url : "../data/list.json",
            success : function(data){
                var list = data.goods_list[0].child;
                for(var i = 0;i < list.length;i++){
                    var node = $(`<dl>
                    <dt>
                        <a href="detail.html?id=${list[i].id}" target="_blank">
                            <img src="${list[i].images}" width="116" height="212" alt="沙之守护 雷恩加尔">
                        </a>
                    </dt>
                    <dd>
                        <a href="" class="name">${list[i].name}</a>
                        <div class="QB">
                            Q币价：<span>&nbsp;&nbsp;&nbsp;${list[i].QB} Q币</span>
                        </div>
                        <div class="WeChat">
                            微信价：<span>&nbsp;&nbsp;&nbsp;￥${list[i].WeChat}</span>
                        </div>
                        <a href="cart.html" id="${list[i].id}" target="_blank" class="btn_list_goodslist_buy">立即购买</a>
                    </dd>
                </dl>`);
                     node.appendTo(".listbox");
                }

            },
            error : function(msg){
                console.log(msg);
            }
        })
    }

    //购物车
    function cart(){
        sc_num();
        $(".listbox").on("click","dl dd .btn_list_goodslist_buy",function(){
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
        })

        // //计算购物车中商品数量
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
        rank : rank,
        list : list,
        cart : cart
    }
})