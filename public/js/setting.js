$(function() {
    $('#set_tel').on('click',function(){
        var admin_tel = $('input[name="admin_tel"]').val();
        if(!isRealPhone(admin_tel)){
            body_alert('手机格式不正确');
            $('input[name="admin_tel"]').addClass('uk-form-danger');
            return false;
        }else{
            $('input[name="admin_tel"]').removeClass('uk-form-danger');
        }

        $.ajax({
            url: '/courier/setting/edit',
            type: 'GET',
            dataType: 'json',
            data: {
                admin_tel:admin_tel
            },
            success:function(data){
                if(data.status==0){
                    window.location.href = '/courier/user';
                }
            },
            error:function(err){
                console.log(err);
            }
        })

    })
});

function body_alert(cont,msg){
    var dom = '<div class="uk-alert uk-alert-danger">'+ msg + '</div>';
    $('#set_tel').prev('.uk-alert').remove();
    $('#set_tel').before(dom);
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