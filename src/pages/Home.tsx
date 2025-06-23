import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  Clock, 
  Users, 
  Calendar, 
  User, 
  Plus,
  Building,
  AlertCircle,
  TrendingUp,
  DollarSign,
  MapPin,
  Phone
} from "lucide-react";
import { OnboardingChecklist } from "@/components/OnboardingChecklist";
import { TodaySchedule } from "@/components/TodaySchedule";
import { ActivityStream } from "@/components/ActivityStream";
import { recentCustomers, upcomingJobs, teamStatus } from "@/lib/data";

const Home = () => {
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  // Simulate onboarding progress
  const onboardingSteps = [
    { id: 1, title: "Add your first customer", completed: false },
    { id: 2, title: "Create a job", completed: false },
    { id: 3, title: "Schedule the job", completed: false },
    { id: 4, title: "Invite team members", completed: false },
    { id: 5, title: "Assign users to job", completed: false },
  ];

  const completedSteps = onboardingSteps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / onboardingSteps.length) * 100;

  if (!onboardingComplete && completedSteps < onboardingSteps.length) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to Easy Contractor! 🎉
            </h1>
            <p className="text-gray-600">
              Let's get you set up in just a few minutes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Building className="h-4 w-4 mr-2" />
                  Add Customer
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Create Job
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Invite Team Member
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Help & Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">
                  Need help getting started? Check out our quick video tutorials or contact support.
                </p>
                <Button variant="link" className="p-0 h-auto">
                  Watch Setup Video →
                </Button>
                <Button variant="link" className="p-0 h-auto">
                  Contact Support →
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

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
            <Button size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Quick Job
            </Button>
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
                  Invite Member
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {teamStatus.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-600">{member.location}</p>
                        </div>
                      </div>
                      <Badge 
                        variant={
                          member.status === "On Job" ? "default" :
                          member.status === "Available" ? "secondary" :
                          member.status === "En Route" ? "outline" : "secondary"
                        }
                      >
                        {member.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Customers</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Customer
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentCustomers.map((customer) => (
                    <div key={customer.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Building className="h-6 w-6 text-blue-600" />
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
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
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Home;
