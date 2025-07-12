import React from 'react'
import { Outlet } from 'react-router'
import Nav from '../components/root components/Nav'
import Footer from '../components/root components/Footer'

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