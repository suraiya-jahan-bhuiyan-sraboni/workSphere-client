import React, { use, useContext, useState } from 'react'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useQuery } from '@tanstack/react-query';
import { AvatarImage } from '@radix-ui/react-avatar';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'sonner';
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


const AllEmployee = () => {
    const { user } = useContext(AuthContext);
    const [salary, setSalary] = useState(0)
    const fetchEmployees = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/employees`);
        if (!res.ok) throw new Error("Failed to fetch employees");
        return res.json();
    };
    const { data: employees = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['employees', user?.email],
        queryFn: fetchEmployees,
        enabled: !!user?.email,
    });
    //console.log("Employees:", employees);

    const makeHR = async (id) => {
        const res = await axios.patch(`${import.meta.env.VITE_API_URL}/make-hr/${id}`);
        res.data.success && toast.success(res.data.message);
        refetch();
    }
    const fireEmployee = (id) => {
        toast("Are you sure you want to fire this employee?", {
            action: {
                label: "confirm",
                onClick: async () => {
                    console.log("fired employee")
                    try {
                        const res = await axios.patch(`${import.meta.env.VITE_API_URL}/user-fire/${id}`);
                        //console.log(res.data);
                        res.data.success && toast.warning(res.data.message);
                        refetch();
                    } catch (err) {
                        console.error("Error firing employee", err);
                    }
                },
            },
        })

    }
    const handleSalary = (id, salaryy) => {
        salaryy = parseInt(salaryy);
        console.log("handle salary", id, "salary:", salaryy);
        axios.patch(`${import.meta.env.VITE_API_URL}/update-salary/${id}`, { salary: salaryy })
            .then(res => {
                console.log("Salary updated:", res.data);
                toast.success("Salary updated successfully");
                refetch();
            })
            .catch(err => {
                console.error("Error updating salary", err);
                toast.error("Failed to update salary", { variant: "destructive" });
            });

    }

    if (isLoading) return <p className="p-4">Loading...</p>;
    if (isError) return <p className="p-4 text-red-500">Error loading data</p>;

    return (
        <div className='w-11/12 mx-auto my-10 '>
            <div className="p-6 bg-secondary shadow rounded-lg">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <h2 className="text-xl font-semibold">Manage All Employee </h2>
                </div>

                <div className='w-full overflow-x-auto'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Salary</TableHead>
                                <TableHead>Make HR</TableHead>
                                <TableHead>Fire</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {employees.map((emp, idx) => {
                                
                                const initials =
                                    emp.fullName
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("");
                                return (
                                    <TableRow key={idx}>
                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                <Avatar>
                                                    <AvatarImage src={emp.profilePhoto} className='w-full h-full object-cover' />
                                                    <AvatarFallback>{initials}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium leading-none">{emp.fullName}</p>
                                                    <p className="text-sm text-muted-foreground">{emp.designation || "employee"}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{emp.emailAddress}</TableCell>
                                        <TableCell>
                                            <Dialog>
                                                <form>
                                                    <DialogTrigger asChild>
                                                        <p>{emp.monthlySalary || 20000}</p>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        <DialogHeader>
                                                            <DialogTitle>Edit Salary</DialogTitle>
                                                            <DialogDescription>
                                                                Make changes to your employee salary here. Click save when you&apos;re
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
                                                                <Input id="salary-1" name="salary" defaultValue={emp.monthlySalary} onChange={(e) => setSalary(e.target.value)} />
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <DialogClose asChild>
                                                                <Button variant="outline">Cancel</Button>
                                                            </DialogClose>
                                                            <DialogClose asChild>
                                                                <Button type="submit" onClick={() => handleSalary(emp._id, salary)}>Save changes</Button>
                                                            </DialogClose>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </form>
                                            </Dialog>

                                        </TableCell>
                                        <TableCell>
                                            {emp.isFired == true ? (
                                                <Badge variant="destructive">{emp.role}</Badge>
                                            ) : (<>
                                                {
                                                    emp.role == 'hr' ? (
                                                        <Badge variant="outline">HR</Badge>
                                                    ) : (
                                                        <Button size="sm" onClick={() => makeHR(emp._id)}>Make HR</Button>
                                                    )
                                                }
                                            </>
                                            )
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {emp.isFired || false ? (
                                                <Badge variant="destructive">Fired</Badge>
                                            ) : (
                                                <Button size="icon" variant="destructive"
                                                    onClick={() => fireEmployee(emp._id)}
                                                >
                                                    ✕
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-muted-foreground">
                        Showing {employees.length} employees
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AllEmployee