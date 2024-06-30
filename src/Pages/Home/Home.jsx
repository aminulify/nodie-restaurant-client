import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import './Home.css';
import Category from '../Category/Category';
import FoodOverView from '../FoodOverView/FoodOverView';
import Menu from '../Menu/Menu';
import FeaturedItem from '../FeaturedItem/FeaturedItem';
import Testimonials from '../Testimonials/Testimonials';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div className='bg-white'>
            {/* npm react-helmet-async  */}
            <Helmet>
                <title>Nodie Cods | Home</title>
            </Helmet>

            {/* banner  */}
            {/* banner  */}
            {/* banner  */}
             <Carousel autoPlay>
                <div className='banner-cover relative'>
                    <img src="/assets/menu/dessert-bg.jpeg" className='object-cover object-top'/>
                    <h2 className='text-3xl md:text-7xl text-white absolute font-bold md:top-[40%] top-[45%]  left-[50%] translate-x-[-50%] z-10'><span className="heading-font text-5xl md:text-8xl">Nodie Cods</span> RESTAURANT</h2>
                    
                </div>
                <div className='banner-cover relative'>
                    <img src="/assets/menu/pizza-bg.jpg" className='object-cover object-top'/>
                    <h2 className='text-3xl md:text-7xl text-white absolute font-bold md:top-[40%] top-[45%]  left-[50%] translate-x-[-50%] z-10'><span className="heading-font text-5xl md:text-8xl">Nodie Cods</span> RESTAURANT</h2>
                    
                </div>
                
                <div className='banner-cover relative'>
                    <img src="/assets/menu/soup-bg.jpg" className='object-cover object-top'/>
                    <h2 className='text-3xl md:text-7xl text-white absolute font-bold md:top-[40%] top-[45%]  left-[50%] translate-x-[-50%] z-10'><span className="heading-font text-5xl md:text-8xl">Nodie Cods</span> RESTAURANT</h2>
                    
                </div>
                <div className='banner-cover relative'>
                    <img src="/assets/menu/salad-bg.jpg" className='object-cover object-top'/>
                    <h2 className='text-3xl md:text-7xl text-white absolute font-bold md:top-[40%] top-[45%]  left-[50%] translate-x-[-50%] z-10'><span className="heading-font text-5xl md:text-8xl">Nodie Cods</span> RESTAURANT</h2>
                    
                </div>
                
            </Carousel>

            {/* category  */}
            {/* category  */}
            {/* category  */}
            <Category></Category>

            {/* Food Over View Chef  */}
            {/* Food Over View Chef  */}
            {/* Food Over View Chef  */}
            <FoodOverView></FoodOverView>

            {/* menu  */}
            {/* menu  */}
            {/* menu  */}
            <Menu></Menu>


            {/* featured items  */}
            {/* featured items  */}
            {/* featured items  */}
            <FeaturedItem></FeaturedItem>

            {/* Testimonials  */}
            {/* Testimonials  */}
            {/* Testimonials  */}
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;