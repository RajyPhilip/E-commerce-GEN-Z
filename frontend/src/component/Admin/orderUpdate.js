import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useNavigate, useParams } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import AccountTreeIcon from '@material-ui/icons/AccountTree';

import Sidebar from "./sidebar";
import Loading from "../layout/Loading/loading";
import { getOrderDetails,clearErrors, updateOrder } from "../../actions/orderAction";
import { UPDATE_ORDERS_RESET } from "../../constants/orderConstants";





const OrderUpdate = ()=>{

    // states 
    const [status,setStatus] = useState("");


    // const 
    const {id} = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const {order,error,loading} = useSelector((state)=> state.orderDetails);
    const {error : updateError , isUpdated} = useSelector((state)=> state.order) ;
    const navigate = useNavigate();
    
    // functions 
    const updateOrderSubmitHandler = (e)=>{
        console.log("reached",id)
        e.preventDefault() ;
        const myform = new FormData() ;
        myform.set("status",status);
        dispatch(updateOrder(id,myform));
    };

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(updateError){
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if(isUpdated){
            alert.success("Order Updated Successfully");
            dispatch({type:UPDATE_ORDERS_RESET});
        }
        dispatch(getOrderDetails(id));
    },[dispatch,alert,error,id,isUpdated,updateError]);

    return(

        <>
        <MetaData title="Update Product" />
        <div className="dashboard">
            <Sidebar />
            <div className="newProductContainer">
                {loading ? <Loading /> :   <div className="confirmOrderPage">
            <div>
                <div className="confirmshippingArea">
                    <Typography>Shipping Info</Typography>
                    <div>
                        <p>Name:</p>
                        <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                        <p>Phone:</p>
                        <span>{order && order.shippingInfo && order.shippingInfo.phoneNo}</span>
                    </div>
                    <div>
                        <p>Address:</p>
                        <span>{order.shippingInfo && `${order.shippingInfo.address},${order.shippingInfo.city},${order.shippingInfo.state},${order.shippingInfo.pinCode},${order.shippingInfo.country}`}</span>
                    </div>
                    <Typography>Payment</Typography>
                <div className="orderDetailsContainerBox">
                    <div>
                        <p className={order.paymentInfo&& order.paymentInfo.status ==="succeeded" ? "greenColor":"redColor"}>{order.paymentInfo&& order.paymentInfo.status ==="succeeded" ? "PAID":"NOT PAID"}</p>
                    </div>
                    <div>
                        <p>Amount:</p>
                        <span>{order.totalPrice && order.totalPrice}</span>
                    </div>
                </div>
                <Typography>Order Status</Typography>
                <div className="orderDetailsContainerBox">
                <div>
                        <p className={order.orderStatus && order.orderStatus ==="Delivered" ? "greenColor":"redColor"}>
                            {order.orderStatus && order.orderStatus}
                        </p>
                    </div>
                </div>



                </div>
                <div className="confirmCartItems">
                    <Typography>Your Cart Items:</Typography>
                    <div className="confirmCartItemsContainer">
                        {order.orderItems && order.orderItems.map((item)=> (
                            <div key={item.product}>
                                <img src={item.image} alt="Product" />
                                <Link to={`/products/details/${item.product}`}>
                                    {item.name}
                                </Link>
                                <span>
                                    {item.quantity} X ₹{item.price} = <b>
                                    ₹{item.price * item.quantity}
                                    </b>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* //second div  */}
            <div>
            <form className="createProductForm" encType="multipart/form-data" onSubmit={updateOrderSubmitHandler}>
                        <h1>Update Order</h1>

                        <div>
                            <AccountTreeIcon />
                            <select value={status} onChange={(e)=>setStatus(e.target.value)}>
                                <option value="">Choose Category</option>
                                <option value="Shipped"> Shipped</option>
                                <option value="Delivered">Delivered </option>

                            </select>
                        </div>
                        <Button id="createProductBtn" type="submit"
                        disabled={loading ? true : false || status === "" ? true : false }
                        >
                            Update Order Status
                        </Button>
                    </form>
            </div>
        </div>}
            </div>
        </div>
    </>






    )
};


export default OrderUpdate ;