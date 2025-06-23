
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, User, Calendar, Users, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface OnboardingStep {
  id: number;
  title: string;
  completed: boolean;
}

interface OnboardingChecklistProps {
  steps: OnboardingStep[];
  onComplete: () => void;
}

export const OnboardingChecklist = ({ steps: initialSteps, onComplete }: OnboardingChecklistProps) => {
  const navigate = useNavigate();
  const [steps, setSteps] = useState(initialSteps);

  const handleStepClick = (stepId: number) => {
    // For demo purposes, we'll mark steps as complete when clicked
    setSteps(prev => 
      prev.map(step => 
        step.id === stepId ? { ...step, completed: !step.completed } : step
      )
    );

    // Navigate to relevant page based on step
    switch (stepId) {
      case 1:
        navigate("/customers");
        break;
      case 2:
        navigate("/jobs");
        break;
      case 3:
        navigate("/jobs");
        break;
      case 4:
        navigate("/team");
        break;
      case 5:
        navigate("/jobs");
        break;
    }
  };

  const getStepIcon = (stepId: number) => {
    switch (stepId) {
      case 1:
        return User;
      case 2:
        return Calendar;
      case 3:
        return Clock;
      case 4:
        return Users;
      case 5:
        return Users;
      default:
        return Circle;
    }
  };

  const completedCount = steps.filter(step => step.completed).length;

  if (completedCount === steps.length) {
    setTimeout(onComplete, 1000);
  }

  return (
    <div className="space-y-4">
      {steps.map((step) => {
        const StepIcon = getStepIcon(step.id);
        return (
          <div
            key={step.id}
            className={`flex items-center space-x-4 p-4 rounded-lg border cursor-pointer transition-colors ${
              step.completed
                ? "bg-green-50 border-green-200"
                : "bg-gray-50 border-gray-200 hover:bg-gray-100"
            }`}
            onClick={() => handleStepClick(step.id)}
          >
            <div className="flex-shrink-0">
              {step.completed ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <Circle className="h-6 w-6 text-gray-400" />
              )}
            </div>
            <div className="flex-shrink-0">
              <StepIcon className={`h-5 w-5 ${step.completed ? 'text-green-600' : 'text-gray-400'}`} />
            </div>
            <div className="flex-grow">
              <p className={`font-medium ${step.completed ? 'text-green-800' : 'text-gray-900'}`}>
                {step.title}
              </p>
            </div>
            <Button 
              variant={step.completed ? "default" : "outline"}
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleStepClick(step.id);
              }}
            >
              {step.completed ? "Done" : "Start"}
            </Button>
          </div>
        );
      })}
    </div>
  );
};
