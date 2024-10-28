import { ReactNode } from "react";
export interface ChildrenProps {
    children: ReactNode
    classes?: null | string
}
export const SectionTitle = ({children, classes= null}: ChildrenProps):ReactNode =>{
    return(
        <>
        <div className="bg-lime-50 mt-10 ">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:px-6 sm:py-10  lg:max-w-7xl lg:px-8">
                    <h2 className={`text-2xl font-bold tracking-tight text-gray-900 ${classes}`}>{children}</h2>
                </div>
            </div>
        </>
    )
}