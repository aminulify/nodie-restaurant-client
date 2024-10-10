import React, { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { FaFacebook } from "react-icons/fa";
import { AiFillGoogleCircle } from "react-icons/ai";
import { FaGithub } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import UseCarts from '../CustomHook/UseCarts';
import { FaHome } from "react-icons/fa";

const Login = () => {
    const reCaptchaRef = useRef(null);
    const [showSubmitBtn, setShowSubmitBtn] = useState(false);
    const [validMsg, setValidMsg]  = useState(null);
    const [validColor, setValidColor] = useState(true);
    const [wrongEmailPass, setWrongEmailPass] = useState(null);

    const {signInUser, googleAuth, facebookAuth} = useContext(AuthContext);

    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';

    useEffect(()=>{
        loadCaptchaEnginge(4); 
    },[])

    const navigate = useNavigate();

    const handleLogin = (e) =>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
      

        signInUser(email, password)
            .then(result=>{
                const user = result.user;
              

                Swal.fire({
                    title: "Successfully Login!",
                    text: "Now go and explore...",
                    icon: "success",
                    showClass: {
                        popup: `
                          animate__animated
                          animate__fadeInUp
                          animate__faster
                        `
                      },
                      hideClass: {
                        popup: `
                          animate__animated
                          animate__fadeOutDown
                          animate__faster
                        `
                      }
                  });

              

                  navigate(from, {replace: true});
                  setShowSubmitBtn(false);
            })
            .catch(()=>{
                setWrongEmailPass('Wrong email and password. Try again!')
            })
    }

    // google authentication 
    const handleGooglePopUp = () =>{
        googleAuth()
        .then((result)=>{
            const user = result.user;
          

            Swal.fire({
                title: "Successfully Login!",
                text: "Now go and explore...",
                icon: "success",
                showClass: {
                    popup: `
                      animate__animated
                      animate__fadeInUp
                      animate__faster
                    `
                  },
                  hideClass: {
                    popup: `
                      animate__animated
                      animate__fadeOutDown
                      animate__faster
                    `
                  }
              });
            
              navigate(from, {replace: true});
        })
        .catch(e=>console.log(e));
    }

    // facebook authentication 
    const handleFacebookPopUp = () =>{
        facebookAuth()
        .then((result)=>{
            const user = result.user;
            

            Swal.fire({
                title: "Successfully Login!",
                text: "Now go and explore...",
                icon: "success",
                showClass: {
                    popup: `
                      animate__animated
                      animate__fadeInUp
                      animate__faster
                    `
                  },
                  hideClass: {
                    popup: `
                      animate__animated
                      animate__fadeOutDown
                      animate__faster
                    `
                  }
              });
         
              
              navigate(from, {replace: true});
        })
        .catch(e=>console.log(e));
    }

    const handleValidateCaptcha = () =>{
        const user_captcha_value = reCaptchaRef.current.value;
        if(validateCaptcha(user_captcha_value)){
            setValidColor(true);
            setValidMsg('Valid Captcha')
            setShowSubmitBtn(true);
            
        }
        else{
            setValidColor(false);
            setValidMsg('Invalid Captcha')
            setShowSubmitBtn(false);
            
        }
    }
    return (
        <div className='bg-white grid place-items-center'>
            
            <Helmet>
                <title>Nodie Cods | Login</title>
            </Helmet>
            
            <div className='md:w-[500px] w-full max-w-[1000px] mx-10 md:mx-auto items-center pt-5 my-24'>
        
                    <div className="right-side md:pr-14 px-14">
    
                        <h2 className='text-center text-3xl font-bold text-[#597445]'>Login</h2>

                        <form onSubmit={handleLogin}>
                            <div className='mt-5 text-[#597445] flex flex-col justify-center'>
                                <p className='pb-2'>Email</p>
                                <input type="text" placeholder='example@gmail.com' className='py-2 px-3 w-[100%] rounded-md bg-transparent backdrop-blur-sm border border-[#597445]' name='email' required/>
                            </div>
                            <div className='mt-3 flex flex-col justify-center'>
                                <p className='pb-2'>Password</p>
                                <input type="password" placeholder='Password must be 6 characters' className='py-2 bg-transparent backdrop-blur-sm px-3 w-[100%] rounded-md border border-[#597445]' name='password' required/>
                                <p className='mt-2'>Forget Password?</p>
                            </div>
                            
                            {/* RECAPTCH  */}
                            <div className='mt-3 flex flex-col justify-center relative'>
                                <LoadCanvasTemplate />
                                <input type="text" ref={reCaptchaRef} placeholder='Type the text above' className='py-2 px-3 w-[100%] rounded-md bg-transparent backdrop-blur-sm border border-[#597445]' name='captcha' />

                                <div onClick={handleValidateCaptcha} className={`absolute top-14 right-[5px] text-white w-12 h-7 rounded-md ${validColor ? 'bg-green-500' : 'bg-red-500'} grid place-items-center cursor-pointer`}>Valid</div>
                                <span className={`${validColor ? 'text-green-500' : 'text-red-500'}`}>{validMsg}</span>
                                <span className='text-red-500'>{wrongEmailPass}</span>
                            </div>

                            {/* button  */}
                        
                            {
                                showSubmitBtn ? <button type='submit' className='py-2 bg-[#597445] w-full text-center my-3 text-white text-[16px] hover:text-white hover:bg-black duration-300 rounded-md cursor-pointer'>Login</button> : 
                                <button type='submit' className='py-2 bg-slate-400 w-full text-center my-3 text-white text-[16px] rounded-md'>Login</button>
                            }
                            
                        </form>

                        
                        <div className='text-center my-2'>
                            <Link to='/signup' className='text-medium text-[#597445] hover:underline'>New here? Create a New Account</Link>
                            <p className='text-medium text-slate-600'>Or sign in with</p>
                        </div>

                        {/* icon  */}
                        <div className='flex gap-4 text-4xl justify-center mt-2'>
                        <FaFacebook onClick={handleFacebookPopUp} className='border-[1px] text-[#597445] rounded-full p-1 border-[#597445] hover:text-slate-800 duration-300 cursor-pointer' />
                            <AiFillGoogleCircle onClick={handleGooglePopUp} className='border-[1px] text-[#597445] rounded-full p-1 border-[#597445] hover:text-slate-800 duration-300 cursor-pointer' />
                            <FaGithub onClick={handleGooglePopUp} className='border-[1px] text-[#597445] rounded-full p-1 border-[#597445] hover:text-slate-800 duration-300 cursor-pointer'/>
                        </div>

                        
                    </div>
            </div>
        </div>
    );
};

export default Login;