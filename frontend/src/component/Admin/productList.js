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
import { getAdminProduct,clearErrors,deleteProduct } from "../../actions/productAction";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
const ProductList = ()=>{

    // const 
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const {error,products} = useSelector((state)=>state.products);
    const {error:deleteError , isDeleted} = useSelector((state)=> state.deleteProduct);
    const columns=[
        {
            field:"actions",headerName:"Actions",type:"number",cellClassName:"act",  minWidth:150, sortable:false,flex:0.3,renderCell:(params)=>{
                return(
                    <>
                        <Link to={`/products/update/${params.getValue(params.id,"id")}`}>
                            <EditIcon />
                        </Link>
                        <Button onClick={()=> deleteProductHandler(params.getValue(params.id,"id"))}>
                            <DeleteIcon />
                        </Button>
                    </>
                    
                )
            }
        },


        {
            field:"name", headerName:"Name",
            minWidth:350,flex:1,
        },
        {
            field:"stock",headerName:"Stock",type:"number",minWidth:150,flex:0.3,
        },
        {
            field:"price",headerName:"Price",type:"number",minWidth:270,flex:0.5,
        },
        {
            field:"id", headerName:"Product ID",minWidth:200,
            flex:0.5,
        },

    ] ;

    const rows=[];
    products && products.forEach((item) =>{
        rows.push({
            id:item._id,
            stock:item.Stock,
            price:item.price,
            name:item.name,
        })
    });
    //functions 
    const deleteProductHandler = (id)=>{
        dispatch(deleteProduct(id));
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
            alert.success("Product Deleted Succesfully");
            navigate('/admin/dashboard');
            dispatch({type:DELETE_PRODUCT_RESET});
        }
        dispatch(getAdminProduct());

    },[dispatch,alert,error,deleteError,isDeleted,navigate]);

    return(
        <>
            <MetaData title={`ALL PRODUCCTS - Admin`} />
            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL PRODUCTS</h1>
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

export default ProductList ;