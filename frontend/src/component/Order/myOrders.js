import React, { useEffect } from "react";
import {DataGrid} from '@material-ui/data-grid';
import { useSelector,useDispatch } from "react-redux";
import { clearErrors,myOrders } from "../../actions/orderAction";
import Loading from "../layout/Loading/loading";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Typography } from "@mui/material";
import LaunchIcon from '@material-ui/icons/Launch';
import './myOrders.css';
import MetaData from "../layout/MetaData";

const MyOrders = ()=>{
    // const
    const dispatch =useDispatch();
    const alert = useAlert();
    const{loading,error,orders} =useSelector((state)=> state.myOrders);
    const {user}= useSelector((state)=>state.user);
    const columns=[
        {
            field:"actions",headerName:"Actions",type:"number",cellClassName:"act",  minWidth:150, sortable:false,renderCell:(params)=>{
                return(
                    <Link to={`/order/${params.getValue(params.id,"id")}`}><LaunchIcon /></Link>
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
    orders && orders.forEach((item,index) => {
        rows.push({
            itemsQty:item.orderItems.length,
            id:item._id,
            status:item.orderStatus,
            amount: 1000 + 80 * index
        });
    });

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    },[dispatch,alert,error]);
    return(
        <>
            <MetaData title={`${user.name}'s - Orders`} />
            {loading ? (
                <Loading />
            ): (
                <div className="myOrdersPage">
                    <DataGrid rows={rows} 
                        columns={columns} 
                        pageSize={10}
                        disableSelectionOnClick
                        className="myOrdersTable"
                        autoHeight />
                        <Typography id="myOrdersHeading">{`${user.name}'s - Orders`}</Typography>
                </div>
            )}
        </>
    )
}


export default MyOrders ;