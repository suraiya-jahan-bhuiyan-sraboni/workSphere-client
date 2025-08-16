import React, { useContext } from 'react'
import { Outlet } from 'react-router'
import Nav from './root components/Nav'
import Footer from './root components/Footer'
import { AuthContext } from '../context/AuthContext'
import { Toaster } from "@/components/ui/sonner"
import { ToastContainer } from 'react-toastify';

const Root = () => {
    const { user, loading, roleLoading } = useContext(AuthContext);

    if (loading || (user && (loading || roleLoading))) {
        //console.log("from main layout 2 with user with loading or roleLoading");
        return <div className="min-h-screen flex justify-center items-center flex-col">
            Loading...
            <progress className="progress w-56"></progress>
        </div>;
    }
    return (
        <div className='overflow-hidden'>
            <div className='w-full fixed top-0 z-50'>
                <Nav />
            </div>
            
            <div className='min-h-screen pt-17'>
                <Outlet />
            </div>
            <Toaster position='top-right' richColors />
            <ToastContainer />
            <Footer />
        </div>
    )
}

export default Root