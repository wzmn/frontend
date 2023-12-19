import React, { useState } from "react"
// Options example 

// options={{
// title: "Publish",
// toggle: [visible, setVisible],
// buttons: [
//     {
//     type: 'info',
//     title: 'Accept',
//     action: () => { console.log('info'); toggleModal(); }
//     },
//     {
//     type: 'normal',
//     title: 'Decline',
//     action: () => { console.log('error'); toggleModal(); }
//     },
// ],
// onClose: () => { console.log('modal closed') }
// }}

const Modal = ({ options, children }: any) => {
    const [open, setOpen] = options.toggle;
    const classes = {
        normal: "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700",
        info: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",
        warn: "focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900",
        error: "focus:outline-none text-white bg-red-800 text-red hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-800 dark:focus:ring-red-900"
    }

    return (
        <>
            <div id="modal" tabIndex={-1} aria-hidden="true" className={`${open ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {options.title ? options.title : "Modal title"}
                            </h3>
                            <button type="button" onClick={() => {
                                options.onClose ? options.onClose() : '';
                                setOpen(!open)
                            }} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="timeline-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5">
                            {children}
                        </div>
                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            {options.buttons && options.buttons.map((btn: any) => {
                                return (
                                    <button onClick={()=>{
                                        btn.action()
                                    }} key={btn.title} type="button" className={`${classes[btn.type as keyof Object]}`}>{btn.title}</button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



export default Modal