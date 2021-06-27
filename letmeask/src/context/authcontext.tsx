import firebase from "firebase";
import { createContext, ReactNode, useEffect, useState } from "react";
import { authFirebase } from "../services/firebase";

type UserType = {
    id: string,
    name: string,
    avatar: string,
};
type AuthContextType = {
    user: UserType | undefined,
    signInWithGoogle: () => Promise<void>,
}
type AuthContextProviderProps = {
    children: ReactNode,
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<UserType>();

    useEffect(() => {
        const unsubscribe = authFirebase.onAuthStateChanged(user => {
            if (user) {
                const { displayName, photoURL, uid } = user;

                if (!displayName || !photoURL) {
                    throw new Error('MIssing Display Name or Photo');
                }

                setUser({ id: uid, name: displayName, avatar: photoURL });

            }
        })

        return () => {
            unsubscribe();
        }
    }, []);

    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await authFirebase.signInWithPopup(provider)
        console.log(result);
        if (result.user) {
            const { displayName, photoURL, uid } = result.user;

            if (!displayName || !photoURL) {
                throw new Error('MIssing Display Name or Photo');
            }

            setUser({ id: uid, name: displayName, avatar: photoURL });

        }
    }

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    );
}