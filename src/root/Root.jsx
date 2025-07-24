import React, { useContext } from 'react'
import { Outlet } from 'react-router'
import Nav from './root components/Nav'
import Footer from './root components/Footer'
import { AuthContext } from '../context/AuthContext'


const Root = () => {
    const { user, loading, roleLoading } = useContext(AuthContext);

    if (loading || (user && (loading || roleLoading))) {
        console.log("from main layout 2 with user with loading or roleLoading");
        return <div className="min-h-screen flex justify-center items-center flex-col">
            Loading...
            <progress className="progress w-56"></progress>
        </div>;
    }
    return (
        <div className='overflow-hidden'> {/**/}
            <Nav/>
            <div className='min-h-screen w-11/12 mx-auto sm:p-4 '>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Root