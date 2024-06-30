import { useQuery } from "@tanstack/react-query";

const useAllBookings = () => {
    const {data: allBookings=[], isLoading: loading, refetch} = useQuery({
        queryKey: ['AllBook'],
        queryFn: async()=>{
            const res = await fetch(`https://nodie-restaurant-server.vercel.app/bookings/`);
            return res.json();
        }
        
    })
    // console.log(bookings);
    return [allBookings, loading, refetch];
};

export default useAllBookings;