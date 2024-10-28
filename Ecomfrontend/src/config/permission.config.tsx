import { ReactNode, useContext } from "react"
import AuthContext from "../context/auth.context"
import { toast } from "react-toastify"
import { Navigate } from "react-router-dom"

const PermissionConfig = ({ children: Children, allowAccess }: any): ReactNode => {
    const auth = useContext(AuthContext)

    if (auth.loggedInUser && auth.loggedInUser.role === allowAccess) {
        return Children
    } else if (auth.loggedInUser && auth.loggedInUser.role !== allowAccess) {
        toast.error("You donot have permission to access this pannel")
        return <Navigate to={"/" + auth.loggedInUser.role} />

    } else {

        toast.error("Please Log in First")
        return <Navigate to="/login" />
    }
}

export default PermissionConfig