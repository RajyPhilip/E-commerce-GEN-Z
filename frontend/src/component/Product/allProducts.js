import React, { useEffect, useState } from "react";
import {useSelector,useDispatch} from 'react-redux';
import { useParams } from 'react-router-dom';
import Slider from '@material-ui/core/Slider' ;
import Typography from '@material-ui/core/Typography';
import {useAlert} from 'react-alert';

import { clearErrors,getProduct } from "../../actions/productAction";
import Loading from "../layout/Loading/loading";
import ProductCard from "../Home/productCard";
import Pagination from 'react-js-pagination';
import MetaData from "../layout/MetaData";

import './allProducts.css';


const categories = ["shoes","computer","lappy","product","camera"]


const AllProducts = ()=>{
    //states
    const [currentPage,setCurrentPage] = useState(1);
    const [price,SetPrice] = useState([0,25000]);
    const [category,setCategory] = useState("");
    const [ratings,setRatings] = useState(0);

    const alert = useAlert();

    //to dispatch 
    const dispatch = useDispatch();

    //getting params values
    let { keyword } = useParams();

    //functions handling
    const setCurrentPageNo = (e)=>{
        setCurrentPage(e);
    }
    const priceHandler = (event,newPrice)=>{
        SetPrice(newPrice);
    }

    // to get data 
    const {products,loading,error,productsCount,resultPerPage,filteredProductsCount} = useSelector(
        (state)=> state.products
    );


    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword,currentPage,price,category,ratings));
    },[dispatch,keyword,currentPage,price,category,ratings,error,alert])

    // let count = products.length ;
    return(
        <>
        {loading ? <Loading /> :  <>
        <div>
            <MetaData title="PRODUCTS -GEN-Z" />
            <h2 className="productsHeading" >Products</h2>
            <div className="products">
                {products && 
                products.map((product)=>{
                    return <ProductCard key={product._id} product={product} />
                })
                }
            </div>

            <div className="filterBox">
                <Typography>Price</Typography>
                <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={25000}
                />
                <Typography>Categories</Typography>
                <ul className="categoryBox">
                    {categories.map((category)=>{
                        return <li
                            className="category-link"
                            key={category} onClick={()=>{
                            setCategory(category)
                        }}>
                            {category}
                        </li>
                    })}
                </ul>
                <fieldset>
                    <Typography component="legend"> Ratings Above</Typography>
                    <Slider
                        value={ratings} 
                        onChange={(e,newRating)=>{
                            setRatings(newRating);
                        }} 
                    valueLabelDisplay="auto"
                        aria-labelledby="continuous-slider"
                        min={0}
                        max={5}
                        />
                        
                </fieldset>

            </div>

            {resultPerPage < productsCount && (
                            <div className="paginationBox">
                            <Pagination 
                                activePage={currentPage} 
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
            
                                />
                        </div>
            )}
        </div>
        </> }
        </>
    )

};


export default AllProducts ;