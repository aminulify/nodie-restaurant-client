import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import UseCarts from '../../CustomHook/UseCarts';
import { AuthContext } from '../../Providers/AuthProvider';
import Loading from '../../Shared/Loading/Loading';

const OurShopItemShowDetail = () => {
    const id = useParams();
    // console.log(id);   // {category: "salad", id: "453ad897fd"}

    const [, refetch] = UseCarts();
    const navigate = useNavigate();
    const location = useLocation();
    const {user} = useContext(AuthContext);

    const [filterValue, setFilterValue] = useState([]);

    const {_id, category, name, recipe, image, price} = filterValue;
    
    useEffect(()=>{
        fetch(`https://restaurant-cods.aminulify.com/menu/category/${id.id}`)
        .then(res=>res.json())
        .then(data=> setFilterValue(data))
    },[])


    const handleAddToCart = (item) =>{
        // console.log(item._id);
        if(user && user.email){
            const cartItem = {menuItemId: _id, category, name, image, price, email: user.email}
            fetch('https://restaurant-cods.aminulify.com/carts',{
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
            .then(res=>res.json())
            .then(data=>{
                if(data.insertedId){

                    refetch();  //refetch cart to update number of item in cart
    
                    Swal.fire({
                        title: "Successfully Added Cart!",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            })
        }
        else{
            Swal.fire({
                title: "Please login to order the food",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#506b3d",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login"
              }).then((result) => {
                if (result.isConfirmed) {
                    // using {from: location} one carli bases because it will not uses for dynamically 
                    // single carli bases uses for object define
                  navigate('/login',{state: {from: location}})
              
                }
              });
        }
    }

    const capitalizeTitle = (title) => {
        return title
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
      };

    return (
        <>
        {
            filterValue ? '' : <Loading></Loading>
        }
        <div className='pt-32 pb-16 min-h-[80vh] md:px-20 px-10 bg-white grid md:grid-cols-2 grid-cols-1 place-items-center gap-10'>
            {/* left side  */}

            <div className='w-full'>
                <img src={image} className='rounded-md h-[400px] w-full object-cover object-center' alt="food image" />
            </div>

            {/* right side  */}
            <div className=''>
                <h1 className='text-2xl md:text-4xl font-bold'>{name ?capitalizeTitle(name) : ''}</h1>
                <p className='my-5'>{recipe}. 
                    <br />
                    <br />
                    Embark on a gastronomic adventure, and you’ll discover that food is more than sustenance; it’s an exploration of culture, history, and human connection. Picture yourself in a bustling Moroccan souk, where the air is thick with the aroma of spices—cumin, saffron, and cinnamon. Or perhaps you’re perched on a plastic stool in Hanoi, savoring a steaming bowl of pho, the broth infused with love and tradition.</p>

                <p className='text-[15px]'>Food Category: {category}</p>
                <p className='text-[18px] font-bold text-[#597445]'>Price: <span className='text-[#597445]'>${filterValue.price}</span></p>

                <div className='mt-8'>
                <button onClick={()=>handleAddToCart(filterValue)} className='block mt-auto w-[50%] py-2 border-b-2 rounded-md border-[#597445] hover:bg-[#597445] hover:text-white duration-300'>Add To Cart</button>
            </div>
            </div>
        </div>
        </>
    );
};

export default OurShopItemShowDetail;