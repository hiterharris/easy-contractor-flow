
// Mock data for the Easy Contractor application

export const customers = [
  {
    id: 1,
    name: "Springfield Medical Center",
    email: "facilities@springfieldmedical.com",
    phone: "(555) 123-4567",
    address: "123 Oak Street, Springfield, IL",
    totalJobs: 3,
    lastJob: "2024-01-15",
    status: "active" as const
  },
  {
    id: 2,
    name: "Downtown Office Complex",
    email: "maintenance@downtownoffice.com",
    phone: "(555) 234-5678",
    address: "456 Pine Avenue, Springfield, IL",
    totalJobs: 1,
    lastJob: "2024-01-10",
    status: "active" as const
  },
  {
    id: 3,
    name: "Riverside Manufacturing Co.",
    email: "ops@riversidemanufacturing.com",
    phone: "(555) 345-6789",
    address: "789 Elm Drive, Springfield, IL",
    totalJobs: 2,
    lastJob: "2023-12-20",
    status: "inactive" as const
  }
];

export const teamMembers = [
  {
    id: 1,
    name: "Mike Wilson",
    email: "mike@company.com",
    phone: "(555) 111-2222",
    role: "Admin" as "Admin" | "Employee",
    status: "active" as "active" | "pending" | "inactive",
    joinDate: "2023-08-15",
    hoursThisWeek: 32,
    currentJob: "Kitchen Electrical Install"
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@company.com",
    phone: "(555) 222-3333",
    role: "Employee" as "Admin" | "Employee",
    status: "active" as "active" | "pending" | "inactive",
    joinDate: "2023-09-01",
    hoursThisWeek: 28,
    currentJob: "Kitchen Electrical Install"
  },
  {
    id: 3,
    name: "Sarah Chen",
    email: "sarah@company.com",
    phone: "(555) 333-4444",
    role: "Employee" as "Admin" | "Employee",
    status: "active" as "active" | "pending" | "inactive",
    joinDate: "2023-10-12",
    hoursThisWeek: 24,
    currentJob: "Bathroom Outlet Upgrade"
  },
  {
    id: 4,
    name: "Tom Brown",
    email: "tom@company.com",
    phone: "(555) 444-5555",
    role: "Employee" as "Admin" | "Employee",
    status: "active" as "active" | "pending" | "inactive",
    joinDate: "2023-11-03",
    hoursThisWeek: 30,
    currentJob: "Panel Replacement"
  }
];

export const jobs = [
  {
    id: 1,
    title: "Kitchen Electrical Install",
    customer: "Springfield Medical Center",
    description: "Install new outlets and lighting in kitchen renovation",
    status: "in-progress" as const,
    scheduledDate: "2024-01-20",
    scheduledTime: "08:00",
    duration: 4,
    assignedCrew: ["Mike Wilson", "John Doe"],
    address: "123 Oak Street",
    priority: "high" as "high" | "medium" | "low"
  },
  {
    id: 2,
    title: "Bathroom Outlet Upgrade",
    customer: "Downtown Office Complex",
    description: "Replace old outlets with GFCI outlets in bathroom",
    status: "scheduled" as const,
    scheduledDate: "2024-01-20",
    scheduledTime: "13:00",
    duration: 2,
    assignedCrew: ["Sarah Chen"],
    address: "456 Pine Avenue",
    priority: "medium" as "high" | "medium" | "low"
  },
  {
    id: 3,
    title: "Panel Replacement",
    customer: "Riverside Manufacturing Co.",
    description: "Replace old electrical panel with modern 200A panel",
    status: "scheduled" as const,
    scheduledDate: "2024-01-20",
    scheduledTime: "15:30",
    duration: 3,
    assignedCrew: ["Mike Wilson", "Tom Brown"],
    address: "789 Elm Drive",
    priority: "high" as "high" | "medium" | "low"
  }
];

export const todayJobs = [
  {
    id: 1,
    title: "Kitchen Electrical Install",
    customer: "Sarah Johnson",
    time: "8:00 AM - 12:00 PM",
    crew: ["Mike Wilson", "John Doe"],
    status: "in-progress" as const,
    address: "123 Oak Street"
  },
  {
    id: 2,
    title: "Bathroom Outlet Upgrade",
    customer: "Robert Smith",
    time: "1:00 PM - 3:00 PM",
    crew: ["Sarah Chen"],
    status: "scheduled" as const,
    address: "456 Pine Avenue"
  },
  {
    id: 3,
    title: "Panel Replacement",
    customer: "Maria Garcia",
    time: "3:30 PM - 6:00 PM",
    crew: ["Mike Wilson", "Tom Brown"],
    status: "scheduled" as const,
    address: "789 Elm Drive"
  }
];

export const activities = [
  {
    id: 1,
    type: "clock-in" as const,
    user: "Mike Wilson",
    message: "clocked in at Kitchen Install",
    time: "8:02 AM"
  },
  {
    id: 2,
    type: "job-complete" as const,
    user: "Sarah Chen",
    message: "completed Outlet Repair job",
    time: "7:45 AM"
  },
  {
    id: 3,
    type: "job-assigned" as const,
    user: "Tom Brown",
    message: "was assigned to Panel Replacement",
    time: "7:30 AM"
  },
  {
    id: 4,
    type: "team-invite" as const,
    user: "System",
    message: "invited new team member Lisa Park",
    time: "Yesterday"
  },
  {
    id: 5,
    type: "customer-added" as const,
    user: "Admin",
    message: "added new customer Maria Garcia",
    time: "Yesterday"
  }
];

export const recentCustomers = [
  { id: 1, name: "Springfield Medical", phone: "(555) 123-4567", lastJob: "2024-01-15" },
  { id: 2, name: "Downtown Office Complex", phone: "(555) 234-5678", lastJob: "2024-01-10" },
  { id: 3, name: "Riverside Manufacturing", phone: "(555) 345-6789", lastJob: "2023-12-20" }
];

export const upcomingJobs = [
  { id: 1, title: "Kitchen Install", customer: "Springfield Medical", date: "Tomorrow", time: "8:00 AM" },
  { id: 2, title: "Panel Upgrade", customer: "Downtown Office", date: "Jan 25", time: "1:00 PM" },
  { id: 3, title: "Outlet Repair", customer: "Riverside Mfg", date: "Jan 26", time: "9:00 AM" },
  { id: 1, title: "Kitchen Install", customer: "Springfield Medical", date: "Tomorrow", time: "8:00 AM" },
  { id: 2, title: "Panel Upgrade", customer: "Downtown Office", date: "Jan 25", time: "1:00 PM" },
  { id: 3, title: "Outlet Repair", customer: "Riverside Mfg", date: "Jan 26", time: "9:00 AM" }
];

export const teamStatus = [
  { name: "Mike Wilson", status: "On Job", location: "Kitchen Install" },
  { name: "Sarah Chen", status: "Available", location: "Office" },
  { name: "Tom Brown", status: "En Route", location: "Downtown Office" },
  { name: "Lisa Park", status: "Off Today", location: "" }
];
