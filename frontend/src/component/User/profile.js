import React, { useEffect } from "react";
import MetaData from "../layout/MetaData";
import { useSelector } from "react-redux";
import { Link , useNavigate } from 'react-router-dom';

import Loading from "../layout/Loading/loading";
import './profile.css';


const Profile = ()=>{

    const{user,loading,isAuthenticated} = useSelector((state)=> state.user);
    const navigate =useNavigate();

useEffect(()=>{
    if(isAuthenticated == false){

        navigate('/login')
    }

},[navigate,isAuthenticated,loading])

    return (
    <>
    {loading ? <Loading /> : <>
    <MetaData title={`${user.name}'s Profile`} />
    <div className="profileContainer">
        <div>
            <h1>My Profile</h1>
            <img src={user.avatar.url} alt={user.name} />
            <Link to="/update/profile">Edit Profile</Link>
        </div>
        <div>
        <div>
                <h4>Name</h4>
                <p>{user.name}</p>
            </div>
            <div>
                <h4>Email</h4>
                <p>{user.email}</p>
            </div>

            <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
            </div>

        </div>
    </div>
    </>}
    
    </>
    );
}

export default Profile ;