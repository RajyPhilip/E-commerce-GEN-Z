import React, { useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { useAlert } from 'react-alert';

import './home.css';
import ProductCard from './productCard' ;
import MetaData from '../layout/MetaData';
import {clearErrors, getProduct} from "../../actions/productAction";
import Loading from '../layout/Loading/loading';





const Home = ()=>{

    const alert = useAlert() ;

    const dispatch = useDispatch();
    const {loading,error,products,productsCount} = useSelector(state => state.products)

useEffect(()=>{

    if(error){
        alert.error(error);
        dispatch(clearErrors) 
    }
    dispatch(getProduct());

},[dispatch,error,alert]);

    return(
        <>
        {loading ? (<Loading />) : <>
        <MetaData title="Gen-Z" />
            <div className='banner'>
                <h2 >Welcome to GEN-Z SHOPPING</h2>
                <h1 >FIND AMAZING PRODUCTS BELOW</h1>
                <a  href='#container'>
                    <button>
                        <span>Scroll</span><img src='https://cdn-icons-png.flaticon.com/512/3249/3249525.png' />
                    </button>
                </a>
            </div>
            <h2 className='homeHeading'>Featured Products</h2>

            <div className='container' id='container'>

                {products && products.map((product) =>(
                    <ProductCard key={product._id} product={product}  />
                )

                )}

            </div>
        </>}
        </>
    )
}

export default Home ;