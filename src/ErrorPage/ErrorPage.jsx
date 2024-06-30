import React from 'react';
import errorImg from '/assets/404.png'
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='w-full h-screen text-center bg-white my-24 md:my-12 px-12'>

            <img src={errorImg} className='mx-auto' width={800} alt="" />
            <Link to='/'><button className='bg-[#597445] text-white px-8 py-2 text-center hover:bg-[#2d3b23] duration-300 mt-8'>Go Back</button></Link>
        </div>
    );
};

export default ErrorPage;