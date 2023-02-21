import React, { useEffect, useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import FaceIcon from '@material-ui/icons/Face';
import { useDispatch,useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import './updateProfile.css'
import Loading from '../layout/Loading/loading';
import{updateProfile,clearErrors, loadUser} from '../../actions/userAction' ;
import { UPDATE_PROFILE_RESET } from '../../constants/userConstant';
import MetaData from '../layout/MetaData';


const UpdateProfile = ()=>{
    
    //state
    const [name,setName]= useState("");
    const [email,setEmail]= useState("");
    const [avatar,setAvatar]= useState("");
    const [avatarPreview,setAvatarPreview]= useState("/Profile.png");
    //const 
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const {user} = useSelector((state)=> state.user);
    const {error,isUpdated,loading} = useSelector((state)=>state.profile);
    //funtions
    const updateProfileSubmit =(e)=>{
        e.preventDefault() ; 
        const myForm = new FormData();
        myForm.set('name',name);
        myForm.set('email',email);
        myForm.set('avatar',avatar);
        dispatch(updateProfile(myForm));
        
    }
    const updateProfileDataChange = (e)=>{

        const reader = new FileReader();
        reader.onload=()=>{
            if(reader.readyState ===2 ){
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0]);
        
        
    }
//use effect
useEffect(()=>{
    if(user){
        setName(user.name);
        setEmail(user.email);
        setAvatarPreview(user.avatar.url)
    }
    if(error){
        alert.error(error);
        dispatch(clearErrors);
    }
    if(isUpdated){
        alert.success("Profile Updated Succesfully");
        dispatch(loadUser());
        navigate('/profile');
        dispatch({type:UPDATE_PROFILE_RESET});
    }

},[dispatch,error,alert,navigate,user,isUpdated]);


    return (
    <>  
    {loading ? <Loading /> : 
    <>
            <MetaData title="Update Profile" />
        <div className='updateProfileContainer'>
            <div className='updateProfileBox'>
                <h2 className='updateProfileHeading'>Update Profile</h2>
                <form className='updateProfileForm'  encType='multipartform-data'  onSubmit={updateProfileSubmit}>
                    <div className='updateProfileName'>
                        <FaceIcon />
                        <input type="text" placeholder='Name' required name='name' value={name} onChange={(e)=>{setName(e.target.value)}} />
                    </div>
                    <div className='updateProfileEmail'>
                        <MailOutlineIcon />
                        <input type="email" placeholder='Email' required name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                    </div>

                    <div id='updateProfileImage'>
                        <img src={avatarPreview} alt="Avatar Preview" />
                        <input type="file"   name='avatar' accept='image/*'  onChange={updateProfileDataChange} />
                    </div>
                    <button type='submit' className='updateProfileBtn'>Update</button>
                </form>
            </div>
        </div>
    </>
    }
    </>
    )
};


export default UpdateProfile ;