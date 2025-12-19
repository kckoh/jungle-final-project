import { useState } from 'react';
import { ArrowLeft, BarChart3, DollarSign, Eye, Users, TrendingUp, TrendingDown, AlertTriangle, ThumbsUp, MessageSquare, Bell, Target, Award, Home } from 'lucide-react';

interface AnalyticsProps {
  onBackToHome: () => void;
  onBackToMyPage: () => void;
}

export function Analytics({ onBackToHome, onBackToMyPage }: AnalyticsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'competitors' | 'customers' | 'recommendations'>('overview');

  const competitorAds = [
    { id: 1, competitor: 'Brand A', platform: 'Facebook', launched: '2 days ago', engagement: '+245%' },
    { id: 2, competitor: 'Brand B', platform: 'Instagram', launched: '5 days ago', engagement: '+180%' },
    { id: 3, competitor: 'Brand C', platform: 'TikTok', launched: '1 week ago', engagement: '+320%' }
  ];

  const customerFeedback = [
    { id: 1, sentiment: 'positive', text: 'Love the product quality!', platform: 'Instagram', likes: 34 },
    { id: 2, sentiment: 'neutral', text: 'Shipping took a bit longer than expected', platform: 'Facebook', likes: 12 },
    { id: 3, sentiment: 'positive', text: 'Exactly what I was looking for', platform: 'Twitter', likes: 28 },
    { id: 4, sentiment: 'negative', text: 'Price is a bit high compared to alternatives', platform: 'Instagram', likes: 8 }
  ];

  const platformRecommendations = [
    { platform: 'TikTok', reason: 'High engagement with target demographic', potentialReach: '2.5M', estimatedCPA: '$12' },
    { platform: 'Pinterest', reason: 'Strong visual product performance', potentialReach: '1.8M', estimatedCPA: '$15' },
    { platform: 'YouTube', reason: 'Video content opportunity', potentialReach: '3.2M', estimatedCPA: '$18' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-300 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="px-3 py-2 border border-gray-400 bg-white hover:bg-gray-100 text-gray-700 flex items-center gap-2" onClick={onBackToMyPage}>
              <ArrowLeft className="w-4 h-4 text-gray-600" />
              My Page
            </button>
            <button className="px-3 py-2 border border-gray-400 bg-white hover:bg-gray-100 text-gray-700 flex items-center gap-2" onClick={onBackToHome}>
              <Home className="w-4 h-4 text-gray-600" />
              Home
            </button>
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-gray-600" />
            <h1 className="text-gray-900">Campaign Analytics</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Page Title */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-300">
            <div>
              <h2 className="text-gray-900 mb-1">Tracking & Analytics</h2>
              <p className="text-sm text-gray-500">Monitor performance, competitors, and customer insights</p>
            </div>
            <button className="px-4 py-2 border border-gray-400 bg-gray-200 hover:bg-gray-300 text-gray-900">
              Start New Campaign
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 p-1 border border-gray-300 bg-gray-50">
            {[
              { id: 'overview', label: 'Campaign Overview', icon: BarChart3 },
              { id: 'competitors', label: 'Competitor Monitoring', icon: Target },
              { id: 'customers', label: 'Customer Analytics', icon: Users },
              { id: 'recommendations', label: 'Platform Recommendations', icon: Award }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'bg-gray-200 text-gray-900 border border-gray-400'
                      : 'text-gray-600 bg-white hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Campaign Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-6 border border-gray-300 bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">Total Spend</span>
                    <DollarSign className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="mb-2 text-gray-900">$1,049</div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <TrendingDown className="w-3 h-3" />
                    <span>8% under budget</span>
                  </div>
                </div>

                <div className="p-6 border border-gray-300 bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">Impressions</span>
                    <Eye className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="mb-2 text-gray-900">200K</div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <TrendingUp className="w-3 h-3" />
                    <span>+12% vs last week</span>
                  </div>
                </div>

                <div className="p-6 border border-gray-300 bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">Click Rate</span>
                    <BarChart3 className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="mb-2 text-gray-900">2.8%</div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <TrendingUp className="w-3 h-3" />
                    <span>+0.4% improvement</span>
                  </div>
                </div>

                <div className="p-6 border border-gray-300 bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">Conversions</span>
                    <Users className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="mb-2 text-gray-900">399</div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <TrendingUp className="w-3 h-3" />
                    <span>+18% vs last week</span>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 border border-gray-300 bg-white">
                  <h3 className="text-sm text-gray-700 mb-4 pb-3 border-b border-gray-300">Daily Spend vs Budget</h3>
                  <div className="h-64 bg-gray-100 border border-gray-300 flex items-center justify-center">
                    <span className="text-gray-400">[LINE CHART]</span>
                  </div>
                </div>

                <div className="p-6 border border-gray-300 bg-white">
                  <h3 className="text-sm text-gray-700 mb-4 pb-3 border-b border-gray-300">Audience Demographics</h3>
                  <div className="h-64 bg-gray-100 border border-gray-300 flex items-center justify-center">
                    <span className="text-gray-400">[PIE CHART]</span>
                  </div>
                </div>
              </div>

              {/* Performance Trends */}
              <div className="p-6 border border-gray-300 bg-white">
                <h3 className="text-sm text-gray-700 mb-4 pb-3 border-b border-gray-300">Performance Trends</h3>
                <div className="h-80 bg-gray-100 border border-gray-300 flex items-center justify-center">
                  <span className="text-gray-400">[BAR CHART]</span>
                </div>
              </div>
            </div>
          )}

          {/* Competitor Monitoring */}
          {activeTab === 'competitors' && (
            <div className="space-y-6">
              <div className="p-6 border border-gray-300 bg-white">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-300">
                  <h3 className="text-sm text-gray-700">Newly Launched Competitor Ads</h3>
                  <div className="flex items-center gap-2 px-3 py-1 border border-gray-400 bg-gray-100 text-xs text-gray-700">
                    <Bell className="w-3 h-3" />
                    <span>3 new alerts</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {competitorAds.map(ad => (
                    <div key={ad.id} className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-300">
                      <div className="w-12 h-12 bg-gray-300 border border-gray-400 flex items-center justify-center flex-shrink-0">
                        <Target className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm text-gray-900 mb-1">{ad.competitor}</h4>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span>{ad.platform}</span>
                          <span>•</span>
                          <span>Launched {ad.launched}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-900">{ad.engagement}</p>
                        <p className="text-xs text-gray-500">engagement</p>
                      </div>
                      <button className="px-3 py-2 bg-gray-200 border border-gray-400 text-gray-900 text-xs hover:bg-gray-300">
                        View Ad
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 border border-gray-300 bg-gray-50">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm text-gray-900 mb-2">Competitive Insights</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Brand A is testing video formats on Instagram with 2.5x higher engagement</li>
                      <li>• Brand C increased ad spend by 40% in the last 7 days</li>
                      <li>• New competitor Brand D entered the market with aggressive pricing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Customer Analytics */}
          {activeTab === 'customers' && (
            <div className="space-y-6">
              {/* Response Analytics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 border border-gray-300 bg-white">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-gray-200 border border-gray-300 flex items-center justify-center">
                      <ThumbsUp className="w-4 h-4 text-gray-600" />
                    </div>
                    <h4 className="text-sm text-gray-700">Positive Sentiment</h4>
                  </div>
                  <p className="text-gray-900 mb-1">68%</p>
                  <p className="text-xs text-gray-500">+5% from last period</p>
                </div>

                <div className="p-6 border border-gray-300 bg-white">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-gray-200 border border-gray-300 flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-gray-600" />
                    </div>
                    <h4 className="text-sm text-gray-700">Ad Fatigue Risk</h4>
                  </div>
                  <p className="text-gray-900 mb-1">Low</p>
                  <p className="text-xs text-gray-500">Frequency: 2.3 per user</p>
                </div>

                <div className="p-6 border border-gray-300 bg-white">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-gray-200 border border-gray-300 flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-gray-600" />
                    </div>
                    <h4 className="text-sm text-gray-700">Engagement Rate</h4>
                  </div>
                  <p className="text-gray-900 mb-1">4.2%</p>
                  <p className="text-xs text-gray-500">Above industry avg</p>
                </div>
              </div>

              {/* Customer Feedback */}
              <div className="p-6 border border-gray-300 bg-white">
                <h3 className="text-sm text-gray-700 mb-4 pb-3 border-b border-gray-300">Customer Feedback from Ad Interactions</h3>
                <div className="space-y-3">
                  {customerFeedback.map(feedback => (
                    <div key={feedback.id} className="p-4 bg-gray-50 border border-gray-300">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 border border-gray-400 ${
                            feedback.sentiment === 'positive' ? 'bg-gray-600' :
                            feedback.sentiment === 'negative' ? 'bg-gray-300' : 'bg-gray-400'
                          }`} />
                          <span className="text-xs text-gray-500">{feedback.platform}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <ThumbsUp className="w-3 h-3" />
                          <span>{feedback.likes}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-900">{feedback.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Churn Signals */}
              <div className="p-6 border border-gray-300 bg-gray-50">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm text-gray-900 mb-2">Early Churn Signals Detected</h4>
                    <ul className="text-sm text-gray-700 space-y-1 mb-3">
                      <li>• 12% of users mentioned pricing concerns</li>
                      <li>• Bounce rate increased by 8% on mobile landing pages</li>
                      <li>• Cart abandonment up 15% in last 48 hours</li>
                    </ul>
                    <button className="px-4 py-2 bg-gray-200 border border-gray-400 text-gray-900 hover:bg-gray-300 text-sm">
                      Create Retention Campaign
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Platform Recommendations */}
          {activeTab === 'recommendations' && (
            <div className="space-y-6">
              <div className="p-6 border border-gray-300 bg-gray-50">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-300 border border-gray-400 flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-900 mb-2">Campaign Performance Summary</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      Your campaign achieved a 2.8% CTR and $8.50 CPA, performing 35% better than your industry benchmark. 
                      Based on this success, we've identified new platform opportunities.
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-gray-600">Total ROI</p>
                        <p className="text-gray-900">245%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Best Platform</p>
                        <p className="text-gray-900">Instagram</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Best Creative</p>
                        <p className="text-gray-900">Video Ad #3</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border border-gray-300 bg-white">
                <h3 className="text-sm text-gray-700 mb-4 pb-3 border-b border-gray-300">Alternative Platform Recommendations</h3>
                <div className="space-y-4">
                  {platformRecommendations.map((rec, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 border border-gray-300">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-sm text-gray-900 mb-1">{rec.platform}</h4>
                          <p className="text-xs text-gray-600">{rec.reason}</p>
                        </div>
                        <div className="w-8 h-8 border border-gray-400 bg-gray-200 flex items-center justify-center text-xs text-gray-700">
                          {idx + 1}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-gray-600">Potential Reach</p>
                          <p className="text-sm text-gray-900">{rec.potentialReach}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Est. CPA</p>
                          <p className="text-sm text-gray-900">{rec.estimatedCPA}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Match Score</p>
                          <p className="text-sm text-gray-900">{95 - idx * 5}%</p>
                        </div>
                      </div>
                      <button className="w-full px-4 py-2 bg-gray-200 border border-gray-400 text-gray-900 hover:bg-gray-300 text-sm">
                        Explore {rec.platform}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 border border-gray-300 bg-white">
                <h3 className="text-sm text-gray-700 mb-4 pb-3 border-b border-gray-300">Key Learnings & Next Steps</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-200 border border-gray-300 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-gray-700">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      <strong>Emotional storytelling</strong> performed 45% better than product-focused ads
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-200 border border-gray-300 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-gray-700">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      <strong>Mobile-first vertical videos</strong> had 3x higher completion rates
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-200 border border-gray-300 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-gray-700">!</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      Consider reducing frequency on Facebook to avoid ad fatigue
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
