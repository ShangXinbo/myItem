'use strict';

module.exports = function(){
    let curier_company = {
        1: '韵达',
        2: '圆通',
        3, '申通'
    };

    let curier_pick_way = {
        0: '自取',
        1: '配送'
    };
    let curier_order_status = {
        0: '未通知',
        1: '已通知',
        2: '已签收'
    };

    let town = {
        0: '菜园村',
        1: '杨各庄'
    };

    return {
        company : curier_company,
        pick_way: curier_pick_way,
        order_status: curier_order_status,
        town : town
    }
}
