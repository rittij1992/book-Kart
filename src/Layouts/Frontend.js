import { Outlet } from "react-router-dom";
import Header from "../Components/Header";

const FrontendLayout = ()=>{
    return(
        <div>
            <Header/>
            <Outlet/>
        </div>
    )
};

export default FrontendLayout;