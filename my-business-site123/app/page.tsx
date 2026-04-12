"use client";

import { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedPortfolio, setSelectedPortfolio] = useState<any>(null);

  // Portfolio Data Definition
  const portfolios = [
    {
      id: 1,
      title: "꽃풍선 상세페이지",
      cat: "스마트스토어",
      desc: "감성적인 무드와 디테일을 세심하게 담았습니다.",
      intent: "이 제품 리뷰에서 가장 많이 나온 단어 '선물하는 마음'을 Hook 첫 줄로 배치했습니다.",
      tags: ["#라이프스타일", "#선물"],
      folder: "/1.꽃풍선",
      preview: "detail1.png",
      items: [
        { type: "image", src: "detail1.png" },
        { type: "video", src: "detail2.gif" },
        { type: "image", src: "detail3.png" },
        { type: "image", src: "detail3 - 1.png" },
        { type: "image", src: "detail3 - 2.png" },
        { type: "image", src: "detail3 - 3.png" },
        { type: "video", src: "detail4.gif" },
        { type: "image", src: "detail5.png" }
      ]
    },
    {
      id: 2,
      title: "Lumiele 뷰티/코스메틱",
      cat: "스마트스토어",
      desc: "브랜드의 고급스러운 이미지와 핵심 성분을 강조한 뷰티 상세페이지.",
      intent: "실제 구매자 리뷰를 분석해 '속광'과 '흡수력' 키워드를 Hook에 녹였습니다.",
      tags: ["#뷰티", "#코스메틱"],
      folder: "/2.Lumiele",
      preview: "page_1.png",
      items: [
        { type: "image", src: "page_1.png" },
        { type: "video_mp4", src: "page_2.mp4" },
        { type: "image", src: "page_3 - 1.png" },
        { type: "image", src: "page_3.png" },
        { type: "video", src: "page_4.gif" },
        { type: "image", src: "page_5.png" }
      ]
    },
    {
      id: 3,
      title: "LACUNE 프리미엄 코스메틱",
      cat: "자사몰",
      desc: "시선을 사로잡는 타이포그래피와 레이아웃으로 기획된 프리미엄 라인.",
      intent: "경쟁사 상세페이지의 '뻔한' 구성을 탈피하고 '전문가용' 이미지를 강조하는 CTA 설계.",
      tags: ["#뷰티", "#프리미엄"],
      folder: "/3.LACUNE",
      preview: "page1.png",
      items: Array.from({ length: 19 }, (_, i) => ({ type: "image", src: `page${i + 1}.png` }))
    },
    {
      id: 4,
      title: "밀키트 상세페이지 설계",
      cat: "자사몰",
      desc: "침샘을 자극하는 조리 과정과 간편함을 강조한 밀키트 특화 디자인.",
      intent: "리뷰에서 공통적으로 언급된 '3분 완성'과 '정석의 맛'을 Hook-Body 브랜딩에 활용.",
      tags: ["#식품", "#밀키트"],
      folder: "/4.밀키트",
      preview: "page_1.png",
      items: [
        { type: "image", src: "page_1.png" },
        { type: "image", src: "page_2.png" },
        { type: "video", src: "page_3.gif" },
        { type: "image", src: "page_4.png" }
      ]
    },
    {
      id: 5,
      title: "오롯이귤 산지직송",
      cat: "스마트스토어",
      desc: "신선함과 생산자의 진정성을 담은 농산물 상세페이지.",
      intent: "리뷰 기반 구매 동기인 '아이들 간식' 키워드를 부각하여 신뢰도를 높인 설계.",
      tags: ["#식품", "#산지직송"],
      folder: "/5. 오롯이귤",
      preview: "page_1.png",
      items: [
        { type: "image", src: "page_1.png" },
        { type: "video", src: "page_2.gif" },
        { type: "image", src: "page_3.png" }
      ]
    },
    {
      id: 6,
      title: "은하신당 무속/운세",
      cat: "기타 마켓",
      desc: "신뢰감을 주고 고민을 해결해줄 편안한 분위기의 운세 상담 페이지.",
      intent: "불안해하는 고객의 마음을 읽는 Hook 문구 배치로 신뢰도를 높였습니다.",
      tags: ["#라이프스타일", "#상담"],
      folder: "/6.은하신당",
      preview: "Group 01.png",
      items: [
        { type: "image", src: "Group 01.png" },
        { type: "image", src: "Group 02.png" },
        { type: "image", src: "Group 03.png" },
        { type: "image", src: "Group 04.png" }
      ]
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2; 
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full h-20 flex items-center justify-between px-8 md:px-16 lg:px-24 border-b border-white/5 sticky top-0 bg-black/40 backdrop-blur-2xl z-50 transition-all">
        <a href="#" className="flex items-center hover:opacity-80 transition-opacity">
          <img 
            src="/logo_b.png" 
            alt="Blingkkami Logo" 
            className="h-[48px] md:h-[56px] px-2 md:px-3 w-auto object-contain" 
            style={{ mixBlendMode: 'screen' }}
          />
        </a>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-white/80">
          <a href="#about" className="hover:text-white transition-colors">Studio</a>
          <a href="#portfolio" className="hover:text-white transition-colors">Work</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </nav>
        <a href="#contact" className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:bg-purple-600 transition-colors focus:outline-none focus:ring-4 focus:ring-primary/20 cursor-pointer">
          문의하기
        </a>
      </header>

      <main className="flex-1 w-full flex flex-col">
        <section className="w-full min-h-[90vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-[-1] pointer-events-none">
            <div className="absolute top-[-10%] left-[20%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-primary/20 blur-[160px] rounded-full mix-blend-screen animate-blob" />
            <div className="absolute top-[30%] right-[10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-[#E5A4FF]/10 blur-[140px] rounded-full mix-blend-screen animate-blob-reverse" />
          </div>

          <div 
            className="z-10 transition-transform duration-[400ms] ease-out will-change-transform"
            style={{ 
              transform: `perspective(1200px) rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg) translateX(${mousePos.x * -20}px) translateY(${mousePos.y * -20}px)`
            }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-6 tracking-tight cursor-default flex flex-col items-center gap-2 break-keep">
              <span className="inline-block transition-all duration-500 ease-out hover:scale-[1.05] hover:-translate-y-3 hover:drop-shadow-[0_20px_40px_rgba(255,209,223,0.9)] text-transparent bg-clip-text bg-gradient-to-br from-[#FFD1DF] via-[#FFE4E6] to-[#FFB6C1] drop-shadow-[0_0_20px_rgba(255,209,223,0.3)] mt-2 font-bold max-w-[900px]">
                감으로 쓰지 않습니다.<br/>리뷰에서 답을 찾습니다.
              </span>
            </h1>
          </div>
          <div className="text-lg md:text-xl text-white/70 mb-10 max-w-3xl font-light leading-relaxed break-keep space-y-2">
            <p>쿠팡·네이버에 쌓인 실제 구매자 리뷰를 분석해 고객이 진짜로 반응하는 단어를 찾아냅니다.<br/>그리고 그 언어로 Hook-Body-CTA 구조를 설계해 상세페이지를 만들어요.</p>
            <p className="font-semibold text-white/90">AI로 분석하고, 디자인은 사람이 직접 합니다.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <a href="#contact" className="px-8 py-4 bg-primary text-white text-lg font-bold rounded-full hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(175,82,222,0.5)]">
              무료 상담 시작하기
            </a>
            <a href="#portfolio" className="px-8 py-4 bg-white/5 text-white text-lg font-bold rounded-full hover:bg-white/20 backdrop-blur-xl transition-all duration-300 border border-white/20">
              포트폴리오 보기
            </a>
          </div>
          <div className="flex flex-col gap-1 items-center text-sm text-white/50 mb-8 font-medium">
            <p>리뷰 기반 설계 방법론 자체 개발 · Claude·Gemini 활용</p>
            <p>브리프 제출 후 평균 7일 이내 1차 시안</p>
            <p>평균 응답 시간 2시간 이내</p>
          </div>
        </section>

        <section className="w-full py-20 px-8 md:px-16 lg:px-24 bg-black/60 border-t border-white/5">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-white/90">이럴 때 특히 잘 맞습니다</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {/* Card 1 */}
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10 glassmorphism hover:-translate-y-2 transition-transform duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-3xl mb-6 shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:bg-primary/20 transition-all">
                  😤
                </div>
                <div className="space-y-4">
                  <p className="text-white font-bold leading-tight">상세페이지 디자인,<br/>직접 하기엔 너무 어려워요</p>
                  <p className="text-white/60 text-sm leading-relaxed">"디자인 감각도 없고, 경험도 없는데 어디서부터 시작해야 막막해요."</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10 glassmorphism hover:-translate-y-2 transition-transform duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-3xl mb-6 shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:bg-[#E5A4FF]/20 transition-all">
                  📉
                </div>
                <div className="space-y-4">
                  <p className="text-white font-bold leading-tight">유입은 많은데<br/>구매 전환이 안 돼요</p>
                  <p className="text-white/60 text-sm leading-relaxed">"광고비는 계속 나가는데, 구매로 이어지지 않는 상세페이지에 문제가 있을 수 있습니다."</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10 glassmorphism hover:-translate-y-2 transition-transform duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-3xl mb-6 shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:bg-[#FFB6C1]/20 transition-all">
                  🤔
                </div>
                <div className="space-y-4">
                  <p className="text-white font-bold leading-tight">리뷰에서 어떤 점을<br/>강조해야 할지 모르겠어요</p>
                  <p className="text-white/60 text-sm leading-relaxed">"좋은 리뷰는 많은데, 어떻게 상세페이지에 녹여야 소비자들에게 어필할 수 있을까요?"</p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10 glassmorphism hover:-translate-y-2 transition-transform duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-3xl mb-6 shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:bg-primary/20 transition-all">
                  ⏰
                </div>
                <div className="space-y-4">
                  <p className="text-white font-bold leading-tight">시간이 없어요,<br/>빠르게 상세페이지가 필요해요</p>
                  <p className="text-white/60 text-sm leading-relaxed">"입점 일정은 다가오는데 언제 상세페이지를 기획하고 디자인할 시간이 있을까요?"</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-24 px-8 md:px-16 lg:px-24 bg-gradient-to-b from-transparent to-black/20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight">어떻게 작업하나요?</h2>
              <p className="text-lg text-white/60">클라이언트가 남겨주신 브리프와 리뷰·경쟁사 데이터를 결합해, 3단계로 상세페이지를 설계합니다.</p>
            </div>
            
            <div className="flex flex-col gap-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-white/5 rounded-3xl p-8 lg:p-10 border border-white/10 backdrop-blur-sm group">
                <div className="w-20 h-20 rounded-2xl bg-white/10 flex flex-col items-center justify-center text-white group-hover:bg-primary group-hover:scale-105 transition-all shrink-0">
                  <span className="text-2xl font-bold">Step 1</span>
                  <span className="text-[10px] opacity-60">Day 1~2</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">앱으로 브리프 수집</h3>
                  <p className="text-white/70 leading-relaxed text-lg text-left">전용 브리프 양식을 보내드려요. 제품 정보, 타깃 고객, 기존 판매 채널, 경쟁사, 강조하고 싶은 포인트를 채워주시면 돼요. 필요 시 30분 사전 미팅을 진행합니다.</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-white/5 rounded-3xl p-8 lg:p-10 border border-white/10 backdrop-blur-sm group">
                <div className="w-20 h-20 rounded-2xl bg-white/10 flex flex-col items-center justify-center text-white group-hover:bg-[#E5A4FF] group-hover:scale-105 transition-all shrink-0">
                  <span className="text-2xl font-bold">Step 2</span>
                  <span className="text-[10px] opacity-60">Day 3~5</span>
                </div>
                <div className="w-full">
                  <h3 className="text-2xl font-bold text-white mb-2">AI 기반 리뷰 분석</h3>
                  <p className="text-white/70 leading-relaxed text-lg text-left">Claude Sonnet으로 실제 구매자 리뷰의 키워드 빈도를 분석하고, Gemini로 구매 동기를 분류합니다. 경쟁사 상세페이지도 함께 분석해 실제 구매자 리뷰를 분석해 설계합니다.</p>
                  <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-xl text-primary text-sm font-semibold inline-block">
                    ✨ AI는 '분석'에만 사용합니다. 디자인과 최종 카피는 사람이 직접 설계해요.
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-white/5 rounded-3xl p-8 lg:p-10 border border-white/10 backdrop-blur-sm group">
                <div className="w-20 h-20 rounded-2xl bg-white/10 flex flex-col items-center justify-center text-white group-hover:bg-[#FFB6C1] group-hover:scale-105 transition-all shrink-0">
                  <span className="text-2xl font-bold">Step 3</span>
                  <span className="text-[10px] opacity-60">Day 6~10</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Hook-Body-CTA 설계 및 디자인</h3>
                  <p className="text-white/70 leading-relaxed text-lg text-left">분석 결과를 바탕으로 섹션 구조를 짜고, Hook-Body-CTA 흐름에 맞춰 디자인까지 완성해드려요.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="portfolio" className="w-full py-24 px-8 md:px-16 lg:px-24 bg-black/40 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">AI 상세페이지 포트폴리오</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolios.map((item) => (
                <div 
                  key={item.id} 
                  className="group cursor-pointer flex flex-col items-center relative"
                  onClick={() => setSelectedPortfolio(item)}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[260px] aspect-[9/19.5] bg-primary/70 blur-[50px] rounded-[3rem] mix-blend-screen opacity-0 group-hover:opacity-100 group-hover:bg-[#E5A4FF]/90 group-hover:blur-[70px] group-hover:scale-110 transition-all duration-700 pointer-events-none" />
                  
                  <div className="w-full max-w-[220px] aspect-[9/19.5] bg-black rounded-[2.5rem] border-[6px] border-[#222] mb-6 relative overflow-hidden shadow-2xl transition-all duration-500 ease-out group-hover:-translate-y-3 z-10 flex flex-col">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-10 border border-white/5" />
                    <div className="w-full h-full bg-black group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden">
                       <img 
                          src={`${item.folder}/${item.preview}`} 
                          alt={item.title}
                          className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                        />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 px-2 text-center mt-2 w-full">
                    <div className="flex flex-wrap justify-center gap-2 mb-1">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-[10px] text-primary font-bold tracking-widest uppercase px-2 py-0.5 bg-primary/10 rounded-full border border-primary/20">{tag}</span>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{item.title}</h3>
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:border-primary/30 transition-all">
                      <p className="text-[11px] text-white/70 leading-relaxed font-medium">"{item.intent}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {selectedPortfolio && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <button 
              onClick={() => setSelectedPortfolio(null)}
              className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-2xl transition-all z-50 backdrop-blur-xl border border-white/10"
            >
              ✕
            </button>
            
            <div className="w-full max-w-4xl h-full max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-2xl bg-black border border-white/10 relative custom-scrollbar flex flex-col items-center">
              <div className="w-full p-8 md:p-12 text-center border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent">
                <span className="text-sm text-primary font-bold tracking-widest uppercase mb-2 block">{selectedPortfolio.cat}</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{selectedPortfolio.title}</h2>
                <p className="text-white/60 text-lg max-w-2xl mx-auto">{selectedPortfolio.desc}</p>
              </div>
              <div className="w-full">
                {selectedPortfolio.items.map((media: any, index: number) => (
                  <div key={index} className="w-full flex justify-center border-b border-white/5 last:border-0 relative">
                    {media.type === 'video_mp4' ? (
                      <video src={`${selectedPortfolio.folder}/${media.src}`} autoPlay loop muted playsInline className="w-full h-auto max-w-3xl block" />
                    ) : (
                      <img src={`${selectedPortfolio.folder}/${media.src}`} alt={`${selectedPortfolio.title} - ${index + 1}`} className="w-full h-auto max-w-3xl block" loading="lazy" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}


        <section id="pricing" className="w-full py-24 px-8 md:px-16 lg:px-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 tracking-tight">Service Packages</h2>
              <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed italic">
                "블링까미의 상세페이지 1건에는 실제 구매자 리뷰를 분석, 경쟁사 분석, Hook-Body-CTA 설계, 30시간 이상의 작업이 들어갑니다. 가격은 그 시간과 방법론의 값이에요."
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-16">
              <div className="bg-white/5 rounded-3xl p-8 lg:p-10 border border-white/10 relative overflow-hidden flex flex-col h-full">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">패키지 A <span className="text-base font-normal text-white/50 ml-2">· 스타터</span></h3>
                  <div className="text-4xl font-bold text-primary mb-2">400,000<span className="text-xl text-white/50 font-normal">원</span></div>
                  <p className="text-sm text-white/70 mt-4 leading-relaxed">첫 런칭·테스트용 상품에 추천드립니다.</p>
                </div>
                <ul className="space-y-4 text-white/80 mb-10 flex-1 text-sm md:text-base">
                  <li className="flex gap-3"><span className="text-primary font-bold">✓</span> 디자인 세로 길이 10,000px ~ 15,000px</li>
                  <li className="flex gap-3"><span className="text-primary font-bold">✓</span> 제품·타깃 브리프 분석</li>
                  <li className="flex gap-3"><span className="text-primary font-bold">✓</span> 기본 경쟁사·카테고리 분석</li>
                  <li className="flex gap-3"><span className="text-primary font-bold">✓</span> Hook–Body–CTA 구조 설계 + 디자인</li>
                  <li className="flex gap-3"><span className="text-primary font-bold">✓</span> 작업 완료 후 수정 1회 제공</li>
                </ul>
                <a href="#contact" className="block text-center w-full py-4 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-all cursor-pointer backdrop-blur-md">
                  상담 신청하기
                </a>
              </div>

              <div className="bg-primary/10 rounded-3xl p-8 lg:p-10 border border-primary/30 relative overflow-hidden flex flex-col h-full">
                <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-black px-4 py-1.5 rounded-bl-lg tracking-widest uppercase">Best Choice</div>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">패키지 B <span className="text-base font-normal text-primary/70 ml-2">· 데이터 기반 재설계</span></h3>
                  <div className="text-4xl font-bold text-primary mb-2">550,000<span className="text-xl text-white/50 font-normal">원</span></div>
                  <p className="text-sm text-white/70 mt-4 leading-relaxed">이미 판매 중인 상품의 상세페이지를 데이터 기반으로 재설계합니다.</p>
                </div>
                <ul className="space-y-4 text-white/80 mb-10 flex-1 text-sm md:text-base">
                  <li className="flex gap-3"><span className="text-primary font-bold">✓</span> 디자인 세로 길이 15,000px ~ 20,000px 이상</li>
                  <li className="flex gap-3"><span className="text-primary font-bold">✓</span> 패키지 A 전 내용 포함</li>
                  <li className="flex gap-3"><span className="text-primary font-bold">✓</span> 카테고리 상위 상세페이지·경쟁사 상세 분석</li>
                  <li className="flex gap-3"><span className="text-primary font-bold">✓</span> 리뷰 마이닝 인사이트 리포트</li>
                  <li className="flex gap-3"><span className="text-primary font-bold">✓</span> A/B 테스트용 카피 2안 제공</li>
                  <li className="flex gap-3"><span className="text-primary font-bold">✓</span> 작업 완료 후 수정 2회 제공</li>
                </ul>
                <a href="#contact" className="block text-center w-full py-4 rounded-xl bg-primary text-white font-bold hover:opacity-90 transition-all shadow-[0_0_20px_rgba(175,82,222,0.4)] cursor-pointer">
                  상담 신청하기
                </a>
              </div>
            </div>

            <div className="mb-16">
              <p className="text-[11px] text-white/40 mb-10 text-center">
                ※ 상품 사진 촬영·보정, 한국어 외 언어, 쇼핑몰 직접 업로드, 수정 횟수 초과 작업은 포함되지 않습니다.
              </p>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-10">
                <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-primary rounded-full" />
                  추가 옵션 (Add-on)
                </h3>
                <div className="space-y-4 text-sm md:text-base">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-white/60">썸네일 추가 제작 (1종)</span>
                    <span className="font-mono font-bold">80,000원</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-white/60">카피 수정 추가 (횟수 초과, 1회)</span>
                    <span className="font-mono font-bold">50,000원</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-white/60">GIF / 움짤 제작 (1개)</span>
                    <span className="font-mono font-bold">70,000원</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-white/60">리뷰 분석 리포트 PDF 단독 납품</span>
                    <span className="font-mono font-bold">250,000원</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-white/60">경쟁사 분석 추가 (1개)</span>
                    <span className="font-mono font-bold">80,000원</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-white/60">급행 (리드타임 50% 단축)</span>
                    <span className="font-mono font-bold">패키지가의 +30%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center text-white/80 font-medium py-6 px-4 bg-white/5 border border-white/10 rounded-2xl glassmorphism">
              결제는 상담 후 안내드립니다.
            </div>
            <p className="mt-8 text-xs text-white/40 text-left">* 부가세 별도 / 마켓·카테고리 및 기획 난이도 옵션 추가 여부에 따라 변동될 수 있습니다.</p>
          </div>
        </section>

        <section className="w-full py-24 px-8 md:px-16 lg:px-24 bg-black/40 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">자주 묻는 질문</h2>
            <div className="flex flex-col gap-4">
              <details className="group bg-white/5 border border-white/10 rounded-2xl">
                <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold text-white/90">
                  Q1. 작업 기간은 얼마나 걸리나요?
                  <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="p-6 pt-0 text-white/70 whitespace-pre-line leading-relaxed">
                  작업 범위에 따라 차이가 있을 수 있으나, 일반적으로 초안은 3일~5일 정도 소요됩니다.
                  피드백 반영 후 완성되는 2차 시안(거의 최종본)은 10일~14일 정도 소요됩니다.
                </div>
              </details>
              <details className="group bg-white/5 border border-white/10 rounded-2xl">
                <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold text-white/90">
                  Q2. 디자인과 이미지 제작까지 함께 해주시나요?
                  <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="p-6 pt-0 text-white/70 whitespace-pre-line leading-relaxed">
                  네, 상세페이지 구조 설계와 카피라이팅은 물론 디자인까지 함께 작업합니다.
                  필요한 경우, 제품을 더 잘 보여줄 수 있는 AI 스튜디오컷(제품 단독컷) 이미지도 함께 생성해 드립니다.
                </div>
              </details>
              <details className="group bg-white/5 border border-white/10 rounded-2xl">
                <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold text-white/90">
                  Q3. 작업 중 취소하면 환불되나요?
                  <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="p-6 pt-0 text-white/70 whitespace-pre-line leading-relaxed">
                  작업 단계에 따라 달라요. 브리프 수집 단계에서는 100% 환불, 리뷰 분석 완료 후에는 50% 환불, 시안 1차 제공 후에는 환불이 어렵습니다. 이 기준은 계약서에 명시해드려요.
                </div>
              </details>
              <details className="group bg-white/5 border border-white/10 rounded-2xl">
                <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold text-white/90">
                  Q4. 완성된 상세페이지의 저작권은 누구에게 있나요?
                  <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="p-6 pt-0 text-white/70 whitespace-pre-line leading-relaxed">
                  납품물의 사용권은 클라이언트에게 있습니다. 단, 원본 소스파일과 저작권은 블링까미에 귀속되며, 포트폴리오 공개 권리를 가집니다.
                </div>
              </details>
              <details className="group bg-white/5 border border-white/10 rounded-2xl">
                <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold text-white/90">
                  Q5. 수정은 몇 번까지 가능한가요?
                  <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="p-6 pt-0 text-white/70 whitespace-pre-line leading-relaxed">
                  디자인 기획과 전체 구조(큰 틀)에 대한 방향성 수정은 초안 단계에서만 가능합니다.
                  2차 시안 단계부터는 큰 틀의 변경이 어려우며, 상세 디테일 위주의 수정이 진행됩니다.
                </div>
              </details>
            </div>
            <div className="mt-16 text-center">
              <p className="text-lg text-white/80 mb-6 font-medium">위에 없는 질문이 있으시면, 아래 상담 폼에 편하게 남겨 주세요. 최대한 솔직하게 답변 드립니다.</p>
            </div>
          </div>
        </section>

        <section className="w-full py-24 px-8 md:px-16 lg:px-24 bg-gradient-to-t from-black to-primary/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center underline decoration-primary underline-offset-8">왜 블링까미인가요?</h2>
            <div className="space-y-8 text-lg text-white/80 leading-relaxed break-keep">
              <p>많은 상세페이지들이 '감'으로 쓰이는 걸 봤습니다. 제품 판매자는 자신의 언어로, 디자이너는 자신의 취향으로. 그 사이에서 정작 고객의 목소리는 빠져있었어요.</p>
              <p>그래서 저는 쿠팡·네이버에 쌓인 실제 리뷰를 읽는 것부터 시작합니다. 고객이 어떤 단어로 이 제품을 표현하는지, 어떤 이유로 샀는지 — 그 언어를 상세페이지에 그대로 옮겨요.</p>
              <p>AI는 리뷰 분석의 속도를 빠르게 해주는 도구일 뿐, 설계와 디자인은 제가 직접 합니다. 데이터에서 시작해 사람의 손으로 마무리하는 것, 그게 블링까미의 방식입니다.</p>
              <div className="pt-8 text-right">
                <span className="text-2xl font-bold text-primary">— 블링까미</span>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-24 px-8 md:px-16 lg:px-24 bg-black/50 border-t border-white/5">
          <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">상담부터 받고 싶어요</h2>
              <p className="text-white/60 leading-relaxed">
                어떤 단계에 계시든 괜찮습니다.<br className="hidden md:block"/>
                상품 링크만 보내주셔도, 리뷰·경쟁사 데이터를 먼저 보고 설계 방향과 견적을 제안드립니다.
              </p>
            </div>
            <div className="flex-1 bg-white/5 p-8 rounded-3xl border border-white/10">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-12 border-t border-white/5 text-center bg-black/40">
        <p className="text-sm text-white/20">© 2026 Blingkkami. All rights reserved.</p>
      </footer>

      <div className="md:hidden fixed bottom-8 left-0 right-0 px-6 z-50 animate-in slide-in-from-bottom-8 duration-500">
        <a 
          href="#contact" 
          className="flex items-center justify-center w-full py-4 bg-primary text-white font-black rounded-2xl shadow-[0_10px_40px_rgba(175,82,222,0.5)] border border-white/20 active:scale-95 transition-all"
        >
          무료 상담 받기
        </a>
      </div>
    </div>
  );
}
