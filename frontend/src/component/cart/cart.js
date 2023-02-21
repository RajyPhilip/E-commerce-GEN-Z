import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart'
import MetaData from "../layout/MetaData";
import './cart.css';
import CartItemCard from './cartItemCard' ;
import { addItemsToCart,removeItemsFromCart } from "../../actions/cartAction";

const Cart = ()=>{

    //const 
    const dispatch = useDispatch();
    const {cartItems} = useSelector((state)=> state.cart);
    const navigate = useNavigate();
    // functions 
    const increaseQuantity =(id,quantity,stock)=>{
        const newQty = quantity+1;
        if(stock <= quantity){
            return ;
        }
        if(newQty > 9 ){
            return ;
        }
        dispatch(addItemsToCart(id,newQty));
    };
    const decreaseQuantity =(id,quantity)=>{
        const newQty = quantity-1;
        if(newQty < 1 ){
            return ;
        }
        dispatch(addItemsToCart(id,newQty));
    };
    const deleteCartItems = (id)=>{
        dispatch(removeItemsFromCart(id));
    }
    const checkOutHandler = ()=>{
        navigate("/login?redirect=shipping");
    }

    return(
        <>
            <MetaData title="Cart" />
            {cartItems.length === 0 ?(
                <div className="emptyCart">
                    <RemoveShoppingCartIcon />
                    <Typography>No Product in your Cart</Typography>
                    <Link to="/products">View Products</Link>
                </div>
            ): (
                <div className="cartPage">
                <div className="cartHeader">
                    <p>Product</p>
                    <p>Quantity</p>
                    <p>Subtotal</p>
                </div>
                {cartItems && cartItems.map((item)=>(
                                    <div className="cartContainer" key={item.product}>
                                    <CartItemCard  item={item} deleteCartItems={deleteCartItems}  />
                                    <div className="cartInput">
                                        <button onClick={()=>decreaseQuantity(item.product, item.quantity)}>-</button>
                                        <input readOnly value={item.quantity} type="number" />
                                        <button onClick={()=>increaseQuantity(item.product, item.quantity,item.stock)}>+</button>
                                    </div>
                                    <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
                                </div>
                ))}
                
                <div className="cartGrossTotal">
                    <div>
                        
                    </div>
                    <div className="cartGrossTotalBox">
                        <p>Gross Total</p>
                        <p>{`₹ ${cartItems.reduce(
                            (acc,item)=> acc + item.quantity * item.price,0
                        )}`}</p>
                    </div>
                    <div></div>
                    <div className="checkOutBtn">
                        <button onClick={checkOutHandler}>Check Out</button>
                    </div>
                </div>
            </div>
            ) }
        </>
    )
};


export default Cart ;