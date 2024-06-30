import React from 'react';
import SectionTitle from '../../Componenets/SectionTItle/SectionTitle';
import { Helmet } from 'react-helmet-async';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { RiEditBoxLine } from "react-icons/ri";
import useMenu from '../../CustomHook/useMenu';
import Loading from '../../Shared/Loading/Loading';
import useAxiosSecure from '../../CustomHook/useAxiosSecure';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


const ManageItem = () => {
    const [menu, loading, refetch] = useMenu();
    const [axiosSecure] = useAxiosSecure();

    const handleDelete = (item) =>{
        
        Swal.fire({
            title: `Are you sure delete "${item.name}" Item?`,
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Cancel`,
            icon: 'error',
          }).then((result) => {
            
            if (result.isConfirmed) {

              
              axiosSecure.delete(`/menu/${item._id}`)
                .then(res=>{

                    console.log('delete',res.data);
                    refetch();

                    if(res.data.deletedCount>0){
                        Swal.fire({
                            title: "Deleted Successfully!",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false 
                        });

                        
                        
                    }
                });
            };
          });
        };


    return (
        <div className='m-10 bg-white shadow-md p-8 h-screen overflow-y-auto w-[90%]'>

            {
                loading && <Loading></Loading>
            }

            <SectionTitle heading="Manage All Items" subHeading="Products"></SectionTitle>  
            
            <Helmet>
                <title>Nodie Cods | Manage Items</title>
            </Helmet>

            <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className='bg-[#597445] text-white'>
                                <th className='text-[14px]'>NO</th>
                                <th className='text-[14px]'>ITEM IMAGE</th>
                                <th className='text-[14px]'>ITEM NAME</th>
                                <th className='text-[14px]'>PRICE</th>
                                <th className='text-[14px]'>Edit</th>
                                <th className='text-[14px]'>ACTION</th>
                                
                            </tr>
                        </thead>

                        <tbody>

                             {
                                menu.map((item,index)=><tr key={item._id}>
                                       
                                        <th className='md:mt-7 lg:mt-7'>{index+1}</th>
                                        <td>
                                            <div className="">
                                                <div className="avatar">
                                                <div className="mask w-24 h-20 rounded-md bg-cover bg-center">
                                                    <img src={item.image} alt="Loading..." />
                                                </div>
                                                </div>
                                            </div>
                                        </td>
                                        <th>
                                            <h2>{item.name}</h2>
                                            <br />
                                            <span className='rounded-sm bg-[#59744533] badge-sm'>Category: {item.category}</span>
                                        </th>
                                        <th>${item.price}</th>
                                        <th className=''>
                                            <Link to={`/dashboard/manage_items/update/${item._id}`}>
                                                <button className="p-3 bg-[#597445] rounded-sm text-white text-xl hover:bg-black duration-300"><RiEditBoxLine /></button>
                                            </Link>
                                            
                                        </th>
                                        <th className=''>
                                            <button onClick={()=>{handleDelete(item)}} className="p-3 bg-red-500 rounded-sm text-white text-xl hover:bg-red-600 duration-300"><RiDeleteBin6Line /></button>
                                        </th>
                                </tr>
                                )
                             }
                          
                        </tbody>
                      
                        
                    </table>
                    </div>
            </div>
           
       
 
    );
};

export default ManageItem;