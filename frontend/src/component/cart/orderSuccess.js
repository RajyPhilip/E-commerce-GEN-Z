import React from "react";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {Link} from "react-router-dom"

import './checkout.css' ;
import { Typography } from "@mui/material";


const OrderSuccess = ()=>{
    return(
        <div className="orderSuccess">
            <CheckCircleIcon />
            <Typography>Your Order has been Placed Successfully</Typography>
            <Link to='/orders'>View Orders</Link>
        </div>
    )
}

export default OrderSuccess ;