import React from 'react';
import { MdOutlineExpandCircleDown, MdOutlineRestaurant } from 'react-icons/md';
import SectionTitle from '../../Componenets/SectionTItle/SectionTitle';
import useAxiosSecure from '../../CustomHook/useAxiosSecure';
import useMenu from '../../CustomHook/useMenu';
import { useParams } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import Swal from 'sweetalert2';

const UpdateItem = () => {
    const id = useParams();

    const [axiosSecure] = useAxiosSecure();
    const [menu, loading] = useMenu();
    const findSimilarData = menu.find(item => item._id === id.id);
    
    const handleUpdated = (e) =>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const price = form.price.value;
        const category = form.category.value;
        const recipe = form.recipeDetails.value;

        const data = {name, category, price, recipe};
        axiosSecure.put(`/menu/${findSimilarData._id}`, data)
        .then(data=>{
        
                    if(data.data.modifiedCount>0){
                        Swal.fire({
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500
                          });
                          e.target.reset();
                    }
        })
        .catch(e=>console.log(e));
         
    }

    return (

            <div className='w-full bg-white py-10'>

               {
                loading ? <Loading></Loading> : ''
               }

                <SectionTitle heading="UPDATE ITEM" subHeading="Do New"></SectionTitle>

                <form onSubmit={handleUpdated} className='mx-10 product-form p-10 bg-[#e0e0e0]'>
                    <div className='form-design'>
                        <label>Recipe name*</label>
                        <input type="text" name='name' placeholder='Recipe Title' defaultValue={findSimilarData?.name} required/>
                    </div>
                    <div className='grid grid-cols-2 gap-5 items-end'>
                
                            <div className='flex flex-col relative' ><label>Category*</label>
                            <MdOutlineExpandCircleDown className='text-[20px] text-slate-600 absolute right-3 bg-white top-9'/>
                            <select name="category" defaultValue={findSimilarData?.category} id="" className='py-3 px-3 font-semibold text-slate-600' required>
                                <option disabled>Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                            </div>
                    
                            <div className='flex flex-col form-design'><label>Price($)*</label>
                            <input type="text" name='price' placeholder='Price' defaultValue={findSimilarData?.price} required/></div>
                    
                    </div>
                    <div className='form-design'>
                        <label>Recipe Details*</label>
                        <textarea name="recipeDetails" rows="5" id="" placeholder='Recipe Description...' defaultValue={findSimilarData?.recipe} className='p-3'></textarea>
                    </div>

                    <button className='flex items-center text-md px-6 py-3 font-medium bg-[#597445] hover:bg-black duration-300 mt-2 text-white cursor-pointer'>
                        <input type="submit" value='Update' />
                        <MdOutlineRestaurant className='ml-1 cursor-pointer'/>
                    </button>
                </form>
            </div>

          
    );
};

export default UpdateItem;