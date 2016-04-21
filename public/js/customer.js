$(function(){
    $('#add_customer form').on('submit',function(event){
        var name = $('input[name="name"]').val();
        var tel = $('input[name="tel"]').val();
        var town = $('select[name="town"]').val();
        var marks = $('textarea[name="marks"]').val();
        if(!name||!tel||!town){
            return false;
        }
        $.ajax({
            url: '/courier/user/add',
            type: 'GET',
            dataType: 'json',
            data: {
                name:name,
                tel:tel,
                town:town,
                marks:marks
            },
            success:function(data){
                console.log(data);
            },
            error:function(err){
                console.log(err);
            }
        })
    });
    $('[data-do="edit"]').on('click',function(event){

    })
    $('[data-do="del"]').on('click',function(event){
        var id = $(this).parent().data('id');
        console.log(id);
        UIkit.modal.confirm("是否要删除该条数据?", function(){
            $.ajax({
                url: '/courier/user/del',
                type: 'GET',
                dataType : 'json',
                data:{
                    id: id
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
        });
    })
})