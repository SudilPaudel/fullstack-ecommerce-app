import { ReactNode, useContext, useState } from "react"
import {
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/react'


import { HiBars3, HiChevronDown } from "react-icons/hi2"
import { LogoComponent } from "../image"
import { NavLink } from "react-router-dom"
import MobileMenuComponent from "./mobile-menu.component"
import AuthContext from "../../../context/auth.context"


// function classNames(...classes : any) {
//     return classes.filter(Boolean).join(' ')
// }
const HeaderComponent = (): ReactNode => {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const auth = useContext(AuthContext)

    return (
        <>
            <header className="bg-lime-50">
                <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                    <div className="flex lg:flex-1">
                        <LogoComponent />
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Open main menu</span>
                            <HiBars3 aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                    <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                        <Popover className="relative">
                            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                                Categories
                                <HiChevronDown aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
                            </PopoverButton>

                            <PopoverPanel
                                transition
                                className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <div className="p-4">
                                    <div className="group relative flex items-center gap-x-6 rounded-lg px-2 py-2 text-sm leading-6 hover:bg-gray-50">

                                        <div className="flex-auto">
                                            <NavLink to={"/electronics"} className="block font-semibold text-gray-900">
                                                Electronics
                                                <span className="absolute inset-0" />
                                            </NavLink>

                                        </div>
                                    </div>
                                    <div className="group relative flex items-center gap-x-6 rounded-lg px-2 py-2 text-sm leading-6 hover:bg-gray-50">

                                        <div className="flex-auto">
                                            <NavLink to={"/clothing"} className="block font-semibold text-gray-900">
                                                Clothing
                                                <span className="absolute inset-0" />
                                            </NavLink>

                                        </div>

                                    </div>
                                    <div className="group relative flex items-center gap-x-6 rounded-lg px-2 py-2 text-sm leading-6 hover:bg-gray-50">

                                        <div className="flex-auto">
                                            <NavLink to={"/smart-phone"} className="block font-semibold text-gray-900">
                                                Smart Phones
                                                <span className="absolute inset-0" />
                                            </NavLink>

                                        </div>

                                    </div>
                                </div>

                            </PopoverPanel>
                        </Popover>

                        <NavLink to="/product-lists" className="text-sm font-semibold leading-6 text-gray-900">
                            Features
                        </NavLink>
                        <NavLink to="/policy" className="text-sm font-semibold leading-6 text-gray-900">
                            Policy
                        </NavLink>
                        <NavLink to="/about-us" className="text-sm font-semibold leading-6 text-gray-900">
                            About Us
                        </NavLink>
                    </PopoverGroup>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        {
                            auth.loggedInUser ? <>
                                <NavLink to={"/"+auth.loggedInUser.role} className="text-sm font-semibold leading-6 text-gray-900 me-5">
                                    {auth.loggedInUser.name}
                                    <span aria-hidden="true">&rarr;</span>
                                </NavLink>


                                <NavLink to="/login" className="text-sm font-semibold leading-6 text-gray-900">
                                    Log Out
                                    <span aria-hidden="true">&rarr;</span>
                                </NavLink>
                            </> : <>
                                <NavLink to="/register" className="text-sm font-semibold leading-6 text-gray-900 me-5">
                                    Sign Up
                                    <span aria-hidden="true">&rarr;</span>
                                </NavLink>


                                <NavLink to="/login" className="text-sm font-semibold leading-6 text-gray-900">
                                    Log in
                                    <span aria-hidden="true">&rarr;</span>
                                </NavLink>
                            </>
                        }
                    </div>

                </nav>
                <MobileMenuComponent mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
            </header>
        </>
    )
}
export default HeaderComponent