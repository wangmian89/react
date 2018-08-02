export const CHANGE_ADD_CAR = 'CHANGE_ADD_CAR';
export const CHANGE_REDUCE_CAR = 'CHANGE_REDUCE_CAR';
export const CHANGE_DEL_CAR = 'CHANGE_DEL_CAR';
export const INIT_BUYCART = 'INIT_BUYCART';
export const CHANGE_USER_INFO = 'CHANGE_USER_INFO';
export const CHANGE_OPENID = 'CHANGE_OPENID';


//加入购物车
export function changeAddCar(id, num, pname, price, imgs) {
  return { type: CHANGE_ADD_CAR, id, num, pname, price, imgs };
}

//移出购物车
export function changeReduceCar(id, num) {
  return { type: CHANGE_REDUCE_CAR, id, num };
}

//删除购物车商品
export function changeDelCar(id) {
  return { type: CHANGE_DEL_CAR, id };
}

//初始化购物车
export function initCart() {
  return { type: INIT_BUYCART };
}

// 用户信息
export function changeUserInfo(info) {
  return { type: CHANGE_USER_INFO, info };
}

// 用户微信OPENID
export function changeOpenid(info) {
  return { type: CHANGE_OPENID, info };
}

