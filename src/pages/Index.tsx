
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Calendar, Clock, User } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleSignUp = () => {
    setIsSignedUp(true);
    // Simulate sign up process
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  if (isSignedUp) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
            <h2 className="text-2xl font-bold mb-2">Welcome to Easy Contractor!</h2>
            <p className="text-muted-foreground mb-4">
              Setting up your workspace...
            </p>
            <div className="animate-pulse">
              <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full w-full animate-pulse"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <Users className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Easy Contractor</h1>
            </div>
            <Badge variant="secondary">MVP Beta</Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Hero Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Run Your Contracting Business Without the Chaos
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Organize jobs, schedule crews, track time, and manage customers — all from one simple, mobile-friendly platform.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-100 text-blue-800">No More Spreadsheets</Badge>
                <Badge className="bg-green-100 text-green-800">Mobile First</Badge>
                <Badge className="bg-purple-100 text-purple-800">Team Friendly</Badge>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <Calendar className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="font-semibold">Smart Scheduling</h3>
                  <p className="text-sm text-gray-600">Assign jobs & crews</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <Clock className="h-8 w-8 text-green-600" />
                <div>
                  <h3 className="font-semibold">Time Tracking</h3>
                  <p className="text-sm text-gray-600">Clock in/out per job</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <Users className="h-8 w-8 text-purple-600" />
                <div>
                  <h3 className="font-semibold">Team Management</h3>
                  <p className="text-sm text-gray-600">Roles & permissions</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <User className="h-8 w-8 text-orange-600" />
                <div>
                  <h3 className="font-semibold">Customer Portal</h3>
                  <p className="text-sm text-gray-600">Job history & details</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sign Up Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <Card className="border-0 shadow-none">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl">Get Started Today</CardTitle>
                <CardDescription>
                  Create your contractor workspace in under 2 minutes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input 
                    id="company" 
                    placeholder="Your Contracting Company" 
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="you@yourcompany.com" 
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="(555) 123-4567" 
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="trade">Primary Trade</Label>
                  <Input 
                    id="trade" 
                    placeholder="e.g., Electrical, HVAC, Plumbing" 
                    className="h-12"
                  />
                </div>
                <Button 
                  onClick={handleSignUp}
                  className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700"
                >
                  Start Your Free Trial
                </Button>
                <p className="text-xs text-center text-gray-500">
                  No credit card required • 14-day free trial
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Social Proof Section */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-8">Trusted by contractors across the country</p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="bg-gray-200 px-6 py-3 rounded text-sm font-medium">ElectriCorp</div>
            <div className="bg-gray-200 px-6 py-3 rounded text-sm font-medium">PlumbPro</div>
            <div className="bg-gray-200 px-6 py-3 rounded text-sm font-medium">HVAC Masters</div>
            <div className="bg-gray-200 px-6 py-3 rounded text-sm font-medium">BuildRight</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
