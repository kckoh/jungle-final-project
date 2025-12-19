import { useState } from 'react';
import { TargetAudience, Budget, Reference } from '../App';
import { Users, DollarSign, Calendar, ArrowRight, CheckCircle2, Monitor, Smartphone } from 'lucide-react';

interface ResearchSetupProps {
  targetAudience: TargetAudience;
  setTargetAudience: (audience: TargetAudience) => void;
  budget: Budget;
  setBudget: (budget: Budget) => void;
  selectedReferences: Reference[];
  setSelectedReferences: (refs: Reference[]) => void;
  selectedPlatform: string;
  setSelectedPlatform: (platform: string) => void;
  onNext: () => void;
}

const platforms = [
  { id: 'facebook', name: 'Facebook', resolution: '1200x628', aspect: '1.91:1' },
  { id: 'instagram', name: 'Instagram Feed', resolution: '1080x1080', aspect: '1:1' },
  { id: 'instagram-story', name: 'Instagram Story', resolution: '1080x1920', aspect: '9:16' },
  { id: 'google-display', name: 'Google Display', resolution: '728x90', aspect: 'Leaderboard' },
  { id: 'linkedin', name: 'LinkedIn', resolution: '1200x627', aspect: '1.91:1' },
  { id: 'tiktok', name: 'TikTok', resolution: '1080x1920', aspect: '9:16' }
];

