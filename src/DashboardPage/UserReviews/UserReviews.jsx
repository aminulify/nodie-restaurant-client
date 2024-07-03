import React, { useContext, useEffect, useState } from 'react';
import SectionTitle from '../../Componenets/SectionTItle/SectionTitle';
import { AuthContext } from '../../Providers/AuthProvider';
import { VscFeedback } from "react-icons/vsc";
import { Rating } from '@smastrom/react-rating';
import useAxiosSecure from '../../CustomHook/useAxiosSecure';
import Swal from 'sweetalert2';

const UserReviews = () => {
    const {user} = useContext(AuthContext);
    const [ratingVal, setRatingVal] = useState(0)
    const [axiosSecure] = useAxiosSecure();

    useEffect(()=>{
        document.getElementById('ratingGet').addEventListener("click", function(e){
            setRatingVal(e.target.getAttribute("aria-label").split(' ')[1]*1);

            // console.log(e.target.getAttribute("aria-label").split(' ')[1]*1); // 5
        })
    },[])

    const handleReview = (e) =>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const details = form.details.value;
        const rating = ratingVal;

        const reviews = {name, details, rating};
        // console.log(reviews);

        axiosSecure.post('/reviews', reviews)
        .then(data => {
            console.log('reviewData', data.data)
            if(data.data.insertedId){
                Swal.fire({
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  e.target.reset();
            }
        })


    }



    return (
        <div className='md:w-[85%] bg-white w-full my-10'>
        <div>
            <SectionTitle subHeading="-- Say the truth --" heading='Reviews'></SectionTitle>
        </div>

        {/* form  */}
        <form onSubmit={handleReview} className='mx-10 product-form p-10 bg-[#e0e0e0]'>
            <div className='form-design'>
                <label>User Name*</label>
                <input type="text" name='name' defaultValue={user?.displayName} placeholder='Recipe Title' readOnly/>
            </div>
            
            <div className='form-design'>
                <label>Feedback*</label>
                <textarea name="details" rows="5" id="" placeholder='Feedback Here...' className='p-3'></textarea>
            </div>

            
            <div className='mb-2'>
             <Rating id='ratingGet'
                style={{ maxWidth: 180, paddingBottom: 0 }}
                value={ratingVal}
             />
            </div>

            <button className='cursor-pointer flex items-center text-md px-6 py-3 font-medium bg-[#597445] hover:bg-black duration-300 mt-2 text-white'>
                <input type="submit" value='Submit' className='cursor-pointer' />
                <VscFeedback className='ml-1'/>
            </button>
        </form>
    </div>
    );
};

export default UserReviews;