import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Sparkles,
  Zap,
  TrendingUp,
  ArrowLeft,
  Video,
} from "lucide-react";

interface MainLandingProps {
  onNavigateToAuto: () => void;
  onNavigateToAiEditing: () => void;
  onNavigateToAiVideoEditing: () => void;
}

interface Template {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
}

const CATEGORIES: Category[] = [
  {
    id: "food",
    name: "푸드",
    description: "레스토랑, 카페, 배달 음식",
    color: "from-orange-100 to-red-100",
  },
  {
    id: "beauty",
    name: "미용",
    description: "화장품, 스킨케어, 뷰티",
    color: "from-pink-100 to-purple-100",
  },
  {
    id: "fitness",
    name: "운동",
    description: "헬스, 요가, 피트니스",
    color: "from-blue-100 to-cyan-100",
  },
];

const TEMPLATES: { [key: string]: Template[] } = {
  food: [
    {
      id: "food-1",
      title: "레스토랑 메뉴 프로모션",
      category: "food",
      imageUrl:
        "https://images.unsplash.com/photo-1618282013529-e22bcfc99131?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwcmVzdGF1cmFudCUyMG1lbnV8ZW58MXx8fHwxNzY2MDYyMjM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: "food-2",
      title: "배달 음식 이벤트",
      category: "food",
      imageUrl:
        "https://images.unsplash.com/photo-1695634184273-334faca3538d?w=400",
    },
    {
      id: "food-3",
      title: "카페 신메뉴 출시",
      category: "food",
      imageUrl:
        "https://images.unsplash.com/photo-1683721003111-070bcc053d8b?w=400",
    },
    {
      id: "food-4",
      title: "푸드 트럭 광고",
      category: "food",
      imageUrl:
        "https://images.unsplash.com/photo-1763596304804-88291137d7fd?w=400",
    },
    {
      id: "food-5",
      title: "할인 쿠폰 이벤트",
      category: "food",
      imageUrl:
        "https://images.unsplash.com/photo-1563884705074-7c8b15f16295?w=400",
    },
    {
      id: "food-6",
      title: "시즌 특별 메뉴",
      category: "food",
      imageUrl:
        "https://images.unsplash.com/photo-1618282013529-e22bcfc99131?w=400",
    },
  ],
  beauty: [
    {
      id: "beauty-1",
      title: "스킨케어 신제품",
      category: "beauty",
      imageUrl:
        "https://images.unsplash.com/photo-1595051665600-afd01ea7c446?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBjb3NtZXRpY3MlMjBza2luY2FyZXxlbnwxfHx8fDE3NjYwNTIzNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: "beauty-2",
      title: "화장품 세일",
      category: "beauty",
      imageUrl:
        "https://images.unsplash.com/photo-1695634184273-334faca3538d?w=400",
    },
    {
      id: "beauty-3",
      title: "뷰티 클래스",
      category: "beauty",
      imageUrl:
        "https://images.unsplash.com/photo-1683721003111-070bcc053d8b?w=400",
    },
    {
      id: "beauty-4",
      title: "메이크업 튜토리얼",
      category: "beauty",
      imageUrl:
        "https://images.unsplash.com/photo-1763596304804-88291137d7fd?w=400",
    },
    {
      id: "beauty-5",
      title: "향수 컬렉션",
      category: "beauty",
      imageUrl:
        "https://images.unsplash.com/photo-1563884705074-7c8b15f16295?w=400",
    },
    {
      id: "beauty-6",
      title: "뷰티 디바이스",
      category: "beauty",
      imageUrl:
        "https://images.unsplash.com/photo-1595051665600-afd01ea7c446?w=400",
    },
  ],
  fitness: [
    {
      id: "fitness-1",
      title: "헬스장 회원권",
      category: "fitness",
      imageUrl:
        "https://images.unsplash.com/photo-1584827386916-b5351d3ba34b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZ3ltJTIwd29ya291dHxlbnwxfHx8fDE3NjYwMjIwMjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: "fitness-2",
      title: "요가 클래스",
      category: "fitness",
      imageUrl:
        "https://images.unsplash.com/photo-1695634184273-334faca3538d?w=400",
    },
    {
      id: "fitness-3",
      title: "PT 프로그램",
      category: "fitness",
      imageUrl:
        "https://images.unsplash.com/photo-1683721003111-070bcc053d8b?w=400",
    },
    {
      id: "fitness-4",
      title: "홈트레이닝 가이드",
      category: "fitness",
      imageUrl:
        "https://images.unsplash.com/photo-1763596304804-88291137d7fd?w=400",
    },
    {
      id: "fitness-5",
      title: "운동 보조제",
      category: "fitness",
      imageUrl:
        "https://images.unsplash.com/photo-1563884705074-7c8b15f16295?w=400",
    },
    {
      id: "fitness-6",
      title: "피트니스 챌린지",
      category: "fitness",
      imageUrl:
        "https://images.unsplash.com/photo-1584827386916-b5351d3ba34b?w=400",
    },
  ],
};

