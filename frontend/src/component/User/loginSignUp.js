import React, { useEffect, useRef, useState } from 'react';
import { Link , useNavigate,useLocation } from 'react-router-dom';
import { useAlert } from 'react-alert';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FaceIcon from '@material-ui/icons/Face';
import { useDispatch,useSelector } from 'react-redux';



import './loginSignup.css'
import Loading from '../layout/Loading/loading';
import{login,clearErrors,register} from '../../actions/userAction' ;
import MetaData from '../layout/MetaData';


const LoginSignup = ()=>{
    //state
    const [loginEmail,setLoginEmail]= useState("");
    const [loginPassword,setLoginPassword]= useState("");
    const [avatar,setAvatar]= useState();
    const [avatarPreview,setAvatarPreview] = useState('/Profile.png')
    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",

    })
    // redux actions
    const dispatch = useDispatch();
    const alert = useAlert() ;

    const {error,loading,isAuthenticated} = useSelector((state) => state.user) ;

    const navigate = useNavigate();



//required states nd the functions
    const {name,email,password} = user ;

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const loginSubmit=(e)=>{
        e.preventDefault() ; 
        dispatch(login(loginEmail,loginPassword))
    }

    const registerSubmit =(e)=>{
        e.preventDefault() ; 
        const myForm = new FormData();
        myForm.set('name',name);
        myForm.set('email',email);
        myForm.set('password',password);
        myForm.set('avatar',avatar);

        dispatch(register(myForm));
        
    }
    const registerDataChange = (e)=>{

        if(e.target.name==='avatar'){

            const reader = new FileReader();
            reader.onload=()=>{
                if(reader.readyState ===2 ){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
            console.log("YEAH",reader.readAsDataURL(e.target.files[0]));
        }else{
            setUser({...user,[e.target.name] : e.target.value})
        }
    }
    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");
            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");
            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        };
    };
    const location = useLocation();
    const redirect = location.search ? location.search.split("=")[1] : "/profile"

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors);
        }
        if(isAuthenticated){
            navigate(redirect);
        }else{
            navigate('/login');
        }

    },[dispatch,error,alert,navigate,isAuthenticated,redirect]);
    return (
    <>
    {loading ? <Loading /> : <>
    <div className='LoginSignUpContainer'>
        <div className='LoginSignUpBox'>
            <div>
                <div className='login_signUp_toggle'>
                    <p  onClick={(e)=> switchTabs(e,"login")}>LOGIN</p>
                    <p onClick={(e)=> switchTabs(e,"register")}>REGISTER</p>
                </div>
                <button className='live' ref={switcherTab}></button>
            </div>
            <form className='loginForm' ref={loginTab} onSubmit={loginSubmit} >
                <div className='loginEmail'>
                    <MailOutlineIcon />
                    <input className='input' type="email"
                        placeholder='Enter Email'
                        required
                        value={loginEmail}
                        onChange={(e)=>setLoginEmail(e.target.value)}
                    />
                </div>
                <div className='loginPassword'>
                    <LockOpenIcon />
                    <input className='input' type="password"
                    required
                    placeholder='Enter Password'
                    value={loginPassword}
                    onChange={(e)=> setLoginPassword(e.target.value)}
                    
                    />
                </div>
                {/* <Link to='/password/forgot'>Forgot Password ?</Link> */}
                <button className='loginBtn' >LOGIN</button>
            </form>
            <form className='signUpForm' ref={registerTab} encType='multipart/form-data' onSubmit={registerSubmit}>
                <div className='signUpName'>
                    <FaceIcon />
                    <input type="text" placeholder='Name' required name='name' value={name} onChange={registerDataChange} />
                </div>
                <div className='signUpEmail'>
                    <MailOutlineIcon />
                    <input type="email" placeholder='Email' required name='email' value={email} onChange={registerDataChange} />
                </div>
                <div className='signUpPassword'>
                    <LockOpenIcon />
                    <input type="password" placeholder='Password' required name='password' value={password} onChange={registerDataChange} />
                </div>

                <div id='registerImage'>
                    <img src={avatarPreview} alt="Avatar Preview" />
                    <input type="file"   name='avatar' accept='image/*'  onChange={registerDataChange} />
                </div>
                <button type='submit' className='signUpBtn'>REGISTER</button>
            </form>
        </div>
    </div>
    </>  }
    </>
    )
}

export default LoginSignup ;