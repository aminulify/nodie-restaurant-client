import React from 'react';
import Cover from '../../Shared/Cover/Cover';
import shopCoverImg from '/assets/shop/banner2.jpg'; 
import { Helmet } from 'react-helmet-async';
import { Parallax } from 'react-parallax';

const OurShopCover = () => {
    return (
        <div>
            <Helmet>
                <title>Nodir Cods | Our Shop</title>
            </Helmet>

            <div className=''>
                <Parallax
                    blur={{ min: -15, max: 15 }}
                    bgImage={shopCoverImg}
                    bgImageAlt="the dog"
                    strength={-200}
                >
                    <div className='mt-16'>
                        <Cover
                            heading='Our Shop'
                            subHeading='Would you like to try a dish?'
                        ></Cover>
                    </div>
                </Parallax>
                
            </div>
        </div>
    );
};

export default OurShopCover;