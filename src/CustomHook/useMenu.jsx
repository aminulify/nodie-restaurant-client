import { useQuery } from "@tanstack/react-query";

const useMenu = () => {
    const {data: menu=[], isLoading: loading, refetch} = useQuery({
        queryKey: ['menu'],
        queryFn: async()=>{
            const res = await fetch('http://nodie-restaurant.aminulify.com/menu');
            return res.json();
        }
        
    })
    return [menu, loading, refetch];
};

export default useMenu;