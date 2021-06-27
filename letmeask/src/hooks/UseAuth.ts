import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


export function useAuthHook() {
    const value = useContext(AuthContext);
    return value;
}