import React, { useEffect } from 'react';
import '../styles/Login/login_styles.css'
import '../styles/styles_base.css'
import logo from '../assets/img/logo.png'
import googleIcon from '../assets/img/google.png'
import { loginWithEmailAndPass, loginWithGoogle, setUser } from '../actions/user.actions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import firebaseapp from '../firebase/firebase.config';



const Login = () => {
    const auth = getAuth(firebaseapp);
    const history = useHistory();
    // const user = useSelector(state => state.user);

    const dispatch = useDispatch();

    const handleLoginGoogle = async () => {
        dispatch(loginWithGoogle());    
    }

    const handleLoginEmail = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const pass = e.target.password.value;
        dispatch(loginWithEmailAndPass({email:email, pass:pass}));
    }

    useEffect(()=>{
        let localUser = "";
        if(localStorage.getItem('user')!==undefined){
            localUser = JSON.parse(localStorage.getItem("user"));
        } else if(localUser !== ""){
            dispatch(setUser(localUser));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    onAuthStateChanged(auth, (user)=>{
        if(user){
            // console.log("LOGIN AUTH STATE CHANGED USER: "+ JSON.stringify(user))
            history.push('/home');
        } else {
            // console.log("No user AUTH STATE CHANGED");
            history.push("/");
        }
    })

    return (
        <div className="login-main-container">
            <img src={logo} className="login-icon" alt="Login icon"/>
            <p className="font-weight-bold font-size-xl margin-top-sm">Login</p>
            <p className="font-weight-normal font-size-sm margin-top-sm">Welcome back.</p>
            <div className="googleButtonContainer" onClick={handleLoginGoogle}>
                <img src={googleIcon} alt="Google Icon" className="googleIconButton" />
                <p className="font-weight-thin font-size-sm">Login with Google</p>
            </div>
            <p className="font-weight-normal font-size-xs margin-top-md">OR</p>
            <form onSubmit={handleLoginEmail} id="form-email-pass" className="flex-column-center form-login-email">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" className="margin-top-sm"/>
                <div className="flex-column-center position-relative width-100percent margin-top-sm">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href="#" className="forgot-password-link font-weight-normal font-size-sm">Forgot your password?</a>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" className="margin-top-sm"/>
                </div>
                {/* <div className="login-button margin-top-md flex-row-center" type="submit" onClick={(e)=>{document.getElementById('form-email-pass').submit(e);}}><p className="font-weight-normal font-size-sm color-white">Login</p></div> */}
                <button type="submit" className="login-button margin-top-md flex-row-center color-white">Login</button>
            </form>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <p className="font-weight-normal font-size-sm margin-top-md">Don´t have an account? <a href="#" className="sign-up-link">Join</a></p>
        </div>
    )
}

export default Login
