import { Helmet } from "react-helmet-async";
import SectionTitle from "../../Componenets/SectionTItle/SectionTitle";
import useAxiosSecure from "../../CustomHook/useAxiosSecure";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import UseBookings from "../../CustomHook/UseBookings";
import Loading from "../../Shared/Loading/Loading";


const UserBookings = () => {
    // const [bookings, setBookings] = useState([]);
    const [bookings, loading, refetch] = UseBookings();

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
  
    return (
        <div className="overflow-x-auto h-screen w-[90%] p-10 bg-white shadow-md my-10">
        {/* title change  */}
        <Helmet>
            <title>Nodie Cods | My Bookings</title>
        </Helmet>

        {/* loading  */}
        {
            loading && <Loading></Loading>
        }
        

        <div>
            <SectionTitle subHeading="-- What is my bookings status --" heading='My Bookings'></SectionTitle>
        </div>
        
                <h2 className="lg:text-3xl md:text-3xl text-2xl font-bold mb-3">My Total Bookings: {bookings.length}</h2>
                <table className="table">
                    {/* head */}
                    <thead className="my-3">
                    <tr className='bg-[#597445] text-white'>
                        <th className='text-[14px]'>NO</th>
                        <th className='text-[14px]'>GUEST NUMBER</th>
                        <th className='text-[14px]'>DATE / TIME</th>
                        <th className='text-[14px]'>STATUS</th>              
                        <th className='text-[14px]'>ACTION</th>              
                    </tr>
                    </thead>
                    <tbody>


                    {/* row 1 */}
                    
                        {
                            bookings.map((book, index) => <tr key={book._id}>

                                <th>{index+1}</th>
                                
                                <th>
                                   <p className=" bg-[#4e8c6737] badge-sm w-[50%] text-center rounded-md font-semibold">{book.guests} Guests</p> 
                                </th>

                                <th>{book.date} | {book.formattedTime}</th>
                                
                                <th><p className={` bg-[#4e8c6737] badge-sm w-[80%] text-center rounded-md font-semibold ${book?.status !== 'Pending' ? 'bg-green-500 text-white':''}`}>{book?.status || 'Pending'}</p></th>

                                <th className="text-center">
                                    <button onClick={()=>handleBookingDelete(book._id)} className="p-2 bg-red-500 text-xl text-white hover:bg-black duration-300 rounded-sm"><MdDelete/></button>
                                </th>
                                
                            </tr>)
                        }
                                   
                    
                    </tbody>
  
                </table>
        </div>
    );
};

export default UserBookings;