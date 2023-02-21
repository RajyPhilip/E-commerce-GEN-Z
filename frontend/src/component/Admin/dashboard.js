import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {Doughnut,Line} from 'react-chartjs-2' ;
import Chart from 'chart.js/auto';
import { useSelector,useDispatch } from "react-redux";

import Sidebar from './sidebar' ;
import './dashboard.css'
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction";

const Dashboard = ()=>{
    
    // const 
    const dispatch = useDispatch();

    const {products} = useSelector((state)=>state.products);
    const {orders} = useSelector((state)=>state.allOrders);

    let outOfStock =0;
    products && products.forEach((item) => {
        if(item.Stock===0){
            outOfStock += 1 ;
        }
    });
    let totalAmount = 0 ;
    orders && orders.forEach(item =>{
        totalAmount+= item.paymentInfo.totalPrice
    });
    totalAmount = Math.round(totalAmount) ;
    const lineState = {
        labels:["Initial Amount","Amount Earned"],
        datasets:[
            {
                label:"TOTAL AMOUNT",
                backgroundColor:["tomato"],
                hoverBackgroundColor:["rgb(197,72,49)"],
                data:[0,totalAmount],
            }
        ],
    }
    const doughnutState = {
        labels:["Out of Stock","InStock"],
        datasets:[
            {
                backgroundColor:["#00A6B4","#6800B4"],
                hoverBackgroundColor:["#4B5000","#35014F"],
                data:[outOfStock,products.length - outOfStock],
            }
        ]
    }


    // functions 

    useEffect(()=>{
        dispatch(getAdminProduct())
        dispatch(getAllOrders());
    },[dispatch])



    return(
        <div className="dashboard">
            <Sidebar />
            <div className="dashboardContainer">
                <Typography component="h1">Dashboard</Typography>
                <div className="dashboardSummary">
                    <div>
                        <p>Total Amount <br /> ₹{totalAmount}</p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to="/admin/products">
                            <p>Product</p>
                            <p>{products && products.length}</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>{orders && orders.length}</p>
                        </Link>
                        <Link to="">
                            <p>Users</p>
                            <p>2</p>
                        </Link>
                    </div>
                </div>
                <div className="lineChart">
                    <Line data={lineState} />
                </div>
                <div className="doughnutChart">
                    <Doughnut data={doughnutState} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard ;