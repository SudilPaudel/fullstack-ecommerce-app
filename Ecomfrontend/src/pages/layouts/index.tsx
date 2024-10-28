import { ReactNode } from "react";
import { FooterComponent, HeaderComponent } from "../../components/common";
import { Outlet } from "react-router-dom";

const HomeLayout = ():ReactNode =>{
   
    return(
        <>
        <HeaderComponent/>

            <Outlet />
        <FooterComponent />

        </>
    )
}

export default HomeLayout