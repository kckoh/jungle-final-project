import { useState } from 'react';
import { Reference } from '../App';
import { ArrowRight, ArrowLeft, TrendingUp, Eye } from 'lucide-react';

interface ReferencePreviewProps {
  selectedReferences: Reference[];
  setSelectedReferences: (refs: Reference[]) => void;
  onNext: () => void;
  onBack: () => void;
}

interface AdExample {
  id: string;
  title: string;
  thumbnailUrl: string;
  format: string;
  structure: {
    imageRatio: string;
    copyLength: string;
    callToAction: string;
  };
}

const categoryData: Record<string, { trend: string; examples: AdExample[] }> = {
  'Video Ads': {
    trend: 'Short-form vertical videos (15-30s) are driving 4.2x more engagement than traditional formats',
    examples: [
      {
        id: 'v1',
        title: 'Emotional Brand Story',
        thumbnailUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400',
        format: 'Video (9:16)',
        structure: {
          imageRatio: '9:16 Vertical',
          copyLength: 'Hook in first 3 seconds',
          callToAction: 'Swipe up / Learn more'
        }
      },
      {
        id: 'v2',
        title: 'Product Demo',
        thumbnailUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400',
        format: 'Video (16:9)',
        structure: {
          imageRatio: '16:9 Landscape',
          copyLength: 'Problem-solution narrative',
          callToAction: 'Shop now / Get started'
        }
      }
    ]
  },
  'Social Media': {
    trend: 'User-generated content and authenticity are outperforming polished brand content by 3.5x',
    examples: [
      {
        id: 's1',
        title: 'Carousel Post',
        thumbnailUrl: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400',
        format: 'Image Carousel (1:1)',
        structure: {
          imageRatio: '1:1 Square',
          copyLength: '5-7 slides with tips',
          callToAction: 'Link in bio'
        }
      },
      {
        id: 's2',
        title: 'Story Ad',
        thumbnailUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400',
        format: 'Story (9:16)',
        structure: {
          imageRatio: '9:16 Full screen',
          copyLength: 'Minimal text overlay',
          callToAction: 'Interactive sticker'
        }
      }
    ]
  },
  'Display Ads': {
    trend: 'Minimalist designs with bold typography are achieving 2.8x better click-through rates',
    examples: [
      {
        id: 'd1',
        title: 'Banner Ad',
        thumbnailUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400',
        format: 'Banner (728x90)',
        structure: {
          imageRatio: '728x90 Leaderboard',
          copyLength: '5-8 words max',
          callToAction: 'Button CTA'
        }
      },
      {
        id: 'd2',
        title: 'Sidebar Ad',
        thumbnailUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400',
        format: 'Rectangle (300x250)',
        structure: {
          imageRatio: '300x250 Medium rectangle',
          copyLength: 'Headline + benefit',
          callToAction: 'Text link'
        }
      }
    ]
  },
  'Performance Ads': {
    trend: 'Dynamic product ads with personalization are converting 5.1x better than static alternatives',
    examples: [
      {
        id: 'p1',
        title: 'Dynamic Product Ad',
        thumbnailUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400',
        format: 'Image (1:1)',
        structure: {
          imageRatio: '1:1 Square',
          copyLength: 'Price + discount badge',
          callToAction: 'Shop now'
        }
      },
      {
        id: 'p2',
        title: 'Retargeting Ad',
        thumbnailUrl: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400',
        format: 'Image (4:5)',
        structure: {
          imageRatio: '4:5 Portrait',
          copyLength: 'Personalized message',
          callToAction: 'Complete purchase'
        }
      }
    ]
  }
};

export function ReferencePreview({
  selectedReferences,
  setSelectedReferences,
  onNext,
  onBack
}: ReferencePreviewProps) {
  const categories = [...new Set(selectedReferences.map(ref => ref.category))];
  const [activeCategory, setActiveCategory] = useState(categories[0] || '');
  const [selectedAd, setSelectedAd] = useState<AdExample | null>(null);

  const currentCategoryData = categoryData[activeCategory];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-300 pb-4">
        <div>
          <h1 className="text-2xl text-gray-900 mb-2">Reference Preview</h1>
          <p className="text-gray-600">Review trends and ad structures for your selected strategies</p>
        </div>
        <div className="text-sm text-gray-600">
          {selectedReferences.length} strategies selected
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-gray-100 border border-gray-300 p-1 flex gap-1 overflow-x-auto">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 text-sm whitespace-nowrap transition-colors ${
              activeCategory === category
                ? 'bg-gray-200 text-gray-900 border border-gray-400'
                : 'text-gray-700 bg-white border border-transparent hover:border-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {currentCategoryData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trend Summary */}
          <div className="lg:col-span-3 bg-gray-100 border border-gray-300 p-6">
            <div className="flex items-start gap-3">
              <div className="bg-gray-300 border border-gray-400 p-2">
                <TrendingUp className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <h3 className="text-sm text-gray-900 mb-1">Current Trend</h3>
                <p className="text-gray-700">{currentCategoryData.trend}</p>
              </div>
            </div>
          </div>

          {/* Ad Examples */}
          {currentCategoryData.examples.map(example => (
            <button
              key={example.id}
              onClick={() => setSelectedAd(example)}
              className="bg-white border border-gray-300 p-4 text-left hover:border-gray-500 transition-all"
            >
              <div className="w-full h-48 bg-gray-200 border border-gray-300 mb-4 flex items-center justify-center">
                <span className="text-gray-400 text-sm">[이미지]</span>
              </div>
              <h3 className="text-sm text-gray-900 mb-2">{example.title}</h3>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Eye className="w-3 h-3" />
                <span>{example.format}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Ad Structure Modal */}
      {selectedAd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-400 max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-300">
              <h2 className="text-xl text-gray-900">{selectedAd.title}</h2>
              <button
                onClick={() => setSelectedAd(null)}
                className="text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center border border-gray-400 bg-white hover:bg-gray-100"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="w-full aspect-square bg-gray-200 border border-gray-300 flex items-center justify-center">
                  <span className="text-gray-400">[이미지]</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm text-gray-700 mb-2">Ad Structure & Format</h3>
                  <div className="bg-gray-100 border border-gray-300 p-4 space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Image Ratio</p>
                      <p className="text-sm text-gray-900">{selectedAd.structure.imageRatio}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Copy Length</p>
                      <p className="text-sm text-gray-900">{selectedAd.structure.copyLength}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Call to Action</p>
                      <p className="text-sm text-gray-900">{selectedAd.structure.callToAction}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-100 border border-gray-300 p-4">
                  <p className="text-xs text-gray-600 mb-2">Best Practices</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Test multiple variations</li>
                    <li>• A/B test headlines and CTAs</li>
                    <li>• Optimize for mobile first</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-3 border border-gray-400 bg-gray-200 text-gray-900 hover:bg-gray-300"
        >
          <span>Proceed to AI Generation</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}