import { useForm } from "react-hook-form"
import { TextInputField, SelectOptionComponent } from "../../components/common/form"
import { toast } from "react-toastify"
import {  useNavigate } from "react-router-dom"
import AxiosInstance from "../../config/axios.config"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"


const AdminBrandCreate = () => {
    let [loading, setLoading]= useState(false)
    const navigate = useNavigate()
    
    const createDTO = Yup.object({
        title:Yup.string().min(3).required(),
        homeSection: Yup.bool().required(),
        status: Yup.object({
            label: Yup.string().matches(/^(Active|Inactive)$/),
            value: Yup.string().matches(/^(active|inactive)$/)
        }).required(),
        image: Yup.mixed().required()
    })
    const { control, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(createDTO)
    })
    const submitForm = async (data: any) => {
        try {
            setLoading(true)
            const mappedData = {
                ...data,
                status: data.status.value
            }
            const response = await AxiosInstance.post("/brand", mappedData, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                    "Content-Type": "multipart/form-data"
                }
            })
            console.log(response)
            toast.success("Brand Created Successfully")
            navigate("/admin/brand")
        } catch (exception: any) {
            console.log(exception)
            toast.error("Error Creating Brand at the moment")
        }finally{
            setLoading(false)
        }
    }
    return (<>
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 ">
                <div className="grid grid-cols-1 gap-8  lg:gap-16">
                    <h1 className="text-4xl text-center font-bold">Create Brand</h1>
                </div>
                <div className="rounded-lg border border-gray-200 mt-16">
                    <div className="overflow-x-auto rounded-t-lg">
                        <form className="grid grid-cols-6 gap-6" onSubmit={handleSubmit(submitForm)}>
                            <div className="col-span-6 ">
                                <label htmlFor="title" className=" block text-sm font-medium text-gray-700">
                                    Title <span className="text-red-800">*</span>
                                </label>
                                <TextInputField name="title" control={control} errMsg={errors?.title?.message as string} />


                            </div>




                            <div className="col-span-6">
                                <label htmlFor="Homesection" className=" block text-sm font-medium text-gray-700"> Homesection <span className="text-red-800">*</span></label>
                                
                            </div>

                            <div className="col-span-6">
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700"> Status <span className="text-red-800">*</span></label>

                                <SelectOptionComponent  
                                    options={[{ label: "Active", value: "active" }, { label: "Inactive", value: "inactive" }]}
                                    name="status"
                                    control={control}
                                    errMsg={errors?.status?.message as string}
                                />
                                

                            </div>

                            <div className="col-span-6 ">
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                    Image <span className="text-red-800">*</span>
                                </label>

                                <input
                                    type="file"
                                    id="file_input"
                                    onChange={(e: any) => {
                                        const uploaded = e.target.files[0]
                                        setValue("image", uploaded)
                                    }}
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                />
                                <span className="text-red-500">{errors?.image?.message as string}</span>
                            </div>
                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                <button
                                    className="inline-block shrink-0 rounded-md border border-green-700 bg-green-700 px-6 py-2 text-sm font-medium text-white transition hover:bg-transparent hover:text-green-700 focus:outline-none focus:ring active:text-green-700"
                                    disabled={loading}
                                >
                                    Create Brand
                                </button>

                            </div>
                        </form>
                    </div>


                </div>
            </div>
        </section>
    </>)
}
export default AdminBrandCreate