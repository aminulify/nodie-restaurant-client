
import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Shared/Loading/Loading';
import useAdmin from '../CustomHook/useAdmin';

const AdminRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if(loading || isAdminLoading){
        <Loading></Loading>
    }

    if(user && isAdmin){
        return children;
    }
    return (
        <div>
            {/* // it works like dynamically that's why use two carli bases 
        // {{}} parent carli bases object and child carli bases dynamic  */}
        <Navigate to="/login" state={{from: location}}></Navigate>
        </div>
    );
};

export default AdminRoute;
