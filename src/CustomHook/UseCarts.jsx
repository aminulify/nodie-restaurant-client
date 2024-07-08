import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import useAxiosSecure from './useAxiosSecure';

const UseCarts = () => {
    const {user, loading } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();

    const { refetch, data: cart = [], isLoading} = useQuery({
        
        queryKey: ['carts', user?.email],
        // if loading false then code run next line or show loading
        enabled: !loading,
        // both way are right *****

        // queryFn: async() =>{
        //     const res = await fetch(`https://restaurant-cods.aminulify.com/carts?email=${user?.email}`, { headers: {
        //         authorization: `bearer ${token}` 
        //     }})

        //     return res.json();
        // },

        queryFn: async() =>{
            const res = await axiosSecure(`/carts?email=${user?.email}`)
            
            return res.data;
        },
      })
      
      return [cart, refetch, isLoading];
};

export default UseCarts;