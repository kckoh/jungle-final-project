import { useState } from 'react';
import {
  Upload,
  Sparkles,
  MessageSquare,
  Download,
  Video,
  Play,
  Pause,
  Music,
  Type,
  Scissors,
  Smartphone,
  Instagram,
  Youtube,
  Zap
} from 'lucide-react';

interface AiVideoEditPageProps {
  onBackToHome: () => void;
}

export function AiVideoEditPage({ onBackToHome }: AiVideoEditPageProps) {
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('tiktok');
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'ai'; content: string }>>(
    [{ role: 'ai', content: 'Hi! Upload your video or images to create stunning video ads for TikTok, Reels, and YouTube Shorts.' }]
  );
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    setChatMessages([
      ...chatMessages,
      { role: 'user', content: inputMessage },
      { role: 'ai', content: 'Processing your request... In production, AI would apply video effects, add text overlays, and optimize for your selected platform.' }
    ]);
    setInputMessage('');
  };

  const platforms = [
    { id: 'tiktok', name: 'TikTok', ratio: '9:16', icon: Smartphone },
    { id: 'reels', name: 'Instagram Reels', ratio: '9:16', icon: Instagram },
    { id: 'youtube', name: 'YouTube Shorts', ratio: '9:16', icon: Youtube },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-300 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="px-3 py-2 border border-gray-400 bg-white hover:bg-gray-100 text-gray-700"
              onClick={onBackToHome}
            >
              ← Back
            </button>
            <div className="flex items-center gap-2">
              <Video className="w-6 h-6 text-gray-600" />
              <h1 className="text-gray-900">AI Video Edit</h1>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 border border-gray-400 bg-white hover:bg-gray-100 text-gray-700 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Video
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Video Upload & Preview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Section */}
            <div className="p-6 border border-gray-300 bg-white">
              <h3 className="mb-4 pb-2 border-b border-gray-300 text-gray-900 flex items-center gap-2">
                <Upload className="w-5 h-5 text-gray-600" />
                Upload Content
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-video border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100">
                  <div className="text-center p-4">
                    <Video className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-600 mb-2">Upload Video</p>
                    <p className="text-xs text-gray-500">MP4, MOV up to 100MB</p>
                  </div>
                </div>
                <div className="aspect-video border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100">
                  <div className="text-center p-4">
                    <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-600 mb-2">Create from Images</p>
                    <p className="text-xs text-gray-500">AI converts to video</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Selection */}
            <div className="p-6 border border-gray-300 bg-white">
              <h3 className="mb-4 pb-2 border-b border-gray-300 text-gray-900">
                Select Platform Format
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {platforms.map((platform) => {
                  const Icon = platform.icon;
                  return (
                    <button
                      key={platform.id}
                      onClick={() => setSelectedPlatform(platform.id)}
                      className={`p-4 border transition-all ${
                        selectedPlatform === platform.id
                          ? 'border-gray-600 bg-gray-200'
                          : 'border-gray-300 bg-white hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-900 mb-1">{platform.name}</p>
                      <p className="text-xs text-gray-500">{platform.ratio}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Video Preview */}
            <div className="p-6 border border-gray-300 bg-white">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-300">
                <h3 className="text-gray-900 flex items-center gap-2">
                  <Video className="w-5 h-5 text-gray-600" />
                  Video Preview
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-8 h-8 border border-gray-400 bg-white hover:bg-gray-100 flex items-center justify-center"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 text-gray-700" />
                    ) : (
                      <Play className="w-4 h-4 text-gray-700" />
                    )}
                  </button>
                </div>
              </div>

              {/* Video Player Mockup */}
              <div className="aspect-[9/16] max-w-sm mx-auto border-2 border-gray-300 flex items-center justify-center bg-gray-900 relative">
                {videoUploaded ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-gray-400 border-t-gray-600 rounded-full mx-auto mb-4 animate-spin" />
                      <p className="text-gray-400 text-sm">[VIDEO PREVIEW]</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-8">
                    <Video className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">Upload video to preview</p>
                  </div>
                )}

                {/* Time indicator */}
                {videoUploaded && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-white">0:00</span>
                      <span className="text-xs text-white">0:15</span>
                    </div>
                    <div className="w-full h-1 bg-gray-600">
                      <div className="w-1/3 h-full bg-white" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Timeline Mockup */}
            <div className="p-6 border border-gray-300 bg-white">
              <h3 className="mb-4 pb-2 border-b border-gray-300 text-gray-900 flex items-center gap-2">
                <Scissors className="w-5 h-5 text-gray-600" />
                Timeline
              </h3>
              <div className="space-y-3">
                {/* Video Track */}
                <div>
                  <p className="text-xs text-gray-600 mb-2">Video</p>
                  <div className="h-12 border border-gray-300 bg-gray-100 flex items-center">
                    <div className="h-full w-3/4 bg-gray-300 border-r-2 border-gray-600 flex items-center justify-center">
                      <Video className="w-4 h-4 text-gray-600" />
                    </div>
                  </div>
                </div>

                {/* Text Track */}
                <div>
                  <p className="text-xs text-gray-600 mb-2">Text Overlay</p>
                  <div className="h-12 border border-gray-300 bg-gray-100 flex items-center">
                    <div className="h-full w-1/2 bg-gray-200 border-r-2 border-gray-500 flex items-center justify-center ml-12">
                      <Type className="w-4 h-4 text-gray-600" />
                    </div>
                  </div>
                </div>

                {/* Music Track */}
                <div>
                  <p className="text-xs text-gray-600 mb-2">Background Music</p>
                  <div className="h-12 border border-gray-300 bg-gray-100 flex items-center">
                    <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                      <Music className="w-4 h-4 text-gray-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - AI Chat */}
          <div className="lg:col-span-1">
            <div className="p-6 flex flex-col border border-gray-300 bg-white h-[calc(100vh-180px)] sticky top-24">
              <h2 className="mb-4 pb-2 border-b border-gray-300 flex items-center gap-2 text-gray-900">
                <MessageSquare className="w-5 h-5 text-gray-600" />
                AI Video Assistant
              </h2>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-gray-100 border border-gray-300">
                {chatMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 border ${
                        message.role === 'user'
                          ? 'bg-gray-200 text-gray-900 border-gray-400'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input & Quick Actions */}
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    className="flex-1 px-3 py-2 border border-gray-400 bg-white focus:outline-none focus:border-gray-600"
                    placeholder="Tell AI what to change..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button
                    className="px-4 py-2 border border-gray-400 bg-gray-200 hover:bg-gray-300 text-gray-900"
                    onClick={handleSendMessage}
                  >
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick Action Buttons */}
                <div className="space-y-2">
                  <p className="text-xs text-gray-600 mb-2">Quick Actions</p>

                  <button
                    className="w-full px-3 py-2 border border-gray-400 bg-white hover:bg-gray-100 text-sm text-gray-700 text-left flex items-center gap-2"
                    onClick={() => setInputMessage('Add trending music')}
                  >
                    <Music className="w-4 h-4 text-gray-600" />
                    Add Trending Music
                  </button>

                  <button
                    className="w-full px-3 py-2 border border-gray-400 bg-white hover:bg-gray-100 text-sm text-gray-700 text-left flex items-center gap-2"
                    onClick={() => setInputMessage('Add text overlay: 30% OFF')}
                  >
                    <Type className="w-4 h-4 text-gray-600" />
                    Add Text Overlay
                  </button>

                  <button
                    className="w-full px-3 py-2 border border-gray-400 bg-white hover:bg-gray-100 text-sm text-gray-700 text-left flex items-center gap-2"
                    onClick={() => setInputMessage('Trim to 15 seconds')}
                  >
                    <Scissors className="w-4 h-4 text-gray-600" />
                    Trim to 15 sec
                  </button>

                  <button
                    className="w-full px-3 py-2 border border-gray-400 bg-white hover:bg-gray-100 text-sm text-gray-700 text-left flex items-center gap-2"
                    onClick={() => setInputMessage('Add zoom-in effect')}
                  >
                    <Zap className="w-4 h-4 text-gray-600" />
                    Add Zoom Effect
                  </button>

                  <button
                    className="w-full px-3 py-2 border border-gray-400 bg-white hover:bg-gray-100 text-sm text-gray-700 text-left flex items-center gap-2"
                    onClick={() => setInputMessage('Auto-generate captions')}
                  >
                    <Type className="w-4 h-4 text-gray-600" />
                    Auto Captions
                  </button>

                  <button
                    className="w-full px-3 py-2 border border-gray-400 bg-gray-200 hover:bg-gray-300 text-sm text-gray-900 text-left flex items-center gap-2"
                    onClick={() => setInputMessage('Create 3 variations for A/B test')}
                  >
                    <Sparkles className="w-4 h-4 text-gray-600" />
                    Create Variations
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
