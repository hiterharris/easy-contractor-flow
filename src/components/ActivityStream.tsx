
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, User, Calendar, Users } from "lucide-react";
import { activities } from "@/lib/data";

export const ActivityStream = () => {
  const getActivityBadge = (type: string) => {
    switch (type) {
      case "clock-in":
        return <Badge variant="outline" className="text-green-700 border-green-200">Clock In</Badge>;
      case "job-complete":
        return <Badge variant="outline" className="text-blue-700 border-blue-200">Completed</Badge>;
      case "job-assigned":
        return <Badge variant="outline" className="text-purple-700 border-purple-200">Assigned</Badge>;
      case "team-invite":
        return <Badge variant="outline" className="text-orange-700 border-orange-200">Team</Badge>;
      case "customer-added":
        return <Badge variant="outline" className="text-indigo-700 border-indigo-200">Customer</Badge>;
      default:
        return <Badge variant="outline">Activity</Badge>;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "clock-in":
        return Clock;
      case "job-complete":
        return CheckCircle;
      case "job-assigned":
        return Calendar;
      case "team-invite":
        return Users;
      case "customer-added":
        return User;
      default:
        return Clock;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "clock-in":
        return "text-green-600";
      case "job-complete":
        return "text-blue-600";
      case "job-assigned":
        return "text-purple-600";
      case "team-invite":
        return "text-orange-600";
      case "customer-added":
        return "text-indigo-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="h-5 w-5 mr-2" />
          Activity Stream
        </CardTitle>
        <CardDescription>
          Real-time updates from your team
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            const color = getActivityColor(activity.type);
            return (
              <div key={activity.id} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-b-0">
                <div className={`flex-shrink-0 p-2 rounded-full bg-gray-100`}>
                  <Icon className={`h-4 w-4 ${color}`} />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.user}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{activity.message}</p>
                  {getActivityBadge(activity.type)}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
