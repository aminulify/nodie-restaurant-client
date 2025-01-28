import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../Providers/AuthProvider';
import useAxiosSecure from '../../CustomHook/useAxiosSecure';
import { useQueries } from '@tanstack/react-query';

const PaymentHistory = () => {
    const {user} = useContext(AuthContext);
  
    const [payout, setPayout] = useState([]);

    useEffect(()=>{
        fetch(`https://nodie-restaurant-api.sarkbd.com/user_payout/${user.email}`)
        .then(res=>res.json())
        .then(data=> setPayout(data))
    },[])

    
    return (
        <div className="overflow-x-auto h-screen w-[90%] p-10 bg-white shadow-md my-10">
            {/* title change  */}
            <Helmet>
                <title>Nodie Cods | Users</title>
            </Helmet>
            
                    <h2 className="lg:text-3xl md:text-3xl text-2xl font-bold mb-3">Payment History: {payout?.length || 0}</h2>
                    <table className="table">
                        {/* head */}
                        <thead className="my-3">
                        <tr className='bg-[#597445] text-white'>
                            <th className='text-[14px] text-center'>EMAIL</th>
                            <th className='text-[14px]'>QUANTITY</th>
                            <th className='text-[14px]'>PRICE</th>
                            <th className='text-[14px]'>PAYMENT DATE</th>
                            <th className='text-[14px]'>TRANSACTION</th>
                            
                        </tr>
                        </thead>
                        <tbody>
                        
                            {
                                payout?.map(item=>
                                    <tr className='font-medium' key={item?._id}>
                                    <td className='text-[14px]'>{item?.email}</td>
                                    <td className='text-[14px]'>{item?.quantity}</td>
                                    <td className='text-[14px]'>${item?.price}</td>
                                    <td className='text-[14px]'>{item?.data}</td>
                                    <td className='text-[14px]'>{item?.transactionId}</td>
                                    </tr>
                                )
                            }
                            
                        


                        {/* row 1 */}
                        
                            
                        </tbody>
      
                    </table>
            </div>
    );
};

export default PaymentHistory;