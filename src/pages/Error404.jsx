import React from 'react'

import { Link } from 'react-router'
import Helmet from 'react-helmet'
import { AlertCircle } from 'lucide-react';

const Error404 = () => {
    return (
        <div className='min-h-screen w-11/12 mx-auto my-10 flex flex-col justify-center items-center gap-4'>
            <Helmet>
                <title>error page</title>
            </Helmet>
            {/* Illustration */}
            <div className="flex flex-col items-center gap-6">
                <AlertCircle className="w-24 h-24 text-red-500 animate-bounce" />
                <h1 className="text-6xl font-extrabold text-primary">404</h1>
                <p className="text-xl text-muted-foreground text-center max-w-md">
                    Oops! The page you are looking for does not exist. It might have been removed or you mistyped the URL.
                </p>

                {/* Buttons */}
                <div className="flex gap-4 mt-6">
                    <Link to="/">
                        <button className="px-6 py-3 bg-primary  text-secondary rounded-lg shadow  transition">
                            Go Home
                        </button>
                    </Link>
                    <Link to="/contact">
                        <button className="px-6 py-3 border border-gray-300 text-muted-foreground rounded-lg transition">
                            Contact Support
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Error404