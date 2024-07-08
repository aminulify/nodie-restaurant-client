import React, { useRef } from 'react';
import SectionTitle from '../../Componenets/SectionTItle/SectionTitle';
import './AddItem.css';
import { MdOutlineRestaurant } from "react-icons/md";
import { MdOutlineExpandCircleDown } from "react-icons/md";
import useAxiosSecure from '../../CustomHook/useAxiosSecure';
import Swal from 'sweetalert2';

const imageHostingApi = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_TOKEN}`;

const AddItem = () => {
    const imgData = useRef(null);
    const [axiosSecure] = useAxiosSecure();

    const handleAddItemSubmit = (e) =>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const price = form.price.value;
        const category = form.category.value;
        const recipe = form.recipeDetails.value;
        const image = imgData.current.files[0];

        const formData = new FormData();
        formData.append('image', image);

        const data = {name, price, image, category, recipe};

        fetch(imageHostingApi, {
            method: 'POST',
            body: formData
        })
        .then(res=>res.json())
        .then(imgResponse =>{
            if(imgResponse.success){
                const imgURL = imgResponse.data.display_url;
                const {name, price, category, recipe} = data;
                const newItem = {name, price: parseFloat(price), category, recipe, image: imgURL};
               

                axiosSecure.post('/menu', newItem)
                .then(data => {
                    
                    if(data.data.insertedId){
                        Swal.fire({
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500
                          });
                          e.target.reset();
                    }
                })
            };
        })
        
    }
    return (
        <div className=' md:w-[85%] w-full py-10 bg-white'>
            <div>
                <SectionTitle subHeading="What's New" heading='Add an item'></SectionTitle>
            </div>

            {/* form  */}
            <form onSubmit={handleAddItemSubmit} className='mx-10 product-form p-10 bg-[#e0e0e0]'>
                <div className='form-design'>
                    <label>Recipe name*</label>
                    <input type="text" name='name' placeholder='Recipe Title' required/>
                </div>
                <div className='grid grid-cols-2 gap-5 items-end'>
             
                        <div className='flex flex-col relative' ><label>Category*</label>
                        <MdOutlineExpandCircleDown className='text-[20px] text-slate-600 absolute right-3 bg-white top-9'/>
                        <select name="category" defaultValue="Select a category" id="" className='py-3 px-3 font-semibold text-slate-600' required>
                            <option disabled selected>Select a category</option>
                            <option value="salad">Salad</option>
                            <option value="pizza">Pizza</option>
                            <option value="soup">Soup</option>
                            <option value="dessert">Dessert</option>
                            <option value="drinks">Drinks</option>
                        </select>
                        </div>
                   
                        <div className='flex flex-col form-design'><label>Price*</label>
                        <input type="text" name='price' placeholder='Price' required/></div>
                  
                </div>
                <div className='form-design'>
                    <label>Recipe Details*</label>
                    <textarea name="recipeDetails" rows="5" id="" placeholder='Recipe Description...' className='p-3'></textarea>
                </div>
                <div className='form-design'>
                    <input type="file" ref={imgData} className='' name="image" id=""/>
                </div>

                <button className='flex items-center text-md px-6 py-3 font-medium bg-[#597445] hover:bg-black duration-300 mt-2 text-white cursor-pointer'>
                    <input type="submit" value='Add Item' />
                    <MdOutlineRestaurant className='ml-1 cursor-pointer'/>
                </button>
            </form>
        </div>
    );
};

export default AddItem;