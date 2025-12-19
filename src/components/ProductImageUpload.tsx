import { useState } from 'react';
import { Upload, Image, X, AlertCircle, Package } from 'lucide-react';

interface ProductImage {
  id: string;
  file: File | null;
  preview: string;
  slot: string;
}

interface ProductImageUploadProps {
  onNext: () => void;
  onBack: () => void;
}

export function ProductImageUpload({ onNext, onBack }: ProductImageUploadProps) {
  const [uploadedImages, setUploadedImages] = useState<ProductImage[]>([]);
  const requiredSlots = 6; // Fixed number of product image slots

  const handleContinue = () => {
    onNext();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-gray-300">
        <h2 className="text-gray-900 mb-2 flex items-center gap-2">
          <Package className="w-6 h-6 text-gray-600" />
          Product Image Upload
        </h2>
        <p className="text-gray-600">
          HTML 템플릿에 삽입할 제품 이미지를 업로드하세요
        </p>
      </div>

      {/* Image Upload Slots */}
      <div className="p-6 border border-gray-300 bg-white">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-300">
          <h3 className="text-gray-900">제품 이미지 업로드</h3>
          <div className="text-sm text-gray-600">
            {uploadedImages.length} / {requiredSlots} uploaded
          </div>
        </div>

        <div className="mb-4 p-4 bg-gray-50 border border-gray-300 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-gray-900 mb-1">
              최대 {requiredSlots}개의 제품 이미지를 업로드할 수 있습니다
            </p>
            <p className="text-xs text-gray-600">
              권장: PNG 또는 JPG, 최소 1200x1200px, 배경 제거된 이미지
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: requiredSlots }).map((_, index) => {
            const hasImage = uploadedImages[index];
            return (
              <div
                key={index}
                className="aspect-square border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 hover:bg-gray-100 cursor-pointer relative"
              >
                {hasImage ? (
                  <div className="w-full h-full relative">
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <Image className="w-12 h-12 text-gray-400" />
                    </div>
                    <button
                      className="absolute top-2 right-2 w-6 h-6 bg-gray-200 border border-gray-400 flex items-center justify-center hover:bg-gray-300"
                      onClick={() => {
                        const newImages = [...uploadedImages];
                        newImages.splice(index, 1);
                        setUploadedImages(newImages);
                      }}
                    >
                      <X className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center p-4">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-600">Slot {index + 1}</p>
                    <p className="text-xs text-gray-500">Click to upload</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bulk Upload Option */}
        <div className="mt-4">
          <button className="w-full px-4 py-3 border border-gray-400 bg-white hover:bg-gray-100 text-gray-700 flex items-center justify-center gap-2">
            <Upload className="w-4 h-4" />
            Upload Multiple Images
          </button>
        </div>
      </div>

      {/* Auto-fill Options */}
      <div className="p-6 border border-gray-300 bg-gray-50">
        <h3 className="mb-4 text-gray-900">AI Auto-fill Options</h3>
        <div className="space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="mt-1 border border-gray-400" />
            <div>
              <p className="text-sm text-gray-900">배경 자동 제거</p>
              <p className="text-xs text-gray-600">
                업로드된 이미지의 배경을 AI가 자동으로 제거합니다
              </p>
            </div>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="mt-1 border border-gray-400" />
            <div>
              <p className="text-sm text-gray-900">제품 크기 자동 조정</p>
              <p className="text-xs text-gray-600">
                템플릿에 맞게 제품 이미지 크기를 자동 최적화합니다
              </p>
            </div>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="mt-1 border border-gray-400" />
            <div>
              <p className="text-sm text-gray-900">그림자/반사 효과 추가</p>
              <p className="text-xs text-gray-600">
                제품 이미지에 자연스러운 그림자와 반사를 추가합니다
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="px-4 py-2 border border-gray-400 bg-white hover:bg-gray-100 text-gray-700"
        >
          ← Back
        </button>
        <button
          onClick={handleContinue}
          className="px-4 py-2 border border-gray-400 bg-gray-200 hover:bg-gray-300 text-gray-900"
        >
          Continue to Editing →
        </button>
      </div>
    </div>
  );
}
