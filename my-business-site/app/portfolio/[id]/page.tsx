export default function PortfolioDetail() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full h-20 flex items-center px-8 border-b border-white/5 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <a href="/" className="text-white/60 hover:text-white flex items-center gap-2 transition-colors">
          <span className="text-xl">←</span> 돌아가기
        </a>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto py-12 px-8 flex flex-col items-center">
        <span className="px-4 py-1 bg-white/10 text-white border border-white/20 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">포트폴리오 상세</span>
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center leading-tight tracking-tight">뷰티 비건 수분 크림 상세페이지</h1>
        <p className="text-lg text-white/50 mb-12 text-center max-w-2xl font-light">
          청량하고 깨끗한 무드를 강조하기 위해 시원한 느낌의 텍스처와 물방울 요소를 AI로 생성하여 핵심 비주얼로 배치했습니다.
        </p>

        {/* Mock Details */}
        <div className="w-full aspect-video bg-white/5 rounded-3xl border border-white/10 mb-8 flex items-center justify-center text-white/30 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-black/40 group-hover:scale-105 transition-transform duration-700"></div>
          <span className="z-10">대표 썸네일/히어로 이미지 영역</span>
        </div>
        
        <div className="w-full space-y-8">
          <div className="h-96 md:h-[500px] bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center text-white/30">
            상세 이미지 조각 1 (기획/카피라이팅)
          </div>
          <div className="h-96 md:h-[500px] bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center text-white/30">
            상세 이미지 조각 2 (제품 시연/연출컷)
          </div>
        </div>
        
        <div className="mt-24 text-center border-t border-white/10 w-full pt-16">
          <h2 className="text-2xl font-bold mb-6">이러한 결과물이 필요하신가요?</h2>
          <a href="/#pricing" className="inline-block px-10 py-4 bg-primary text-white font-bold rounded-full hover:bg-purple-600 transition-colors shadow-[0_0_20px_rgba(107,63,160,0.5)]">
            비슷한 프로젝트 의뢰하기
          </a>
        </div>
      </main>
      
      <footer className="w-full py-8 border-t border-white/5 text-center text-sm text-white/40 mt-12">
        © 2026 Blingkkami. All rights reserved.
      </footer>
    </div>
  );
}
