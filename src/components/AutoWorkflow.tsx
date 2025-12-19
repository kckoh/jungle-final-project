import { useState } from 'react';
import { ResearchSetup } from './ResearchSetup';
import { ReferencePreview } from './ReferencePreview';
import { GenerationSetup } from './GenerationSetup';
import { ProductImageUpload } from './ProductImageUpload';
import { EditingMode } from './EditingMode';
import { ExportOptions } from './ExportOptions';
import { Deployment } from './Deployment';
import { Navigation } from './Navigation';

export type WorkflowStep =
  | 'research-setup'
  | 'reference-preview'
  | 'generation-setup'
  | 'product-upload'
  | 'editing'
  | 'export'
  | 'deployment';

export interface TargetAudience {
  ageRange: string;
  gender: string;
  interests: string[];
}

export interface Budget {
  total: number;
  duration: number;
}

export interface Reference {
  id: string;
  title: string;
  category: string;
  explanation: string;
  competitors: string[];
  thumbnailUrl: string;
  selected: boolean;
}

export interface Creative {
  id: string;
  url: string;
  platform: string;
  version: number;
}

interface AutoWorkflowProps {
  onBackToHome: () => void;
}

export function AutoWorkflow({ onBackToHome }: AutoWorkflowProps) {
  const [currentStep, setCurrentStep] = useState<WorkflowStep>('research-setup');
  const [targetAudience, setTargetAudience] = useState<TargetAudience>({
    ageRange: '',
    gender: '',
    interests: []
  });
  const [budget, setBudget] = useState<Budget>({
    total: 0,
    duration: 0
  });
  const [selectedReferences, setSelectedReferences] = useState<Reference[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [currentCreative, setCurrentCreative] = useState<Creative | null>(null);

  const renderStep = () => {
    switch (currentStep) {
      case 'research-setup':
        return (
          <ResearchSetup
            targetAudience={targetAudience}
            setTargetAudience={setTargetAudience}
            budget={budget}
            setBudget={setBudget}
            selectedReferences={selectedReferences}
            setSelectedReferences={setSelectedReferences}
            selectedPlatform={selectedPlatform}
            setSelectedPlatform={setSelectedPlatform}
            onNext={() => setCurrentStep('reference-preview')}
          />
        );
      case 'reference-preview':
        return (
          <ReferencePreview
            selectedReferences={selectedReferences}
            setSelectedReferences={setSelectedReferences}
            onNext={() => setCurrentStep('generation-setup')}
            onBack={() => setCurrentStep('research-setup')}
          />
        );
      case 'generation-setup':
        return (
          <GenerationSetup
            targetAudience={targetAudience}
            budget={budget}
            selectedReferences={selectedReferences}
            selectedPlatform={selectedPlatform}
            setSelectedPlatform={setSelectedPlatform}
            setCurrentCreative={setCurrentCreative}
            onNext={() => setCurrentStep('product-upload')}
            onBack={() => setCurrentStep('reference-preview')}
          />
        );
      case 'product-upload':
        return (
          <ProductImageUpload
            onNext={() => setCurrentStep('editing')}
            onBack={() => setCurrentStep('generation-setup')}
          />
        );
      case 'editing':
        return (
          <EditingMode
            currentCreative={currentCreative}
            setCurrentCreative={setCurrentCreative}
            onNext={() => setCurrentStep('export')}
            onBack={() => setCurrentStep('generation-setup')}
          />
        );
      case 'export':
        return (
          <ExportOptions
            currentCreative={currentCreative}
            onNext={() => setCurrentStep('deployment')}
            onBack={() => setCurrentStep('editing')}
          />
        );
      case 'deployment':
        return (
          <Deployment
            currentCreative={currentCreative}
            onBack={() => setCurrentStep('export')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      <Navigation currentStep={currentStep} setCurrentStep={setCurrentStep} onBackToHome={onBackToHome} />
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}