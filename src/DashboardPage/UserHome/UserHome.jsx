import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { IoWalletOutline } from "react-icons/io5";
import { AiOutlineShop } from "react-icons/ai";
import useAxiosSecure from '../../CustomHook/useAxiosSecure';

const UserHome = () => {
    const {user} = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const [payout, setPayout] = useState([]);
    const [order, setOrder] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(()=>{
        axiosSecure.get('/all_payout')
        .then(data => setPayout(data.data))
    },[])
    
    const totalPrice =  payout.reduce((sum, currentVal)=> currentVal.price + sum, 0).toFixed(2);
    
    const products = payout.reduce((sum, currentVal)=> currentVal.quantity + sum,0)
    
    useEffect(()=>{
        axiosSecure.get('/cart_orders')
        .then(data=> setOrder(data.data))
    },[])


    useEffect(()=>{
        axiosSecure.get('/reviews')
        .then(data=> {
            const myReview = data.data.filter(item => item.name == user.displayName)
            setReviews(myReview);
        })
    },[])


    return (
        <div className='w-[90%] h-screen my-6 md:my-10'>
            <h2 className='text-3xl font-semibold mx-16 md:mx-0'><span className='heading-font text-4xl'>Welcome,</span> <span className='text-[#597445]'>{user.displayName}</span></h2>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-5 justify-center pt-8 pb-5">
  
            <div className="stat border-2 border-[#597445]  rounded-md bg-white shadow-sm">
                <div className="stat-figure text-secondary flex gap-2">
                <div className="text-3xl font-semibold text-black">Payment</div>
                <IoWalletOutline className='text-4xl text-[#597445]'/>
                </div>
               
                <div className="text-3xl font-bold ">${totalPrice}</div>
            </div>
            
            <div className="stat border-2 border-[#597445] rounded-md bg-white shadow-sm">
                <div className="stat-figure text-secondary flex gap-2">
                <div className="text-3xl font-semibold text-black">Products Sold</div>
                
                <AiOutlineShop className='text-4xl text-[#597445]'/>
                </div>
                <div className="text-3xl font-bold">{products}</div>
            </div>
            </div>

            
                <div className='my-3'>
                    <h2 className='text-3xl font-bold text-center'>Business Activities</h2>
                    <div className='flex justify-center gap-5 mx-10 md:mx-40 my-5'>
                        <div className='text-center border-2 border-[#597445] p-5 rounded-md text-lg font-semibold'>ORDERS <h2 className='text-4xl'>{order.length || 0}</h2></div>
                        <div className='text-center border-2 border-[#597445] p-5 rounded-md text-lg font-semibold'>REVIEWS<h2 className='text-4xl'>{reviews.length || 0}</h2></div>
                    </div>
                </div>
            </div>
        
    );
};

export default UserHome;