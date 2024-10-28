import { ReactNode } from "react"
const Per_Page_limit = 15
const PaginationComponent = ({
    pagination={currentPage: 1, totalPages: 1},
    fetchCall

}:{pagination:{currentPage: Number, totalPages: Number}, fetchCall: Function}):ReactNode=>{
    return(<>
    <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
                        <ol className="flex justify-end gap-1 text-xs font-medium">
                            {
                                pagination.currentPage === 1 ? <></> :
                                    <>
                                        <li>
                                            <a
                                                href="#"
                                                onClick={(e)=>{
                                                    e.preventDefault()
                                                    fetchCall({page: (pagination.currentPage - 1), limit: Per_Page_limit})
                                                }}
                                                className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                                            >
                                                <span className="sr-only">Prev Page</span>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="size-3"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </a>
                                        </li>
                                    </>
                            }
                            {
                                [...Array(pagination.totalPages)].map((item: any, index: number) => (
                                    <li key={index}>
                                        <a
                                            href="#"
                                            onClick={(e)=>{
                                                e.preventDefault()
                                                fetchCall({page: index+1, limit: Per_Page_limit})
                                            }}
                                            className={`block size-8 rounded border ${(index + 1) === pagination.currentPage ? "border-blue-100 bg-blue-500  text-white" : " border-gray-100 bg-white"} text-center leading-8 text-gray-900`}
                                        >
                                            {index + 1}
                                        </a>
                                    </li>
                                ))
                            }
                            {
                                pagination.totalPages !== pagination.currentPage ? <>
                                    <li>
                                        <a
                                            href="#"
                                            onClick={(e)=>{
                                                e.preventDefault()
                                                fetchCall({page: (pagination.currentPage+1), limit: Per_Page_limit})
                                            }}
                                            className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                                        >
                                            <span className="sr-only">Next Page</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="size-3"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                    clip-rule="evenodd"
                                                />
                                            </svg>
                                        </a>
                                    </li>
                                </> :
                                    <>

                                    </>
                            }
                        </ol>
                    </div>
    </>)
}
export default PaginationComponent