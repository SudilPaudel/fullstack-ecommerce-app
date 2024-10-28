import { ReactNode, useContext, useEffect } from "react"
import { SectionTitle } from "../../../components/common"
import { useForm } from "react-hook-form"
import { SelectFieldComponent, TextInputField } from "../../../components/common/form"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { NavLink, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import AxiosInstance from "../../../config/axios.config"
import AuthContext from "../../../context/auth.context"

const RegisterPage = (): ReactNode => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const rules = Yup.object({
        name: Yup.string().required().min(2).max(50),
        email: Yup.string().required().email(),
        password:Yup.string().required().min(8).max(15).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/),
        confirmPassword:Yup.string().required().oneOf([Yup.ref("password"), "Confirm Password and Password doesnt match"]),
        role: Yup.string().required().matches(/^(seller|customer)$/),
        image: Yup.mixed()
    })
    const { control, handleSubmit, setValue, formState: { errors } } = useForm({
        
        resolver: yupResolver(rules)
        
    })

    const submitForm = async(data: any) => {
        try{
            
            const response: any = await AxiosInstance.post("/auth/register", data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            console.log(response)
            toast.success("registeration success")
            navigate("/")
        }catch(exception: any){
            console.log("exception")
            toast.error("Cannot Register at the moment")
        }
    }
    useEffect(()=>{
        
        if(auth.loggedInUser){
            toast.info("You are already logged in !! ");
            navigate("/"+auth.loggedInUser.role)
        }
    }, [auth])
    return (
        <>
            <div className="bg-lime-50 mt-5 mx-auto">
                <SectionTitle classes={"text-center"}>
                    Register Your Account
                </SectionTitle>
                <div>
                <div className="px-10">
                    <section className="bg-lime-50">
                        <div className="lg:grid  lg:grid-cols-12">
                            
                            <main
                                className="flex items-center justify-center px-8 py-8 sm:px-12  lg:px-16 lg:py-12 col-span-12"
                            >
                                <div className="max-w-xl lg:max-w-3xl lg:w-full">
                                   
                                    <form  className=" grid grid-cols-6 gap-6" onSubmit={handleSubmit(submitForm)}>
                                        <div className="col-span-6 ">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                Name <span className="text-red-800">*</span>
                                            </label>
                                            <TextInputField name= "name" control={control}   errMsg={errors?.name?.message}  />
                                            
                                            
                                        </div>
                                        

                                        

                                        <div className="col-span-6">
                                            <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email <span className="text-red-800">*</span> </label>
                                            <TextInputField control={control} type="email" name= "email" errMsg={errors?.email?.message }  />
                                            
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password  <span className="text-red-800">*</span></label>
                                            <TextInputField control={control} type="password" name= "password" errMsg={errors?.password?.message }  />
                                            
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
                                                Password Confirmation <span className="text-red-800">*</span>
                                            </label>
                                            <TextInputField control={control} type="password" name= "confirmPassword" errMsg={errors?.confirmPassword?.message }  />
                                            <span className="text-red-500">{errors?.password?.message ? "Password is required" : ""}</span>
                                        </div>

                                        <div className="col-span-6">
                                            <label htmlFor="Role" className="block text-sm font-medium text-gray-700"> Role </label>
                                            <SelectFieldComponent 
                                                options={[{label: "Seller", value:"seller"},{label: "Buyer", value:"customer"}]}
                                                name="role"
                                                control={control}
                                                errMsg={errors?.role?.message }
                                            />
                                           
                                            
                                        </div>
                                        
                                        <div className="col-span-6 ">
                                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                               Image
                                            </label>

                                            <input
                                                type="file"
                                                id="file_input"
                                                onChange={(e: any)=>{
                                                    const uploaded = e.target.files[0]
                                                    setValue("image", uploaded)
                                                }}
                                                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                            />
                                        </div>
                                        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                            <button
                                                className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                                            >
                                                Create an account
                                            </button>

                                            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                                Already have an account?
                                                <NavLink to="/login" className="text-gray-700 underline">Log in</NavLink>.
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </main>
                        </div>
                    </section>
                </div>
                </div>
            </div>
        </>
    )
}

export default RegisterPage