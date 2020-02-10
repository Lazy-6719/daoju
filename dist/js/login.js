define(['jquery'], function($){
    function loginSend(){
        $("#login_btn").click(function(){
            $.ajax({
                type: "post",
                url: "../php/login.php",
                data: {
                    username: $(".username").val(),
                    password: $(".password").val()
                },
                success: function(result){
                    var obj = JSON.parse(result);
                    if(obj.code){
                        $(".err_tip").css("color", "#ff5b5b")
                    }else{
                        $(".err_tip").css("color", "green");
                        setTimeout(function(){
                            location.assign("../index.html");
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
        loginSend: loginSend
    }
})