const mockReferences: Reference[] = [
  {
    id: '1',
    title: 'Emotional Storytelling',
    category: 'Video Ads',
    explanation: 'Leverage emotional narratives to create deeper connections with your audience. This approach has shown 3x higher engagement rates.',
    competitors: ['Nike - Just Do It Campaign', 'Apple - Shot on iPhone', 'Coca-Cola - Share a Coke'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400',
    selected: false
  },
  {
    id: '2',
    title: 'User-Generated Content',
    category: 'Social Media',
    explanation: 'Authentic content from real customers builds trust and increases conversion rates by up to 4.5x.',
    competitors: ['GoPro - Photo of the Day', 'Starbucks - Red Cup Contest', 'Airbnb - Community Stories'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
    selected: false
  },
  {
    id: '3',
    title: 'Product Showcase',
    category: 'Display Ads',
    explanation: 'Clean, high-quality product imagery with minimal copy drives 2.8x better click-through rates.',
    competitors: ['Samsung - Galaxy Launch', 'Tesla - Model Reveals', 'Dyson - Product Demos'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
    selected: false
  },
  {
    id: '4',
    title: 'Limited-Time Offers',
    category: 'Performance Ads',
    explanation: 'Create urgency with time-sensitive promotions. Converts 45% better than evergreen campaigns.',
    competitors: ['Amazon - Prime Day', 'Target - Flash Sales', 'Best Buy - Daily Deals'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
    selected: false
  },
  {
    id: '5',
    title: 'Influencer Partnerships',
    category: 'Social Media',
    explanation: 'Collaborate with micro-influencers for authentic reach. Average ROI of 5.78x per dollar spent.',
    competitors: ['Glossier - Beauty Community', 'Daniel Wellington - Instagram Ambassadors', 'Fashion Nova - Influencer Network'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400',
    selected: false
  },
  {
    id: '6',
    title: 'Interactive Experiences',
    category: 'Display Ads',
    explanation: 'Gamification and interactive elements boost engagement by 300% compared to static ads.',
    competitors: ['Spotify - Wrapped Campaign', 'Burger King - Whopper Detour', 'IKEA - AR Furniture Placement'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400',
    selected: false
  }
];

export function ResearchSetup({
  targetAudience,
  setTargetAudience,
  budget,
  setBudget,
  selectedReferences,
  setSelectedReferences,
  selectedPlatform,
  setSelectedPlatform,
  onNext
}: ResearchSetupProps) {
  const [references, setReferences] = useState<Reference[]>(mockReferences);

  const toggleReference = (id: string) => {
    const updated = references.map(ref =>
      ref.id === id ? { ...ref, selected: !ref.selected } : ref
    );
    setReferences(updated);
    setSelectedReferences(updated.filter(ref => ref.selected));
  };

  const canProceed = true; // Always allow proceeding

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-300 pb-4">
        <h1 className="text-2xl text-gray-900 mb-2">Research & Analysis</h1>
        <p className="text-gray-600">Define your target audience and advertising budget to receive personalized recommendations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Target Audience */}
        <div className="bg-white border border-gray-300 p-6">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-300">
            <Users className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg text-gray-900">Target Audience</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Age Range</label>
              <select
                value={targetAudience.ageRange}
                onChange={(e) => setTargetAudience({ ...targetAudience, ageRange: e.target.value })}
                className="w-full px-3 py-2 border border-gray-400 bg-white focus:outline-none focus:border-gray-600"
              >
                <option value="">Select age range</option>
                <option value="18-24">18-24</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45-54">45-54</option>
                <option value="55+">55+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Gender</label>
              <select
                value={targetAudience.gender}
                onChange={(e) => setTargetAudience({ ...targetAudience, gender: e.target.value })}
                className="w-full px-3 py-2 border border-gray-400 bg-white focus:outline-none focus:border-gray-600"
              >
                <option value="">Select gender</option>
                <option value="all">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Interest Categories</label>
              <div className="space-y-2">
                {['Technology', 'Fashion', 'Health & Fitness', 'Travel', 'Food & Dining', 'Entertainment'].map(interest => (
                  <label key={interest} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={targetAudience.interests.includes(interest)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setTargetAudience({
                            ...targetAudience,
                            interests: [...targetAudience.interests, interest]
                          });
                        } else {
                          setTargetAudience({
                            ...targetAudience,
                            interests: targetAudience.interests.filter(i => i !== interest)
                          });
                        }
                      }}
                      className="border-gray-400 text-gray-600"
                    />
                    <span className="text-sm text-gray-700">{interest}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Budget */}
        <div className="bg-white border border-gray-300 p-6">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-300">
            <DollarSign className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg text-gray-900">Advertising Budget</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Total Budget (USD)</label>
              <input
                type="number"
                value={budget.total || ''}
                onChange={(e) => setBudget({ ...budget, total: Number(e.target.value) })}
                placeholder="Enter total budget"
                className="w-full px-3 py-2 border border-gray-400 bg-white focus:outline-none focus:border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Campaign Duration (days)</label>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  value={budget.duration || ''}
                  onChange={(e) => setBudget({ ...budget, duration: Number(e.target.value) })}
                  placeholder="Enter duration"
                  className="flex-1 px-3 py-2 border border-gray-400 bg-white focus:outline-none focus:border-gray-600"
                />
              </div>
            </div>

            {budget.total > 0 && budget.duration > 0 && (
              <div className="bg-gray-100 border border-gray-300 p-4 mt-4">
                <p className="text-sm text-gray-700">Daily Budget</p>
                <p className="text-2xl text-gray-900">${(budget.total / budget.duration).toFixed(2)}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Platform Selection */}
      <div className="bg-white border border-gray-300 p-6">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-300">
          <Monitor className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg text-gray-900">Select Platform</h2>
        </div>
        <p className="text-sm text-gray-600 mb-4">Choose the advertising platform for your campaign</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {platforms.map(platform => (
            <button
              key={platform.id}
              onClick={() => setSelectedPlatform(platform.id)}
              className={`text-left px-4 py-3 border transition-colors ${
                selectedPlatform === platform.id
                  ? 'border-gray-600 bg-gray-200 text-gray-900'
                  : 'border-gray-300 bg-white hover:border-gray-400'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{platform.name}</span>
                {platform.id.includes('story') || platform.id === 'tiktok' ? (
                  <Smartphone className="w-4 h-4 text-gray-600" />
                ) : (
                  <Monitor className="w-4 h-4 text-gray-600" />
                )}
              </div>
              {selectedPlatform === platform.id && (
                <div className="text-xs text-gray-600">
                  <div>{platform.resolution}</div>
                  <div>{platform.aspect}</div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-end pt-4 border-t border-gray-300">
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`flex items-center gap-2 px-6 py-3 border border-gray-400 transition-colors ${
            canProceed
              ? 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              : 'bg-white text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>Continue to Reference Preview</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}