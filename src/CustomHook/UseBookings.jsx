import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const useBookings = () => {
    const {user} = useContext(AuthContext);
    const {data: bookings=[], isLoading: loading, refetch} = useQuery({
        queryKey: ['book'],
        queryFn: async()=>{
            const res = await fetch(`http://nodie-restaurant.aminulify.com/bookings/${user?.email}`);
            return res.json();
        }
        
    })
   
    return [bookings, loading, refetch];
};

export default useBookings;