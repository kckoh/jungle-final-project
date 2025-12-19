import { useState } from 'react';
import { Creative } from '../App';
import { ArrowRight, ArrowLeft, Copy, Check, Hash, Send, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

interface DeploymentProps {
  currentCreative: Creative | null;
  onBack: () => void;
}

interface PlatformCopy {
  platform: string;
  icon: any;
  copy: string;
  hashtags: string[];
  characterLimit: number;
}

const platformCopies: PlatformCopy[] = [
  {
    platform: 'Facebook',
    icon: Facebook,
    copy: "Discover the future of advertising! 🚀 Our AI-powered platform helps you create stunning ad creatives that convert. Join thousands of marketers who've already transformed their campaigns.",
    hashtags: ['#DigitalMarketing', '#AdCreatives', '#MarketingAI', '#GrowthHacking'],
    characterLimit: 63206
  },
  {
    platform: 'Instagram',
    icon: Instagram,
    copy: "Transform your ad game with AI ✨ Create scroll-stopping creatives in minutes, not hours. Your best campaign starts here 💪",
    hashtags: ['#Marketing', '#DigitalAds', '#CreativeAI', '#SocialMediaMarketing', '#AdTech'],
    characterLimit: 2200
  },
  {
    platform: 'Twitter',
    icon: Twitter,
    copy: "AI-powered ad creatives that actually convert 🎯 Stop guessing, start growing. Try it free →",
    hashtags: ['#MarTech', '#AdTech', '#AI'],
    characterLimit: 280
  },
  {
    platform: 'LinkedIn',
    icon: Linkedin,
    copy: "As marketers, we know the challenge of creating compelling ad creatives at scale. That's why we built an AI platform that analyzes top-performing ads and generates data-driven creatives tailored to your audience. The result? 3x better engagement and 45% lower CPAs for our clients.",
    hashtags: ['#MarketingStrategy', '#B2BMarketing', '#AdTech', '#AIinMarketing'],
    characterLimit: 3000
  }
];

export function Deployment({
  currentCreative,
  onBack
}: DeploymentProps) {
  const [selectedPlatform, setSelectedPlatform] = useState(platformCopies[0]);
  const [customCopy, setCustomCopy] = useState(selectedPlatform.copy);
  const [customHashtags, setCustomHashtags] = useState(selectedPlatform.hashtags);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handlePlatformChange = (platform: PlatformCopy) => {
    setSelectedPlatform(platform);
    setCustomCopy(platform.copy);
    setCustomHashtags(platform.hashtags);
  };

  const fullText = `${customCopy}\n\n${customHashtags.join(' ')}`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-gray-900 mb-2">Deployment Preparation</h1>
        <p className="text-gray-600">Review your creative and prepare platform-specific copy for deployment</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Creative Summary */}
        <div className="lg:col-span-1 bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-sm text-gray-900 mb-4">Creative Summary</h2>
          {currentCreative ? (
            <div className="space-y-4">
              <img
                src={currentCreative.url}
                alt="Deployment creative"
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="space-y-3">
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-green-700">Ready for Deployment</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Platform:</span>
                      <span className="text-gray-900">{currentCreative.platform}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Version:</span>
                      <span className="text-gray-900">v{currentCreative.version}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                  <Send className="w-4 h-4" />
                  <span>Deploy Creative</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
              <p className="text-gray-400">No creative selected</p>
            </div>
          )}
        </div>

        {/* Copywriting Recommendations */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-sm text-gray-900 mb-4">Platform-Specific Copywriting</h2>

          {/* Platform Selector */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {platformCopies.map(platform => {
              const Icon = platform.icon;
              return (
                <button
                  key={platform.platform}
                  onClick={() => handlePlatformChange(platform)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors whitespace-nowrap ${
                    selectedPlatform.platform === platform.platform
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{platform.platform}</span>
                </button>
              );
            })}
          </div>

          {/* Copy Editor */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-gray-700">Ad Copy</label>
                <span className={`text-xs ${
                  customCopy.length > selectedPlatform.characterLimit
                    ? 'text-red-600'
                    : 'text-gray-500'
                }`}>
                  {customCopy.length} / {selectedPlatform.characterLimit}
                </span>
              </div>
              <textarea
                value={customCopy}
                onChange={(e) => setCustomCopy(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-gray-700 flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  <span>Hashtag Suggestions</span>
                </label>
                <button
                  onClick={() => handleCopy(customHashtags.join(' '), 'hashtags')}
                  className="flex items-center gap-1 px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded"
                >
                  {copiedField === 'hashtags' ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {customHashtags.map((tag, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm"
                  >
                    <span>{tag}</span>
                    <button
                      onClick={() => setCustomHashtags(customHashtags.filter((_, i) => i !== idx))}
                      className="hover:text-blue-900"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add custom hashtag (press Enter)"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const input = e.currentTarget;
                    const value = input.value.trim();
                    if (value && !customHashtags.includes(value)) {
                      setCustomHashtags([...customHashtags, value.startsWith('#') ? value : `#${value}`]);
                      input.value = '';
                    }
                  }
                }}
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* Full Text Preview */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-gray-700">Full Post Preview</label>
                <button
                  onClick={() => handleCopy(fullText, 'full')}
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs"
                >
                  {copiedField === 'full' ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy All</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-700 whitespace-pre-wrap max-h-48 overflow-y-auto">
                {fullText}
              </div>
            </div>
          </div>

          {/* Best Practices */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm text-gray-900 mb-2">Best Practices for {selectedPlatform.platform}</h3>
            <ul className="text-xs text-gray-700 space-y-1">
              {selectedPlatform.platform === 'Instagram' && (
                <>
                  <li>• Use 3-5 relevant hashtags for optimal reach</li>
                  <li>• Include a call-to-action in the first line</li>
                  <li>• Tag relevant accounts to increase visibility</li>
                </>
              )}
              {selectedPlatform.platform === 'Facebook' && (
                <>
                  <li>• Front-load the most important message</li>
                  <li>• Ask questions to boost engagement</li>
                  <li>• Include a clear call-to-action</li>
                </>
              )}
              {selectedPlatform.platform === 'Twitter' && (
                <>
                  <li>• Keep it concise and punchy</li>
                  <li>• Use 1-2 hashtags maximum</li>
                  <li>• Include visual elements for 150% more engagement</li>
                </>
              )}
              {selectedPlatform.platform === 'LinkedIn' && (
                <>
                  <li>• Professional tone with data-driven insights</li>
                  <li>• Share value before asking for action</li>
                  <li>• Use 3-5 industry-relevant hashtags</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>
    </div>
  );
}