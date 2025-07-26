#  WorkSphere – Employee Tracker

**WorkSphere** is a modern, role-based employee work tracking and payroll management application built using React and ShadCN UI. HR and Admins can monitor employee task reports, filter work logs by employee or month, and manage approvals and payments — all from a user-friendly dashboard.

**Live Site:** 

**Admin Username:** suraiya@gmail.com 

**Admin Password:** suraiya

---

##  Key Features

- **Role-Based Dashboard**  
  Separate routes and dashboards for Admin, HR, and Employee roles.

- **Work Progress Tracking**  
  Employees can submit daily work logs with task descriptions and hours.

-  **Smart Filtering**  
  Filter records by employee name and specific month to analyze progress.

- **Live Refetching**  
  One-click refresh button to fetch the most up-to-date work logs.

- **Paginated Results**  
  Automatically handles large datasets with pagination .

- **Employee Details**  
  Displays full name, designation, and initials in a clean UI.

- **Work Hours Summary**  
  Highlights hours spent on tasks for better performance tracking.

- **Responsive UI**  
  Built with ShadCN components and Tailwind CSS for all screen sizes.

- **Authentication Context**  
  Logged-in user info managed through React Context API and firebase Auth.

- **Environment Configurable**  
  API URL and other keys managed through `.env` for easy deployment.

- **Fast & Smooth UX**  
  Vite + TanStack Query ensures blazing fast data fetching and rendering.

- **Payroll Generation (HR/Admin Only)**  
  - View monthly total hours worked per employee.
  - Mark salary as "Paid" or "Unpaid" for the current month.
  - Automatically resets status for the new month.
  - Payroll history preserved for each user.
  
- **Monthly Payroll Automation**  
  Salary status updates dynamically based on the logged hours and month.

- **Employee Salary Edit (Admin)**  
  Update or modify employee salary via modal interface.

- **Real-Time Status Toasts**  
  Success/error feedback using Sonner toast notifications for actions like firing, updating, or paying.

- **Responsive & Clean UI**  
  Designed using ShadCN UI + Tailwind CSS for a modern, mobile-friendly look.

---

## Tech Stack

- **Frontend**: React ,Vite , ShadCN UI , Tailwind CSS ,Firebase Auth
- **State & Data**: React Context, TanStack Query  
- **HTTP Client**: Axios  
- **Icons**: Lucide-react  
- **API**: Custom Express backend with MongoDB 

