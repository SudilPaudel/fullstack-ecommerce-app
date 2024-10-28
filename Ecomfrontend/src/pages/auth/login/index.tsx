import { NavLink, useNavigate } from "react-router-dom"
import { SectionTitle } from "../../../components/common"
import { ImageComponent } from "../../../components/common/image"
import { useForm } from "react-hook-form"
import { TextInputField } from "../../../components/common/form"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from "react-toastify"
import AxiosInstance from "../../../config/axios.config"
import { ReactNode, useContext, useEffect } from "react"
import AuthContext from "../../../context/auth.context"


const LoginPage = ():ReactNode => {
    const auth = useContext(AuthContext)
    console.log("i am here", auth)
    const navigate = useNavigate()
    const loginDTO = Yup.object({
        email: Yup.string().email().required("Email Is Required"),
        password: Yup.string().required("Password is Required")
    })
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginDTO)

    })

    const submitForm = async (data: any) => {
        try {
            const response: any = await AxiosInstance.post("/auth/login", data)
            console.log(response)
            // local storage ma user ko data lai rakheko [if u want u can store it in cookie as well] || [Seccsion storage ma ni rakhna milxa but session storage ko data chai browser ko tab haru ma share hunna so majority case ma we use local storage]
            localStorage.setItem("accessToken", response.result.token.accessToken)
            localStorage.setItem("refreshToken", response.result.token.refreshToken)

            auth.loggedInUser = response.result.detail
            // success call ma user ko role ko pannel ma navigate gardeko
            toast.success("Welcome to " + response.result.detail.role + " Pannel")
            navigate("/" + response.result.detail.role)
        } catch (exception: any) {
            toast.error(exception.message)
        }
    }
    useEffect(() => {
        if (auth.loggedInUser) {

            toast.info("You are already logged in !! ");
            navigate("/" + auth.loggedInUser.role)
        }
    }, [auth])
    return (
        <>


            <div className="bg-lime-50 mt-5">
                <SectionTitle classes={"text-center"}>
                    Sign In To Your Account
                </SectionTitle>

                <div className="flex min-h-full flex-1 flex-col justify-center px-6  lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <ImageComponent className="mx-auto h-10 w-auto" url="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Logo" />

                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={handleSubmit(submitForm)}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <TextInputField control={control} type="email" name="email" errMsg={errors?.email?.message} />


                                </div>

                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <TextInputField control={control} type="password" name="password" errMsg={errors?.password?.message} />


                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 mb-32 text-center text-sm text-gray-500">
                            Not a member?{' '}
                            <NavLink to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Register Your Account
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>


        </>
    )
}
export default LoginPage

//may 25th dekhi garne aba 