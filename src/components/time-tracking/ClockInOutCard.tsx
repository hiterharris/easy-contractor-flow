
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Play, Pause } from "lucide-react";

interface ClockInOutCardProps {
  isClocked: boolean;
  currentJob: string;
  startTime: string;
  availableJobs: string[];
  onClockIn: () => void;
  onClockOut: () => void;
  onJobChange: (job: string) => void;
  getCurrentTime: () => string;
  getElapsedTime: () => string;
}

export const ClockInOutCard = ({
  isClocked,
  currentJob,
  startTime,
  availableJobs,
  onClockIn,
  onClockOut,
  onJobChange,
  getCurrentTime,
  getElapsedTime
}: ClockInOutCardProps) => {
  return (
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
              <Select value={currentJob} onValueChange={onJobChange}>
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
              onClick={onClockIn} 
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
              <Button onClick={onClockOut} variant="destructive" className="h-12">
                <Pause className="h-5 w-5 mr-2" />
                Clock Out
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
