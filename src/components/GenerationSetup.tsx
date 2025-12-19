import { useState } from 'react';
import { TargetAudience, Budget, Reference, Creative } from '../App';
import { ArrowRight, ArrowLeft, Monitor, Smartphone, Zap, RefreshCw, MessageSquare, Chrome, Image as ImageIcon } from 'lucide-react';

interface GenerationSetupProps {
  targetAudience: TargetAudience;
  budget: Budget;
  selectedReferences: Reference[];
  selectedPlatform: string;
  setSelectedPlatform: (platform: string) => void;
  setCurrentCreative: (creative: Creative) => void;
  onNext: () => void;
  onBack: () => void;
}

const platforms = [
  { id: 'facebook', name: 'Facebook', resolution: '1200x628', aspect: '1.91:1' },
  { id: 'instagram', name: 'Instagram Feed', resolution: '1080x1080', aspect: '1:1' },
  { id: 'instagram-story', name: 'Instagram Story', resolution: '1080x1920', aspect: '9:16' },
  { id: 'google-display', name: 'Google Display', resolution: '728x90', aspect: 'Leaderboard' },
  { id: 'linkedin', name: 'LinkedIn', resolution: '1200x627', aspect: '1.91:1' },
  { id: 'tiktok', name: 'TikTok', resolution: '1080x1920', aspect: '9:16' }
];

const mockGeneratedCreatives = [
  '/ad-image.webp',
  '/ad-image.webp',
  '/ad-image.webp'
];

