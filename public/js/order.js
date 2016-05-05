$(function() {

    $('table').on('click','th input[type="checkbox"]',function(event){
        var checked = $(this)[0].checked;
        var tdcheck = $('table td input[type="checkbox"]');
        if(checked){
            for(var i=0;i<tdcheck.length;i++){
                tdcheck[i].checked = 'checked';
            }
        }else{
            for(var i=0;i<tdcheck.length;i++){
                tdcheck[i].checked = '';
            }
        }
    }).on('click','td input[type="checkbox"]',function(event){
        var checked = $(this)[0].checked;
        if(checked){
            $(this)[0].checked = 'checked';
        }else{
            $(this)[0].checked = '';
        }
    });

    $('#sendmsg').on('click',function(event){
        var checked = $('table td input[type="checkbox"]');
        var arr = [];
        for(var i=0;i<checked.length;i++){
            if(checked[i].checked){
                arr.push($(checked[i]).data('id'));
            }
        }
        if(arr.length>0) {
            UIkit.modal.confirm("是否要发送"+ arr.length + "条订单短信通知", function () {
                $.ajax({
                    url: '/courier/sms/send',
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        arr: arr
                    },
                    success: function (data) {
                        if (data.status == 0) {
                            window.location.reload();
                        } else {
                            console.log(err);
                        }
                    },
                    error: function (err) {
                        console.log(err);
                    }
                })
            });
        }else{
            UIkit.modal.alert('您没有选中要通知收件人的订单');
        }
    });

    //删除功能
    $('#del_order').on('click',function(event){

        UIkit.modal.confirm("您的操作不可返回，请确认是否删除选中数据", function(){
            var checked = $('table td input[type="checkbox"]');
            var arr = [];
            for(var i=0;i<checked.length;i++){
                if(checked[i].checked){
                    arr.push($(checked[i]).data('id'));
                }
            }
            if(arr.length>0){
                $.ajax({
                    url: '/courier/orders/del',
                    type: 'GET',
                    dataType : 'json',
                    data:{
                        arr: arr
                    },
                    success:function(data){
                        if(data.status==0){
                            window.location.reload();
                        }else{
                            console.log(err);
                        }
                    },
                    error: function(err){
                        console.log(err);
                    }
                })
            }

        });
    });

    $('div[data-do]').on('click',function(event){
        var checked = $('table td input[type="checkbox"]');
        var arr = [];
        for(var i=0;i<checked.length;i++){
            if(checked[i].checked){
                arr.push($(checked[i]).data('id'));
            }
        }
        var method = $(this).data('do')=='to'? 1:0;
        if(arr.length>0){
            $.ajax({
                url: '/courier/orders/tag',
                type: 'GET',
                dataType: 'json',
                data:{
                    tag: method,
                    arr: arr
                },
                success:function(data){
                    if(data.status==0){
                        window.location.reload();
                    }else{
                        console.log(err);
                    }
                },
                error: function(err){
                    console.log(err);
                }
            })
        }

    });
});