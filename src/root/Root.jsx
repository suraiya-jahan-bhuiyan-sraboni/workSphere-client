import React from 'react'
import { Outlet } from 'react-router'
import Nav from './root components/Nav'
import Footer from './root components/Footer'


const Root = () => {
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