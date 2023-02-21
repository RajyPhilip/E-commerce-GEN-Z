import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import DescriptionIcon from '@material-ui/icons/Description';
import StorageIcon from '@material-ui/icons/Storage';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";



import './newProduct.css' ;
import Sidebar from "./sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { clearErrors,updateProduct,getProductDetails } from "../../actions/productAction";


const UpdateProduct =()=>{
    const {id} = useParams();

    //state
    const [name,setName] = useState("");
    const [price,setPrice] = useState(0);
    const [description,setDescription] = useState("");
    const [category,setCategory] = useState("");
    const [Stock,setStock] = useState(0);
    const [images,setImages] = useState([]);
    const [oldImages,setOldImages] = useState([]);
    const [imagesPreview,setImagesPreview] = useState([]);

    // const  
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const {error,product} = useSelector((state)=> state.productDetails)
    const {loading,error:updateError,isUpdated} =useSelector((state)=> state.deleteProduct);
    const categories = ["shoes","computer","lappy","product","camera"] ;
    //functions
    const updateProductImagesChange=(e)=>{
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

        files.forEach((file)=>{
            const reader = new FileReader();

            reader.onload=()=>{
                if(reader.readyState === 2){
                    setImagesPreview((old)=>[...old,reader.result]);
                    setImages((old)=> [...old,reader.result]);
                }
            }

            reader.readAsDataURL(file);
        })
    }
    const updateProductFormImage = (e)=>{
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name",name);
        myForm.set("price",price);
        myForm.set("description",description);
        myForm.set("category",category);
        myForm.set("Stock",Stock);
        
        images.forEach((image)=>{
            myForm.append("images",image);
        });
        dispatch(updateProduct(id,myForm));
    }


    useEffect(()=>{

        if(product && product._id !== id){
            dispatch(getProductDetails(id));
        }else{
            setName(product.name);
            setDescription(product.description)
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.Stock);
            setOldImages(product.images);
        }
        if(updateError){
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(isUpdated){
            alert.success("Product Updated Succesfully");
            navigate('/admin/products');
            dispatch({type:UPDATE_PRODUCT_RESET});
        }
    },[dispatch,alert,error,navigate,isUpdated,id,product,updateError]);
    return(
        <>
            <MetaData title="Update Product" />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    <form className="createProductForm" encType="multipart/form-data" onSubmit={updateProductFormImage}>
                        <h1>Update Product</h1>
                        <div>
                            <SpellcheckIcon />
                            <input type="text" placeholder="Product Name" required value={name} onChange={(e)=>setName(e.target.value)} />
                        </div>
                        <div>
                            <AttachMoneyIcon />
                            <input type="number" value={price} placeholder="Price" required  onChange={(e)=>setPrice(e.target.value)} />
                        </div>
                        <div>
                            <DescriptionIcon />
                            <textarea value={description}
                            onChange={(e)=> setDescription(e.target.value)} placeholder="Product Description">
                            </textarea>
                        </div>
                        <div>
                            <AccountTreeIcon />
                            <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categories.map((cate)=>(
                                    <option key={cate} value={cate}>{cate}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <StorageIcon />
                            <input value={Stock} type="number" placeholder="Stock" required  onChange={(e)=>setStock(e.target.value)} />
                        </div>
                        <div id="createProductFormFile">

                            <input type="file" name="avatar" accept="image/*" multiple onChange={updateProductImagesChange}   />
                        </div>
                        <div id="createProductFormImage">
                            {oldImages && oldImages.map((image,index)=> (
                                <img key={index} src={image.url} alt="old Product Preview" />
                            ))}
                        </div>
                        <div id="createProductFormImage">
                            {imagesPreview.map((image,index)=> (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>
                        <Button id="createProductBtn" type="submit"
                        disabled={loading ? true : false }
                        >
                            Update Product
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
};

export default UpdateProduct ;