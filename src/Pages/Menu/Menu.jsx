import React, { useEffect, useState } from 'react';
import SectionTitle from '../../Componenets/SectionTItle/SectionTitle';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import { Link } from 'react-router-dom';
import useMenu from '../../CustomHook/useMenu';
import Loading from '../../Shared/Loading/Loading';

const Menu = () => {
    const [menu] = useMenu();
    const popularItems = menu.filter(item=>item.category==='popular');
    
    return (
        <div className='left-aos'>
            <SectionTitle heading="From Our Menu" subHeading="---Check it out---"></SectionTitle>

            <div className='mb-6 max-w-[1000px] ml-5 mr-10 md:mx-auto grid grid-cols-1 md:grid-cols-2 gap-10'>
                {
                  popularItems ? popularItems.map(product=><MenuItem
                    key={product._id}
                    product={product}
                    ></MenuItem>) : <Loading></Loading>
                }
            </div>
            <div className='flex justify-center mb-10'>
                <Link to='/our_shop/salad'><button className='text-black border-[#506b3d] px-10 py-2 border-b-2 rounded-b-md hover:text-[#506b3d] hover:border-[#506b3d] duration-300 text-[16px]'>View More</button></Link>
            </div>
        </div>
    );
};

export default Menu;