import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';

import './search.css'

const Search = ()=>{
    const [keyword,setKeyword] = useState("") ;
    
    const navigate = useNavigate();

    
    const SearchSubmitHandler = (e)=>{
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`);
        }else{
            navigate('/products');
        }
    }


    return (
    <>
    <MetaData title="SEARCH A PRODUCT" />
    <form className="searchBox" onSubmit={SearchSubmitHandler}>
            <input type="text" placeholder="Search a Product" onChange={(e)=> setKeyword(e.target.value)} />    
        <button><img src='https://cdn-icons-png.flaticon.com/128/9517/9517972.png' /></button>  
        </form> 


    </>
    )
}

export default Search ;