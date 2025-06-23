
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Users, Calendar, User } from "lucide-react";
import { OnboardingChecklist } from "@/components/OnboardingChecklist";
import { TodaySchedule } from "@/components/TodaySchedule";
import { ActivityStream } from "@/components/ActivityStream";

const Dashboard = () => {
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

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Getting Started</span>
                <Badge variant={completedSteps === onboardingSteps.length ? "default" : "secondary"}>
                  {completedSteps}/{onboardingSteps.length} Complete
                </Badge>
              </CardTitle>
              <CardDescription>
                Complete these steps to start managing your contracting business
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Progress value={progressPercentage} className="h-2" />
              </div>
              <OnboardingChecklist 
                steps={onboardingSteps}
                onComplete={() => setOnboardingComplete(true)}
              />
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
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
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Today is {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <Button variant="outline">
              <Clock className="h-4 w-4 mr-2" />
              Clock In
            </Button>
            <Button>
              <Calendar className="h-4 w-4 mr-2" />
              Quick Job
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Today's Jobs</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Crew</p>
                  <p className="text-2xl font-bold">7</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Hours Today</p>
                  <p className="text-2xl font-bold">24.5</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <TodaySchedule />
          </div>

          {/* Activity Stream */}
          <div>
            <ActivityStream />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
