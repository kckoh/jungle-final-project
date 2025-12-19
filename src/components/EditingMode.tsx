import { useState } from 'react';
import { Creative } from '../App';
import { ArrowRight, ArrowLeft, Layout, Type, Palette, Image as ImageIcon } from 'lucide-react';

interface EditingModeProps {
  currentCreative: Creative | null;
  setCurrentCreative: (creative: Creative) => void;
  onNext: () => void;
  onBack: () => void;
}

interface Template {
  id: string;
  name: string;
  thumbnailUrl: string;
  structure: string;
  elements: string[];
}

const templates: Template[] = [
  {
    id: 't1',
    name: 'Bold & Minimalist',
    thumbnailUrl: '/ad-image.webp',
    structure: 'Large hero image, centered headline, single CTA button',
    elements: ['Hero Image', 'Headline (48px)', 'Subheadline (24px)', 'CTA Button']
  },
  {
    id: 't2',
    name: 'Split Layout',
    thumbnailUrl: '/ad-image.webp',
    structure: 'Left image panel, right text content with multiple CTAs',
    elements: ['Left Image Panel', 'Product Title', 'Features List', 'Dual CTAs']
  },
  {
    id: 't3',
    name: 'Card Stack',
    thumbnailUrl: '/ad-image.webp',
    structure: 'Layered cards showcasing multiple products or features',
    elements: ['Card Grid', 'Product Images', 'Price Tags', 'Quick Actions']
  },
  {
    id: 't4',
    name: 'Story Format',
    thumbnailUrl: '/ad-image.webp',
    structure: 'Vertical mobile-first with interactive elements',
    elements: ['Full Screen BG', 'Overlay Text', 'Progress Bar', 'Swipe CTA']
  },
  {
    id: 't5',
    name: 'Product Focus',
    thumbnailUrl: '/ad-image.webp',
    structure: 'Large product image with specs and pricing sidebar',
    elements: ['Product Shot', 'Feature Icons', 'Price Display', 'Buy Button']
  },
  {
    id: 't6',
    name: 'Testimonial Hero',
    thumbnailUrl: '/ad-image.webp',
    structure: 'Customer photo with quote and social proof elements',
    elements: ['Customer Photo', 'Quote Block', 'Star Rating', 'Learn More CTA']
  }
];

export function EditingMode({
  currentCreative,
  setCurrentCreative,
  onNext,
  onBack
}: EditingModeProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);

  const handleApplyTemplate = (template: Template) => {
    if (currentCreative) {
      setCurrentCreative({
        ...currentCreative,
        url: template.thumbnailUrl
      });
      setSelectedTemplate(template);
      setShowTemplates(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-gray-900 mb-2">Editing Mode</h1>
        <p className="text-gray-600">Fine-tune your creative or apply pre-made templates</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editing Workspace */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm text-gray-900">Creative Workspace</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                isEditing
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isEditing ? 'Editing Active' : 'Enter Edit Mode'}
            </button>
          </div>

          {currentCreative ? (
            <div className="relative">
              <img
                src={currentCreative.url}
                alt="Current creative"
                className="w-full h-[500px] object-cover rounded-lg"
              />
              {isEditing && (
                <div className="absolute inset-0 border-2 border-blue-500 rounded-lg pointer-events-none">
                  <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    Editing Mode Active
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-[500px] bg-gray-50 rounded-lg">
              <p className="text-gray-400">No creative selected</p>
            </div>
          )}

          {isEditing && (
            <div className="mt-4 grid grid-cols-4 gap-2">
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm">
                <Type className="w-4 h-4" />
                <span>Text</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm">
                <ImageIcon className="w-4 h-4" />
                <span>Image</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm">
                <Palette className="w-4 h-4" />
                <span>Colors</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm">
                <Layout className="w-4 h-4" />
                <span>Layout</span>
              </button>
            </div>
          )}
        </div>

        {/* Template Panel */}
        <div className="lg:col-span-1 bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm text-gray-900">Templates</h2>
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              className="text-xs text-blue-600 hover:text-blue-700"
            >
              {showTemplates ? 'Hide' : 'Browse All'}
            </button>
          </div>

          {selectedTemplate && !showTemplates && (
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-2">Current Template</p>
              <p className="text-sm text-gray-900 mb-3">{selectedTemplate.name}</p>
              <img
                src={selectedTemplate.thumbnailUrl}
                alt={selectedTemplate.name}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              <div className="space-y-1">
                <p className="text-xs text-gray-600">Elements:</p>
                {selectedTemplate.elements.map((element, idx) => (
                  <p key={idx} className="text-xs text-gray-700">• {element}</p>
                ))}
              </div>
            </div>
          )}

          {showTemplates && (
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {templates.map(template => (
                <button
                  key={template.id}
                  onClick={() => handleApplyTemplate(template)}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <img
                    src={template.thumbnailUrl}
                    alt={template.name}
                    className="w-full h-24 object-cover rounded-lg mb-2"
                  />
                  <h3 className="text-sm text-gray-900 mb-1">{template.name}</h3>
                  <p className="text-xs text-gray-600 mb-2">{template.structure}</p>
                  <div className="flex flex-wrap gap-1">
                    {template.elements.slice(0, 2).map((element, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-100 px-2 py-1 rounded"
                      >
                        {element}
                      </span>
                    ))}
                    {template.elements.length > 2 && (
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        +{template.elements.length - 2}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {!showTemplates && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm text-gray-900 mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm text-left">
                    Adjust Brightness
                  </button>
                  <button className="w-full px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm text-left">
                    Change Font Style
                  </button>
                  <button className="w-full px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm text-left">
                    Resize Elements
                  </button>
                  <button className="w-full px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm text-left">
                    Add Logo
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-600 mb-2">Pro Tip</p>
                <p className="text-xs text-gray-700">
                  Use templates as a starting point and customize them to match your brand guidelines
                </p>
              </div>
            </div>
          )}
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
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          <span>Proceed to Export</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
