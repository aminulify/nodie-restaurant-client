import React from 'react';
import { Outlet, useLocation, useNavigation } from 'react-router-dom';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';
import Loading from '../Shared/Loading/Loading';

const Main = () => {
    const location = useLocation();

    const noHeaderFooter = location.pathname.includes('/login') || location.pathname.includes('/signup');

    // navigation snipper
    const navigation = useNavigation();

    return (
        <div>
            {/* loading  */}
            {
                navigation.state === 'loading' ? <Loading></Loading> : '' 
            }


            {/* ( || ) OR operator. If noHeaderFooter is false then condition works true  */}
            {
            //    noHeaderFooter || <Header></Header>
               <Header></Header>
            }

            <Outlet></Outlet>

            {
                <Footer></Footer>
            }
        </div>
    );
};

export default Main;