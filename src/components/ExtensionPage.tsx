import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Chrome, CheckCircle2, Download, AlertCircle, Zap } from 'lucide-react';

interface ExtensionPageProps {
  onBackToHome: () => void;
}

export function ExtensionPage({ onBackToHome }: ExtensionPageProps) {
  const extensions = [
    {
      id: '1',
      name: 'Figma Integration',
      description: 'Seamlessly import designs from Figma and sync creative updates in real-time.',
      icon: '🎨',
      status: 'not-connected',
      version: 'v2.4.1',
      features: ['Real-time sync', 'Auto-import frames', 'Component library access']
    },
    {
      id: '2',
      name: 'Ad Collector Browser Extension',
      description: '웹 브라우징 중 경쟁사 광고를 발견하면 클릭 한 번으로 Wire에 저장하고 분석할 수 있습니다.',
      icon: '🔍',
      status: 'not-connected',
      version: 'v1.2.0',
      features: ['Facebook/Instagram 광고 수집', 'TikTok 광고 캡처', 'One-click save', 'Auto-analysis', 'Competitor tracking']
    }
  ];

  const getStatusBadge = (status: string) => {
    if (status === 'connected') {
      return (
        <span className="px-2 py-1 text-xs border border-gray-400 bg-gray-100 text-gray-700">
          <CheckCircle2 className="w-3 h-3 inline mr-1" />
          Connected
        </span>
      );
    }
    return (
      <span className="px-2 py-1 text-xs border border-gray-400 bg-white text-gray-600">
        <AlertCircle className="w-3 h-3 inline mr-1" />
        Not Connected
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white border-b border-gray-300 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="px-3 py-2 border border-gray-400 bg-white hover:bg-gray-100 text-gray-700" onClick={onBackToHome}>← Back</button>
            <div className="flex items-center gap-2">
              <Chrome className="w-6 h-6 text-gray-600" />
              <h1 className="text-gray-900">Extensions</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Info */}
        <div className="p-6 mb-8 bg-gray-100 border border-gray-300">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gray-200 border border-gray-400">
              <Zap className="w-6 h-6 text-gray-700" />
            </div>
            <div className="flex-1">
              <h2 className="mb-2 text-gray-900">Browser Extensions & Integrations</h2>
              <p className="text-gray-600">
                Connect your favorite design tools to streamline your creative workflow. Install browser extensions 
                to unlock advanced features and seamless integrations.
              </p>
            </div>
          </div>
        </div>

        {/* Extensions List */}
        <div className="space-y-4">
          {extensions.map((extension) => (
            <div key={extension.id} className="p-6 border border-gray-300 bg-white hover:border-gray-500 transition-colors">
              <div className="flex items-start gap-4">
                <div className="text-4xl w-12 h-12 bg-gray-200 border border-gray-300 flex items-center justify-center">{extension.icon}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-gray-900">{extension.name}</h3>
                        {getStatusBadge(extension.status)}
                      </div>
                      <p className="text-sm text-gray-500">Version {extension.version}</p>
                    </div>
                    <div className="flex gap-2">
                      {extension.status === 'connected' ? (
                        <>
                          <button className="px-3 py-2 border border-gray-400 bg-white hover:bg-gray-100 text-sm text-gray-700">Configure</button>
                          <button className="px-3 py-2 border border-gray-400 bg-white hover:bg-gray-100 text-sm text-gray-700">Disconnect</button>
                        </>
                      ) : (
                        <div className="flex gap-2">
                          <button className="px-3 py-2 border border-gray-400 bg-gray-200 hover:bg-gray-300 text-sm text-gray-900 flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Install Extension
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{extension.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {extension.features.map((feature, index) => (
                      <span key={index} className="px-2 py-1 text-xs border border-gray-300 bg-gray-50 text-gray-700">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Installation Guide */}
        <div className="p-6 mt-8 border border-gray-300 bg-white">
          <h3 className="mb-4 text-gray-900">How to Install Extensions</h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 border border-gray-400 bg-gray-100 text-gray-700 flex items-center justify-center">
                1
              </div>
              <div>
                <h4 className="mb-1 text-gray-900">Download the Extension</h4>
                <p className="text-sm text-gray-600">Click the "Install Extension" button for your desired tool.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 border border-gray-400 bg-gray-100 text-gray-700 flex items-center justify-center">
                2
              </div>
              <div>
                <h4 className="mb-1 text-gray-900">Add to Chrome</h4>
                <p className="text-sm text-gray-600">Open the downloaded file and add it to your Chrome browser.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 border border-gray-400 bg-gray-100 text-gray-700 flex items-center justify-center">
                3
              </div>
              <div>
                <h4 className="mb-1 text-gray-900">Authenticate & Connect</h4>
                <p className="text-sm text-gray-600">Log in with your credentials to enable the integration.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}