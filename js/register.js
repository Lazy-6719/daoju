define(["jquery"], function($){

    function side(){
       $(function(){
            var iNow = 0;
            var timer = null;
            var oUl = $(".side").find("ul");

            timer = setInterval(function(){
                iNow++;
                tab();
            },3000)

            function tab(){
                oUl.animate({
                    top: -iNow * 100 + "%"
                }, 500, function(){
                    if(iNow == 4){
                        iNow = 0;
                        oUl.css("top", 0);
                    }
                })
            }
       })
    }
    function agreement(){
        var agreement = $(".agreement").find("em");
        var isYes = true;
        agreement.click(function(){
            if(isYes){
                $(".agreement em").css("background"," url('../images/checkbox_normal.png'");
                isYes = false;
            }else{
                $(".agreement em").css("background"," url('../images/checkbox_check.png'");  
                isYes = true;
            }
        })
    }
    function agreement_list(){
        var agreement = $(".agreement").find("i");
        var isYes = true;
        agreement.click(function(){
            if(isYes){
                $(".agreement i").css("background"," url('../images/down.png'");
                $(".agreement_list").css("display","none")
                isYes = false;
            }else{
                $(".agreement i").css("background"," url('../images/up.png'");  
                $(".agreement_list").css("display","block")
                isYes = true;
            }
        })
    }
    function country(){
        var select = $(".input .input_3").find("i");
        var isYes = true;
        select.click(function(){
            if(isYes){
                $(".input .input_3 i").css("background"," url('../images/down.png'");
                $(".input_3 .select").css("display","none")
                isYes = false;
            }else{
                $(".input .input_3 i").css("background"," url('../images/up.png'");  
                $(".input_3 .select").css("display","block")
                isYes = true;
            }
        })
    }
    function registerSend(){
        $("#register_btn").click(function(){
            $.ajax({
                type: "post",
                url: "../php/register.php",
                data: {
                    username: $(".username").val(),
                    password: $(".password").val(),
                    createTime: (new Date()).getTime()
                },
                success: function(result){
                    var obj = JSON.parse(result);
                    if(obj.code){
                        $(".err_tip").css("color", "#ff5b5b")
                    }else{
                        $(".err_tip").css("color", "green");
                        setTimeout(function(){
                            location.assign("login.html");
                        }, 1000);
                    }
                    $(".err_tip").show().html(obj.message);
                },
                error: function(msg){
                    console.log(msg);
                }
    
            })
        })
    }
    return {
        side: side,
        country : country,
        agreement : agreement,
        registerSend : registerSend,
        agreement_list : agreement_list
    }
})