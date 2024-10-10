import { FaUserShield, FaUsers } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Loading from "../../Shared/Loading/Loading";
import Swal from "sweetalert2";
import { useQuery } from '@tanstack/react-query'
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../CustomHook/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";



const AllUsers = () => {

    const [axiosSecure] = useAxiosSecure();
    const {loading} = useContext(AuthContext);

    const { data: allUsers = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        enabled: !loading,
        queryFn: async () => {
          const res = await axiosSecure.get('/users')
          return res.data;
        },
      })
   

    const handledeleteFirebaseUser = (id, name) =>{
        
                Swal.fire({
                    title: `Are you sure delete "${name}" account?`,
                    showCancelButton: true,
                    confirmButtonText: "Delete",
                    denyButtonText: `Cancel`,
                    icon: 'warning',
                  }).then((result) => {
                    
                    if (result.isConfirmed) {
                      refetch();
                      fetch(`https://restaurant-cods.aminulify.com/users/${id}`,{
                                method: 'DELETE'
                            })
                        .then(res=>res.json())
                        .then(data=>{
                            if(data.deletedCount>0){

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
        
    const handleMakeAdmin = (user)=>{
        fetch(`https://restaurant-cods.aminulify.com/users/admin/${user._id}`,{
            method: 'PATCH'
        })
        .then(res=>res.json())
        .then(data=>{
            
            if(data.modified){
                refetch();
                Swal.fire({
                    title: `${user.name} is an Admin Now!`,
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false 
                })
            }
        })
    }            
    

    return (
        <div className="overflow-x-auto h-screen w-[90%] p-10 bg-white shadow-md my-10">
            {/* title change  */}
            <Helmet>
                <title>Nodie Cods | Users</title>
            </Helmet>
            {/* loading  */}
            {
                isLoading && <Loading></Loading>
            }
                    <h2 className="lg:text-3xl md:text-3xl text-2xl font-bold mb-3">Total Users: {allUsers.length}</h2>
                    <table className="table">
                        {/* head */}
                        <thead className="my-3">
                        <tr className='bg-[#597445] text-white'>
                            <th className='text-[14px]'>NO</th>
                            <th className='text-[14px]'>NAME</th>
                            <th className='text-[14px]'>EMAIL</th>
                            <th className='text-[14px]'>ROLE</th>
                            <th className='text-[14px]'>ACTION</th>
                            
                        </tr>
                        </thead>
                        <tbody>


                        {/* row 1 */}
                        
                            {
                                allUsers.map((user, index) => <tr key={user._id}>

                                    <th>{index+1}</th>
                                    
                                    <th>
                                        {user.name}
                                    </th>

                                    <th>{user.email}</th>
                                    
                                    <th>
                                        <div onClick={()=>handleMakeAdmin(user)}>
                                            {
                                                user.role === 'admin' ? <div className="badge badge-sm p-2 bg-[#597445] text-white border-[#597445]">Admin</div> : <button className="p-3 bg-[#597445] rounded-sm text-white text-xl hover:bg-[#ce940c] duration-300"><FaUserShield /></button>
                                            }
                                             
                                        </div>
                                    </th>
                                    <th>
                                        <button onClick={()=>{handledeleteFirebaseUser(user._id, user.name, user)}} className="p-3 bg-red-500 rounded-sm text-white text-xl hover:bg-red-600 duration-300"><RiDeleteBin6Line /></button>
                                    </th>
                                </tr>)
                            }
                                       
                        
                        </tbody>
      
                    </table>
            </div>
    );
};

export default AllUsers;