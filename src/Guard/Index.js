import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../ContextApi/UserContext";

const AuthGuard = ()=>{
    const {userToken} = useContext(UserContext);
    
    return(
        userToken ? <Outlet></Outlet> : <Navigate to='/auth/login'></Navigate>
    )
};

export default AuthGuard;