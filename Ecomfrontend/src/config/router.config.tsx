import { ReactNode, Suspense, useEffect, useState } from "react"

import { Route, Routes } from "react-router-dom"
import LandingPage from "../pages/landing/landing.page"
import LoginPage from "../pages/auth/login"
import HomeLayout from "../pages/layouts"
import RegisterPage from "../pages/auth/register"
// import AdminLayout from "../pages/layouts/admin-layout"
// const AdminLayout = lazy(() => import("../pages/layouts/admin-layout"))
// const AdminDashboard = lazy(()=> import("../pages/dashboard/admin-dashboard"))
// The following are the imports for the toast notifications for the user
import { ToastContainer } from "react-toastify"
import "react-toastify/ReactToastify.css"
import PermissionConfig from "./permission.config"
import AuthContext from "../context/auth.context"
import AxiosInstance from "./axios.config"
import AdminLayout from "../pages/layouts/admin-layout"
import AdminDashboard from "../pages/dashboard/admin-dashboard"
import { LoadingComponent } from "../components/common"
import { AdminBanner, AdminBannerCreate } from "../pages/banner"
import { AdminBrand } from "../pages/brand"
import AdminBrandCreate from "../pages/brand/admin-brand-create"




const RoutingConfig = ():ReactNode => {
  
  const [loggedInUser, setLoggedInuser] = useState()
  const [loading, setLoading] = useState(true);
  const getLoggedInUser = async () => {
    try {
      const token = localStorage.getItem("accessToken") || null;
      const response: any = await AxiosInstance.get("/auth/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setLoggedInuser(response.result);
    } catch (exception) {
      //handle
    } finally {

      setLoading(false);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("accessToken") || null;
    if (token) {
      getLoggedInUser();
    } else {

      setLoading(false);
    }
  }, []);

  return (

    <>
      <ToastContainer theme="colored" />
      {
        loading ? <>
          <LoadingComponent />
        </> : <><AuthContext.Provider value={{ loggedInUser: loggedInUser }}>

          <Routes>
            <Route path="/" element={<HomeLayout />}>
              <Route path="" element={<LandingPage />}> </Route>
              <Route path="login" element={<LoginPage />}> </Route>
              <Route path="register" element={<RegisterPage />}></Route>

              {/* ToDo : error page */}
              <Route path="*" element={<>Error page</>}> </Route>
            </Route>
            <Route path="/admin" element={
              <PermissionConfig allowAccess={"admin"}>
                <AdminLayout />
              </PermissionConfig>}>
              <Route index element={
                <Suspense fallback={<LoadingComponent />}>
                  <AdminDashboard />
                </Suspense>
              }></Route>
              <Route path="banner" element={<Suspense fallback = {<LoadingComponent />}>
                <AdminBanner />
              </Suspense>} ></Route>
              <Route path="banner/create" element={<Suspense fallback={<LoadingComponent />}>
              <AdminBannerCreate />
              </Suspense>}></Route>
              <Route path="brand" element={<Suspense fallback={<LoadingComponent />}>
                <AdminBrand />
              </Suspense>}></Route>
              <Route path="brand/create" element={<Suspense fallback={<LoadingComponent />}>
              <AdminBrandCreate />
              </Suspense>}></Route>
              <Route path="*" element={<>Error Page</>}></Route>
            </Route>
          </Routes>
        </AuthContext.Provider></>
      }
    </>
  )
}

export default RoutingConfig
