import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import {useSelector,useDispatch} from 'react-redux';
import { useParams } from 'react-router-dom';
import './ProductDetails.css' ;
import { useAlert } from 'react-alert';
import { Dialog,DialogActions,DialogContent,DialogTitle,Button } from '@material-ui/core';
import {Rating} from "@material-ui/lab"


import { clearErrors, getProductDetails, newReview } from '../../actions/productAction';
import ReactStars from 'react-rating-stars-component';
import ReviewCard from './reviewCard'
import Loading from '../layout/Loading/loading';
import MetaData from "../layout/MetaData";
import {addItemsToCart} from '../../actions/cartAction';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';


const ProductDetails = ({match})=>{
    // state 
    const [quantity,setQuantity] = useState(1);
    const [open,setOpen] = useState(false);
    const [rating,setRating] = useState(0);
    const [comment,setComment] = useState("");

    // getting the params 
    let { id } = useParams();
    // const 
    const dispatch = useDispatch();
    const alert = useAlert();
    const {product,loading,error} = useSelector(state=>state.productDetails);
    const{success ,error:reviewError} = useSelector((state)=>state.newReview)
    const options={
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        size:window.innerWidth <600 ? 20 : 25,
        value:product.rating,
        isHalf:true
    };
    //functions
    const increaseQuantity = ()=>{

        if(product.Stock <= quantity){
            return ;
        }
        const qty = quantity + 1 ;

        if(qty > 9 ){
            return ;
        }
        setQuantity(qty)
    }
    const decreaseQuantity = ()=>{
        const qty = quantity - 1 ;
        if(qty < 1){
            return ;
        }
        setQuantity(qty)
    }
    const addToCartHandler = ()=>{
        dispatch(addItemsToCart(id,quantity));
        alert.success("Item Added To Cart")
    }
    const submitReviewToggle = ()=>{
        open ? setOpen(false) : setOpen(true) ;

    }
    const reviewSubmitHandler = ()=>{
        const myform = new FormData();
        myform.set("rating",rating);
        myform.set("comment",comment);
        myform.set("productId",id);

        dispatch(newReview(myform));
        setOpen(false);
    }

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors);
        }
        if(reviewError){
            alert.error(reviewError);
            dispatch(clearErrors);
        }
        if(success){
            alert.success("Review Submitted Successfully");
            dispatch({type:NEW_REVIEW_RESET})
        }
        dispatch(getProductDetails(id));
    },[dispatch,id,error,alert,success,reviewError])
    return(
        <>
        {loading ? <Loading /> :     <>
        <MetaData title={`${product.name}`} />
        <div className='productDetails'>

            <div>
                <Carousel className='caraouse'>
                    {product.images &&
                        product.images.map((item,i)=>{

                            return <img className='CarouselImage'
                                src={item.url}
                                key={item.url}
                                alt={`${i} Slide`} />

                        })}
                </Carousel>
            </div>

            <div>

                <div className='detailsBlock-1'>
                    <h2>{product.name}</h2>
                    <p>Product #{product._id}</p>
                </div>

                <div className='detailsBlock-2'>
                    <ReactStars {...options} />
                    <span>({product.numOfReviews} Reviews)</span>
                </div>

                <div className='detailsBlock-3'>
                    <h1>{`₹${product.price}`}</h1>
                    <div className='detailsBlock-3-1'>
                        <div className='detailsBlock-3-1-1'>
                            <button onClick={decreaseQuantity}>-</button>
                            <input readOnly value={quantity} type="number" />
                            <button onClick={increaseQuantity}>+</button>
                        </div>
                        <button disabled={product.Stock < 1 ? true : false} onClick={addToCartHandler} >Add to Cart</button>
                    </div>
                    <p>Status : <b className={product.Stock < 1 ? "redColor" : "greenColor"}>{product.Stock < 1 ? "OutOfStock" : "InStock"}</b> </p>
                </div>
                <div className='detailsBlock-4'>
                    Description : <p>{product.description}</p>
                </div>
                <button onClick={submitReviewToggle} className='submitReview' >Submit Review</button>

            </div>

        </div>

        <h3 className='reviewHeading'>REVIEWS</h3>
        <Dialog aria-labelledby='simple-dialog-title' open={open} onClose={submitReviewToggle}>
            <DialogContent className='submitDialog'>
                <Rating value={rating} size="large" onChange={(e)=> setRating(e.target.value)} />
                <textarea className='submitDialogTextArea' cols="30" rows="5" value={comment} onChange={(e)=> setComment(e.target.value)}>

                </textarea>
            </DialogContent>
            <DialogActions>
                <Button onClick={submitReviewToggle} color="secondary">Cancel</Button>
                <Button onClick={reviewSubmitHandler} color='primary'>Submit</Button>
            </DialogActions>
        </Dialog>
        {product.reviews && product.reviews[0] ? (
            <div className='reviews'>
                {product.reviews && product.reviews.map((review)=>{
                    return <ReviewCard key={review._id} review={review} />
                })}
            </div>
        ) : (
            <p className='noReviews'>No Reviews Yet</p>
        ) }
    </>}
        </>
    )
}


export default ProductDetails;