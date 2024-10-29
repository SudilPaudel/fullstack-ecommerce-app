import { useState } from 'react'
import {
    Dialog,
    DialogPanel
} from '@headlessui/react'

import { HiBars3, HiXMark } from 'react-icons/hi2'
import { NavLink, Outlet } from 'react-router-dom'
import { LogoComponent } from '../../../components/common/image'
import { FaImages, FaLayerGroup, FaTag } from 'react-icons/fa6'
import { FaHome } from 'react-icons/fa'




const AdminLayout = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    return (<>
        <header className="bg-gray-950">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <NavLink to="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <LogoComponent />
                    </NavLink>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <HiBars3 aria-hidden="true" className="h-6 w-6 text-white" />
                    </button>
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <NavLink to="/" className="text-sm font-semibold leading-6 text-white">
                        Log Out <span aria-hidden="true">&rarr;</span>
                    </NavLink>
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-10" />
                <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <NavLink to="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                alt=""
                                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                                className="h-8 w-auto"
                            />
                        </NavLink>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-white"
                        >
                            <span className="sr-only">Close menu</span>
                            <HiXMark aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">


                            </div>
                            <div className="py-6">
                                <NavLink
                                    to="/"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-50"
                                >
                                    Log Out
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
        <div className="flex">
            <div className="flex h-screen w-16 flex-col justify-between border-e bg-gray-950">
                <div>
                    

                    <div className="border-t border-gray-100">
                        <div className="px-2">
                            <div className="py-4">
                                <NavLink
                                    to="/"
                                    className="t group relative flex justify-center rounded bg-blue-50 px-2 py-1.5 text-blue-500 hover:bg-gray-50 hover:text-gray-700"
                                >
                                    <FaHome />
                                    <span
                                        className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                                    >
                                        Home
                                    </span>
                                </NavLink>
                            </div>

                            <ul className="space-y-1 border-t border-gray-100 pt-4">
                                <li>
                                    <NavLink
                                        to="/admin/banner"
                                        className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                    >
                                        <FaImages />
                                        <span
                                            className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                                        >
                                            Banners
                                        </span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/admin/brand"
                                        className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                    >
                                        <FaTag />

                                        <span
                                            className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                                        >
                                            Brands
                                        </span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/admin/category"
                                        className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                    >
                                        <FaLayerGroup />

                                        <span
                                            className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                                        >
                                            Categories
                                        </span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/"
                                        className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="size-5 opacity-75"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>

                                        <span
                                            className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                                        >
                                            Account
                                        </span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Logout section */}
                <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-gray-950 p-2">
                    <form action="#">
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-5 opacity-75"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>

                            <span
                                className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                            >
                                Logout
                            </span>
                        </button>
                    </form>
                </div>
            </div>
            <div className="flex h-screen w-full flex-col justify-between px-20 py-10">
                <Outlet />
            </div>


        </div>
    </>)
}
export default AdminLayout