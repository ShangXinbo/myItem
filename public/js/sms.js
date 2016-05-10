$(function() {
    var tel_pool = [];
    $('#add_tel').on('click',function(event){
        var tel = $('input[name="add_tel"]').val();
        if(isRealPhone(tel)){
            if($.inArray(tel,tel_pool)<0){
                $('#tel_stack').append('<a class="uk-button"><i class="uk-icon-close"></i>'+ tel + '</a>');
                tel_pool.push(tel);
            }
            $('input[name="add_tel"]').val('');
        }else{
            console.log(1);
        }
    });
    $('#tel_stack').on('click', '.uk-icon-close', function(event){
        var tel = $(this).parent().text();
        $(this).parent().remove();
        tel_pool.splice($.inArray(tel,tel_pool),1);
    });
    $('#send_msg').on('click',function(){
        var content = $('textarea[name="content"]').val();

        if(content&&content.indexOf('，')>0){
            if(tel_pool.length>0){
                $.ajax({
                    url: '/courier/sms/msgsend',
                    type:'get',
                    dataType: 'json',
                    data:{
                        tel: tel_pool,
                        content: content
                    },
                    success: function(data){
                        if(data.status == 0){
                            body_alert('已经加入短信发送池，请稍等片刻刷新本页面即可查看短信发送状态');
                            setInterval(function(){
                                window.location.reload();
                            },3000);
                        }
                    },
                    error: function(err){
                        console.log(err);
                    }
                });
            }else{
                body_alert('没有添加手机号');
            }

        }else{
            body_alert('消息内容格式不正确');
        }
    })
});

function body_alert(msg){
    var dom = '<div class="uk-alert uk-alert-danger">'+ msg + '</div>';
    $('.uk-grid').prev('.uk-alert').remove();
    $('.uk-grid').before(dom);
}

function isRealPhone(num){
    var patten1 = /^1(3[456789]{1}|47|5[012789]{1}|78|8[23478]{1})\d{8}$/;   //移动
    var patten2 = /^1(3[012]{1}|45|5[56]{1}|76|8[56]{1})\d{8}$/;             //联通
    var patten3 = /^1(33|53|77|8[019]{1})\d{8}$/;                            //电信
    var patten4 = /^170\d{8}$/;                                              //虚拟运营商

    if (patten1.test(num)) {
        return 1;
    } else if (patten2.test(num)) {
        return 2;
    } else if (patten3.test(num)) {
        return 3;
    } else if (patten4.test(num)) {
        return 4;
    } else {
        return false;
    }
}