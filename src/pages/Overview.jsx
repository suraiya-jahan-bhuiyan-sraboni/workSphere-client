import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardTitle } from "@/components/ui/card";
import { Users, CheckCircle, DollarSign, XCircle } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';
const Overview = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/employees`);
        setEmployees(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }
  const totalEmployees = employees.length;
  const verifiedEmployees = employees.filter(emp => emp.isVerified).length;
  const firedEmployees = employees.filter(emp => emp.isFired).length;
  const totalPayroll = employees.reduce((sum, emp) => sum + (emp.monthlySalary || 0), 0);
  const activeEmployees = totalEmployees - firedEmployees;
  const verificationData = [
    { name: 'Verified', value: verifiedEmployees },
    { name: 'Not Verified', value: totalEmployees - verifiedEmployees }
  ];

  const employeeStatusData = [
    { name: 'Active', value: activeEmployees },
    { name: 'Fired', value: firedEmployees }
  ];

  const COLORS = ['#60a5fa', '#f43f5e'];
  const payrollData = employees.map(emp => ({
    name: emp.fullName,
    salary: emp.monthlySalary || 0
  }));
  return (
    <div className="w-11/12 mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">Admin Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="flex flex-col items-center p-6">
          <Users className="w-10 h-10 text-blue-600 mb-2" />
          <CardTitle className="text-xl font-bold">{totalEmployees}</CardTitle>
          <p className="text-gray-500">Total Employees</p>
        </Card>

        <Card className="flex flex-col items-center p-6">
          <CheckCircle className="w-10 h-10 text-green-600 mb-2" />
          <CardTitle className="text-xl font-bold">{verifiedEmployees}</CardTitle>
          <p className="text-gray-500">Verified Employees</p>
        </Card>

        <Card className="flex flex-col items-center p-6">
          <DollarSign className="w-10 h-10 text-yellow-600 mb-2" />
          <CardTitle className="text-xl font-bold">৳{totalPayroll}</CardTitle>
          <p className="text-gray-500">Total Payroll</p>
        </Card>

        <Card className="flex flex-col items-center p-6">
          <XCircle className="w-10 h-10 text-red-600 mb-2" />
          <CardTitle className="text-xl font-bold">{firedEmployees}</CardTitle>
          <p className="text-gray-500">Fired Employees</p>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Verification Pie */}
        <Card className="p-4">
          <CardTitle className="text-lg font-semibold mb-2 text-center">Employee Verification</CardTitle>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={verificationData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {verificationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Employee Status Pie */}
        <Card className="p-4">
          <CardTitle className="text-lg font-semibold mb-2 text-center">Employee Status</CardTitle>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={employeeStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#82ca9d"
                label
              >
                {employeeStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Payroll Bar */}
        <Card className="p-4">
          <CardTitle className="text-lg font-semibold mb-2 text-center">Payroll Distribution</CardTitle>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={payrollData}>
              <XAxis dataKey="name" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="salary" fill="#fbbf24" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}

export default Overview