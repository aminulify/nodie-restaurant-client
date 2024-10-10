import React, { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { FaFacebook } from "react-icons/fa";
import { AiFillGoogleCircle } from "react-icons/ai";
import { FaGithub } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import { Helmet } from 'react-helmet-async';

import Swal from 'sweetalert2';


const Signup = () => {
    const reCaptchaRef = useRef(null);
    const [showSubmitBtn, setShowSubmitBtn] = useState(false);
    const [validMsg, setValidMsg]  = useState(null);
    const [validColor, setValidColor] = useState(true);

    const [alreadyEmailSignUp, setAlreadyEmailSignUp] = useState();

    const {createUser, googleAuth, facebookAuth, updateUserProfile}  = useContext(AuthContext);

    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';
    
    const navigate = useNavigate();

    useEffect(()=>{
        loadCaptchaEnginge(4); 
    },[])

    const handleSignUp = (e) =>{
        e.preventDefault();
        setAlreadyEmailSignUp()
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photo = form.photo.value;
        

        // send user registration data in database 
        // send user registration data in database 
        const saveUserData = {name, email, photo};
        fetch('https://restaurant-cods.aminulify.com/users',{
            method: 'POST',
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify(saveUserData)
        })
        .then(res=>res.json())
        .then(data=>{
            
            setAlreadyEmailSignUp(data?.message);
                
          
            

            if(data.insertedId){
                
                Swal.fire({
                    title: "Successfully Sign Up!",
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
            }
        })
        
        createUser(email,password)
            .then(result=>{
                const user = result.user;

                updateUserProfile(name, photo)

                    navigate(from, { replace: true });             
                    setShowSubmitBtn(false);
                    e.target.reset();
            })
            .catch(e=>console.log(e));

    }


    // google pop up sign up 
    const handleGooglePopUp = () =>{
        googleAuth()
        .then((result)=>{
            const user = result.user;

                    // send user registration data in database 
                    // send user registration data in database 
                    const saveUserData = {name: user.displayName, email:user.email, photo: user.photoURL};
            
                    fetch('https://restaurant-cods.aminulify.com/users',{
                        method: 'POST',
                        headers: {
                            'content-type':'application/json'
                        },
                        body: JSON.stringify(saveUserData)
                    })
                    .then(res=>res.json())
                    .then(()=>{
                            
                            Swal.fire({
                                title: "Successfully Sign Up!",
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
                        }
                    )
              navigate(from, {replace: true});
        })
        .catch(e=>console.log(e));
    }

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
              navigate(from, { replace:true });
        })
        .catch(e=>console.log(e));
    }

    const handleValidateCaptcha = () =>{
        const user_captcha_value = reCaptchaRef.current.value;
        if(validateCaptcha(user_captcha_value)){
            setValidMsg('Valid Captcha')
            setShowSubmitBtn(true);
            setValidColor(true);
        }
        else{
            setValidMsg('Invalid Captcha')
            setShowSubmitBtn(false);
            setValidColor(false);
        }
    }
    return (
        <div className='bg-white overflow-hidden'>
            <Helmet>
                <title>Nodie Cods | Sign Up</title>
            </Helmet>

            
            <div className='md:w-[500px] max-w-[1000px] mx-10  md:mx-auto pt-24 md:pt-16 pb-10'>
        
                    <div className="right-side md:pl-14 px-14 md:pt-10">
                        <h2 className='text-center text-3xl text-[#597445] font-bold'>Sign Up</h2>

                        {/* react form hook = it is good for show form error */}
                        {/* react form hook = it is good for show form error */}
                        <form onSubmit={handleSignUp}>
                            <div className='mt-5 flex flex-col justify-center'>
                                <p className='pb-2'>Name</p>
                                <input type="text" placeholder='Enter Your Name' className='py-2 px-3 w-[100%] rounded-md bg-transparent backdrop-blur-sm border border-[#597445]' name='name' required/>
                            </div>
                            <div className='mt-5 flex flex-col justify-center'>
                                <p className='pb-2'>Email</p>
                                <input type="email" placeholder='example@gmail.com' className='py-2 px-3 w-[100%] rounded-md bg-transparent backdrop-blur-sm border border-[#597445]' name='email' required/>
                                <span className='text-red-500 pt-1'>{alreadyEmailSignUp}</span>
                            </div>

                            <div className='mt-3 flex flex-col justify-center'>
                                <p className='pb-2'>Photo URL</p>
                                <input type="text" placeholder='Enter your photo URL here' className='py-2 px-3 w-[100%] rounded-md bg-transparent backdrop-blur-sm border border-[#597445]' name='photo' required/>
                            </div>

                            <div className='mt-3 flex flex-col justify-center'>
                                <p className='pb-2'>Password</p>
                                <input type="password" placeholder='Password must be 6 characters' className='py-2 px-3 w-[100%] rounded-md bg-transparent backdrop-blur-sm border border-[#597445]' name='password' required/>
                                <p className='mt-2'>Forget Password?</p>
                            </div>

                            
                            
                            {/* RECAPTCH  */}
                            <div className='mt-3 flex flex-col justify-center relative'>
                                <LoadCanvasTemplate />
                                <input type="text" ref={reCaptchaRef} placeholder='Type the text above' className='py-2 px-3 w-[100%] rounded-md bg-transparent backdrop-blur-sm border border-[#597445]' name='captcha' />

                                <div onClick={handleValidateCaptcha} className={`absolute top-14 right-[5px] text-white w-12 h-7 rounded-md ${validColor ? 'bg-green-500' : 'bg-red-500'} grid place-items-center cursor-pointer`}>Valid</div>
                                <span className={`${validColor ? 'text-green-500' : 'text-red-500'}`}>{validMsg}</span>
                            </div>

                            {/* button  */}
                            {
                                showSubmitBtn ? <input type='submit' className='py-2 bg-[#597445] w-full text-center my-3 text-white text-[16px] hover:text-white hover:bg-black duration-300 rounded-md cursor-pointer'/> : <input type='submit' className='py-2 bg-slate-400 w-full text-center my-3 text-white text-[16px] rounded-md'/>
                            }
                            
                        </form>

                        
                        <div className='text-center my-2 bg-white'>
                            <Link to='/login' className='text-medium text-[#597445] hover:underline'>Already registered? Go to log in</Link>
                            <p className='text-medium text-slate-600'>Or sign Up with</p>
                        </div>

                        {/* icon  */}
                        <div className='flex gap-4 text-4xl justify-center mt-2 bg-white'>
                            <FaFacebook onClick={handleFacebookPopUp} className='border-[1px] text-[#597445] rounded-full p-1 border-[#597445] hover:text-slate-800 duration-300 cursor-pointer' />
                            <AiFillGoogleCircle onClick={handleGooglePopUp} className='border-[1px] text-[#597445] rounded-full p-1 border-[#597445] hover:text-slate-800 duration-300 cursor-pointer' />
                            <FaGithub onClick={handleGooglePopUp} className='border-[1px] text-[#597445] rounded-full p-1 border-[#597445] hover:text-slate-800 duration-300 cursor-pointer'/>
                        </div>

                        
                    </div>
            </div>
        </div>
    );
};

export default Signup;