import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  Clock, 
  Users, 
  Calendar, 
  Plus,
  Building,
  MapPin,
  Phone
} from "lucide-react";
import { TodaySchedule } from "@/components/TodaySchedule";
import { ActivityStream } from "@/components/ActivityStream";
import { recentCustomers, upcomingJobs, teamStatus, jobs as initialJobs, customers } from "@/lib/data";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Home = () => {
  const [jobs, setJobs] = useState(initialJobs);
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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const customerNames = customers.map(c => c.name);

  const handleAddJob = () => {
    if (newJob.title && newJob.customer) {
      const job = {
        id: jobs.length + 1,
        title: newJob.title,
        customer: newJob.customer,
        description: newJob.description,
        scheduledDate: newJob.scheduledDate,
        scheduledTime: newJob.scheduledTime,
        address: newJob.address,
        duration: parseInt(newJob.duration) || 1,
        status: "scheduled" as const,
        assignedCrew: [] as string[],
        priority: newJob.priority
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
      setIsDialogOpen(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header with Quick Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Home</h1>
            <p className="text-gray-600">Today is {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Clock className="h-4 w-4 mr-2" />
              Clock In
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Create Job
                </Button>
              </DialogTrigger>
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
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="sm">
              <Building className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Invite Team
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Calendar className="h-6 w-6 text-blue-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Today's Jobs</p>
                  <p className="text-xl font-bold">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Users className="h-6 w-6 text-green-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Active Crew</p>
                  <p className="text-xl font-bold">7</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Clock className="h-6 w-6 text-orange-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Hours Today</p>
                  <p className="text-xl font-bold">24.5</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-purple-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-xl font-bold">2</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <TodaySchedule />
              </div>
              <div>
                <ActivityStream />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Upcoming Jobs</CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Job
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingJobs.map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{job.title}</h4>
                          <p className="text-sm text-gray-600">{job.customer}</p>
                        </div>
                        <div className="text-right text-sm">
                          <p className="font-medium">{job.date}</p>
                          <p className="text-gray-600">{job.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>This Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Jobs</span>
                      <span className="font-semibold">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Completed</span>
                      <span className="font-semibold text-green-600">8</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">In Progress</span>
                      <span className="font-semibold text-blue-600">3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Scheduled</span>
                      <span className="font-semibold">1</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Team Status</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Invite
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {teamStatus.map((member) => (
                    <div key={member.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-600">{member.status}</p>
                      </div>
                      <Badge variant={
                        member.status === "On Job" ? "default" : 
                        member.status === "Available" ? "secondary" : 
                        "outline"
                      }>
                        {member.location}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Weekly Hours</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Placeholder for weekly hours chart */}
                <div className="h-48 flex items-center justify-center bg-gray-100 rounded-lg">
                  <p>Chart coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="customers" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Customers</CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {recentCustomers.map((customer) => (
                      <div key={customer.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Building className="h-6 w-6 text-blue-600" />
                          <div>
                            <p className="font-medium">{customer.name}</p>
                            <p className="text-sm text-gray-600 flex items-center">
                              {customer.phone}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Last job:</p>
                          <p className="text-sm font-medium">{new Date(customer.lastJob).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center bg-gray-100 rounded-lg">
                    <p>Chart coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Home;

