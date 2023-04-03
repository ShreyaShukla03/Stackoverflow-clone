import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import './Auth.css'
import icon from '../../assets/icon.png'
import AboutAuth from './AboutAuth'
import { signup, login, otpRoute } from '../../actions/auth'

const Auth = () => {
    const [isSignup, setIsSignup] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [password, setPassword] = useState('')
    const [isOTP,setIsOTP]=useState(false);
    const [isLogin,setIsLogin] = useState(true);
    const [otpSent,setOtpSent] = useState(false);
    const [otp,setOTP] = useState('');
    const [validateOTP,setValidateOTP] = useState(false);
    const [isForgot,setIsForgot] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSwitch = () => {
        if(isOTP){
            setIsOTP(!isOTP)
            setOtpSent(!otpSent)
        }
        if(!isOTP){
            setIsLogin(!isLogin)
        }
        setIsSignup(!isSignup)
    }
    const sendOTP = () => {
        if(number.length===10){
            if(!otpSent){
                setOtpSent(!otpSent)
            }
            let number = "";
            for(let i =0;i<4;i++){
                number +=Math.floor(Math.random() * 10).toString();
            }
            alert(number);
        }else{
            alert("Enter 10 digits!")
        }
    }
    const handleOTP = () => {
        console.log(otpSent)
        setIsOTP(!isOTP)
        setIsLogin(!isLogin)
    }
    const handleForgot = () => {
        setIsLogin(false)
        setIsForgot(!isForgot)
    }
    const verifyOTP = () => {
        if(otp.length===4){
            setValidateOTP(true)
        }
    }

    const handleRecovery = () => {
        alert("Account recovery email sent to ", email)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(isOTP){
            if(validateOTP){
                console.log("Signing in with OTP");
                dispatch(otpRoute({ number, otp }, navigate))
            }
        }else{
            if(!email && !password){
                alert('Enter email and password')
            // console.log ({name , email, password})
            }
            if(isSignup){
                if(!name){
                    alert("Enter a name to continue")
                }
                dispatch(signup({ name, email, password }, navigate))
            }else{
                dispatch(login({ email, password }, navigate))
            }
        }
    }

    return (
        <section class='auth-section'>
            {isSignup && <AboutAuth />}
            <div class='auth-container-2'>
                { (isLogin || isOTP) && <img src={icon} alt='stack overflow' className='login-logo'/>}
                {(isLogin || isSignup) && <form onSubmit={handleSubmit}>
                    {
                        isSignup && (
                            <label htmlFor='name'>
                                <h4>Display Name</h4>
                                <input type="text" id='name' name='name' onChange={(e) => {setName(e.target.value)}}/>
                            </label>
                        )
                    }
                    <label htmlFor="email" className='inputBox'>
                        <h4>Email</h4>
                        <input type="email" name='email' id='email' onChange={(e) => {setEmail(e.target.value)}}/>
                    </label>
                    <label htmlFor="password" className='inputBox'>
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                            <h4>Password</h4>
                            { isLogin && <button type='button' id='forgot' className='handle-switch-btn' onClick={handleForgot}>{'Forgot Password?'}</button> }
                        </div>
                        <input type="password" name='password' id='password' onChange={(e) => {setPassword(e.target.value)}}/>
                        { isSignup && <p style={{ color: "#666767", fontSize:"13px"}}>Passwords must contain at least eight<br />characters, including at least 1 letter and 1<br /> number.</p> }
                    </label>
                    {
                        isSignup && (
                            <label htmlFor='check'>
                                <input type="checkbox" id='check'/>
                                <p style={{ fontSize:"13px"}}>Opt-in to receive occasional,<br />product updates, user research invitations,<br />company announcements, and digests.</p>
                            </label>
                        )
                    }
                    <button type='submit' className='auth-btn'>{ isSignup ? 'Sign up': 'Log in'}</button>
                    {
                        isSignup && (
                            <p style={{ color: "#666767", fontSize:"13px"}}>
                                By clicking “Sign up”, you agree to our 
                                <span style={{ color: "#007ac6"}}> terms of<br /> service</span>,
                                <span style={{ color: "#007ac6"}}> privacy policy</span> and 
                                <span style={{ color: "#007ac6"}}> cookie policy</span>
                            </p>
                        )
                    }
                    {!isSignup && <div>
                    <h5>OR</h5>
                    <button type='button' className='handle-switch-btn' onClick={handleOTP}>{'Log in with OTP'}</button>
                    </div>}
                </form>}
                {isOTP && <form onSubmit={handleSubmit}>
                    <label htmlFor="number" className='inputBox'>
                        <h4>Mobile Number</h4>
                        <input type="number" name='number' id='number' onChange={(e) => {setNumber(e.target.value)}} maxLength= "10"/>
                        <div className='send-otp'>
                        <button type='submit' className='glow-on-hover' onClick={sendOTP} disabled={otpSent}>{'Send OTP'}</button>
                        </div>
                    </label>
                    <label htmlFor="otp" className='inputBox'>
                        <h4>Enter OTP</h4>
                        <input type="password" name='otp' id='otp' onChange={(e) => {setOTP(e.target.value)}} disabled={!otpSent} maxLength= "4"/>
                    </label>
                    <button type='submit' className='auth-btn' disabled={!otpSent} onClick={verifyOTP}>{ isSignup ? 'Sign up': 'Log in'}</button>
                    {!isSignup && <div>
                    <h5>OR</h5>
                    <button type='button' className='handle-switch-btn' onClick={handleOTP}>{'Log in with Password'}</button>
                    </div>}
                </form>}
                {isForgot && <form id='forgot-psswrd-form'>
                    <p className='info'>
                    Forgot your account’s password or having trouble logging into your Team?
                    Enter your email address and we’ll send you a recovery link.
                    </p>
                    <label htmlFor="email">
                        <h4>Email</h4>
                        <input type="email" name='email' id='email' onChange={(e) => {setEmail(e.target.value)}}/>
                    </label>
                    <button type='submit' className='auth-btn' onClick={handleRecovery}>{'Send recovery email'}</button>
                </form>}
                {(isLogin || isOTP || isSignup) && <p>
                    {isSignup ? 'Already have an account?' : "Don't have an account?"}
                    <button type='button' className='handle-switch-btn' onClick={handleSwitch}>{ isSignup ? "Log In" : 'Sign Up'}</button>
                </p>}
            </div>
        </section>
    )
}

export default Auth
