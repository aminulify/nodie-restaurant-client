import React from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../Componenets/SectionTItle/SectionTitle';
import useBookings from '../../CustomHook/UseBookings';
import { MdDelete, MdOutlineDoneAll } from "react-icons/md";
import { BsQuestion } from "react-icons/bs";
import useAxiosSecure from '../../CustomHook/useAxiosSecure';
import Swal from 'sweetalert2';
import useAllBookings from '../../CustomHook/useAllBookings.jsx';

const ManageBookings = () => {
    const [bookings, refetch] = useBookings();
    const [allBookings] = useAllBookings();
    // console.log(allBookings);

    const [axiosSecure] = useAxiosSecure();

    const handleBookingDelete = (id) =>{

        axiosSecure.delete(`/bookings/${id}`)
        .then(data=>{
            if(data.data.deletedCount > 0){
                Swal.fire({
                    title: "Deleted Successfully!",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false 
                });

                refetch();
            }
        })
    }

    const handleApprove = (id) =>{
        // console.log(id);
        fetch(`https://restaurant-cods.aminulify.com/bookings/${id}`,{
            method: 'PATCH',
        })
        .then(res=>res.json())
        .then(data=>{
    
            if(data.modified){
                refetch();
                Swal.fire({
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false 
                })
            }
        })
    }

    return (
        <div className='w-[90%] h-screen bg-white'>
            <Helmet>
                <title>Nodie Cods | Manage Bookings</title>
            </Helmet>

            <div className='py-10'>
                <SectionTitle heading="Manage All Bookings" subHeading="--- At a Glance! ---"></SectionTitle>
            </div>

            <h2 className="lg:text-3xl md:text-3xl text-2xl font-bold mb-3">My Total Bookings: {allBookings.length}</h2>
                <table className="table">
                    {/* head */}
                    <thead className="my-3">
                    <tr className='bg-[#597445] text-white'>
                        <th className='text-[14px] text-center'>EMAIL</th>
                        <th className='text-[14px]'>GUESTS</th>
                        <th className='text-[14px]'>DATE / TIME</th>
                        <th className='text-[14px]'>STATUS</th>              
                        <th className='text-[14px]'>ACTION</th>              
                    </tr>
                    </thead>

                    <tbody className='items-center'>
                    {/* row 1 */}
                        {
                            allBookings.map(item=><tr key={item._id} className=''>
                                <th className='text-[14px] text-center'>{item.email}</th>

                                <th>
                                   <p className=" bg-[#4e8c6737] badge-sm w-[50%] text-center rounded-md font-semibold">{item.guests} Guests</p> 
                                </th>
                                
                                <th className='text-[14px]'>{item.date} / {item.formattedTime}</th>

                                <td><button className='p-2' onClick={()=>handleApprove(item._id)}>
                                <p className={`text-center bg-[#4e8c6737] badge badge-sm px-2 text-semibold py-2 ${item.status==="Approved" && 'bg-[#597445] text-white'}`}>{item.status === "Pending" ? "Pending" : "Approved" }</p>
                                </button></td>     


                                <th className="text-center">
                                    <button onClick={()=>handleBookingDelete(item._id)} className="p-2 bg-red-500 text-xl text-white hover:bg-black duration-300 rounded-sm"><MdDelete/></button>
                                </th>             
                            </tr>)
                        }
                    
                                   
                    
                    </tbody>
  
                </table>
            
        </div>
    );
};

export default ManageBookings;