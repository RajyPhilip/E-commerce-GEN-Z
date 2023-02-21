import './App.css';
import { BrowserRouter , Routes,Route } from 'react-router-dom';
import WebFont from'webfontloader' ;
import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Header from './component/layout/Header/Header' ;
import Footer from './component/layout/Footer/footer'
import Home from './component/Home/home.js'
import ProductDetails from './component/Product/ProductDetails' ;
import AllProducts from './component/Product/allProducts' ;
import Search from './component/Product/search'
import LoginSignup from './component/User/loginSignUp';
import store from './store' ;
import { loadUser } from './actions/userAction';
import UserOptions from './component/layout/Header/userOptions' ;
import Profile from './component/User/profile';
import UpdateProfile from './component/User/updateProfile' ;
import UpdatePassword from './component/User/updatePassword';
import Cart from './component/cart/cart';
import Shipping from "./component/cart/shipping";
import ConfirmOrder from './component/cart/confirmOrder' ;
import Payment from'./component/cart/payment';
import OrderSuccess from './component/cart/orderSuccess';
import MyOrders from './component/Order/myOrders';
import OrderDetails from './component/Order/orderDetails';
import Dashboard from './component/Admin/dashboard';
import ProductList from "./component/Admin/productList" ;
import NewProduct from './component/Admin/newProduct';
import UpdateProduct from './component/Admin/updateProduct';
import OrderList from './component/Admin/orderList';
import OrderUpdate from './component/Admin/orderUpdate.js' ;

function App() {

  const {isAuthenticated,user} = useSelector(state => state.user);

  const [stripeApiKey,setStripeApiKey] = useState("");
  
  async function getStripeApiKey(){
    const {data} = await axios.get('/api/v1/stripeapikey');
    setStripeApiKey(data.stripeApiKey) ;
  }


  useEffect(()=>{

    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanks"],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey();

  },[]);


  return (
    <BrowserRouter>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/products/details/:id' element={<ProductDetails />} />
      <Route exact path='/products' element={<AllProducts />} />
      <Route  path='/products/:keyword' element={<AllProducts />} />
      <Route exact path='/search' element={<Search />} />
      <Route exact path='/login' element={<LoginSignup />} />
      <Route exact path='/cart' element={<Cart />} />


      {/* //protected routes below */}

      {isAuthenticated && <Route exact path='/profile' element={<Profile />} />}

      {isAuthenticated && <Route exact path='/update/profile' element={<UpdateProfile />} />}

      {isAuthenticated && <Route exact path='/password/update' element={<UpdatePassword />} />}

      {isAuthenticated && <Route exact path='/login/shipping' element={<Shipping />} />}

      {isAuthenticated && <Route exact path='/order/confirm' element={<ConfirmOrder />} />}

      {isAuthenticated && <Route exact path='/process/payment' element={<Payment stripe={loadStripe(stripeApiKey)} />} />}

      <Route exact path='/order/success' element={<OrderSuccess />} />

      {isAuthenticated && <Route exact path='/orders' element={<MyOrders  />} />}

      {isAuthenticated && <Route exact path='/order/:id' element={<OrderDetails  />} />}

      {/* Dashboards and admin routes below  */}

      {isAuthenticated && <Route exact path='/admin/dashboard' element={<Dashboard />} />}

      
      {isAuthenticated && <Route exact path='/admin/products' element={<ProductList />} />}

      {isAuthenticated && <Route exact path='/admin/product' element={<NewProduct />} />}
    
      {isAuthenticated && <Route exact path='/products/update/:id' element={<UpdateProduct />} />}
      
      {isAuthenticated && <Route exact path='/admin/orders/' element={<OrderList />} />}

      {isAuthenticated && <Route exact path='/admin/order/:id' element={<OrderUpdate />} />}



      
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
