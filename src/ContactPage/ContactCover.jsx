import React from 'react';
import Cover from '../Shared/Cover/Cover';
import img from '/assets/contact/banner.jpg';
import { Helmet } from 'react-helmet-async';
import { Parallax } from 'react-parallax';
import { FaFacebookSquare, FaInstagramSquare } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const ContactCover = () => {
    return (
        <div>
            <Helmet>
                <title>Nodie Cods | Contact Us</title>
            </Helmet>
            <Parallax
                    blur={{ min: -15, max: 15 }}
                    bgImage={img}
                    bgImageAlt="contact us"
                    strength={-200}
                >
                    <div className='mt-16'>
                        <Cover
                            heading='Contact Us'
                            subHeading='Would you like to try a dish?'
                        ></Cover>
                    </div>
                </Parallax>

                <section className='px-8 md:px-20 py-10 bg-white grid md:grid-cols-2 grid-cols-1 gap-10'>
                    {/* left side  */}
                    <div className='text-center'>
                        <h1 className='font-bold heading-font text-4xl text-[#597445]'>Hours & Location</h1>
                        <p className='mt-3'>(678) 722-8335</p>
                        <p>nodiecods@restaurant.com</p>

                        <h2 className='text-2xl font-bold heading-font mt-3 text-[#597445]'>Brunch</h2>
                        <p>Saturday + Sunday: 11 a.m. - 2:30 p.m.</p>

                        <h2 className='text-2xl font-bold heading-font mt-3 text-[#597445]'>Dinner</h2>
                        <p>Sunday: 5 - 9 p.m.</p>
                        <p>Monday - Thursday: 5 - 10 p.m.</p>

                        <h2 className='mt-3'><span className='text-2xl font-bold heading-font text-[#597445]'>Happy Hour,</span> <span>available at the bar</span></h2>
                        <p>Sunday: 5 - 9 p.m.</p>
                        <p>Monday - Thursday: 5 - 10 p.m.</p>

                    </div>

                    {/* right side  */}
                    <div className=''>
                        <h1 className='text-center font-bold heading-font text-4xl text-[#597445]'>About</h1>
                        <p>Located within Alpharetta’s Avalon, Colletta, which means “collection” in Italian, is just that – a compilation of lively dining experiences, top-notch service and quality American Italian cuisine that sets the stage for genuine connection over a great meal.  </p>
                        <br />
                        <p>Colletta’s cuisine puts a twist on treasured classics and introducing modern culinary techniques with the changing of the seasons. House-made pastas, cheeses and other hand-crafted ingredients abound in the from-scratch kitchen, and guests will taste the culinary team’s attention to detail in every bite.</p>

                        <div className='text-center'>
                            <h2 className='text-2xl font-bold heading-font mt-6 text-[#597445]'>Follow Us On Social</h2>

                            <div className='flex gap-2 text-3xl mt-3 justify-center text-[#597445]'>
                                <Link to='https://www.facebook.com/' className='hover:text-black duration-300'><FaFacebookSquare/></Link>
                                <Link to='https://www.instagram.com/' className='hover:text-black duration-300'><FaInstagramSquare/></Link>
                                <Link to='https://www.x.com/' className='hover:text-black duration-300'><FaSquareXTwitter/></Link>
                            </div>
                        </div>
                    </div>
                </section>
        </div>
    );
};

export default ContactCover;