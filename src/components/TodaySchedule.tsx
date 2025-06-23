
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, User, Calendar } from "lucide-react";

export const TodaySchedule = () => {
  const todayJobs = [
    {
      id: 1,
      title: "Kitchen Electrical Install",
      customer: "Sarah Johnson",
      time: "8:00 AM - 12:00 PM",
      crew: ["Mike Wilson", "John Doe"],
      status: "in-progress",
      address: "123 Oak Street"
    },
    {
      id: 2,
      title: "Bathroom Outlet Upgrade",
      customer: "Robert Smith",
      time: "1:00 PM - 3:00 PM",
      crew: ["Sarah Chen"],
      status: "scheduled",
      address: "456 Pine Avenue"
    },
    {
      id: 3,
      title: "Panel Replacement",
      customer: "Maria Garcia",
      time: "3:30 PM - 6:00 PM",
      crew: ["Mike Wilson", "Tom Brown"],
      status: "scheduled",
      address: "789 Elm Drive"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-progress":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Today's Schedule
        </CardTitle>
        <CardDescription>
          {todayJobs.length} jobs scheduled for today
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {todayJobs.map((job) => (
            <div key={job.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-900 mb-1">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.customer}</p>
                  <p className="text-sm text-gray-500">{job.address}</p>
                </div>
                <Badge className={getStatusColor(job.status)}>
                  {job.status.replace("-", " ")}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {job.time}
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {job.crew.length} crew member{job.crew.length > 1 ? 's' : ''}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {job.crew.map((member, index) => (
                    <div
                      key={index}
                      className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white"
                      title={member}
                    >
                      {member.split(' ').map(n => n[0]).join('')}
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    View Details
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
  );
};
