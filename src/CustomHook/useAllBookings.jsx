import { useQuery } from "@tanstack/react-query";

const useAllBookings = () => {
    const {data: allBookings=[], isLoading: loading, refetch} = useQuery({
        queryKey: ['AllBook'],
        queryFn: async()=>{
            const res = await fetch(`https://restaurant-cods.aminulify.com/bookings/`);
            return res.json();
        }
        
    })
   
    return [allBookings, loading, refetch];
};

export default useAllBookings;