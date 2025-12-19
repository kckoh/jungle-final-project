import { WorkflowStep } from './AutoWorkflow';
import { CheckCircle2, Circle, Home } from 'lucide-react';
import { Button } from './ui/button';

interface NavigationProps {
  currentStep: WorkflowStep;
  setCurrentStep: (step: WorkflowStep) => void;
  onBackToHome?: () => void;
}

const steps: { id: WorkflowStep; label: string }[] = [
  { id: 'research-setup', label: 'Research & Analysis' },
  { id: 'reference-preview', label: 'Reference Preview' },
  { id: 'generation-setup', label: 'AI Generation' },
  { id: 'product-upload', label: 'Product Images' },
  { id: 'editing', label: 'Editing' },
  { id: 'export', label: 'Export' },
  { id: 'deployment', label: 'Deployment' }
];

export function Navigation({ currentStep, setCurrentStep, onBackToHome }: NavigationProps) {
  const currentIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-300 h-screen sticky top-0 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-300">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gray-300 border border-gray-400 flex items-center justify-center">
            <span className="text-gray-700 text-xs">AI</span>
          </div>
          <span className="text-gray-900">AdCreative</span>
        </div>
        {onBackToHome && (
          <button
            onClick={onBackToHome}
            className="w-full px-3 py-2 border border-gray-400 bg-white hover:bg-gray-100 flex items-center gap-2 justify-center text-sm text-gray-700"
          >
            <Home className="w-4 h-4 text-gray-600" />
            Home
          </button>
        )}
      </div>

      {/* Vertical Steps */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          {steps.map((step, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            const isAccessible = true; // Always allow navigation

            return (
              <div key={step.id}>
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 border transition-colors text-left ${
                    isCurrent
                      ? 'bg-gray-200 text-gray-900 border-gray-400'
                      : isCompleted
                      ? 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
                      : 'text-gray-600 bg-white border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-gray-600" />
                    ) : (
                      <Circle 
                        className={`w-5 h-5 ${
                          isCurrent ? 'fill-gray-600 text-gray-600' : 'text-gray-400'
                        }`} 
                      />
                    )}
                  </div>
                  <span className="text-sm">{step.label}</span>
                </button>
                {index < steps.length - 1 && (
                  <div className="ml-6 h-6 w-px bg-gray-300" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-300">
        <div className="text-xs text-gray-500 text-center">
          Step {currentIndex + 1} of {steps.length}
        </div>
      </div>
    </div>
  );
}