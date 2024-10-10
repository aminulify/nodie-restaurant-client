import React, { useEffect, useState } from 'react';

// icon quotention 
import { FaQuoteLeft } from "react-icons/fa";
// Rating 
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './Testimonials.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import SectionTitle from '../../Componenets/SectionTItle/SectionTitle';

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(()=>{
        fetch('https://restaurant-cods.aminulify.com/reviews')
        .then(res=>res.json())
        .then(data=> setReviews(data))
    },[])
    return (
        <div className='max-w-[1000px] mx-10 md:mx-auto pb-16 bg-white left-aos'>
            {/* section heading title  */}
            <SectionTitle heading='Testimonials' subHeading='---What Our Clients Say---'></SectionTitle>


            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                }}
                pagination={{
                clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {
                    reviews.map(review => <SwiperSlide
                        key={review._id}
                    >
                        <div className='grid place-items-center px-16 md:px-20 mb-16'>
                            <div className='mb-10'>
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                            </div>
                            <FaQuoteLeft className='text-5xl opacity-20'/>
                            <p className='md:text-[16px] text-[12px] mt-5'>{review.details}</p>
                            <h3 className='mt-3 md:text-2xl text-xl font-semibold text-[#597445]'>{review.name}</h3>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Testimonials;