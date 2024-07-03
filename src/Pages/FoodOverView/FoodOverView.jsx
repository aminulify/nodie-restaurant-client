import React from 'react';
import './FoodOverView.css';

const FoodOverView = () => {
    return (
        <div className='right-aos food-over-view-img md:mx-36 mx-10 my-10 text-center grid place-items-center'>
            <div className='md:mx-36 mx-10 p-8 bg-white bg-opacity-80 backdrop-blur-md'>
            <h2 className='md:text-5xl text-3xl font-bold heading-font pt-3 text-[#597445] pb-2'>Nodies Cods</h2>
            <p className='md:text-sm text-[#597445] text-[12px]'>We ate the buffet and that included almost 40 items in total. I remember eating around 8-9 items while my parents ate far less that that. But my younger brother John enjoyed more than 20 items. Side note: He did not eat all the items. He just tasted many of them!</p>
            </div>
        </div>
    );
};

export default FoodOverView;