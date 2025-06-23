
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface TimeTrackingHeaderProps {
  getCurrentTime: () => string;
}

export const TimeTrackingHeader = ({ getCurrentTime }: TimeTrackingHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Time Tracking</h1>
        <p className="text-gray-600">Track work hours and job time</p>
      </div>
      <div className="mt-4 sm:mt-0">
        <Badge variant="outline" className="text-lg px-4 py-2">
          <Clock className="h-4 w-4 mr-2" />
          {getCurrentTime()}
        </Badge>
      </div>
    </div>
  );
};
