
'use strict';
/**/
function resData(status,msg,data){
    if(!isNaN(status)&&Object.prototype.toString.call(msg)=="[object String]"){
        let data = {
            status : status,
            msg : msg,
            data : data
        };
        return data;
    }else{
        return false;
    }   
}
