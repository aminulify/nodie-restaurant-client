import React from 'react';
import SectionTitle from '../../Componenets/SectionTItle/SectionTitle';
import './FeaturedItem.css';
import { Link } from 'react-router-dom';

const FeaturedItem = () => {
    return (
        <div className='mb-10 pt-6 right-aos'>
            
            <div className='featured-bg-image text-white p-16'>
                {/* section title */}
                {/* section title */}
                <div className="grid place-items-center">
                    <i className='text-white text-center mb-3'>---Check it out---</i>
                    <div className='w-[50%] md:w-[30%] h-1 bg-[#cecdcddd] flex justify-center'></div>
                    <h2 className='text-center text-4xl md:text-6xl lg:text-6xl text-white font-bold heading-font mb-3 mt-5'>Featured Items</h2>
                    <div className='mb-10 w-[50%] md:w-[30%] h-1 bg-[#cecdcddd] flex justify-center'></div>
                </div>

              <aside className='grid md:grid-cols-2 grid-cols-1 gap-5 md:gap-10 max-w-[1000px] mx-10 md:mx-auto items-center'>
             
                <div>
                    <img src="/assets/home/featured.jpg" alt="Featured Image" className='rounded-md'/>
                </div>
                <div>
                    <p className='text-2xl lg:text-4xl'>March 20, 2024</p>
                    <p className='text-2xl lg:text-4xl'>WHERE CAN I GET SOME?</p>
                    <p className='md:text-sm lg:text-md text-[12px]'>We ate the buffet and that included almost 40 items in total. I remember eating around 8-9 items while my parents ate far less that that. But my younger brother John enjoyed more than 20 items. Side note: He did not eat all the items. He just tasted many of them!</p>
                    <Link to='/our_shop/salad'><button className='mt-2 px-6 py-2 border-b-2 rounded-md hover:border-[#506b3d] hover:text-white duration-300'>Read More</button></Link>
                </div>
              </aside>
            </div>
        </div>
    );
};

export default FeaturedItem;