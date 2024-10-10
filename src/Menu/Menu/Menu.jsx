import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import img1 from '/assets/menu/banner3.jpg';
import img2 from '/assets/menu/dessert-bg.jpeg';
import img3 from '/assets/menu/salad-bg.jpg';
import img4 from '/assets/menu/soup-bg.jpg';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import SectionTitle from '../../Componenets/SectionTItle/SectionTitle';
import { Background, Parallax } from 'react-parallax';
import { Link } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import useMenu from '../../CustomHook/useMenu';

const Menu = () => {
    const [menu, loading] = useMenu();

    const popular = menu.filter(item=>item.category==='offered');
    const dessert = menu.filter(item=>item.category==='dessert');
    const salad = menu.filter(item=>item.category==='salad');
    const soup = menu.filter(item=>item.category==='soup');
         

    const handleWindowTop =()=>{
        window.scrollTo(0,0);
    }
    return (
        <div>
             <Helmet>
                <title>Nodie Cods | Menu</title>
            </Helmet>
            {
                loading && <Loading></Loading>
            }
            <h2>Menu menu</h2>

            {/* Menu Cover  */}
            {/* Menu Cover  */}
            {/* Menu Cover  */}
            <Parallax
                blur={{ min: -30, max: 30 }}
                bgImage={img1}
                bgImageAlt="menu cover"
                strength={200}
            >
                <div className='mt-10'>
                    <Cover heading="Our Menu" subHeading="Would you like to try a dish?"></Cover>
                </div>

            </Parallax>
            <div className='py-10 bg-white left-aos'>
                    <SectionTitle heading="Today's Offer" subHeading="---Don't miss these---"></SectionTitle> 
                    <div className='mb-6 max-w-[1000px] md:mx-auto ml-5 mr-10 grid grid-cols-1 md:grid-cols-2 gap-10'>
                        {
                            popular.slice(0,6).map(product=><MenuItem
                            key={product._id}
                            product={product}
                            ></MenuItem>)
                        }
                    </div>
                    <Link to={`/our_shop/salad`} onClick={handleWindowTop}><button className='mt-2 flex mx-auto px-6 py-2 border-b-2 border-[#597445] hover:border-[#506b3d] hover:text-[#506b3d] duration-300 rounded-md'>Order Your Favourite Food</button></Link>
                </div>
            

            {/* menu cover 2 */}
            {/* menu cover 2 */}
            {/* menu cover 2 */}
            
            <Parallax
                blur={{ min: -30, max: 30 }}
                bgImage={img2}
                bgImageAlt="menu cover"
                strength={200}
                            
            >

               
                    <Cover heading="Desserts" subHeading="We ate the buffet and that included almost 40 items in total. I remember eating around 8-9 items while my parents ate far less that that." ></Cover>
                
             
            </Parallax>
            <div className='py-16 bg-white right-aos'> 
                        <div className='mb-6 max-w-[1000px] ml-5 mr-10 md:mx-auto grid grid-cols-1 md:grid-cols-2 gap-10'>
                            {
                                dessert.slice(0,6).map(product=><MenuItem
                                key={product._id}
                                product={product}
                                ></MenuItem>)
                            }
                        </div>
                        <Link to='/our_shop/desserts'onClick={handleWindowTop}><button className='mt-2 flex mx-auto px-6 py-2 border-b-2 border-[#597445] hover:border-[#506b3d] hover:text-[#506b3d] duration-300 rounded-md'>Order Your Favourite Food</button></Link>
                </div>
            

            {/* menu cover 3 */}
            {/* menu cover 3 */}
            {/* menu cover 3 */}
            <Parallax
                blur={{ min: -30, max: 30 }}
                bgImage={img3}
                bgImageAlt="menu cover"
                strength={-300}
            >
                <Cover heading="Salad" subHeading="We ate the buffet and that included almost 40 items in total. I remember eating around 8-9 items while my parents ate far less that that."></Cover>

            </Parallax>
            
            <div className='py-16 bg-white left-aos'> 
                    <div className='mb-6 max-w-[1000px] ml-5 mr-10 md:mx-auto grid grid-cols-1 md:grid-cols-2 gap-10'>
                        {
                            salad.slice(0,6).map(product=><MenuItem
                            key={product._id}
                            product={product}
                            ></MenuItem>)
                        }
                    </div>
                    <Link to='/our_shop/salad' onClick={handleWindowTop}><button className='mt-2 flex mx-auto px-6 py-2 border-b-2 border-[#597445] hover:border-[#506b3d] hover:text-[#506b3d] duration-300 rounded-md'>Order Your Favourite Food</button></Link>
            </div>

            {/* menu cover 4 */}
            {/* menu cover 4 */}
            {/* menu cover 4 */}
            <Parallax
                blur={{ min: -30, max: 30 }}
                bgImage={img4}
                bgImageAlt="menu cover"
                strength={200}
            >
                <Cover heading="Soups" subHeading="We ate the buffet and that included almost 40 items in total. I remember eating around 8-9 items while my parents ate far less that that."></Cover>

            </Parallax>
            
            <div className='py-16 bg-white right-aos'> 
                    <div className='mb-6 max-w-[1000px] ml-5 mr-10 md:mx-auto grid grid-cols-1 md:grid-cols-2 gap-10'>
                        {
                            soup.slice(0,6).map(product=><MenuItem
                            key={product._id}
                            product={product}
                            ></MenuItem>)
                        }
                    </div>
                    <Link to='/our_shop/soups' onClick={handleWindowTop}><button className='mt-2 flex mx-auto px-6 py-2 border-b-2 border-[#597445] hover:border-[#506b3d] hover:text-[#506b3d] duration-300 rounded-md'>Order Your Favourite Food</button></Link>
            </div>
        </div>
    );
};

export default Menu;