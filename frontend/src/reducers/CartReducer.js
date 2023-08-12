import {add_to_cart, remove_from_cart, save_shipping_info} from "../constants/cartConstants"

export const cartReducer =(state ={cartItems : [],shippingInfo:{}},action) =>{
    switch(action.type){
        case add_to_cart:
            const item = action.payload
            const isitemexist = state.cartItems.find(
                (i) => i.product === item.product
            )
            if(isitemexist){
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) =>
                      i.product === isitemexist.product ? item : i
                    ),
                  };
            }
            else{
                return{
                    ...state,
                    cartItems : [...state.cartItems,item]
                }

            }
        case remove_from_cart:
            return{
                ...state,
                cartItems : state.cartItems.filter((i)=>i.product !== action.payload)

            }
        case save_shipping_info :
            return{
                ...state,
                shippingInfo : action.payload
            }
        default : 
        return state;

    }
}