import { Link, NavLink, Outlet, useLocation, useNavigation } from "react-router-dom";
import { FaBook, FaShoppingCart, FaUsers } from "react-icons/fa";
import { IoWallet } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { MdFastfood } from "react-icons/md";
import { GrRestaurant } from "react-icons/gr";
import UseCarts from "../CustomHook/UseCarts";
import useAdmin from "../CustomHook/useAdmin";
import { GiStarMedal } from "react-icons/gi";
import { MdBookmarkAdded } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { IoBookmarks } from "react-icons/io5";

const Dashboard = () => {
    const [cart] = UseCarts();
    const {user} = useContext(AuthContext);

    // admin role check from useAdmin.jsx
    const [isAdmin] = useAdmin();
    
    return (
        <div className="bg-white">
            
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">

                    {/* Page content here */}
                    <Outlet></Outlet>
                    
                    <label htmlFor="my-drawer-2" className="text-2xl p-2 bg-[#597445] text-white hover:bg-black  duration-300 absolute top-5 left-6 lg:hidden"><FiMenu /></label>
                
                </div> 
                <div className="drawer-side">
                    
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
                    
                    <ul className="menu p-4 w-80 min-h-full bg-[#597445] text-base-content">

                    <div className="flex-row text-white mx-auto pt-2 pb-5">
                        <Link to='/'>  <h2 className='font-bold text-2xl heading-font mb-[-5px]'>Nodie Cods</h2>
                        <p className=' font-semibold tracking-[1.3px] pb-1'>RESTAURANT</p></Link>
                    </div>
                    {/* Sidebar content here */}
                    {
                        isAdmin || false ? <>
                        <li className="hover:underline text-white duration-300" ><NavLink to='/dashboard/admin_home'><IoBookmarks className="text-lg"/>Admin Home</NavLink></li>

                        <li className="hover:underline text-white duration-300" ><NavLink to='/dashboard/add_item'><MdFastfood className="text-lg"/> ADD ITEM</NavLink></li>

                        <li className="hover:underline text-white duration-300" ><NavLink to='/dashboard/manage_items'><GrRestaurant className="text-lg"/> MANAGE ITEMS</NavLink></li>

                        <li className="hover:underline text-white duration-300" ><NavLink to='/dashboard/manage_bookings'><FaBook className="text-lg"/> MANAGE BOOKINGS</NavLink></li>

                        <li className="hover:underline text-white duration-300" ><NavLink to='/dashboard/all_users'><FaUsers className="text-lg"/> MANAGE USERS</NavLink></li>


                        </> : <>
                    
                    <li className="hover:underline text-white duration-300" ><NavLink to='/dashboard/user_home'><FaHome className="text-lg"/>User Home</NavLink></li>

                    <li className="hover:underline text-white duration-300" ><NavLink to='/dashboard/user_reservation'><MdDateRange className="text-lg"/>Reservation</NavLink></li>

                    <li className="hover:underline text-white duration-300" ><NavLink to='/dashboard/user_reviews'><GiStarMedal className="text-lg"/> Reviews</NavLink></li>

                    <li className="hover:underline text-white duration-300" ><NavLink to='/dashboard/my_cart'><FaShoppingCart className="text-lg"/> My Cart <div className="badge badge-sm absolute left-[35%]">+{cart.length}</div></NavLink></li>

                    <li className="hover:underline text-white duration-300" ><NavLink to='/dashboard/user_bookings'><MdBookmarkAdded className="text-lg"/>My Bookings</NavLink></li>

                    <li className="hover:underline text-white duration-300" ><NavLink to='/dashboard/payment_history'><IoWallet className="text-lg"/> Payment History</NavLink></li>

                    </>
                    }

                    <hr className="my-5 border-[1.2px] mx-4 border-white"/>

                    <li className="hover:underline text-white duration-300"><NavLink to='/'><FaHome className="text-lg"/> Home</NavLink></li>
                    <li className="hover:underline text-white duration-300"><Link to='/menu'><MdOutlineRestaurantMenu className="text-lg"/> Our Menu</Link></li>
                    <li className="hover:underline text-white duration-300"><NavLink to='/our_shop/salad'><FaShoppingCart className="text-lg"/> Order Food</NavLink></li>
                    
                    
                    </ul>
                
                </div>
                </div>
        </div>
    );
};

export default Dashboard;