export function GenerationSetup({
  targetAudience,
  budget,
  selectedReferences,
  selectedPlatform,
  setSelectedPlatform,
  setCurrentCreative,
  onNext,
  onBack
}: GenerationSetupProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCreatives, setGeneratedCreatives] = useState<string[]>([]);
  const [versions, setVersions] = useState<{ id: string; url: string; version: number }[]>([]);
  const [selectedCreativeIndex, setSelectedCreativeIndex] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai'; message: string }[]>([]);
  const [figmaConnected, setFigmaConnected] = useState(true);
  const [illustratorConnected, setIllustratorConnected] = useState(false);

  const selectedPlatformData = platforms.find(p => p.id === selectedPlatform);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedCreatives(mockGeneratedCreatives);
      const newVersions = mockGeneratedCreatives.map((url, idx) => ({
        id: `v${idx + 1}`,
        url,
        version: 1
      }));
      setVersions(newVersions);
      setIsGenerating(false);
    }, 2000);
  };

  const handleFeedback = () => {
    if (!feedback.trim()) return;

    setChatHistory([...chatHistory, { role: 'user', message: feedback }]);
    
    setTimeout(() => {
      const aiResponse = "I've updated the creative based on your feedback. The new version emphasizes the product more prominently and uses bolder typography.";
      setChatHistory(prev => [...prev, { role: 'ai', message: aiResponse }]);
      
      const newUrl = mockGeneratedCreatives[Math.floor(Math.random() * mockGeneratedCreatives.length)];
      const currentVersion = versions[selectedCreativeIndex].version;
      const newVersion = {
        id: `v${versions.length + 1}`,
        url: newUrl,
        version: currentVersion + 1
      };
      setVersions([...versions, newVersion]);
      setSelectedCreativeIndex(versions.length);
      setFeedback('');
    }, 1000);
  };

  const handleProceedToEdit = () => {
    if (generatedCreatives.length > 0) {
      setCurrentCreative({
        id: versions[selectedCreativeIndex].id,
        url: versions[selectedCreativeIndex].url,
        platform: selectedPlatform,
        version: versions[selectedCreativeIndex].version
      });
    } else {
      // Allow proceeding even without generated creatives
      setCurrentCreative({
        id: 'default',
        url: '/ad-image.webp',
        platform: selectedPlatform,
        version: 1
      });
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-300 pb-4">
        <h1 className="text-2xl text-gray-900 mb-2">AI Generation Setup</h1>
        <p className="text-gray-600">Configure your platform and generate AI-powered ad creatives</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Generate Button */}
          <div className="bg-white border border-gray-300 p-6">
            <button
              onClick={handleGenerate}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-200 text-gray-900 border border-gray-400 hover:bg-gray-300"
            >
              <Zap className="w-4 h-4" />
              <span>{isGenerating ? 'Generating...' : 'Generate Creatives'}</span>
            </button>
          </div>

          {/* Summary Panel */}
          <div className="bg-white border border-gray-300 p-6">
            <h2 className="text-sm text-gray-900 mb-4 pb-2 border-b border-gray-300">Campaign Summary</h2>
            <div className="space-y-3 text-xs">
              <div>
                <p className="text-gray-500 mb-1">Platform</p>
                <p className="text-gray-900">{selectedPlatformData?.name || 'Not selected'}</p>
                {selectedPlatformData && (
                  <p className="text-gray-600">{selectedPlatformData.resolution} ({selectedPlatformData.aspect})</p>
                )}
              </div>
              <div>
                <p className="text-gray-500 mb-1">Target Audience</p>
                <p className="text-gray-900">
                  {targetAudience.gender}, {targetAudience.ageRange}
                </p>
                <p className="text-gray-600">{targetAudience.interests.join(', ')}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Budget</p>
                <p className="text-gray-900">${budget.total} over {budget.duration} days</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Selected Strategies</p>
                <div className="space-y-1">
                  {selectedReferences.map(ref => (
                    <p key={ref.id} className="text-gray-600">• {ref.title}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chrome Extensions */}
          <div className="bg-white border border-gray-300 p-6">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-300">
              <Chrome className="w-4 h-4 text-gray-700" />
              <h2 className="text-sm text-gray-900">Extension Status</h2>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-700">Figma Plugin</span>
                <div className={`w-2 h-2 ${figmaConnected ? 'bg-gray-700' : 'bg-gray-300'} border border-gray-400`} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-700">Illustrator Plugin</span>
                <div className={`w-2 h-2 ${illustratorConnected ? 'bg-gray-700' : 'bg-gray-300'} border border-gray-400`} />
              </div>
            </div>
          </div>
        </div>

        {/* Generated Creatives */}
        <div className="lg:col-span-2 bg-white border border-gray-300 p-6">
          {generatedCreatives.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96 text-gray-400">
              <ImageIcon className="w-16 h-16 mb-4" />
              <p>Select a platform and click "Generate Creatives" to begin</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Main Creative Display */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm text-gray-900">Generated Creative</h2>
                  <span className="text-xs text-gray-600">
                    Version {versions[selectedCreativeIndex]?.version || 1}
                  </span>
                </div>
                <div className="w-full h-96 bg-gray-200 border border-gray-300 flex items-center justify-center">
                  <span className="text-gray-400">[생성된 크리에이티브]</span>
                </div>
              </div>

              {/* Version History */}
              <div>
                <h3 className="text-sm text-gray-900 mb-3">Version History</h3>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {versions.map((version, idx) => (
                    <button
                      key={version.id}
                      onClick={() => setSelectedCreativeIndex(idx)}
                      className={`flex-shrink-0 relative border-2 ${
                        idx === selectedCreativeIndex ? 'border-gray-600' : 'border-gray-300'
                      }`}
                    >
                      <div className="w-20 h-20 bg-gray-200 flex items-center justify-center">
                        <span className="text-xs text-gray-400">v{version.version}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback Chat */}
              <div>
                <h3 className="text-sm text-gray-900 mb-3">AI Feedback Loop</h3>
                <div className="bg-gray-100 border border-gray-300 p-4 mb-3 h-48 overflow-y-auto space-y-3">
                  {chatHistory.length === 0 ? (
                    <p className="text-xs text-gray-500 text-center py-8">
                      Provide feedback to refine your creative
                    </p>
                  ) : (
                    chatHistory.map((chat, idx) => (
                      <div
                        key={idx}
                        className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs px-3 py-2 border text-xs ${
                            chat.role === 'user'
                              ? 'bg-gray-200 text-gray-900 border-gray-400'
                              : 'bg-white text-gray-900 border-gray-300'
                          }`}
                        >
                          {chat.message}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleFeedback()}
                    placeholder="e.g., Make the headline bolder, adjust colors..."
                    className="flex-1 px-3 py-2 border border-gray-400 bg-white text-sm focus:outline-none focus:border-gray-600"
                  />
                  <button
                    onClick={handleFeedback}
                    className="px-4 py-2 bg-gray-200 text-gray-900 border border-gray-400 hover:bg-gray-300 text-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t border-gray-300">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 border border-gray-400 bg-white text-gray-700 hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          onClick={handleProceedToEdit}
          className="flex items-center gap-2 px-6 py-3 border border-gray-400 bg-gray-200 text-gray-900 hover:bg-gray-300"
        >
          <span>Proceed to Editing</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
