import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Category.css';
import SectionTitle from '../../Componenets/SectionTItle/SectionTitle';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';

const Category = () => {
    return (
        <div className='mt-10 mb-16 md:mx-36 mx-10 grid left-aos'>
            {/* heading  */}
            {/* heading  */}
            <SectionTitle heading="Order Online" subHeading="---From 11:00am to 10:00pm---"></SectionTitle>

            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                autoplay={{
                    delay: 2500,
                    // disableOnInteraction: false,
                  }}
                  breakpoints={{
                    '@0.00': {
                      slidesPerView: 2,
                      spaceBetween: 30,
                    },
                    '@0.75': {
                      slidesPerView: 2,
                      spaceBetween: 30,
                    },
                    '@1.00': {
                      slidesPerView: 4,
                      spaceBetween: 30,
                    },
                    '@1.50': {
                      slidesPerView: 4,
                      spaceBetween: 30,
                    },
                  }}
                pagination={{
                clickable: true,
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src="/assets/home/slide1.jpg" alt="" />
                    <h3 className=' text-xl md:text-4xl text-center md:-mt-16 -mt-10 text-white'>Salad</h3>
                
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/assets/home/slide2.jpg" alt="" />
                    <h3 className=' text-xl md:text-4xl text-center md:-mt-16 -mt-10 text-white'>Pizza</h3>
                
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/assets/home/slide3.jpg" alt="" />
                    <h3 className=' text-xl md:text-4xl text-center md:-mt-16 -mt-10 text-white'>Soups</h3>
                
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/assets/home/slide4.jpg" alt="" />
                    <h3 className=' text-xl md:text-4xl text-center md:-mt-16 -mt-10 text-white'>Cake</h3>
                
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/assets/home/slide5.jpg" alt="" />
                    <h3 className=' text-xl md:text-4xl text-center md:-mt-16 -mt-10 text-white'>Salad</h3>
                
                </SwiperSlide>
                
            </Swiper>
        </div>
    );
};

export default Category;