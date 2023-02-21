import React, { useEffect } from "react";
import {DataGrid} from '@material-ui/data-grid';
import { useSelector,useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Sidebar from "./sidebar";

import './productList.css' ;
import { deleteOrder, getAllOrders,clearErrors } from "../../actions/orderAction";
import { DELETE_ORDERS_RESET } from "../../constants/orderConstants";


const OrderList = ()=>{

    // const 
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const {error,orders} = useSelector((state)=>state.allOrders);
    const {error:deleteError , isDeleted} = useSelector((state)=> state.order);
    const columns=[
        {
            field:"actions",headerName:"Actions",type:"number",cellClassName:"act",  minWidth:150, sortable:false,renderCell:(params)=>{
                return(
                    <>
                        <Link to={`/admin/order/${params.getValue(params.id,"id")}`}>
                            <EditIcon />
                        </Link>
                        <Button onClick={()=> deleteOrderHandler(params.getValue(params.id,"id"))}><DeleteIcon /></Button>
                    </>
                )
            }
        },
        {
            field:"status", headerName:"Status ",minWidth:150,flex:0.5,
            cellClassName:(params)=>{
                return params.getValue(params.id,"status")==="Delivered" ? "greenColor" : "redColor" ;
            }
        },
        {
            field:"itemsQty", headerName:"Item Qty",
            type:"number",minWidth:150,flex:0.3,
        },
        {
            field:"amount",headerName:"Amount",type:"number",minWidth:270,flex:.5,
        },
        {
            field:"id", headerName:"Order ID",minWidth:300,
            flex:1,
        },
    ];

    const rows=[];
    orders && orders.forEach((item) =>{
        rows.push({
            id:item._id,
            itemsQty:item.orderItems.length,
            amount:item.paymentInfo.totalPrice,
            status:item.orderStatus,
        })
    });
    //functions 
    const deleteOrderHandler = (id)=>{
        console.log("delete handler",id)
        dispatch(deleteOrder(id));
    }

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(deleteError){
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if(isDeleted){
            alert.success("Order Deleted Succesfully");
            navigate('/admin/orders');
            dispatch({type:DELETE_ORDERS_RESET});
        }
        dispatch(getAllOrders());

    },[dispatch,alert,error,deleteError,isDeleted,navigate]);

    return(
        <>
            <MetaData title={`ALL Orders - Admin`} />
            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL Orders</h1>
                    <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectOnClick
                    className="productListTable"
                    autoHeight />
                </div>
            </div>
        </>
    )
};

export default OrderList ;