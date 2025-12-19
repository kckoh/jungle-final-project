import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Upload, Sparkles, MessageSquare, Download, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

interface AiEditingPageProps {
  onBackToHome: () => void;
}

export function AiEditingPage({ onBackToHome }: AiEditingPageProps) {
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [companyAsset, setCompanyAsset] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'ai'; content: string }>>(
    [{ role: 'ai', content: 'Hi! Upload reference images and company assets to start creating your ad.' }]
  );
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    setChatMessages([
      ...chatMessages,
      { role: 'user', content: inputMessage },
      { role: 'ai', content: 'I\'ll help you with that! This is a demo response. In production, AI would process your request and apply the changes.' }
    ]);
    setInputMessage('');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white border-b border-gray-300 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="px-3 py-2 border border-gray-400 bg-white hover:bg-gray-100 text-gray-700" onClick={onBackToHome}>← Back</button>
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-gray-600" />
              <h1 className="text-gray-900">AI EDIT Mode</h1>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 border border-gray-400 bg-white hover:bg-gray-100 text-gray-700 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Input Images */}
          <div className="lg:col-span-2 space-y-6">
            {/* Reference Image & Company Assets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Reference Image */}
              <div className="p-6 border border-gray-300 bg-white">
                <h3 className="mb-4 pb-2 border-b border-gray-300 text-gray-900 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-gray-600" />
                  Reference Image
                </h3>
                <div className="aspect-square border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                  {referenceImage ? (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">[REF IMG]</span>
                    </div>
                  ) : (
                    <div className="text-center p-4">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-sm text-gray-600 mb-3">Upload reference ad or inspiration</p>
                      <button className="px-3 py-2 border border-gray-400 bg-white hover:bg-gray-100 text-gray-700 text-sm flex items-center gap-2 mx-auto">
                        <Upload className="w-4 h-4" />
                        Upload
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Company Assets */}
              <div className="p-6 border border-gray-300 bg-white">
                <h3 className="mb-4 pb-2 border-b border-gray-300 text-gray-900 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-gray-600" />
                  Company Assets
                </h3>
                <div className="aspect-square border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                  {companyAsset ? (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">[ASSET IMG]</span>
                    </div>
                  ) : (
                    <div className="text-center p-4">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-sm text-gray-600 mb-3">Upload logo, product, or brand asset</p>
                      <button className="px-3 py-2 border border-gray-400 bg-white hover:bg-gray-100 text-gray-700 text-sm flex items-center gap-2 mx-auto">
                        <Upload className="w-4 h-4" />
                        Upload
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Generated Preview */}
            <div className="p-6 border border-gray-300 bg-white">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-300">
                <h3 className="text-gray-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-gray-600" />
                  AI Generated Preview
                </h3>
                <button className="px-3 py-2 border border-gray-400 bg-gray-200 hover:bg-gray-300 text-gray-900 text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Generate
                </button>
              </div>
              <div className="aspect-video border-2 border-gray-300 flex items-center justify-center bg-gray-100">
                {referenceImage || companyAsset ? (
                  <div className="text-center p-8">
                    <div className="w-full h-64 bg-gray-200 border border-gray-300 flex items-center justify-center mb-4">
                      <span className="text-gray-400">[AI PREVIEW]</span>
                    </div>
                    <p className="text-sm text-gray-500">AI combines reference style with your assets</p>
                  </div>
                ) : (
                  <div className="text-center p-8">
                    <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-400">Upload images to see AI preview</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - AI Chat */}
          <div className="lg:col-span-1">
            <div className="p-6 flex flex-col border border-gray-300 bg-white h-[calc(100vh-180px)] sticky top-24">
              <h2 className="mb-4 pb-2 border-b border-gray-300 flex items-center gap-2 text-gray-900">
                <MessageSquare className="w-5 h-5 text-gray-600" />
                AI Assistant
              </h2>
              
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

              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    className="flex-1 px-3 py-2 border border-gray-400 bg-white focus:outline-none focus:border-gray-600"
                    placeholder="Tell AI what to change..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button className="px-4 py-2 border border-gray-400 bg-gray-200 hover:bg-gray-300 text-gray-900" onClick={handleSendMessage}>
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-2">
                  <button className="w-full px-3 py-2 border border-gray-400 bg-white hover:bg-gray-100 text-sm text-gray-700 text-left" onClick={() => setInputMessage('Make the colors more vibrant')}>
                    Enhance Colors
                  </button>
                  <button className="w-full px-3 py-2 border border-gray-400 bg-white hover:bg-gray-100 text-sm text-gray-700 text-left" onClick={() => setInputMessage('Add a modern gradient background')}>
                    Add Gradient
                  </button>
                  <button className="w-full px-3 py-2 border border-gray-400 bg-white hover:bg-gray-100 text-sm text-gray-700 text-left" onClick={() => setInputMessage('Improve text readability')}>
                    Fix Typography
                  </button>
                  <button className="w-full px-3 py-2 border border-gray-400 bg-white hover:bg-gray-100 text-sm text-gray-700 text-left" onClick={() => setInputMessage('Create 3 variations')}>
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
