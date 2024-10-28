import { ReactNode } from "react"
import { NavLink } from "react-router-dom"
import { Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react"
import { LogoComponent } from "../image"
import { HiXMark } from "react-icons/hi2"
import { HiChevronDown } from "react-icons/hi"
interface MobileMenuProps {
    mobileMenuOpen: boolean,
    setMobileMenuOpen:any
}
const MobileMenuComponent = ({mobileMenuOpen, setMobileMenuOpen}: MobileMenuProps):ReactNode=>{
    return(<>
    <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                    <div className="fixed inset-0 z-10" />
                    <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-lime-50 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <LogoComponent />

                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            >
                                <span className="sr-only">Close menu</span>
                                <HiXMark aria-hidden="true" className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    <Disclosure as="div" className="-mx-3">
                                        <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                            Categories
                                            <HiChevronDown aria-hidden="true" className="h-5 w-5 flex-none group-data-[open]:rotate-180" />
                                        </DisclosureButton>
                                        <DisclosurePanel className="mt-2 space-y-2">

                                            <NavLink
                                                to={"/electronics"}
                                                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                            >
                                                Electronics
                                            </NavLink>
                                            <NavLink
                                                to={"/clothings"}
                                                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                            >
                                                Clothings
                                            </NavLink>
                                            <NavLink
                                                to={"/smart-phones"}
                                                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                            >
                                                Smart Phones
                                            </NavLink>

                                        </DisclosurePanel>
                                    </Disclosure>
                                    <NavLink
                                        to="/product-list"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Features
                                    </NavLink>
                                    <NavLink
                                        to="/about-us"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        About Us
                                    </NavLink>
                                    <NavLink
                                        to="/policy"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Policy
                                    </NavLink>
                                </div>
                                <div className="py-6">
                                    <NavLink
                                        to="/register"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Sign Up
                                    </NavLink>
                                    <NavLink
                                        to="/login"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Log in
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
    </>)
}
export default MobileMenuComponent