import React from 'react'

import { Link } from 'react-router'
import Helmet from 'react-helmet'

const Error404 = () => {
    return (
        <div className='w-11/12 mx-auto my-10 flex flex-col justify-center items-center gap-4'>
            <Helmet>
                <title>error page</title>
            </Helmet>
            <h1 className='text-3xl font-bold'>404 - Page Not Found</h1>
            <Link to="/" className='text-center underline'>Go back to Home</Link>
        </div>
    )
}

export default Error404