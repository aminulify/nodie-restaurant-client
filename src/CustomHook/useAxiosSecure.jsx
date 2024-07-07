import { useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';


const axiosSecure = axios.create({
  baseURL: 'https://restaurant-cods.aminulify.com',
});

const useAxiosSecure = () => {

  const { logOut, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

    useEffect(() => {
      axiosSecure.interceptors.request.use(config => {
      const token = localStorage.getItem('access-token');
      // console.log('token run',token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,

      async (error) => {
        // (error) => {
    
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            if(user){
        
                await logOut();
                navigate('/login', {state: {from: location}}, { replace: true });
            }
            }
            return Promise.reject(error);
          }
    );

  }, [logOut, navigate, axiosSecure]);
  // }, [navigate, axiosSecure]);


  return [axiosSecure];
};

export default useAxiosSecure;