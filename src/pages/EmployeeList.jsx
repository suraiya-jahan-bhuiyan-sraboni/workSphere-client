import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Filter, Check, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { use } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { AvatarImage } from "@radix-ui/react-avatar";
import { toast } from "sonner";
import axios from "axios";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useEffect } from "react";

const EmployeeList = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const [yearList, setYearList] = useState([]);
    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);

    useEffect(() => {
        const years = [];
        for (let i = currentYear - 10; i <= currentYear + 5; i++) {
            years.push(i);
        }
        setYearList(years);
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December",
        ];
        const monthString = months[currentMonth];
        setMonth(monthString);

    }, []);
    const { user } = use(AuthContext);

    const fetchEmployees = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/hr_employees`);
        if (!res.ok) throw new Error("Failed to fetch employees");
        return res.json();
    };
    const {
        data: employees = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["employees", user?.email],
        queryFn: fetchEmployees,
        enabled: !!user?.email,
    });
    console.log("Employees:", employees);


    const toggleVerifyStatus = (id) => {
        toast("Are you sure you want to toggle verification status?", {
            action: {
                label: "Confirm",
                onClick: async () => {
                    try {
                        const res = await axios.patch(
                            `${import.meta.env.VITE_API_URL}/toggle-verify/${id}`
                        );
                        if (res.data.success) {
                            toast.success(res.data.message);
                            refetch(); 
                        }
                    } catch (err) {
                        console.error("Error toggling verification", err);
                        toast.error("Failed to toggle verification status");
                    }
                },
            },
        });
    };
    const handlePay = async (emp) => {
        const pay_req_date = new Date().toISOString();
        // console.log("data:",emp ,"handle pay", emp._id, "month:", month, "year:", year);
        const paymentData = {
            employee_id: emp._id,
            employee_name: emp.fullName,
            employee_email: emp.emailAddress,
            salary: emp.monthlySalary,
            month,
            year,
            pay_req_date,
            payment_date: "",
        };
        console.log("Submitting payment request:", paymentData);

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/payments`, paymentData);
            if (res.data.success) {
                toast.success("Payment request submitted successfully");
            } else {
                toast.error("Failed to submit payment request");
            }
        } catch (err) {
            console.error("Payment error:", err);
            toast.error("An error occurred while submitting payment");
        }
    }

    if (isLoading) return <p className="p-4">Loading...</p>;
    if (isError) return <p className="p-4 text-red-500">Error loading data</p>;

    return (
        <Card className="max-w-6xl mx-auto mt-10 p-6">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
                <h2 className="text-xl font-semibold">Employee Management</h2>
                <div className="flex gap-2 flex-wrap">
                    <Input
                        className="w-64"
                        placeholder="Search employees..."
                    />
                    <Button
                        variant="outline"
                    >
                        <Filter className="mr-2 h-4 w-4" /> Verified Only
                    </Button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Verified</TableHead>
                            <TableHead>Bank Account</TableHead>
                            <TableHead>Salary</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {employees.map((emp, idx) => (
                            <TableRow key={idx}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage
                                                src={emp.profilePhoto}
                                                className="w-full h-full object-cover"
                                            />
                                            <AvatarFallback>{emp.initials}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium">{emp.fullName}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {emp.designation}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{emp.emailAddress}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outline"
                                        onClick={() => toggleVerifyStatus(emp._id)}
                                        className="flex items-center gap-2"
                                    >
                                        {emp.isVerified ? (
                                            <>
                                                <Check className="text-green-500 w-5 h-5" />
                                            </>
                                        ) : (
                                            <>
                                                <X className="text-red-500 w-5 h-5" />
                                            </>
                                        )}
                                    </Button>
                                </TableCell>
                                <TableCell>{emp.bankAccountNumber}</TableCell>
                                <TableCell>{emp.monthlySalary}</TableCell>
                                <TableCell className="space-x-2 flex items-center">
                                    <Dialog>
                                        <form>
                                            <DialogTrigger asChild>
                                                <Button
                                                    disabled={!emp.isVerified}
                                                    variant="default"
                                                    size="sm"
                                                >
                                                    Pay
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Pay Salary</DialogTitle>
                                                    <DialogDescription>
                                                        Make Payment to your employee here. Click payment request when you&apos;re
                                                        done.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4">
                                                    <div className="grid gap-3">
                                                        <Label htmlFor="name-1">Employee Name</Label>
                                                        <Input id="name-1" name="name" defaultValue={emp.fullName} disabled />
                                                    </div>
                                                    <div className="grid gap-3">
                                                        <Label htmlFor="salary-1">Salary</Label>
                                                        <Input id="salary-1" name="salary" defaultValue={emp.monthlySalary} disabled />
                                                    </div>
                                                    {/* Month */}
                                                    <div className="grid gap-3">
                                                        <Label htmlFor="month-1">Month</Label>
                                                        <select
                                                            id="month-1"
                                                            name="month"
                                                            className="border border-input bg-background px-3 py-2 rounded-md text-sm"
                                                            defaultValue={month}
                                                            required

                                                            onChange={(e) => setMonth(e.target.value)}
                                                        >
                                                            <option value="" >Select Month</option>
                                                            {[
                                                                "January", "February", "March", "April", "May", "June",
                                                                "July", "August", "September", "October", "November", "December",
                                                            ].map((month) => (
                                                                <option key={month} value={month} >{month}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    {/* Year */}
                                                    <div className="grid gap-3">
                                                        <Label htmlFor="year-1">Year</Label>
                                                        <select
                                                            id="year-1"
                                                            name="year"
                                                            defaultValue={year}
                                                            className="border border-input bg-background px-3 py-2 rounded-md text-sm"
                                                            required
                                                            onChange={(e) => setYear(e.target.value)}
                                                        >
                                                            <option value="">Select Year</option>
                                                            {yearList.map((year) => (
                                                                <option key={year} value={year}>{year}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button variant="outline">Cancel</Button>
                                                    </DialogClose>
                                                    <DialogClose asChild>
                                                        <Button type="submit" onClick={() => handlePay(emp)}>Payment request</Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </form>
                                    </Dialog>
                                    <Link
                                        to={`/dashboard/employee-list/empolyeedetails/${emp._id}`}
                                    >
                                        <Button variant="outline" size="sm">
                                            Details
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="mt-4 flex justify-between items-center flex-wrap gap-4">
                <span className="text-sm text-gray-500">
                    Showing 
                    all employee
                </span>
            </div>
        </Card>
    );
};

export default EmployeeList;
