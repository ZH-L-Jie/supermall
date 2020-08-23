import {
    ADD_COUNTER,ADD_TO_CART
} from "./mutation-types";
export default {
    addCart(context, payload) {
        return new Promise((resolve,reject) => {
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
            if (oldProduct) {
                // oldProduct.count++
                context.commit(ADD_COUNTER, oldProduct)
                resolve('当前的商品数量+1')
            } else {
                payload.count = 1;

                // context.state.cartList.push(payload)
                context.commit(ADD_TO_CART, payload)
                resolve('添加了新的商品')
            }
        })

    }
    // addCart(context, payload) {
    //     // payload新添加商品
    //     let oldProdyct = null;
    //     for (let item of context.state.cartList) {
    //         if (item.iid === payload.iid) {
    //             oldProdyct = item
    //         }
    //     }
    //     // 2.判断oldProduct
    //     if (oldProdyct) {
    //         oldProdyct.count += 1
    //     } else {
    //         payload.count = 1
    //         state.cartList.push(payload)
    //
    //     }
    //
    // }
}
