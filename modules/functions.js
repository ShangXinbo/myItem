
'use strict';

exports.resData = function (status, msg, data) {
    if (!isNaN(status) && Object.prototype.toString.call(msg) == "[object String]") {
        let result = {
            status: status,
            msg: msg,
            data: data
        };
        return result;
    } else {
        return false;
    }
};

