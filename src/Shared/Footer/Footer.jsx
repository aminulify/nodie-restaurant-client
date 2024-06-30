import React from 'react';
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <section>
                <div className='text-white grid md:grid-cols-2 grid-cols-1'>
                {/* left side  */}
                <aside className='p-10 bg-[#597445] grid place-items-center'>
                    <h2 className='font-semibold text-xl mb-2'>CONTACT US</h2>
                    <p>123 ABS Street, Uni 21, Bangladesh</p>
                    <p>+88 123456789</p>
                    <p>Mon - Fri: 08:00 - 22:00</p>
                    <p>Sat - Sun: 10:00 - 23:00</p>
                </aside>

                {/* right side  */}
                <aside className='p-10 bg-[#506b3d] grid place-items-center'>
                    <h2 className='font-semibold text-xl'>FOLLOW US</h2>
                    <p>Join us on social media</p>

                    {/* icons  */}
                    <div className='flex gap-2 text-3xl'>
                        <Link to='https://www.facebook.com/'><FaFacebookSquare/></Link>
                        <Link to='https://www.instagram.com/'><FaInstagramSquare/></Link>
                        <Link to='https://www.x.com/'><FaSquareXTwitter/></Link>
                    </div>
                </aside>
                
                
            </div>
            {/* copyright  */}
                <div className='py-3 bg-[#334625]'>
                <p className='text-center text-sm text-white'>Copyright © <span className='heading-font text-sm'>Nodie Restaurant</span> All rights reserved.</p>
                </div>
        </section>
    );
};

export default Footer;