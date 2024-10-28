import { ReactNode } from "react";
import { FaPen, FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2"

const ActionButton = ({
    showDelete = true, showEdit = true, rowId, deleteAction= ()=>{}
}: { showDelete?: Boolean | true, showEdit?: Boolean | true, rowId: string, deleteAction?: Function }): ReactNode => {

    const showDeletePannel = ()=>{
        try{
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
              }).then((result) => {
                if (result.isConfirmed) {
                    deleteAction(rowId)
                //   Swal.fire({
                //     title: "Deleted!",
                //     text: "Your file has been deleted.",
                //     icon: "success"
                //   });
                }
              });
        }catch(exception){
            console.log(exception)
        }
    }
    return (<>
        {
            showEdit ? <>
                <a
                    href="#"
                    className="inline-block me-1 rounded rounded-full bg-indigo-600 px-2 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                >
                    <FaPen />
                </a></> : <></>
        }
        {
            showDelete ? <>
                <a
                    href="#"
                    onClick={(e)=>{
                        e.preventDefault()
                        showDeletePannel()
                    }}
                    className="inline-block rounded rounded-full bg-red-600 px-2 py-2 text-xs font-medium text-white hover:bg-red-700"
                >
                    <FaTrash />
                </a>
            </> : <></>
        }
    </>)
}
export default ActionButton