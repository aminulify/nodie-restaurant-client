import React from 'react';

const Cover = ({heading, subHeading, img}) => {
    return (
       
        <div className={`text-center py-16 md:py-20 object-cover object-center`} style={{background: `url("${img}")`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundAttachment: 'fixed'}}>
            <div className='p-10 md:p-20 md:mx-36 mx-10 bg-black backdrop-blur-[2px] bg-opacity-60 text-white'>
                <h1 className='text-6xl lg:text-8xl font-bold heading-font'>{heading}</h1>
                <p className='md:text-xl lg:text-2xl pt-2'>{subHeading}</p>
            </div>
        </div>
       
    );
};

export default Cover;