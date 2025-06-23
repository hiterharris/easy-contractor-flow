import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Clock, User, Plus, Users } from "lucide-react";
import { jobs as initialJobs, customers, teamMembers } from "@/lib/data";

const Jobs = () => {
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
  const teamMemberNames = teamMembers.map(m => m.name);

  const handleAddJob = () => {
    if (newJob.title && newJob.customer) {
      const job = {
        id: jobs.length + 1,
        ...newJob,
        duration: parseInt(newJob.duration) || 1,
        status: "scheduled" as const,
        assignedCrew: [] as string[],
        priority: newJob.priority as "high" | "medium" | "low"
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-progress":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Jobs</h1>
            <p className="text-gray-600">Manage your project schedule</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
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
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                  <p className="text-2xl font-bold">{jobs.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold">
                    {jobs.filter(j => j.status === "in-progress").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <User className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Scheduled</p>
                  <p className="text-2xl font-bold">
                    {jobs.filter(j => j.status === "scheduled").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">This Week</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Job List */}
        <Card>
          <CardHeader>
            <CardTitle>Job Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-grow">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                        <Badge className={getStatusColor(job.status)}>
                          {job.status.replace("-", " ")}
                        </Badge>
                        <Badge className={getPriorityColor(job.priority)}>
                          {job.priority}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{job.customer}</p>
                      <p className="text-sm text-gray-500 mb-3">{job.description}</p>
                      <p className="text-sm text-gray-500">📍 {job.address}</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(job.scheduledDate).toLocaleDateString()} at {job.scheduledTime}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{job.duration} hour{job.duration > 1 ? 's' : ''}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>Crew:</span>
                      </div>
                      <div className="flex -space-x-2">
                        {job.assignedCrew.map((member, index) => (
                          <div
                            key={index}
                            className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white"
                            title={member}
                          >
                            {member.split(' ').map(n => n[0]).join('')}
                          </div>
                        ))}
                        {job.assignedCrew.length === 0 && (
                          <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs border-2 border-white">
                            <Plus className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Assign Crew
                      </Button>
                      {job.status === "scheduled" && (
                        <Button size="sm">
                          Start Job
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "in-progress":
      return "bg-green-100 text-green-800";
    case "scheduled":
      return "bg-blue-100 text-blue-800";
    case "completed":
      return "bg-gray-100 text-gray-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default Jobs;
