import {
    ADD_COUNTER,ADD_TO_CART
} from "./mutation-types";
export default {
    addCart(context, payload) {
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
        if (oldProduct) {
            // oldProduct.count++
            context.commit(ADD_COUNTER, oldProduct)
        } else {
            payload.count = 1;

            // context.state.cartList.push(payload)
            context.commit(ADD_TO_CART, payload)
        }
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
