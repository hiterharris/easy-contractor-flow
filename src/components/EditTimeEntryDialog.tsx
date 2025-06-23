
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

interface EditTimeEntryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  entry: TimeEntry | null;
  onSave: (entry: TimeEntry) => void;
}

export const EditTimeEntryDialog = ({ isOpen, onClose, entry, onSave }: EditTimeEntryDialogProps) => {
  const [formData, setFormData] = useState<TimeEntry | null>(entry);

  const handleSave = () => {
    if (formData) {
      // Calculate total hours based on clock in/out times and break time
      const clockInTime = new Date(`1970-01-01 ${formData.clockIn}`);
      const clockOutTime = new Date(`1970-01-01 ${formData.clockOut}`);
      const totalMinutes = (clockOutTime.getTime() - clockInTime.getTime()) / (1000 * 60);
      const totalHours = Math.max(0, (totalMinutes - formData.breakTime) / 60);
      
      const updatedEntry = {
        ...formData,
        totalHours: Math.round(totalHours * 100) / 100
      };
      
      onSave(updatedEntry);
      onClose();
    }
  };

  const handleInputChange = (field: keyof TimeEntry, value: string | number) => {
    if (formData) {
      setFormData({
        ...formData,
        [field]: value
      });
    }
  };

  if (!formData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Time Entry</DialogTitle>
          <DialogDescription>
            Make changes to the time entry details below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="user" className="text-right">
              User
            </Label>
            <Input
              id="user"
              value={formData.user}
              onChange={(e) => handleInputChange("user", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="job" className="text-right">
              Job
            </Label>
            <Input
              id="job"
              value={formData.job}
              onChange={(e) => handleInputChange("job", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="clockIn" className="text-right">
              Clock In
            </Label>
            <Input
              id="clockIn"
              type="time"
              value={formData.clockIn}
              onChange={(e) => handleInputChange("clockIn", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="clockOut" className="text-right">
              Clock Out
            </Label>
            <Input
              id="clockOut"
              type="time"
              value={formData.clockOut}
              onChange={(e) => handleInputChange("clockOut", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="breakTime" className="text-right">
              Break (min)
            </Label>
            <Input
              id="breakTime"
              type="number"
              value={formData.breakTime}
              onChange={(e) => handleInputChange("breakTime", parseInt(e.target.value) || 0)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
