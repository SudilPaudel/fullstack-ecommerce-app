import { ReactNode, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { LoadingComponent } from "../../components/common"
import ActionButton from "../../components/common/table/action-button.component"
import PaginationComponent from "../../components/common/table/pagination.component"
import AxiosInstance from "../../config/axios.config"
import { toast } from "react-toastify"
import Swal from "sweetalert2"

const AdminBrand = ():ReactNode =>{
    const Per_Page_limit = 15
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [pagination, setPagination] = useState({

        totalPages: 1,
        currentPage: 1,

    })
    const getBrandList = async ({ page = 1, limit = Per_Page_limit }) => {
        try {
            setLoading(true)
            const response: any = await AxiosInstance.get("/brand", {
                params: {
                    page: page,
                    limit: limit
                },
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken")
                }
            })
            const totalPages = Math.ceil(response.meta.total / response.meta.limit);
            setPagination({
                totalPages: totalPages,
                currentPage: response.meta.page
            })
            setData(response.result)
        } catch (exception: any) {
            //handle the exception
            toast.error("Error Fetching the Banner")
        } finally {
            setLoading(false)
        }

    }
    useEffect(() => {
        //Api Call to get the data from the backend
        getBrandList({ page: 1, limit: Per_Page_limit })
    }, [])

    const deleteBrand = async (id: string) => {
        try {
            setLoading(true)
            const response = await AxiosInstance.delete("/banner/" + id, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("accessToken")
                }
            })
            Swal.fire({
                title: "Successfully Deleted!",
                text: "Your Banner has been deleted.",
                icon: "success"
            });
            getBrandList({ page: 1, limit: Per_Page_limit });
            console.log(response)
        } catch (exception) {
            toast.error("Banner Couldnt be deleted at this moment");
            console.log(exception)
        }
    }
    return(<>
         <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 ">
                <div className="grid grid-cols-3 gap-8  lg:gap-16">
                    <h1 className="text-3xl font-bold">Brand List</h1>
                    <div></div>
                    <NavLink to="/admin/brand/create">
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-3 text-center py-2 px-2">Create Banner</button>
                    </NavLink>

                </div>
                <div className="rounded-lg border border-gray-200 mt-8">
                    <div className="overflow-x-auto rounded-t-lg">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                            <thead className="ltr:text-left rtl:text-right bg-black">
                                <tr>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Title</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Image </th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Home Section</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Status</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-white "></th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {
                                    loading ? <><LoadingComponent /></> : <>
                                        {
                                            data && data.map((brand: any, index: number) => (
                                                <tr className="odd:bg-gray-50" key={index}>
                                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{brand.title}</td>
                                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{brand.image}</td>
                                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{brand.homeSection}</td>
                                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{brand.status}</td>
                                                    <td className="whitespace-nowrap px-4 py-2">
                                                        <ActionButton
                                                            rowId={brand._id}
                                                            deleteAction={deleteBrand}
                                                        />
                                                    </td>

                                                </tr>
                                            ))
                                        }
                                    </>
                                }


                            </tbody>
                        </table>
                    </div>

                    {
                        loading ? <></> : <>
                            <PaginationComponent
                                fetchCall={getBrandList}
                                pagination={pagination}
                            />
                        </>
                    }
                </div>
            </div>
        </section>
    </>)
}

export default AdminBrand