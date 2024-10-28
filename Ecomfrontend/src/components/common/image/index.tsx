import { ReactNode } from "react"
import { NavLink } from "react-router-dom"

export const ImageComponent = ({className="h-8 w-auto", url="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600",alt=""}:{className: string, url: string,alt: string }):ReactNode=>{
    return(
        <>
        <img className={className }src={url} alt={alt} />
        </>
    )
}
export const LogoComponent = ():ReactNode => {
    return (
        <>
            <div className="flex lg:flex-1">
                <NavLink to="/" className="-m-1.5 p-1.5">
                    <span className="sr-only">Your Company</span>
                    <ImageComponent className="h-8 w-auto" url="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Logo"/>
                </NavLink>
            </div>
        </>
    )
}