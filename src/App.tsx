import { useState } from 'react';
import { MainLanding } from './components/MainLanding';
import { AutoWorkflow } from './components/AutoWorkflow';
import { AiEditingPage } from './components/AiEditingPage';
import { AiVideoEditPage } from './components/AiVideoEditPage';
import { ExtensionPage } from './components/ExtensionPage';
import { MyPage } from './components/MyPage';
import { Analytics } from './components/Analytics';
import { Button } from './components/ui/button';
import { Sparkles, Chrome, User } from 'lucide-react';

type Page = 'home' | 'auto' | 'ai-editing' | 'ai-video-editing' | 'extension' | 'mypage' | 'analytics';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <MainLanding
            onNavigateToAuto={() => setCurrentPage('auto')}
            onNavigateToAiEditing={() => setCurrentPage('ai-editing')}
            onNavigateToAiVideoEditing={() => setCurrentPage('ai-video-editing')}
          />
        );
      case 'auto':
        return <AutoWorkflow onBackToHome={() => setCurrentPage('home')} />;
      case 'ai-editing':
        return <AiEditingPage onBackToHome={() => setCurrentPage('home')} />;
      case 'ai-video-editing':
        return <AiVideoEditPage onBackToHome={() => setCurrentPage('home')} />;
      case 'extension':
        return <ExtensionPage onBackToHome={() => setCurrentPage('home')} />;
      case 'mypage':
        return <MyPage onBackToHome={() => setCurrentPage('home')} onNavigateToAnalytics={() => setCurrentPage('analytics')} />;
      case 'analytics':
        return <Analytics onBackToHome={() => setCurrentPage('home')} onBackToMyPage={() => setCurrentPage('mypage')} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      {currentPage === 'home' && (
        <header className="bg-white border-b border-gray-300 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-300 border border-gray-400 flex items-center justify-center">
                  <span className="text-gray-700 text-xs">AI</span>
                </div>
                <div>
                  <h1 className="text-xl text-gray-900">AdCreative Platform</h1>
                  <p className="text-xs text-gray-500">AI-Powered Marketing</p>
                </div>
              </div>
              
              <nav className="flex items-center gap-2">
                <button
                  className={`px-3 py-2 border border-gray-400 ${currentPage === 'extension' ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'} flex items-center gap-2`}
                  onClick={() => setCurrentPage('extension')}
                >
                  <Chrome className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-700">EXTENSION</span>
                </button>
                <button
                  className={`px-3 py-2 border border-gray-400 ${currentPage === 'mypage' ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'} flex items-center gap-2`}
                  onClick={() => setCurrentPage('mypage')}
                >
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-700">MY PAGE</span>
                </button>
              </nav>
            </div>
          </div>
        </header>
      )}

      {/* Page Content */}
      {renderPage()}
    </div>
  );
}