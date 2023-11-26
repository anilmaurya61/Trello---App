import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, signInWithRedirect, GoogleAuthProvider, signOut } from 'firebase/auth';
import app from '../firebase';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser !== null) {
            setUser({
                'displayName': currentUser.displayName,
                'email': currentUser.email,
                'photoURL': currentUser.photoURL,
                'emailVerified': currentUser.emailVerified,
                'uid': currentUser.uid
            });

        } else {
            setUser({});
        }
    }, [auth])

    console.log(user)
    const signIn = async () => {
        try {
            let result = await signInWithRedirect(auth, provider);
        } catch (error) {
            console.error(error.message);
        }
    };

    const SignOut = () => {
        signOut(auth).then(() => {
            console.log('SignOut')
        }).catch((error) => {
            console.log(error.message)
        });
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, signIn, SignOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
