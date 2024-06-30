import React from 'react';

const Loading = () => {
    return (
        <div className='fixed z-20 mix-blend-multiply md:left-[30%] lg:left-[30%] md:top-4 lg:top-4 md:translate-x-[6%] lg:translate-x-[6%] translate-x-5'>
            <img src="/assets/others/cupcake.gif" alt="loading..." />
        </div>
    );
};

export default Loading;