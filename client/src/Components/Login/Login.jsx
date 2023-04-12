import React, { useEffect, useState } from 'react';
import './Login.css';
import '../../App.css'
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios'

// Import our assets
import video from '../../Assets/video.mp4'
import logo from '../../Assets/logo.png'

//Import Icons
import { FaUserShield } from 'react-icons/fa'
import { BsFillShieldLockFill } from 'react-icons/bs'
import { AiOutlineSwapRight } from 'react-icons/ai'



const Login = () => {


    // UseState Hook to store inputs
    const [loginUserName, setLoginUserName] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const navigateTo = useNavigate();

    // Let us now show the message to the user
    const [loginStatus, setLoginStatus] = useState('');
    const [statusHolder, setStatusHolder] = useState('message');

    // Onclick let us get what the user has entered
    const loginUser = (e) => {
        // Lets prevent submitting
        e.preventDefault();
        // we shall require Axios to create an API that connents to the server - Lets install that
        Axios.post('http://localhost:3002/login', {
            // create variable to send to the server through the route
            LoginUserName: loginUserName,
            LoginPassword: loginPassword
        }).then((response) => {
            console.log();
            // I want to catch the response first - We have data successfully from
            // the database and we can catch an error if the credentails are wrong.
            if (response.data.message || loginUserName == '' || loginPassword ==  '') {
                // if creditial dont match
                navigateTo('/') //so we shall navigate to the same login page
                setLoginStatus(`Credentials Don't Exist!`)
            }
            else {
                navigateTo('/dashboard') //if the credentials match we shall navigate to the dashboard
            }
        })
    }

    useEffect(() => {
        if (loginStatus !== '') {
            setStatusHolder('showMessage') //show message
            setTimeout(() => {
                setStatusHolder('message') //hide it after 4s
            }, 2000);
        }
    }, [loginStatus])

    // Lets clear the form on submit
    const onSubmit = () => {
        setLoginUserName('')
        setLoginPassword('')
    }

    return (
        <div className="loginPage flex">
            <div className="container flex">

                <div className="videoDiv">
                    <video src={video} autoPlay muted loop></video>

                    <div className="textDiv">
                        <h2 className="title">Create And Sell Extraordinary Products</h2>
                        <p>Adopt the peace of nature!</p>
                    </div>

                    <div className="footerDiv flex">
                        <span className="text">Don't have an account?</span>
                        <Link to={'/register'}>
                            <button className="btn">Sign Up</button>
                        </Link>
                    </div>
                </div>

                <div className="formDiv flex">
                    <div className="headerDiv">
                        <img src={logo} alt="Logo Image" />
                        <h3>Welcome Back!</h3>
                    </div>

                    <form action="" className="form grid" onSubmit={onSubmit}>
                        <span className={statusHolder}>{loginStatus}</span>

                        <div className="inputDiv">
                            <label htmlFor="username">Username</label>
                            <div className="input flex">
                                <FaUserShield className="icon" />
                                <input type="text" id='username' placeholder='Enter Username'
                                    onChange={(event) => setLoginUserName(event.target.value)} />
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="password">Password</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className="icon" />
                                <input type="password" id='password' placeholder='Enter Password'
                                    onChange={(event) => setLoginPassword(event.target.value)} />
                            </div>
                        </div>

                        <button type='submit' className='btn flex' onClick={loginUser}>
                            <span>Login</span>
                            <AiOutlineSwapRight className="icon" />
                        </button>

                        <span className="forgotPassword">
                            Forgot your password? <a href="">Click Here</a>
                        </span>

                    </form>
                </div>

            </div>
        </div>
    )
}

export default Login