export function MainLanding({
  onNavigateToAuto,
  onNavigateToAiEditing,
  onNavigateToAiVideoEditing,
}: MainLandingProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    string | null
  >(null);

  const renderCategoryView = () => {
    if (!selectedCategory) return null;

    const category = CATEGORIES.find(
      (c) => c.id === selectedCategory,
    );
    const templates = TEMPLATES[selectedCategory] || [];

    return (
      <div className="mb-20">
        <button
          className="px-3 py-2 border border-gray-400 bg-white hover:bg-gray-100 flex items-center gap-2 mb-6"
          onClick={() => setSelectedCategory(null)}
        >
          <ArrowLeft className="w-4 h-4 text-gray-600" />
          <span className="text-gray-700">카테고리로 돌아가기</span>
        </button>

        <div className="p-6 border border-gray-300 bg-gray-100 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-300 border border-gray-400" />
            <div>
              <h2 className="text-gray-900">{category?.name} 템플릿</h2>
              <p className="text-gray-600">
                {category?.description}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="border border-gray-300 bg-white hover:border-gray-500 transition-all cursor-pointer"
            >
              <div className="relative aspect-[4/3] bg-gray-200 border-b border-gray-300 flex items-center justify-center">
                <span className="text-gray-400 text-sm">[이미지]</span>
              </div>
              <div className="p-4">
                <h3 className="text-gray-900">{template.title}</h3>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 px-3 py-2 border border-gray-400 bg-white hover:bg-gray-100 text-sm text-gray-700">
                    사용하기
                  </button>
                  <button className="px-3 py-2 border border-gray-400 bg-white hover:bg-gray-100 text-sm text-gray-700">
                    미리보기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16 pb-8 border-b border-gray-300">
          <h1 className="mb-4 text-gray-900">
            AI-Powered Advertising Creative Platform
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create stunning advertising creatives with AI
            assistance. Choose your workflow and get started in
            minutes.
          </p>
        </div>

        {/* Popular Templates Section */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="flex items-center gap-2 text-gray-900">
              <TrendingUp className="w-6 h-6 text-gray-600" />
              인기 템플릿
            </h2>
          </div>

          {selectedCategory ? (
            renderCategoryView()
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CATEGORIES.map((category) => (
                <div
                  key={category.id}
                  className="border border-gray-300 bg-gray-50 hover:border-gray-500 transition-all cursor-pointer"
                  onClick={() =>
                    setSelectedCategory(category.id)
                  }
                >
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-gray-300 border border-gray-400 mx-auto mb-4" />
                    <h3 className="mb-2 text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {category.description}
                    </p>
                    <button className="px-4 py-2 border border-gray-400 bg-white hover:bg-gray-100 text-gray-700">
                      템플릿 보기
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Workflow Options Section */}
        {!selectedCategory && (
          <div className="mb-12">
            <h2 className="text-center mb-8 text-gray-900">
              워크플로우 선택
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* AUTO Workflow Card */}
              <div
                className="border border-gray-300 bg-white hover:border-gray-500 transition-all cursor-pointer"
                onClick={onNavigateToAuto}
              >
                <div className="relative aspect-video bg-gray-200 border-b border-gray-300 flex items-center justify-center">
                  <span className="text-gray-400">[AUTO 워크플로우 이미지]</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-6 h-6 text-gray-600" />
                    <h3 className="text-gray-900">AUTO</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    타겟 분석부터 배포까지 완전 자동화된
                    워크플로우. 데이터 기반 인사이트로 종합적인
                    캠페인 제작에 최적화되어 있습니다.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 mb-6">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-500" />
                      타겟 오디언스 리서치 & 예산 계획
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-500" />
                      AI 기반 레퍼런스 추천
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-500" />
                      플랫폼별 크리에이티브 생성
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-500" />
                      편집 도구 & 분석 트래킹
                    </li>
                  </ul>
                  <button className="w-full px-4 py-3 border border-gray-400 bg-white hover:bg-gray-100 text-gray-700">
                    AUTO 워크플로우 시작
                  </button>
                </div>
              </div>

              {/* AI EDIT Workflow Card */}
              <div
                className="border border-gray-300 bg-white hover:border-gray-500 transition-all cursor-pointer"
                onClick={onNavigateToAiEditing}
              >
                <div className="relative aspect-video bg-gray-200 border-b border-gray-300 flex items-center justify-center">
                  <span className="text-gray-400">[AI EDIT 이미지]</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-6 h-6 text-gray-600" />
                    <h3 className="text-gray-900">AI EDIT</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    빠른 크리에이티브 반복 작업을 위한 AI 편집
                    모드. 기존 디자인을 업로드하고 AI의 도움으로
                    즉시 개선하고 변형할 수 있습니다.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 mb-6">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-500" />
                      직접 업로드 & 즉시 AI 편집
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-500" />
                      채팅 기반 크리에이티브 개선
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-500" />
                      스마트 템플릿 적용
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-500" />
                      빠른 내보내기 & 배포
                    </li>
                  </ul>
                  <button className="w-full px-4 py-3 border border-gray-400 bg-white hover:bg-gray-100 text-gray-700">
                    AI EDIT 모드 시작
                  </button>
                </div>
              </div>

              {/* AI VIDEO EDIT Workflow Card */}
              <div
                className="border border-gray-300 bg-white hover:border-gray-500 transition-all cursor-pointer"
                onClick={onNavigateToAiVideoEditing}
              >
                <div className="relative aspect-video bg-gray-200 border-b border-gray-300 flex items-center justify-center">
                  <span className="text-gray-400">[AI VIDEO EDIT 이미지]</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Video className="w-6 h-6 text-gray-600" />
                    <h3 className="text-gray-900">AI VIDEO EDIT</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    동영상 광고를 위한 AI 편집 모드.
                    TikTok, Reels, Shorts 형식으로 자동 변환하고
                    텍스트, 음악, 효과를 AI로 추가합니다.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 mb-6">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-500" />
                      이미지를 동영상으로 변환
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-500" />
                      AI 자막 & 텍스트 오버레이
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-500" />
                      배경음악 & 효과음 자동 추가
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-500" />
                      플랫폼별 최적화 (9:16)
                    </li>
                  </ul>
                  <button className="w-full px-4 py-3 border border-gray-400 bg-white hover:bg-gray-100 text-gray-700">
                    AI VIDEO EDIT 시작
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}