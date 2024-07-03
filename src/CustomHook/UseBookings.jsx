import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const useBookings = () => {
    const {user} = useContext(AuthContext);
    const {data: bookings=[], isLoading: loading, refetch} = useQuery({
        queryKey: ['book'],
        queryFn: async()=>{
            const res = await fetch(`https://nodie-restaurant-server-aminulify-md-aminul-islams-projects.vercel.app/bookings/${user?.email}`);
            return res.json();
        }
        
    })
    // console.log(bookings);
    return [bookings, loading, refetch];
};

export default useBookings;