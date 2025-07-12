import {
    createBrowserRouter,

} from "react-router";

import Home from "../pages/Home";
import Root from "../root/Root";
import Login from "../pages/Login";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index:true,
                path: "/",
                Component:Home
            }, {
                path: "/login",
                Component:Login
            }
        ]
    },
]);

export default router;
