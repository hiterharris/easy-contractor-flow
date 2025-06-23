
import { useState } from "react";
import Layout from "@/components/Layout";
import { TimeTrackingHeader } from "@/components/time-tracking/TimeTrackingHeader";
import { ClockInOutCard } from "@/components/time-tracking/ClockInOutCard";
import { TimeStatsCards } from "@/components/time-tracking/TimeStatsCards";
import { TimeEntriesCard } from "@/components/time-tracking/TimeEntriesCard";
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
        <TimeTrackingHeader getCurrentTime={getCurrentTime} />
        
        <ClockInOutCard
          isClocked={isClocked}
          currentJob={currentJob}
          startTime={startTime}
          availableJobs={availableJobs}
          onClockIn={handleClockIn}
          onClockOut={handleClockOut}
          onJobChange={setCurrentJob}
          getCurrentTime={getCurrentTime}
          getElapsedTime={getElapsedTime}
        />

        <TimeStatsCards />

        <TimeEntriesCard
          timeEntries={timeEntries}
          onEditEntry={handleEditEntry}
          onExportEntry={handleExportEntry}
          onExportAll={handleExportAll}
        />

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
