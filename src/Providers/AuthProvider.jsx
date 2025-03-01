import React, { createContext, useEffect, useState } from 'react';
import { FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, deleteUser, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from '../Firebase/firebase.config';
import axios from 'axios';

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // create User 
    const createUser = (email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // sign in 
    const signInUser = (email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }

    // updateProfile 
    const updateUserProfile = (name, photo) =>{
        updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
        .then(() => {
            // Profile updated!
            // ...
          }).catch((error) => {
            // An error occurred
            // ...
          });
    }

    // logout 
    const logOut = () =>{
        setLoading(true);
        return signOut(auth);
    }


    // google authentication 
    const googleAuth = () =>{
        setLoading(true);
        const provider = new GoogleAuthProvider(); 
        return signInWithPopup(auth, provider);
    }

    // facebook authentication 
    const facebookAuth = () =>{
        setLoading(true);
        const provider = new FacebookAuthProvider();
        return signInWithPopup(auth, provider);
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser);
            // console.log('current user',currentUser);

            // get and set token 
            // if(currentUser){
            //     fetch('http://nodie-restaurant.aminulify.com/jwt',{
            //         method: 'POST',
            //         headers: {
            //             'content-type': 'application/json'
            //         },
            //         body: JSON.stringify(currentUser)

            //     })
            //     .then(res=>res.json())
            //     .then(data=>{
            //         localStorage.setItem('access-token', data.token);
            //     })
            //     }
            // else{
            //     localStorage.removeItem('access-token');
            // } 

            // *** Axios 
            // *** if you want use send data fetch POST method but we want to explore more Axios js  
        
            if(currentUser){
                
                axios.post('http://nodie-restaurant.aminulify.com/jwt', {email:currentUser.email})
                .then(data => {
                    localStorage.setItem('access-token', data.data.token);
                    setLoading(false);
                    
                })
            }
            else{
                localStorage.removeItem('access-token');
            }
            

        })
        return () => {
            return unSubscribe();
        }
    },[])

    const authInfo = {
        user, 
        loading,
        createUser,
        signInUser,
        googleAuth,
        facebookAuth,
        updateUserProfile,
        logOut,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;