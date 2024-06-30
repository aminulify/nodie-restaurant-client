import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Shared/Loading/Loading';

const PrivateRoutes = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    // console.log(location);

    if(loading){
        <Loading></Loading>
    }

    if(user){
        return children;
    }
    return (
        // it works like dynamically that's why use two carli bases 
        // {{}} parent carli bases object and child carli bases dynamic 
        <Navigate to="/login" state={{from: location}}></Navigate>
    );
}; 

export default PrivateRoutes;