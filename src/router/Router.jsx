import {
    createBrowserRouter,

} from "react-router";

import Home from "../pages/Home";
import Root from "../root/Root";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ContactUs from "../pages/ContactUs";
import Error404 from "../pages/Error404";
import DashboardHome from "../pages/DashboardHome";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import HrRoute from "./HrRoute";
import EmployeeRoute from "./EmployeeRoute";
import AllEmployee from "../pages/AllEmployee";
import Payroll from "../pages/Payroll";
import EmployeeList from "../pages/EmployeeList";
import EmployeeDetails from "../pages/EmployeeDetails";
import WorkProgress from "../pages/WorkProgress";
import WorkSheet from "../pages/WorkSheet";
import PaymentHistory from "../pages/PaymentHistory";
import Dashboard from "../pages/Dashboard";
import StripeProvider from "../stripe/StripeProvider";
import About from "../pages/About";

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
                index: true,
                path: "/",
                Component: Home
            }, {
                path: "/login",
                Component: Login
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/contact",
                element: <ContactUs />,
            },
            {
                path:"/about",
                element:<About/>
            },
            {
                path: "/dashboard",
                element: (
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                ),
                children: [
                    {
                        index: true,
                        path: "/dashboard",
                        element: <DashboardHome />,
                    },
                    {
                        path: "/dashboard/employees",
                        element: (
                            <AdminRoute>
                                <AllEmployee />
                            </AdminRoute>
                        ),
                    },
                    {
                        path: "/dashboard/payroll",
                        element: (
                            <AdminRoute>
                                <StripeProvider><Payroll /></StripeProvider>
                            </AdminRoute>
                        ),
                    },
                    {
                        path: "/dashboard/employee-list",
                        element: (
                            <HrRoute>
                                <EmployeeList />
                            </HrRoute>
                        ),
                    },
                    {
                        path: "/dashboard/employee-list/empolyeedetails/:id",
                        element: (
                            <HrRoute>
                                <EmployeeDetails />
                            </HrRoute>
                        ),
                    },
                    {
                        path: "/dashboard/work-progress",
                        element: (
                            <HrRoute>
                                <WorkProgress />
                            </HrRoute>
                        ),
                    },
                    {
                        path: "/dashboard/worksheet",
                        element: (
                            <EmployeeRoute>
                                <WorkSheet />
                            </EmployeeRoute>
                        ),
                    },
                    {
                        path: "/dashboard/payment-history",
                        element: (
                            <EmployeeRoute>
                                <PaymentHistory />
                            </EmployeeRoute>
                        ),
                    },

                ],
            }
        ]
    },
    {
        path: "/*",
        Component: Error404,
    },
]);

export default router;
