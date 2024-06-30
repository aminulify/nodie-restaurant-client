import {
    createBrowserRouter

} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home"
import Menu from "../Menu/Menu/Menu";
import OurShopLayout from "../OurShop/OurShopLayout/OurShopLayout";
import ContactCover from "../ContactPage/ContactCover";
import Login from "../LoginPage/Login";
import Signup from "../Signup/Signup";
import Dashboard from "../Layout/Dashboard";
import MyCart from "../DashboardPage/MyCart/MyCart";
import AllUsers from "../DashboardPage/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import AddItem from "../DashboardPage/AddItem.jsx/AddItem";
import PrivateRoutes from "./PrivateRoutes";
import ManageItem from "../DashboardPage/ManageItem/ManageItem";
import UpdateItem from "../DashboardPage/UpdateItem/UpdateItem";
import Payment from "../DashboardPage/Payment/Payment";
import AdminHome from "../DashboardPage/AdminHome/AdminHome";
import UserHome from "../DashboardPage/UserHome/UserHome";
import OurShopItemShowDetail from "../OurShop/OurShopItems/OurShopItemShowDetail";
import UserReviews from "../DashboardPage/UserReviews/UserReviews";
import PaymentHistory from "../DashboardPage/PaymentHistory/PaymentHistory";
import ErrorPage from "../ErrorPage/ErrorPage";
import UserBookings from "../DashboardPage/UserBookings/UserBookings";
import UserReservation from "../DashboardPage/UserReservation/UserReservation";
import ManageBookings from "../DashboardPage/ManageBookings/ManageBookings";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/menu',
            element: <Menu></Menu>
        },
        {
            path: '/our_shop/:category',
            element: <OurShopLayout></OurShopLayout>
        },
        {
            path: '/our_shop/:category/:id',
            element: <OurShopItemShowDetail></OurShopItemShowDetail>
        },
        {
            path: '/contact_us',
            element: <ContactCover></ContactCover>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/signup',
          element: <Signup></Signup>
        }
      ]
    },
    {
      path: '/dashboard',
      element: <Dashboard></Dashboard>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          path: 'my_cart',
          element: <PrivateRoutes><MyCart></MyCart></PrivateRoutes>
        },
        {
          path: 'all_users',
          element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
        },
        {
          path: 'payment',
          element: <Payment></Payment>,
         
        },
        {
          path: 'add_item',
          element: <AdminRoute><AddItem></AddItem></AdminRoute>
        },
        {
          path: 'manage_items',
          element: <AdminRoute><ManageItem></ManageItem></AdminRoute>
        },
        {
          path: 'manage_items/update/:id',
          element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
         
        },
        {
          path: 'admin_home',
          element: <AdminRoute><AdminHome></AdminHome></AdminRoute>,
         
        },
        {
          path: 'user_home',
          element: <PrivateRoutes><UserHome></UserHome></PrivateRoutes>,
         
        },
        {
          path: 'user_reviews',
          element: <UserReviews></UserReviews>,
         
        },
        {
          path: 'payment_history',
          element: <PaymentHistory></PaymentHistory>,
         
        },
        {
          path: 'user_bookings',
          element: <UserBookings></UserBookings>,
         
        },
        {
          path: 'user_reservation',
          element: <UserReservation></UserReservation>,
         
        },
        {
          path: 'manage_bookings',
          element: <ManageBookings></ManageBookings>,
         
        },
        

      ]
    }
  ]);
