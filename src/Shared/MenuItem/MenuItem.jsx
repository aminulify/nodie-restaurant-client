import React from 'react';

const MenuItem = ({product}) => {
    const {image, price, recipe, name} = product;
    return (
        <div className='md:flex gap-3 grid grid-cols-9'>
            <div className='col-span-2 object-cover object-center h-full'>
                <img src={image} style={{borderRadius: '0 200px 200px 200px'}} className='h-20 object-cover object-center w-[120px]' alt="" />
            </div>

            <div className='col-span-6'>
                <h2 className='text-xl font-semibold uppercase'>{name} ---</h2>
                <p>{recipe?.length > 50 ? recipe.slice(0,70)+'...' : recipe}</p>
            </div>

            <div className=''>
                <p className='text-lg font-medium text-[#597445]'>${price}</p>
            </div>
        </div>
    );
};

export default MenuItem;