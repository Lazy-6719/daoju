define(["jquery","jquery-cookie"], function($){
    //购物车
    function cart(){
        sc_num();
        $.ajax({
            type: "get",
            url: "../data/list.json",
            success: function(data){
                var arr = data.goods_list[0].child;
                var cookieStr = $.cookie("goods");
                if(cookieStr){
                    var cookieArr = JSON.parse(cookieStr);
                    var newArr = [];
                    for(var i = 0; i < arr.length; i++){
                        for(var j = 0; j < cookieArr.length; j++){
                            if(cookieArr[j].id == arr[i].id){
                                //说明这个数据加载购物车里了
                                arr[i].num = cookieArr[j].num;
                                newArr.push(arr[i]);
                                break;
                            }
                        }
                    }
                    console.log(newArr);

                    var str = ``;
                    //通过循环创建节点，将数据添加到页面上
                    var SUM_QB = 0;
                    var QB_arr = [];

                    for(var i = 0; i < newArr.length; i++){
                        var QB = parseFloat((`${newArr[i].QB}`) * `${newArr[i].num}`).toFixed(2);
                        QB_arr.push(QB*1);
                        SUM_QB += QB_arr[i];
                        $(".discount .submit .cart_num").html(SUM_QB);
                        var node = $(`<tr id="${newArr[i].id}">
                        <th><i></i></th>
                        <td>
                            <a href="" class="img"><img src="${newArr[i].cart_images}" alt=""></a>
                            <a href="" class="title">${newArr[i].name}</a>
                        </td>
                        <td>
                            <span>道具包</span>
                        </td>
                        <td>
                            <span style="margin-right: 5px;">${newArr[i].QB}</span style="margin-right: 5px;">Q币
                        </td>
                        <td>
                            <span>永久</span>
                        </td>
                        <td>
                            <a href="" class=" cart-minus">-</a>
                            <input name="good_num" type="text" class="cart-amount" value="${newArr[i].num}">
                            <a href="" class=" cart-plus">+</a>
                        </td>
                        <td>
                            <span>无优惠</span>
                        </td>
                        <td>
                            <span style="margin-right: 5px;" class="QB_sum">${QB}</span>Q币
                        </td>
                        <td>
                            <a href="">关注</a>
                            <a href="" class="delete_goodsBtn">删除</a>
                        </td>
                    </tr>`);
                    node.appendTo(".tablebox table tbody");

                    // var sum_QB = $(".tablebox table tbody .QB_sum").html();
                    // alert(sum_QB);
                    }

                    //通过事件委托，给购物车上的按钮-添加事件
                    $(".tablebox table tbody").on("click", "tr .cart-minus", function(){
                        var id = $(this).closest("tr").attr("id");
                        // alert(index)
                        var cookieArr = JSON.parse($.cookie("goods"));
                        // alert(cookieArr.length);
                        var index = cookieArr.findIndex(item => item.id == id); 

                        cookieArr[index].num == 1 ? alert("数量已经到1了") : cookieArr[index].num--;
                        $.cookie("goods", JSON.stringify(cookieArr), {
                            expires: 7
                        })
                        sc_num();
                    })
                     //通过事件委托，给购物车上的按钮+添加事件
                     $(".tablebox table tbody").on("click", "tr .cart-plus", function(){
                        var id = $(this).closest("tr").attr("id");
                        // alert(index)
                        var cookieArr = JSON.parse($.cookie("goods"));
                        // alert(cookieArr.length);
                        var index = cookieArr.findIndex(item => item.id == id); 

                        cookieArr[index].num++ ;
                        $.cookie("goods", JSON.stringify(cookieArr), {
                            expires: 7
                        })
                        sc_num();
                    })
                    //给购物车内的删除按钮添加点击事件
                    $(".tablebox table tbody ").on("click", " tr .delete_goodsBtn", function(){
                        //清空购物车的数据  1、清空cookie中的这个值  2、清空页面的节点
                        var id = $(this).closest("tr").attr("id");
                        var cookieArr = JSON.parse($.cookie("goods"));
                        for(var i = 0; i < cookieArr.length; i++){
                            if(cookieArr[i].id == id){
                                cookieArr.splice(i, 1);
                                break;
                            }
                        }
                        //判断数组是否为空
                        if(!cookieArr.length){
                            $.cookie("goods", null);
                        }else{
                            $.cookie("goods", JSON.stringify(cookieArr), {
                                expires: 7
                            })
                        }

                        更新购物车商品数量
                        sc_num();
                    })
                }
                sc_num();


            },
            error: function(msg){
                console.log(msg);
            }
        })
        //计算购物车中商品数量
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
        cart : cart
    }
})