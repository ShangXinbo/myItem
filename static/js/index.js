$(function(){
    $('#shang').xUpload({
        url : '/upload/submit/',
        data:{
            shang:'asdfa'
        },
        //accept: 'application/pdf',
        maxSize: 4000000000000000,
        onError: function(error){
            console.log(error);
        },
        onSuccess: function(){
            console.log(2);
        }
    });
})