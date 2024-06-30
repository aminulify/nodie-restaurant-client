import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import { MdOutlineMenuOpen } from "react-icons/md";
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import UseCarts from '../../CustomHook/UseCarts';
import Loading from '../Loading/Loading';
import useAdmin from '../../CustomHook/useAdmin';

const Header = () => {
    const handleClickWindowTop = () =>{
        window.scrollTo(0,0);
    }

    const {user, logOut} = useContext(AuthContext);
    const navigate = useNavigate();

    // tanstack 
    const [cart, refetch] = UseCarts();
    if(user){
        // ** refetch for send token to backend when logged in user
        refetch();
    }

    const [isAdmin] = useAdmin();

    const handleLogOut = () =>{
        Swal.fire({
            title: "Logout?",
            showCancelButton: true,
            confirmButtonText: "Logout",
            denyButtonText: `Cancel`
          }).then((result) => {
            
            if (result.isConfirmed) {
              Swal.fire("Logout Successfully!", "", "success");
              logOut()
                .then(()=>{})
                .catch(e=>console.log(e))
            }
          });
    }

    const hanldeRedirectLogin = () =>{
        Swal.fire({
            title: "Please login to order the food",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#506b3d",
            cancelButtonColor: "#d33",
            confirmButtonText: "Login"
          }).then((result) => {
            if (result.isConfirmed) {
                // using {from: location} one carli bases because it will not uses for dynamically 
                // single carli bases uses for object define
                navigate('/login');  
          
            }
          });
    }

    // using for browser console STOP text 
    const STOPconsole = "color: red;" + "font-size: 100px;" + "font-weight: bold;";
    console.log("%cSTOP", STOPconsole);

    return (
        <div className='bg-header'>
            
            <div className="fixed z-10 navbar md:px-10 px-5 bg-opacity-80 backdrop-blur-sm bg-[#597445] text-white">
            <div className="flex-1">
                <Link to="/" className="leading-5">
                    <h2 className='font-bold text-2xl mb-[-5px] heading-font'>Nodie Cods</h2>
                    <p className=' font-semibold tracking-[1.3px] pb-1'>RESTAURANT</p>
                </Link>
            </div>
            <div className="flex-none">
                <div className='flex gap-4'>
                    <Link to="/" onClick={handleClickWindowTop} className=' hover:underline'>HOME</Link>
                    <Link to="/menu" onClick={handleClickWindowTop} className=' hover:underline'>MENU</Link>
                    <Link to='/our_shop/salad' onClick={handleClickWindowTop} className='hidden md:flex hover:underline'>OUR SHOP</Link>
                    {
                        isAdmin && <Link to='/dashboard/admin_home' className='md:flex hover:underline'>DASHBOARD</Link>
                    }
                </div>
                <div className="dropdown dropdown-end">   
                
                {
                    user ? <Link className={`${isAdmin && 'hidden'}`} to={`/dashboard/my_cart`}>
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        <span className="badge badge-sm indicator-item"> {user && cart?.length || 0}</span>
                        </div>
                    </div>
                    </Link> : <button onClick={hanldeRedirectLogin}>
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    <div className="indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    <span className="badge badge-sm indicator-item">0</span>
                    </div>
                </div>
                </button>
                }
                
                </div>


                <div className="dropdown dropdown-end ">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className=" rounded-full">

                    {/* <img alt="" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}

                    
                    {
                        user ? <div className='w-7'><img className='object-center object-cover' src={user.photoURL} alt="" /></div> : <MdOutlineMenuOpen className='text-3xl'/>
                    }

                    </div>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 text-black rounded-box w-52">
                    <li>
                    <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                    </a>
                    </li>
                    <li className='md:hidden block'><Link to="/our_shop/salad">Our Shop</Link></li>

                    {
                        user && <li><Link to={`/dashboard/${isAdmin ? 'admin_home' : 'user_home'}`}>Dashboard</Link></li>
                    }

                        <li><Link to='/contact_us'>Contact Us</Link></li>

                    {
                        user ? <li className='cursor-pointer' onClick={handleLogOut}><Link>Logout</Link></li> : <li><Link to='/login'>Login</Link></li>
                    }

                    
                    
                    
                </ul>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Header;