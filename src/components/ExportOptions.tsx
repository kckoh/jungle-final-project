import { useState } from 'react';
import { Creative } from '../App';
import { ArrowRight, ArrowLeft, Download, FileImage, CheckCircle2, Loader2 } from 'lucide-react';

interface ExportOptionsProps {
  currentCreative: Creative | null;
  onNext: () => void;
  onBack: () => void;
}

interface ExportFormat {
  id: string;
  name: string;
  extension: string;
  program: string;
  icon: string;
}

const exportFormats: ExportFormat[] = [
  { id: 'psd', name: 'Photoshop Document', extension: '.psd', program: 'Adobe Photoshop', icon: 'PS' },
  { id: 'ai', name: 'Illustrator File', extension: '.ai', program: 'Adobe Illustrator', icon: 'AI' },
  { id: 'png', name: 'PNG Image', extension: '.png', program: 'Universal', icon: 'PNG' },
  { id: 'jpg', name: 'JPEG Image', extension: '.jpg', program: 'Universal', icon: 'JPG' },
  { id: 'svg', name: 'Vector Graphic', extension: '.svg', program: 'Universal', icon: 'SVG' },
  { id: 'pdf', name: 'PDF Document', extension: '.pdf', program: 'Universal', icon: 'PDF' }
];

export function ExportOptions({
  currentCreative,
  onNext,
  onBack
}: ExportOptionsProps) {
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [exportStatus, setExportStatus] = useState<Record<string, 'pending' | 'exporting' | 'complete'>>({});

  const toggleFormat = (formatId: string) => {
    if (selectedFormats.includes(formatId)) {
      setSelectedFormats(selectedFormats.filter(f => f !== formatId));
    } else {
      setSelectedFormats([...selectedFormats, formatId]);
    }
  };

  const handleExport = (formatId: string) => {
    setExportStatus({ ...exportStatus, [formatId]: 'exporting' });
    
    setTimeout(() => {
      setExportStatus({ ...exportStatus, [formatId]: 'complete' });
    }, 2000);
  };

  const handleExportAll = () => {
    const newStatus: Record<string, 'pending' | 'exporting' | 'complete'> = {};
    selectedFormats.forEach(formatId => {
      newStatus[formatId] = 'exporting';
    });
    setExportStatus(newStatus);

    selectedFormats.forEach((formatId, index) => {
      setTimeout(() => {
        setExportStatus(prev => ({ ...prev, [formatId]: 'complete' }));
      }, 2000 + index * 500);
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-gray-900 mb-2">Export Options</h1>
        <p className="text-gray-600">Choose file formats and export to external design programs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Creative Preview */}
        <div className="lg:col-span-1 bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-sm text-gray-900 mb-4">Creative Preview</h2>
          {currentCreative ? (
            <div className="space-y-4">
              <img
                src={currentCreative.url}
                alt="Current creative"
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform:</span>
                  <span className="text-gray-900">{currentCreative.platform}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Version:</span>
                  <span className="text-gray-900">v{currentCreative.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ID:</span>
                  <span className="text-gray-900">{currentCreative.id}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
              <p className="text-gray-400">No creative selected</p>
            </div>
          )}
        </div>

        {/* Export Formats */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm text-gray-900">Select Export Formats</h2>
            {selectedFormats.length > 0 && (
              <button
                onClick={handleExportAll}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                <Download className="w-4 h-4" />
                <span>Export All ({selectedFormats.length})</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exportFormats.map(format => {
              const isSelected = selectedFormats.includes(format.id);
              const status = exportStatus[format.id];

              return (
                <div
                  key={format.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs ${
                        format.program.includes('Photoshop')
                          ? 'bg-blue-600 text-white'
                          : format.program.includes('Illustrator')
                          ? 'bg-orange-600 text-white'
                          : 'bg-gray-600 text-white'
                      }`}>
                        {format.icon}
                      </div>
                      <div>
                        <h3 className="text-sm text-gray-900">{format.name}</h3>
                        <p className="text-xs text-gray-600">{format.program}</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleFormat(format.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>

                  {isSelected && (
                    <div>
                      {status === 'complete' ? (
                        <div className="flex items-center gap-2 text-green-600 text-xs">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Exported successfully</span>
                        </div>
                      ) : status === 'exporting' ? (
                        <div className="flex items-center gap-2 text-blue-600 text-xs">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Exporting...</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleExport(format.id)}
                          className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                        >
                          <Download className="w-3 h-3" />
                          <span>Export {format.extension}</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {selectedFormats.length > 0 && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm text-gray-900 mb-3">Export Summary</h3>
              <div className="space-y-2">
                {selectedFormats.map(formatId => {
                  const format = exportFormats.find(f => f.id === formatId);
                  const status = exportStatus[formatId];
                  
                  return (
                    <div key={formatId} className="flex items-center justify-between text-xs">
                      <span className="text-gray-700">{format?.name}</span>
                      <span className={`px-2 py-1 rounded ${
                        status === 'complete'
                          ? 'bg-green-100 text-green-700'
                          : status === 'exporting'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {status === 'complete' ? 'Complete' : status === 'exporting' ? 'Exporting...' : 'Ready'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* External Program Integration */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-sm text-gray-900 mb-4">Direct Export to Design Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              PS
            </div>
            <div className="text-left">
              <h3 className="text-sm text-gray-900">Open in Photoshop</h3>
              <p className="text-xs text-gray-600">Launch with editable layers</p>
            </div>
            <ArrowRight className="w-4 h-4 ml-auto text-gray-400" />
          </button>

          <button className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors">
            <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center text-white">
              AI
            </div>
            <div className="text-left">
              <h3 className="text-sm text-gray-900">Open in Illustrator</h3>
              <p className="text-xs text-gray-600">Launch with vector elements</p>
            </div>
            <ArrowRight className="w-4 h-4 ml-auto text-gray-400" />
          </button>
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
          <span>Proceed to Deployment</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
