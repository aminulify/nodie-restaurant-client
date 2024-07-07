import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from 'sweetalert2';
import Loading from '../../Shared/Loading/Loading';
import { FaUserShield } from "react-icons/fa6";
import UseCarts from '../../CustomHook/UseCarts';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import SectionTitle from '../../Componenets/SectionTItle/SectionTitle';

const MyCart = () => {
    const [ cart, refetch, isLoading ] = UseCarts();
    // console.log('cart',cart.length);

    const [loading, setLoading] = useState(false);

    // ***** reduce method
    // const total = cart.reduce((contain previous sum value, each item)=> each item price + contain previous sum value, initial value)
    let total;
    if(cart.length>0){
        total = cart.reduce((sum, item)=> item.price + sum, 0).toFixed(1);
    }

    
    const handleDelete = (item) =>{
        setLoading(true);

        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              fetch(`https://restaurant-cods.aminulify.com/carts/${item._id}`,{
                method: 'DELETE'
              })
              .then(res=>res.json())
              .then(data=>{
                console.log(data)
                if(data.deletedCount>0){

                    refetch();
                    setLoading(false);

                    Swal.fire({
                        title: "Deleted Successful!",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false
                      });     
                }
              })
            }
          });
    }
    return (
        <div className='m-10 bg-white shadow-md p-8 h-screen overflow-y-auto w-[90%]'>
            <Helmet>
                <title>Nodie Cods | My Cart</title>
            </Helmet>
                {
                    loading || isLoading ? <Loading></Loading>:''
                }
                <div className='flex justify-between items-center mb-4 '>
                    <h2 className='md:text-2xl font-bold text-[#37473d]'>My Cart = {cart.length}</h2>
                    <h2 className='md:text-2xl font-bold text-[#37473d]'>Total Value = ${total||0} </h2>
                    <div>
                        {
                            total>0 ? <Link to='/dashboard/payment'>
                            {/* ****     */}
                            {/* *** PASSING DATA USING STATE */}
                            {/* <Link to='/dashboard/payment' state={total}> */}
                                <button className='rounded-sm font-medium bg-[#597445] py-2 px-4 hover:bg-black text-white duration-300'>PAY</button>
                            </Link> : ''
                        }
                </div>
                </div>
                

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                        <tr className='bg-[#597445] text-white'>
                            <th className='text-[14px] hidden md:block lg:block'>NO</th>
                            <th className='text-[14px]'>ITEM IMAGE</th>
                            <th className='text-[14px]'>ITEM NAME</th>
                            <th className='text-[14px]'>PRICE</th>
                            <th className='text-[14px]'>ACTION</th>
                            
                        </tr>
                        </thead>
                        <tbody>


                        {/* row 1 */}
                        
                            {
                                cart.map((item, index) => <tr key={item._id}>
                                    <th className='hidden md:block lg:block md:mt-7 lg:mt-7'>{index+1}</th>
                                    <td>
                                    <div className="">
                                        <div className="avatar">
                                        <div className="mask w-24 h-20 rounded-md bg-cover bg-center">
                                            <img src={item.image} />
                                        </div>
                                        </div>
                                    </div>
                                    </td>
                                    <th>
                                        {item.name}
                                        <br />
                                        <span className='rounded-sm bg-[#37473d37] badge-sm'>Category: {item?.category || 'No Category Found'}</span>
                                    </th>
                                    <th>${item.price}</th>
                                    <th className=''>
                                        <button onClick={()=>{handleDelete(item)}} className="p-3 bg-red-500 rounded-sm text-white text-xl hover:bg-red-600 duration-300"><RiDeleteBin6Line /></button>
                                    </th>
                                </tr>)
                            }
                            
                        
                     
                        
                        </tbody>
                       
                        
                        
                    </table>
                    </div>
            </div>
       
    );
};

export default MyCart;