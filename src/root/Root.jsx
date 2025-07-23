import React from 'react'
import { Outlet } from 'react-router'
import Nav from './root components/Nav'
import Footer from './root components/Footer'


const Root = () => {
    return (
        <div>
            <Nav />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Root