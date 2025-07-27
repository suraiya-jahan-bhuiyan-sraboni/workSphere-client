import React, { useContext } from "react";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { AuthContext } from "../context/AuthContext";
import PaymentForm from "../stripe/PaymentForm";

const Payroll = () => {

    const { user } = useContext(AuthContext);

    // Fetch payroll data
    const fetchPayrollData = async () => {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/payroll`);
        if (res.status !== 200) throw new Error("Failed to fetch payroll");
        return res.data;
    };

    const {
        data: payrollData = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["payrollData", user?.email],
        queryFn: fetchPayrollData,
        enabled: !!user?.email,
    });

    const renderBadge = (status) =>
        status ? (
            <Badge className="bg-green-100 text-green-700 border-green-300">
                ✅ Paid
            </Badge>
        ) : (
            <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">
                🟨 Pending
            </Badge>
        );

    const paymentGroupMap = {};
    payrollData.forEach((record) => {
        const key = `${record.employee_id}-${record.month}-${record.year}`;
        if (!paymentGroupMap[key]) {
            paymentGroupMap[key] = record.isPaid;
        } else {
            paymentGroupMap[key] = paymentGroupMap[key] || record.isPaid;
        }
    });

    if (isLoading) return <p className="p-4 text-center">Loading...</p>;
    if (isError) return <p className="p-4 text-red-500 text-center">Error loading data</p>;

    return (
        <div className="p-2 sm:p-4">
            <Card className="p-6 w-full overflow-auto">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                    <h2 className="text-xl font-bold">Manage Payroll </h2>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Employee Name</TableHead>
                            <TableHead>Salary</TableHead>
                            <TableHead>Month & Year</TableHead>
                            <TableHead>Payment Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {payrollData.map((emp) => {
                            const initials = emp.employee_name
                                .split(" ")
                                .map((n) => n[0])
                                .join("");

                            const groupKey = `${emp.employee_id}-${emp.month}-${emp.year}`;
                            const groupIsPaid = paymentGroupMap[groupKey];

                            return (
                                <TableRow key={emp._id}>
                                    <TableCell className="flex gap-3 items-center">
                                        <div className="w-10 h-10 bg-indigo-300 text-white rounded-full flex items-center justify-center font-semibold">
                                            {initials}
                                        </div>
                                        <div>
                                            <div className="font-medium">{emp.employee_name}</div>
                                            <div className="text-sm text-gray-500">Employee</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{emp.salary}</TableCell>
                                    <TableCell>
                                        {emp.month}, {emp.year}
                                    </TableCell>
                                    <TableCell>
                                        {emp.payment_date || "_ _ - _ _ - _ _ _ _"}
                                    </TableCell>
                                    <TableCell>{renderBadge(emp.isPaid)}</TableCell>
                                    <TableCell>
                                        {groupIsPaid ? (
                                            <span className="text-gray-500 text-sm">Pay Now</span>
                                        ) : (
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                                        Pay Now
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent >
                                                    <DialogHeader>
                                                        <DialogTitle>Pay Now for {emp.fullName}</DialogTitle>
                                                        <DialogDescription>Enter your card details to complete payment via Stripe</DialogDescription>
                                                    </DialogHeader>
                                                    <PaymentForm employee={emp} recall={refetch} />
                                                    <DialogClose asChild>
                                                        <Button variant="outline" className="mt-4">Cancel</Button>
                                                    </DialogClose>
                                                </DialogContent>
                                            </Dialog>
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

                <div className="flex justify-between mt-4 text-sm text-gray-500">
                    <span>Showing {payrollData.length} payment request(s)</span>
                </div>
            </Card>
        </div>
    );
};

export default Payroll;
