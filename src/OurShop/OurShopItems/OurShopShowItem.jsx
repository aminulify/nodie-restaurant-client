import React, { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UseCarts from '../../CustomHook/UseCarts';
import './OurShopShowItem.css';

const OurShopShowItem = ({item}) => {
    const {name, recipe, category, image, price, _id} = item;
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    // tanstack 
    const [, refetch] = UseCarts();

    const handleAddToCart = (item) =>{
        // console.log(item);
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
                  navigate('/login',{state: {from: location}}, {replace: true})
              
                }
              });
        }
    }
    const handleWindowTop =()=>{
        window.scrollTo(0);
    }

    const capitalizeTitle = (title) => {
        return title
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
      };
    return (
        <div className='p-3 border relative imgScaleEffect'>
            
            <Link to={`/our_shop/${category}/${_id}`} onClick={handleWindowTop}>
                <div className='img-zoom h-[200px] rounded-sm object-cover object-center'>
                    <img src={image} className=' w-full h-[200px] object-cover object-center h-50' alt="" />
                </div>

                <h2 className='mt-2 text-center font-bold text-lg'>{name ?capitalizeTitle(name) : ''}</h2>
                <p className='mt-1 text-slate-500'>{recipe?.length > 80 ? recipe.slice(0,80)+'...' : recipe}</p>
                <p className='absolute top-5 right-5 bg-[#597445] font-medium text-white px-2 py-1 rounded-sm'>${price}</p>
            </Link>
          
        
            <div className='mt-3'>
                <button onClick={()=>handleAddToCart(item)} className='block mt-auto mx-auto w-[50%] py-2 border-b-2 rounded-md border-[#597445] hover:bg-[#597445] hover:text-white duration-300'>Add To Cart</button>
            </div>
           

        </div>
    );
};

export default OurShopShowItem;