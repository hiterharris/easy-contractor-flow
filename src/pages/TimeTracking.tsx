
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Play, Pause, Calendar, User, Download } from "lucide-react";
import { EditTimeEntryDialog } from "@/components/EditTimeEntryDialog";
import { useToast } from "@/hooks/use-toast";

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

const TimeTracking = () => {
  const { toast } = useToast();
  const [isClocked, setIsClocked] = useState(false);
  const [currentJob, setCurrentJob] = useState("");
  const [startTime, setStartTime] = useState("");
  const [editingEntry, setEditingEntry] = useState<TimeEntry | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([
    {
      id: 1,
      user: "Mike Wilson",
      job: "Kitchen Electrical Install",
      customer: "Sarah Johnson",
      date: "2024-01-20",
      clockIn: "08:00",
      clockOut: "12:00",
      breakTime: 30,
      totalHours: 3.5,
      status: "completed"
    },
    {
      id: 2,
      user: "John Doe",
      job: "Kitchen Electrical Install",
      customer: "Sarah Johnson",
      date: "2024-01-20",
      clockIn: "08:05",
      clockOut: "12:00",
      breakTime: 30,
      totalHours: 3.4,
      status: "completed"
    },
    {
      id: 3,
      user: "Sarah Chen",
      job: "Bathroom Outlet Upgrade",
      customer: "Robert Smith",
      date: "2024-01-20",
      clockIn: "13:00",
      clockOut: "",
      breakTime: 0,
      totalHours: 0,
      status: "active"
    }
  ]);

  const availableJobs = [
    "Kitchen Electrical Install",
    "Bathroom Outlet Upgrade",  
    "Panel Replacement"
  ];

  const handleClockIn = () => {
    if (currentJob) {
      setIsClocked(true);
      setStartTime(new Date().toLocaleTimeString());
    }
  };

  const handleClockOut = () => {
    setIsClocked(false);
    setCurrentJob("");
    setStartTime("");
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString();
  };

  const getElapsedTime = () => {
    if (!startTime) return "00:00:00";
    const start = new Date(`1970-01-01 ${startTime}`);
    const now = new Date(`1970-01-01 ${getCurrentTime()}`);
    const diff = now.getTime() - start.getTime();
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleEditEntry = (entry: TimeEntry) => {
    setEditingEntry(entry);
    setIsEditDialogOpen(true);
  };

  const handleSaveEntry = (updatedEntry: TimeEntry) => {
    setTimeEntries(entries => 
      entries.map(entry => 
        entry.id === updatedEntry.id ? updatedEntry : entry
      )
    );
    toast({
      title: "Time Entry Updated",
      description: "The time entry has been successfully updated.",
    });
  };

  const handleExportEntry = (entry: TimeEntry) => {
    const csvContent = `User,Job,Customer,Date,Clock In,Clock Out,Break Time (min),Total Hours,Status\n` +
      `"${entry.user}","${entry.job}","${entry.customer}","${entry.date}","${entry.clockIn}","${entry.clockOut || 'Active'}","${entry.breakTime}","${entry.totalHours}","${entry.status}"`;
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `time-entry-${entry.id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export Successful",
      description: "Time entry has been exported to CSV.",
    });
  };

  const handleExportAll = () => {
    const csvContent = `User,Job,Customer,Date,Clock In,Clock Out,Break Time (min),Total Hours,Status\n` +
      timeEntries.map(entry => 
        `"${entry.user}","${entry.job}","${entry.customer}","${entry.date}","${entry.clockIn}","${entry.clockOut || 'Active'}","${entry.breakTime}","${entry.totalHours}","${entry.status}"`
      ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `all-time-entries-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export Successful",
      description: "All time entries have been exported to CSV.",
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
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

        {/* Clock In/Out Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Clock In/Out
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!isClocked ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Select Job</label>
                  <Select value={currentJob} onValueChange={setCurrentJob}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a job to start working on" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableJobs.map((job) => (
                        <SelectItem key={job} value={job}>
                          {job}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handleClockIn} 
                  disabled={!currentJob}
                  className="w-full h-12 text-lg"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Clock In
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="h-4 w-4 bg-green-500 rounded-full animate-pulse mr-3"></div>
                    <span className="text-green-800 font-medium">Currently Working</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{currentJob}</h3>
                  <div className="text-3xl font-bold text-green-700 mb-2">
                    {getElapsedTime()}
                  </div>
                  <p className="text-sm text-gray-600">Started at {startTime}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-12">
                    <Pause className="h-5 w-5 mr-2" />
                    Break
                  </Button>
                  <Button onClick={handleClockOut} variant="destructive" className="h-12">
                    <Pause className="h-5 w-5 mr-2" />
                    Clock Out
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Today's Hours</p>
                  <p className="text-2xl font-bold">6.5</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">This Week</p>
                  <p className="text-2xl font-bold">32.5</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <User className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Team Hours Today</p>
                  <p className="text-2xl font-bold">24.5</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Time Entries */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Time Entries</CardTitle>
              <Button onClick={handleExportAll} variant="outline" size="sm">
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
                      <Button variant="outline" size="sm" onClick={() => handleEditEntry(entry)}>
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleExportEntry(entry)}>
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

        <EditTimeEntryDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          entry={editingEntry}
          onSave={handleSaveEntry}
        />
      </div>
    </Layout>
  );
};

export default TimeTracking;
