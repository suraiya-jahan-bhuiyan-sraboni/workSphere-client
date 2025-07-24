import {
    createBrowserRouter,

} from "react-router";

import Home from "../pages/Home";
import Root from "../root/Root";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ContactUs from "../pages/ContactUs";
import Error404 from "../pages/Error404";
import DashBoard from "../pages/DashBoard";
import DashboardHome from "../pages/DashboardHome";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        hydrateFallbackElement: (
            <div className="min-h-screen flex justify-center items-center flex-col">
                Wait...
                <progress className="progress w-56"></progress>
            </div>
        ),
        children: [
            {
                index:true,
                path: "/",
                Component:Home
            }, {
                path: "/login",
                Component:Login
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/contact",
                element: <ContactUs />,
            },
        ]
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <DashBoard />
            </PrivateRoute>
        ),
        children: [
            {
                index: true,
                path: "/dashboard",
                element: <DashboardHome />,
            },
            
        ],
    },
    {
        path: "/*",
        Component: Error404,
    },
]);

export default router;
