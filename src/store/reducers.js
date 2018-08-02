import {
    CHANGE_ADD_CAR,
    CHANGE_REDUCE_CAR,
    CHANGE_DEL_CAR,
    INIT_BUYCART,
    CHANGE_USER_INFO,
    CHANGE_OPENID
} from './actions';

import {setStore, getStore} from '../util/index';

const initState = {
    cartList: {},           // 购物车列表
    userInfo: null,         // 用户信息
    wxInfo: null,           // 微信OPENID
};


function addcar(state = initState.cartList, action) {
    switch (action.type) {
        case CHANGE_ADD_CAR:
            let cart = getStore('buyCart');
            if (cart) {
                cart = JSON.parse(cart);
            } else {
                cart = {};
            }
            let key = 'a' + action.id;
            if (cart[key]) {
                cart[key]['num'] += 1;
            } else {
                cart[key] = {
                    'num': action.num,
                    'id': action.id,
                    'name': action.pname,
                    'price': action.price,
                    'imgs': action.imgs
                };
            }
            setStore('buyCart', cart);
            return {...cart};
        default:
            return state;
    }
}

function reducecar(state = initState.cartList, action) {
    switch (action.type) {
        case CHANGE_REDUCE_CAR:
            let cart = getStore('buyCart');
            if (cart) {
                cart = JSON.parse(cart)
            } else {
                cart = {}
            }
            ;
            let key = 'a' + action.id;
            if (cart && cart[key]) {
                cart[key]['num']--;
                if (cart[key]['num'] < 1) {
                    return false;
                }
            }
            setStore('buyCart', cart);
            return {...cart};
        default:
            return state;
    }
}

function delcar(state = initState.cartList, action) {
    switch (action.type) {
        case CHANGE_DEL_CAR:
            let cart = getStore('buyCart');
            if (cart) {
                cart = JSON.parse(cart)
            } else {
                cart = {}
            }
            ;
            let key = 'a' + action.id;
            if (cart && cart[key]) {
                delete cart[key];
            }
            setStore('buyCart', cart);
            return {...cart};
        default:
            return state;
    }
}

function initCart(state = initState.cartList, action) {
    switch (action.type) {
        case INIT_BUYCART:
            let initCart = getStore('buyCart');
            initCart = JSON.parse(initCart);
            return initCart;
        default:
            return state;
    }
}

function userInfo(state = initState.userInfo, action) {
    switch (action.type) {
        case CHANGE_USER_INFO:
            return action.info;
        default:
            return state;
    }
}

function userOpenid(state = initState.wxInfo, action) {
    switch (action.type) {
        case CHANGE_OPENID:
            return action.info;
        default:
            return state;
    }
}


export default {addcar, reducecar, delcar, initCart, userInfo, userOpenid};