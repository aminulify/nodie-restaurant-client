import React, { useContext, useState } from 'react';
import SectionTitle from '../../Componenets/SectionTItle/SectionTitle';
import { MdOutlineExpandCircleDown, MdOutlineRestaurant } from 'react-icons/md';
import { AuthContext } from '../../Providers/AuthProvider';
import { MdOutlineDateRange } from "react-icons/md";
import useAxiosSecure from '../../CustomHook/useAxiosSecure';
import Swal from 'sweetalert2';

const UserReservation = () => {
    const {user} = useContext(AuthContext);
    // console.log(user);
    const [mainTime, setMainTime] = useState('');
    console.log(mainTime);
    const [formattedTime, setFormattedTime] = useState('');

    const [axiosSecure] = useAxiosSecure();


    const handleBooking = (e) =>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const guests = form.guests.value;
        const description = form.description.value;
        const date = form.date.value;
        const status = 'Pending';

        // time zone in 12hours 
        const timeVal = form.time.value;
        // console.log(timeVal);
        setMainTime(timeVal);
        
        covert12HoursTimeZone(mainTime);
        // console.log(formattedTime);  // 1:42 PM 

        const details = {name, email, guests, description, date, formattedTime, status};
        // console.log(details);

        axiosSecure.post('/bookings', details)
        .then(data => {
            // console.log(data.data);

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

    // Hour : Minutes : Zone function
    const covert12HoursTimeZone = (mainTime) =>{
        
        const [hours, minutes] = mainTime.split(":");
        const hour12 = (hours % 12) || 12; 
        const amPm = hours >= 12 ? 'PM' : 'AM'; 
        // console.log(hours, minutes);
        
        setFormattedTime(`${hour12}:${minutes}:${amPm}`)
        return `${hour12}:${minutes}:${amPm}`;
    }

    return (
        <div className='md:w-[85%] w-full my-10'>
            <div>
                <SectionTitle subHeading="-- Book Seats --" heading='Reservation'></SectionTitle>
            </div>

            {/* form  */}
            <form onSubmit={handleBooking} className='mx-10 product-form p-10 bg-base-200 text-black'>

            <div className='grid grid-cols-2 gap-5 items-end'>
                <div className='form-design'>
                    <label>Name*</label>
                    <input type="text" name='name' placeholder='Enter your name' required/>
                </div>
                <div className='flex flex-col form-design'><label>Email*</label>
                    <input type="text" defaultValue={user?.email} name='email' readOnly/></div>
             </div>       

                <div className='grid grid-cols-2 gap-5 items-end'>
             
                        <div className='flex flex-col relative' ><label>Guests*</label>
                        <MdOutlineExpandCircleDown className='text-[20px] text-slate-600 absolute right-3 bg-white top-9'/>
                        <select name="guests" defaultValue="Select Guests" id="" className='py-3 px-3 font-semibold text-slate-600' required>
                            <option disabled selected>Select Guests</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                        </div>
                   
                        <div className='flex flex-col form-design'><label>Contact*</label>
                        <input type="text" name='contact' placeholder='(+880) xxxx xxxx' required/></div>
                  
                </div>

                <div className='grid grid-cols-2 gap-5 items-end'>

                    <div className='flex flex-col form-design'><label>Date*</label>
                    <input type="date" name='date' placeholder='mm/dd/yyyy' required/></div>
                        
                    <div className='flex flex-col form-design'><label>Time*</label>
                    <input type="time" name='time'/></div>
                  
                </div>

                <div className='form-design'>
                    <label>Description*</label>
                    <textarea name="description" rows="5" id="" placeholder='Write here requirements (if do you have)...' className='p-3'></textarea>
                </div>

                <button className='flex items-center text-md px-6 py-3 font-medium bg-[#597445] hover:bg-black duration-300 mt-5 text-white cursor-pointer'>
                    <input type="submit" value='Submit' />
                    <MdOutlineDateRange className='ml-1 cursor-pointer'/>
                </button>
            </form>
        </div>
    );
};

export default UserReservation;