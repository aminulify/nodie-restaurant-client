import { useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';


const axiosSecure = axios.create({
  baseURL: 'https://nodie-restaurant-api.sarkbd.com',
});

const useAxiosSecure = () => {

  const { logOut, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

    useEffect(() => {
      axiosSecure.interceptors.request.use(config => {
      const token = localStorage.getItem('access-token');
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,

      async (error) => {
    
    
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
  
  return [axiosSecure];
};

export default useAxiosSecure;