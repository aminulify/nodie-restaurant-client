import {React, useState, useEffect} from 'react';
import OurShopShowItem from './OurShopShowItem';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const OurShopItems = () => {
    const categories = ['salad', 'pizza', 'soups', 'desserts', 'drinks'];
    const {category} = useParams();
    const initialIndex = categories.indexOf(category);
    const initialIndexValue = initialIndex + 1;
    // console.log('sad',initialIndexValue);

    const [salad, setSalad] = useState([]);
    const [dessert, setDessert] = useState([]);
    const [pizza, setPizza] = useState([]);
    const [soup, setSoup] = useState([]);
    const [drink, setDrink] = useState([]);

    const navigate = useNavigate();

    // const [index, setIndex] = useState(1);
    // console.log(initialIndexValue, index);

    const handleTabClick = (id) =>{
        // window.location.href = id
        navigate(`/our_shop/${id}`);
    }

    useEffect(()=>{
        fetch('https://restaurant-cods.aminulify.com/menu')
        .then(res=>res.json())
        .then(data =>{
            const pizzaItems = data.filter(item=>item.category==='pizza');
            setPizza(pizzaItems);

            const dessertItems = data.filter(item=>item.category==='dessert');
            setDessert(dessertItems);

            const saladItems = data.filter(item=>item.category==='salad');
            setSalad(saladItems);

            const drinkItems = data.filter(item=>item.category==='drinks');
            setDrink(drinkItems);

            const soupItems = data.filter(item=>item.category==='soup');
            setSoup(soupItems);
        })
    },[category])

    const [viewMore, setViewMore] = useState(6);
    const handleViewMore = (id) =>{
        if(category===id){
            setViewMore(viewMore+6)
        }
    }
    useEffect(()=>{
        setViewMore(6)
    },[category])

    return (
        <div className='py-12 bg-white'>

            <div className="nav-bar flex justify-center md:mx-36 mx-10 gap-8 font-medium">
                
                <div role="tablist" className="tabs tabs-bordered">

               
                <input type="radio" name="my_tabs_1" role="tab" className={`tab`}  aria-label="SALAD" onClick={()=>handleTabClick('salad')} checked={initialIndexValue == 1 ? true:false} />
                
                    <div role="tabpanel" className="tab-content pt-10">
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                        {  
                        salad.length == 0 ? <Loading></Loading> :
                                    salad.slice(0,viewMore).map(item=><OurShopShowItem
                                        key={item._id}
                                        item={item}
                                    ></OurShopShowItem>)
                                }
                        </div>

                        {
                            salad.length > 6 && viewMore < salad.length ? <button onClick={()=>handleViewMore('salad')} className='block mt-5 mx-auto w-[30%] py-2 border-b-2 rounded-md border-[#597445] hover:border-[#597445]  hover:text-[#597445] duration-300 text-[16px]'>View More</button> : '' 
                        }
                    
                    </div>
                

                <input type="radio" name="my_tabs_1" role="tab" className={`tab`} aria-label="PIZZA" onClick={()=>handleTabClick('pizza')} checked={initialIndexValue == 2 ? true:false} />
                    <div role="tabpanel" className="tab-content pt-10">
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                    {
                            pizza.length == 0 ? <Loading></Loading> : pizza.slice(0,viewMore).map(item=><OurShopShowItem
                                key={item._id}
                                item={item}
                            ></OurShopShowItem>)
                        }
                    </div>
                    {
                            pizza.length > 6 && viewMore < pizza.length ? <button onClick={()=>handleViewMore('pizza')} className='block mt-5 mx-auto w-[30%] py-2 border-b-2 rounded-md border-[#597445] hover:border-[#597445]  hover:text-[#597445] duration-300 text-[16px]'>View More</button> : '' 
                        }
                    </div>
               

                    <input type="radio" name="my_tabs_1" role="tab" className={`tab`}  aria-label="SOUPS" onClick={()=>handleTabClick('soups')} checked={initialIndexValue == 3 ? true:false}/>
                    <div role="tabpanel" className="tab-content pt-10">
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                        {
                                    soup.length == 0 ? <Loading></Loading> : soup.slice(0,viewMore).map(item=><OurShopShowItem
                                        key={item._id}
                                        item={item}
                                    ></OurShopShowItem>)
                                }
                        </div>
                        {
                            soup.length > 6 && viewMore < soup.length ? <button onClick={()=>handleViewMore('soups')} className='block mt-5 mx-auto w-[30%] py-2 border-b-2 rounded-md border-[#597445] hover:border-[#597445]  hover:text-[#597445] duration-300 text-[16px]'>View More</button> : '' 
                        }
                    </div>
           
                
              
                    <input type="radio" name="my_tabs_1" role='tab' className={`tab`}  aria-label="DESSERTS" onClick={()=>handleTabClick("desserts")} checked={initialIndexValue == 4 ? true:false} />
                    <div role="tabpanel" className="tab-content pt-10">
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                    {
                            dessert.length == 0 ? <Loading></Loading> : dessert.slice(0,viewMore).map(item=><OurShopShowItem
                                key={item._id}
                                item={item}
                            ></OurShopShowItem>)
                        }
                    </div>
                    {
                            dessert.length > 6 && viewMore < dessert.length ? <button onClick={()=>handleViewMore('desserts')} className='block mt-5 mx-auto w-[30%] py-2 border-b-2 rounded-md border-[#597445] hover:border-[#597445]  hover:text-[#597445] duration-300 text-[16px]'>View More</button> : '' 
                        }
                    </div>
               

                    <input type="radio" name="my_tabs_1" role='tab'  className={`tab`}  aria-label="DRINKS" onClick={()=>handleTabClick('drinks')} checked={initialIndexValue == 5 ? true:false}/>
                    <div role="tabpanel" className="tab-content pt-10">
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                    {
                            drink.length == 0 ? <Loading></Loading> : drink.slice(0,viewMore).map(item=><OurShopShowItem
                                key={item._id}
                                item={item}
                            ></OurShopShowItem>)
                        }
                    </div>
                    {
                            drink.length > 6 && viewMore < drink.length ? <button onClick={()=>handleViewMore('drinks')} className='block mt-5 mx-auto w-[30%] py-2 border-b-2 rounded-md border-[black] hover:border-[#597445]  hover:text-[#597445] duration-300 text-[16px]'>View More</button> : '' 
                        }
                    </div>

                </div>
            </div>

        </div>
    );
};

export default OurShopItems;