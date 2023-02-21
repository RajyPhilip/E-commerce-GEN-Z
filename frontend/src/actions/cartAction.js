import axios from 'axios';


import {ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO} from '../constants/cartConstant';


//add to cart
export const addItemsToCart= (id,quantity)=> async (dispatch,getState)=>{
console.log("ID",id ,"QUantity",quantity)
    const {data} = await axios.get(`/api/v1/products/details/${id}`);
    console.log("DATA",data)
        dispatch({
            type:ADD_TO_CART,
            payload:{
                product : data.product._id,
                name : data.product.name,
                price : data.product.price,
                image : data.product.images[0].url,
                stock : data.product.Stock,
                quantity : quantity
            }
        });

    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
};

//REmoving items from cart
export const removeItemsFromCart= (id)=> async (dispatch,getState)=>{

    dispatch({
        type:REMOVE_CART_ITEM,
        payload:id,
    });
    
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
    
};

//Save Shipping info
export const saveShippingInfo= (data)=> async (dispatch,getState)=>{

    dispatch({
        type:SAVE_SHIPPING_INFO,
        payload:data,
    });
    
    localStorage.setItem("shippingInfo",JSON.stringify(data));
    
};