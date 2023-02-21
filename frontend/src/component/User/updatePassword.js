import React, { useEffect, useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import VpnKeyIcon from '@material-ui/icons/VpnKey';


import './updatePassword.css'
import Loading from '../layout/Loading/loading';
import{updatePassword,clearErrors} from '../../actions/userAction' ;
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstant';
import MetaData from '../layout/MetaData';


const UpdatePassword = ()=>{
    
    //state
    const [oldPassword,setOldPassword]= useState("");
    const [newPassword,setNewPassword]= useState("");
    const [confirmPassword,setConfirmPassword]= useState("");

    //const 
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const {error,isUpdated,loading} = useSelector((state)=>state.profile);
    //funtions
    const updatePasswordSubmit =(e)=>{
        e.preventDefault() ; 
        const myForm = new FormData();
        myForm.set('oldPassword',oldPassword);
        myForm.set('newPassword',newPassword);
        myForm.set('confirmPassword',confirmPassword);
        dispatch(updatePassword(myForm));
        
    }

//use effect
useEffect(()=>{

    if(error){
        alert.error(error);
        dispatch(clearErrors);
    }
    if(isUpdated){
        alert.success("Profile Updated Succesfully");
        navigate('/profile');
        dispatch({type:UPDATE_PASSWORD_RESET});
    }

},[dispatch,error,alert,navigate,isUpdated]);


    return (
        <>  
    {loading ? <Loading /> : 
    <>
            <MetaData title="Update Password" />
        <div className='updatePasswordContainer'>
            <div className='updatePasswordBox'>
                <h2 className='updatePasswordHeading'>Update Password</h2>
                <form className='updatePasswordForm'  encType='multipartform-data'  onSubmit={updatePasswordSubmit}>
                    <div className='loginPassword'>
                        <VpnKeyIcon />
                        <input className='input' type="password"
                        required
                        placeholder='Old Password'
                        value={oldPassword}
                        onChange={(e)=> setOldPassword(e.target.value)}
                        />
                    </div>
                    <div className='loginPassword'>
                        <LockOpenIcon />
                        <input className='input' type="password"
                        required
                        placeholder='New Password'
                        value={newPassword}
                        onChange={(e)=> setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className='loginPassword'>
                        <LockIcon />
                        <input className='input' type="password"
                        required
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e)=> setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='updatePasswordBtn'>Change Password</button>
                </form>
            </div>
        </div>
    </>
    }
    </>
    )
};


export default UpdatePassword ;