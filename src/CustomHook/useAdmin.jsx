import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const {user, loading} = useContext(AuthContext);
    // console.log(loading);
    const [axiosSecure] = useAxiosSecure();
    
    const {data: isAdmin, isLoading: isAdminLoading} = useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled: !loading,
        queryFn: async() =>{
            const res = await axiosSecure.get(`/user/admin/${user?.email}`)     
            return res.data.admin;
            
        }
    })
    // console.log('is admin response', isAdmin, 'loading', isAdminLoading);
    return [isAdmin, isAdminLoading];
}
export default useAdmin;