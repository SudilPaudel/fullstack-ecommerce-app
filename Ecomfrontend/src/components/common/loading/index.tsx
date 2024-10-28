import { ReactNode } from "react"

const LoadingComponent = ():ReactNode =>{
    return (<>
    <div className="flex h-screen items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
            </div>
          </div>
    </>)
}
export default LoadingComponent