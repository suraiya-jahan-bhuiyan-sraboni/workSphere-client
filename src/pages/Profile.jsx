import React, { use, useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Briefcase, Banknote, ShieldCheck, XCircle } from "lucide-react";
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router';
import { toast } from 'sonner';
import axios from 'axios';

const Profile = () => {
    const { user, role } = use(AuthContext);
    const isAdmin = role === "admin";
    const isEmployee = role === "employee";
    const isHr = role === 'hr';
    //console.log(user)
    const [userInfo, setUserInfo] = useState({})

    const fetchUserInfo = async () => {
        if (!user?.email) return;
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users?email=${user.email}`);
            setUserInfo(data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
       fetchUserInfo();
    }, [user])
    //console.log(userInfo)


    return (
        <div className="w-11/12 mx-auto py-10">
            <Card className="max-w-3xl mx-auto shadow-lg rounded-2xl">
                {/* Profile Header */}
                <CardHeader className="flex flex-col items-center gap-4">
                    <img
                        src={user.photoURL}
                        alt={user.displayName}
                        className="w-32 h-32 rounded-full border-4  text-center border-blue-600 object-cover"
                    />
                    <div className="text-center">
                        <CardTitle className="text-2xl font-bold">{user.displayName}</CardTitle>
                        <p className="text-muted-foreground capitalize">{userInfo.designation} of Organization</p>
                    </div>
                    <Badge
                        className={`px-3 py-1 text-sm ${isAdmin ? "bg-blue-600" : isHr ? "bg-amber-600" : "bg-green-600"
                            } text-white`}
                    >
                        {role}
                    </Badge>
                </CardHeader>

                {/* Profile Details */}
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <p>{user.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-blue-600" />
                        <p>{userInfo.phoneNumber}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Briefcase className="w-5 h-5 text-blue-600" />
                        <p>{userInfo.designation}</p>
                    </div>

                    {/* Employee Only Info */}
                    {isEmployee && (
                        <>
                            <div className="flex items-center gap-3">
                                <Banknote className="w-5 h-5 text-blue-600" />
                                <p>Salary: ৳{userInfo.monthlySalary}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                {user.isVerified ? (
                                    <ShieldCheck className="w-5 h-5 text-green-600" />
                                ) : (
                                    <XCircle className="w-5 h-5 text-red-600" />
                                )}
                                <p>
                                    {userInfo.isVerified ? "Verified Employee" : "Not Verified"}
                                </p>
                            </div>
                            {user.isFired && (
                                <p className="text-red-600 font-semibold">🚫 This employee is fired</p>
                            )}
                        </>
                    )}

                </CardContent>

                {/* Actions */}
                <div className="p-6 flex justify-center gap-4">
                    {isAdmin && (
                        <Link to={'/dashboard/employees'}>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Manage Employees</Button>
                        </Link>
                    )}

                    {isEmployee && (
                        <>
                            <Button className="bg-green-600 hover:bg-green-700" onClick={() => { toast.success("Leave Request sent!") }}>Request Leave</Button>
                            <Link to='/dashboard/payment-history'><Button variant="outline">View Payslip</Button></Link>
                        </>
                    )}

                    {isHr && (
                        <>

                            <Button className="bg-amber-600 hover:bg-amber-700" onClick={() => toast.success("Leave Approved")}>Approve Leaves</Button>

                            <Link to={'/dashboard/employee-list'}>
                                <Button variant="outline">Manage Employee</Button>
                            </Link>
                        </>
                    )}
                </div>
            </Card>
        </div>
    )
}

export default Profile