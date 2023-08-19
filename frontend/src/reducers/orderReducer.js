import { order_fail,order_request,order_success,my_order_fail,my_order_request,my_order_success,order_details_fail,order_details_request,order_details_success, all_orders_request, all_orders_success, all_orders_fail, update_orders_request, update_orders_success, update_orders_fail, update_orders_reset, delete_orders_request, delete_orders_fail, delete_orders_success, delete_orders_reset, admin_order_request, admin_order_success, admin_order_fail } from "../constants/orderConstants";

export const newOrderReducer =(state={},action)=>{
    switch(action.type){
        case order_request:
            return{
                ...state,
                loading : true
            }
        case order_success:
            return{
                loading:false,
                order:action.payload
            }
        case order_fail:
            return{
                loading : true,
                error : action.payload
            }

        default:
            return state
    }
}

export const myOrdersReducer =(state={orders:[]},action)=>{
    switch(action.type){
        case my_order_request:
            return{
                
                loading : true
            }
        case my_order_success:
            return{
                loading:false,
                orders:action.payload
            }
        case my_order_fail:
            return{
                loading : true,
                error : action.payload
            }

        default:
            return state
    }
}

export const adminOrdersReducer =(state={orders:[]},action)=>{
    switch(action.type){
        case all_orders_request:
            
            return{
                
                loading : true
            }
        case all_orders_success:
            return{
                loading:false,
                orders:action.payload
            }

        
        case all_orders_fail:
            
            return{
                loading : false,
                error : action.payload
            }

        default:
            return state
    }
}

export const adminUpdateOrderReducer =(state={},action)=>{
    switch(action.type){
        case update_orders_request:
            case delete_orders_request:
            return{
                ...state,
                loading : true
            }
        case update_orders_success:
            return{
                ...state,
                loading:false,
                isUpdated:action.payload
            }
        case update_orders_fail:
            case delete_orders_fail:
            return{
                loading : false,
                error : action.payload
            }
        case update_orders_reset:
            return{
                ...state,
                isUpdated : false
            }
            case delete_orders_success:
                return{
                    ...state,
                    loading : false,
                    isDeleted : action.payload
                }
    
            case delete_orders_reset:
                return{
                    ...state,
                    isDeleted : false
                }
        default:
            return state
    }
}

export const orderDetailsReducer =(state={order : {}},action)=>{
    switch(action.type){
        case order_details_request:
            return{
                
                loading : true
            }
        case order_details_success:
            return{
                loading:false,
                order:action.payload
            }
        case order_details_fail:
            return{
                loading : true,
                error : action.payload
            }

        default:
            return state
    }
}

export const adminorderDetailsReducer =(state={order : {}},action)=>{
    switch(action.type){
        case admin_order_request:
            return{
                
                loading : true
            }
        case admin_order_success:
            return{
                loading:false,
                order:action.payload
            }
        case admin_order_fail:
            return{
                loading : true,
                error : action.payload
            }

        default:
            return state
    }
}