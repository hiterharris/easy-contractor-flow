
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";

interface TimeEntry {
  id: number;
  user: string;
  job: string;
  customer: string;
  date: string;
  clockIn: string;
  clockOut: string;
  breakTime: number;
  totalHours: number;
  status: string;
}

interface TimeEntriesCardProps {
  timeEntries: TimeEntry[];
  onEditEntry: (entry: TimeEntry) => void;
  onExportEntry: (entry: TimeEntry) => void;
  onExportAll: () => void;
}

export const TimeEntriesCard = ({ 
  timeEntries, 
  onEditEntry, 
  onExportEntry, 
  onExportAll 
}: TimeEntriesCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Time Entries</CardTitle>
          <Button onClick={onExportAll} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timeEntries.map((entry) => (
            <div key={entry.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-grow">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">
                        {entry.user.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{entry.user}</h3>
                      <p className="text-sm text-gray-600">{entry.job}</p>
                    </div>
                    <Badge variant={entry.status === "active" ? "default" : "secondary"}>
                      {entry.status}
                    </Badge>
                  </div>
                  <div className="ml-11 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Date:</span> {entry.date}
                    </div>
                    <div>
                      <span className="font-medium">In:</span> {entry.clockIn}
                    </div>
                    <div>
                      <span className="font-medium">Out:</span> {entry.clockOut || "Active"}
                    </div>
                    <div>
                      <span className="font-medium">Total:</span> {entry.totalHours}h
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => onEditEntry(entry)}>
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onExportEntry(entry)}>
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
