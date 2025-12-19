import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { User, Settings, CreditCard, Bell, Shield, History } from 'lucide-react';

interface MyPageProps {
  onBackToHome: () => void;
  onNavigateToAnalytics: () => void;
}

export function MyPage({ onBackToHome, onNavigateToAnalytics }: MyPageProps) {
  const recentProjects = [
    { id: '1', name: 'Summer Campaign 2024', status: 'completed', date: '2024-12-15' },
    { id: '2', name: 'Product Launch - Instagram', status: 'in-progress', date: '2024-12-18' },
    { id: '3', name: 'Holiday Special Ads', status: 'draft', date: '2024-12-10' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white border-b border-gray-300 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="px-3 py-2 border border-gray-400 bg-white hover:bg-gray-100 text-gray-700" onClick={onBackToHome}>← Back</button>
            <div className="flex items-center gap-2">
              <User className="w-6 h-6 text-gray-600" />
              <h1 className="text-gray-900">My Page</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="p-6 border border-gray-300 bg-white">
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-300 border border-gray-400 flex items-center justify-center text-gray-700">
                  JD
                </div>
                <h2 className="mb-1 text-gray-900">John Doe</h2>
                <p className="text-sm text-gray-500">john.doe@example.com</p>
                <span className="inline-block mt-3 px-2 py-1 text-xs border border-gray-400 bg-gray-100 text-gray-700">Pro Plan</span>
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-300">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Projects Created</span>
                  <span className="text-gray-900">12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Campaigns Running</span>
                  <span className="text-gray-900">3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Member Since</span>
                  <span className="text-gray-900">Dec 2024</span>
                </div>
              </div>

              <button className="w-full mt-6 px-4 py-2 border border-gray-400 bg-gray-200 hover:bg-gray-300 text-gray-900 flex items-center justify-center gap-2">
                <Settings className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Projects */}
            <div className="p-6 border border-gray-300 bg-white">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-300">
                <h2 className="flex items-center gap-2 text-gray-900">
                  <History className="w-5 h-5 text-gray-600" />
                  Recent Projects
                </h2>
                <button className="px-3 py-2 border border-gray-400 bg-white hover:bg-gray-100 text-sm text-gray-700">
                  View All
                </button>
              </div>

              <div className="space-y-3">
                {recentProjects.map(project => (
                  <div 
                    key={project.id} 
                    className="flex items-center gap-4 p-4 border border-gray-300 bg-gray-50 hover:bg-gray-100 cursor-pointer"
                    onClick={onNavigateToAnalytics}
                  >
                    <div className="w-16 h-16 bg-gray-200 border border-gray-300 flex-shrink-0 flex items-center justify-center">
                      <span className="text-xs text-gray-400">[IMG]</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1 text-gray-900">{project.name}</h3>
                      <p className="text-xs text-gray-500">{project.date}</p>
                    </div>
                    <span className="px-2 py-1 text-xs border border-gray-400 bg-white text-gray-700">
                      {project.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Account Settings */}
            <div className="p-6 border border-gray-300 bg-white">
              <h2 className="mb-4 pb-3 border-b border-gray-300 text-gray-900">Account Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    defaultValue="John Doe"
                    className="w-full px-3 py-2 border border-gray-400 bg-white focus:outline-none focus:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    defaultValue="john.doe@example.com"
                    className="w-full px-3 py-2 border border-gray-400 bg-white focus:outline-none focus:border-gray-600"
                  />
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-300 bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <div>
                      <h3 className="text-sm text-gray-900">Email Notifications</h3>
                      <p className="text-xs text-gray-500">Receive updates about your campaigns</p>
                    </div>
                  </div>
                  <input type="checkbox" className="border-gray-400" />
                </div>
                <div className="flex gap-2 pt-4 border-t border-gray-300">
                  <button className="px-4 py-2 border border-gray-400 bg-gray-200 hover:bg-gray-300 text-gray-900">
                    Save Changes
                  </button>
                  <button className="px-4 py-2 border border-gray-400 bg-white hover:bg-gray-100 text-gray-700">
                    Cancel
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