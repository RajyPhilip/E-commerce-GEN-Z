import React,{useEffect, useRef} from "react";
// import { Elements } from "@stripe/react-stripe-js";

import {useSelector,useDispatch} from 'react-redux' ;
import Typography from '@material-ui/core/Typography';
import { useAlert } from "react-alert";
// import {CardNumberElement,CardCvcElement,CardExpiryElement,useStripe,useElements} from  '@stripe/react-stripe-js' ;
import axios from "axios";
import CreditCardIcon from '@material-ui/icons/CreditCard';
import EventIcon from '@material-ui/icons/Event' ;
import VpnKeyIcon from '@material-ui/icons/VpnKey' ;

import './payment.css' ;
import CheckoutSteps from "./checkoutSteps";
import MetaData from "../layout/MetaData";
// import { Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createOrder,clearErrors } from "../../actions/orderAction";


const Payment = ()=>{


    //const
    const navigate = useNavigate();
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const payBtn = useRef(null); 
    const dispatch = useDispatch();
    const alert = useAlert();

    // const stripe = useStripe();
    // const elements = useElements();
    const {shippingInfo,cartItems} = useSelector((state)=> state.cart);
    const {user} = useSelector((state)=> state.user);
    const {error} = useSelector((state)=>state.newOrder);
    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100 ),
    };
    const order = {
        shippingInfo,
        orderItems:cartItems,
        itemsPrice:orderInfo.subtotal,
        taxPrice:orderInfo.tax,
        shippingPrice:orderInfo.shippingCharges,
        totalPrice:orderInfo.totalPrice,
    }
    // function  
    const submitHandler = async (e)=>{
        e.preventDefault();
        payBtn.current.disabled = true ;
        try {

        dispatch(createOrder(order));

        localStorage.setItem("cartItems",[]);
        alert.success("Order Placed Successfully")
        navigate('/order/success');
            const config = {
                headers :{
                    "Content-Type":"application/json",
                },
            };
            const {data} = await axios.post(
            "/api/v1/payment/process",
            paymentData,
            config
            );
            // const client_secret = data.client_secret ;
            // if(!stripe || !elements){
            //     return ;
            // }
            // const result = await stripe.confirmCardPayment(client_secret,{
            //     payment_method:{
            //         card:elements.getElement(CardNumberElement),
            //         billing_details:{
            //             name:user.name,
            //             email:user.email,
            //             address:{
            //                 line1:shippingInfo.address,
            //                 city:shippingInfo.city,
            //                 state:shippingInfo.state,
            //                 postal_code:shippingInfo.pinCode,
            //                 country:shippingInfo.country,
            //             }
            //         }
            //     }
            // });
            // if(result.error){
            //     payBtn.current.disabled = false ;
            //     alert.error(result.error.message);
            // }else{
            //     if(result.paymentIntent.status == "succeeded"){
            //         navigate('/success');
            //     }else{
            //         alert.error("there's some issue while processing payment");
            //     }
            // }
        } catch (error) {
            payBtn.current.disabled=false ;
        }

    }
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
    },[dispatch,error,alert,navigate])
    return(
    <>
    <MetaData title="Payment" />
    <CheckoutSteps activeStep={2} />
        <div className="paymentContainer">
            <form className="paymentForm" onSubmit={(e)=> submitHandler(e)}>
                <Typography>Card Info</Typography>
                <div>
                    <CreditCardIcon />
                    {/* <CardNumberElement className="paymentInput" /> */}
                    <input type="number" placeholder="Card Number"  required className="paymentInput" />
                </div>
                <div>
                    <EventIcon />
                    {/* <CardExpiryElement className="paymentInput" /> */}
                    <input type="number" placeholder=" Card Expiry Date" required className="paymentInput" />
                    
                </div>
                <div>
                    <VpnKeyIcon />
                    {/* <CardCvcElement className="paymentInput" /> */}
                    <input type="number" placeholder="CVV " required className="paymentInput" />

                </div>
                <button ref={payBtn} className="paymentFormBtn">Pay - {`₹${orderInfo && orderInfo.totalPrice}`} </button>
            </form>
        </div>
    </>
    )
};

export default Payment