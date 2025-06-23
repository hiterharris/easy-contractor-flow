import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { User, Calendar, Clock, Plus, Building } from "lucide-react";
import { customers as initialCustomers, jobs as initialJobs } from "@/lib/data";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Customers = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [jobs, setJobs] = useState(initialJobs);

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const [isCustomerDialogOpen, setIsCustomerDialogOpen] = useState(false);
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);

  const [newJob, setNewJob] = useState({
    title: "",
    customer: "",
    description: "",
    scheduledDate: "",
    scheduledTime: "",
    duration: "",
    address: "",
    priority: "medium" as "high" | "medium" | "low"
  });

  const customerNames = initialCustomers.map(c => c.name);

  const handleAddJob = () => {
    if (newJob.title && newJob.customer) {
      const job = {
        id: jobs.length + 1,
        ...newJob,
        duration: parseInt(newJob.duration) || 1,
        status: "scheduled" as const,
        assignedCrew: [] as string[],
      };
      setJobs([...jobs, job]);
      setNewJob({
        title: "",
        customer: "",
        description: "",
        scheduledDate: "",
        scheduledTime: "",
        duration: "",
        address: "",
        priority: "medium" as "high" | "medium" | "low"
      });
      setIsJobDialogOpen(false);
    }
  };

  const handleAddCustomer = () => {
    if (newCustomer.name && newCustomer.phone) {
      const customer = {
        id: customers.length + 1,
        ...newCustomer,
        totalJobs: 0,
        lastJob: "",
        status: "active" as const
      };
      setCustomers([...customers, customer]);
      setNewCustomer({ name: "", email: "", phone: "", address: "" });
      setIsCustomerDialogOpen(false);
    }
  };

  const openCreateJobDialog = (customerName: string) => {
    setNewJob(prev => ({ ...prev, customer: customerName }));
    setIsJobDialogOpen(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
            <p className="text-gray-600">Manage your customer database</p>
          </div>
          <Dialog open={isCustomerDialogOpen} onOpenChange={setIsCustomerDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Customer</DialogTitle>
                <DialogDescription>
                  Enter the company information to add them to your database.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name *</Label>
                  <Input
                    id="name"
                    placeholder="Acme Corporation"
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="info@acmecorp.com"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    placeholder="(555) 123-4567"
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Business St, City, State"
                    value={newCustomer.address}
                    onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                  />
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button onClick={handleAddCustomer} className="flex-1">
                    Add Customer
                  </Button>
                  <Button variant="outline" onClick={() => setIsCustomerDialogOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Building className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Customers</p>
                  <p className="text-2xl font-bold">{customers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Customers</p>
                  <p className="text-2xl font-bold">
                    {customers.filter(c => c.status === "active").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer List */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Directory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customers.map((customer) => (
                <div key={customer.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-grow">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <Building className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                          <p className="text-sm text-gray-600">{customer.email}</p>
                        </div>
                      </div>
                      <div className="ml-13 space-y-1">
                        <p className="text-sm text-gray-600">📞 {customer.phone}</p>
                        <p className="text-sm text-gray-600">📍 {customer.address}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                        {customer.status}
                      </Badge>
                      <div className="text-sm text-gray-600">
                        <p>{customer.totalJobs} job{customer.totalJobs !== 1 ? 's' : ''}</p>
                        {customer.lastJob && (
                          <p>Last: {new Date(customer.lastJob).toLocaleDateString()}</p>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View History
                        </Button>
                        <Button size="sm" onClick={() => openCreateJobDialog(customer.name)}>
                          Create Job
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Dialog open={isJobDialogOpen} onOpenChange={setIsJobDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Job</DialogTitle>
                <DialogDescription>
                  Fill in the job details to add it to your schedule.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    placeholder="Kitchen Electrical Install"
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer *</Label>
                  <Select value={newJob.customer} onValueChange={(value) => setNewJob({ ...newJob, customer: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {customerNames.map((customer) => (
                        <SelectItem key={customer} value={customer}>
                          {customer}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={newJob.priority} onValueChange={(value: "high" | "medium" | "low") => setNewJob({ ...newJob, priority: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the work to be done..."
                    value={newJob.description}
                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="address">Job Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Main St, City, State"
                    value={newJob.address}
                    onChange={(e) => setNewJob({ ...newJob, address: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Scheduled Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newJob.scheduledDate}
                    onChange={(e) => setNewJob({ ...newJob, scheduledDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Start Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newJob.scheduledTime}
                    onChange={(e) => setNewJob({ ...newJob, scheduledTime: e.target.value })}
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="duration">Duration (hours)</Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="4"
                    value={newJob.duration}
                    onChange={(e) => setNewJob({ ...newJob, duration: e.target.value })}
                  />
                </div>
                <div className="col-span-2 flex space-x-2 pt-4">
                  <Button onClick={handleAddJob} className="flex-1">
                    Create Job
                  </Button>
                  <Button variant="outline" onClick={() => setIsJobDialogOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
      </div>
    </Layout>
  );
};

export default Customers;
