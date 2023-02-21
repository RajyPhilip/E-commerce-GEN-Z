import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { SpeedDial,SpeedDialAction } from "@material-ui/lab" ;
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import Exittoappicon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { Backdrop } from "@mui/material";
import { useAlert } from "react-alert";
import { useDispatch,useSelector } from "react-redux";

import { logout } from "../../../actions/userAction";
import './header.css' ;

const UserOptions = ({user})=>{

    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    const {cartItems} = useSelector((state)=>state.cart)
//state
    const [open,setOpen] = useState(false) ;

//dashboards options when user is logged in 
    const options=[
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <ShoppingCartIcon style={{color:cartItems.length > 0 ?"tomato" : "unset"}} />, name: `Cart(${cartItems.length})`, func: cart },
        { icon: <Exittoappicon  />, name: "Logout", func: logoutUser },
    ]
    
    if(user.role ==="admin"){
        options.unshift({icon:<DashboardIcon />,name:"Dashboard",func:dashboard});
    }
//functions
    function dashboard(){
        navigate('/admin/dashboard')
    }
    function orders(){
        navigate('/orders')
    }
    function account(){
        navigate('/profile')
    }
    function cart(){
        navigate('/cart')
    }
    function logoutUser(){
        dispatch(logout());
        alert.success("Logged Out Successfully");
    }
    return <>
    <Backdrop open={open} style={{zIndex:"9"}} />
        <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={()=> setOpen(false)}
        onOpen={()=> setOpen(true)}
        style={{zIndex:"10"}}
        open={open}
        direction="down"
        className="speedDial"
        icon={
            <img className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="profile" />
        }
        >
        {options.map((item)=>(

            <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func} tooltipOpen={window.innerWidth <=600 ? true : false} />

        ))}

        
        </SpeedDial>
    </>
}


export default UserOptions ;