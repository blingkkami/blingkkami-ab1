"use client";

import { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedPortfolio, setSelectedPortfolio] = useState<typeof portfolios[0] | null>(null);

  // Portfolio Data Definition
  const portfolios = [
    {
      id: 1,
      title: "꽃풍선 상세페이지",
      cat: "스마트스토어",
      desc: "감성적인 무드와 디테일을 세심하게 담았습니다.",
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
      folder: "/3.LACUNE",
      preview: "page1.png",
      items: Array.from({ length: 19 }, (_, i) => ({ type: "image", src: `page${i + 1}.png` }))
    },
    {
      id: 4,
      title: "밀키트 상세페이지 설계",
      cat: "자사몰",
      desc: "침샘을 자극하는 조리 과정과 간편함을 강조한 밀키트 특화 디자인.",
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
      // Calculate normalized mouse coordinates from -1 to 1
      const x = (e.clientX / window.innerWidth - 0.5) * 2; 
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <header className="w-full h-20 flex items-center justify-between px-8 md:px-16 lg:px-24 border-b border-white/5 sticky top-0 bg-black/40 backdrop-blur-2xl z-50 transition-all">
        <a href="#" className="flex items-center hover:opacity-80 transition-opacity">
          <img 
            src="/logo.png" 
            alt="Blingkkami Logo" 
            className="h-[40px] md:h-[48px] px-2 md:px-3 w-auto object-contain" 
            style={{ mixBlendMode: 'screen' }}
          />
        </a>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-white/80">
          <a href="#about" className="hover:text-white transition-colors">Studio</a>
          <a href="#portfolio" className="hover:text-white transition-colors">Work</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </nav>
        <a href="#contact" className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:bg-purple-600 transition-colors focus:outline-none focus:ring-4 focus:ring-primary/20 cursor-pointer">
          문의하기
        </a>
      </header>

      <main className="flex-1 w-full flex flex-col">
        {/* F-001 ~ F-004: Hero Section */}
        <section className="w-full min-h-[90vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
          {/* Subtle Apple Intelligence-like Glow Orbs */}
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
              <span className="inline-block transition-all duration-500 ease-out hover:scale-110 hover:-translate-y-2 text-white/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] text-2xl md:text-4xl lg:text-5xl mb-2">
                쿠팡·네이버 <b className="text-transparent bg-clip-text bg-gradient-to-br from-[#FFD1DF] via-[#FFE4E6] to-[#FFB6C1] drop-shadow-[0_0_15px_rgba(255,209,223,0.4)]">리뷰까지 읽어주는</b>
              </span>
              <span className="inline-block transition-all duration-500 ease-out hover:scale-[1.05] hover:-translate-y-3 hover:drop-shadow-[0_20px_40px_rgba(255,209,223,0.9)] text-transparent bg-clip-text bg-gradient-to-br from-[#FFD1DF] via-[#FFE4E6] to-[#FFB6C1] drop-shadow-[0_0_20px_rgba(255,209,223,0.3)] mt-2 font-bold max-w-[900px] text-4xl md:text-6xl lg:text-7xl">
                AI 상세페이지 스튜디오
              </span>
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-3xl font-light leading-relaxed break-keep">
            클라이언트가 앱에서 남긴 브리프와<br className="hidden md:block"/>
            카테고리 상위 상세페이지·<span className="text-transparent bg-clip-text bg-gradient-to-br from-[#FFD1DF] via-[#FFE4E6] to-[#FFB6C1] font-bold">경쟁사</span>·쿠팡·네이버 <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#FFD1DF] via-[#FFE4E6] to-[#FFB6C1] font-bold">리뷰</span> 데이터를 분석해<br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#FFD1DF] via-[#FFE4E6] to-[#FFB6C1] font-bold">전환</span>에 최적화된 <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#FFD1DF] via-[#FFE4E6] to-[#FFB6C1] font-bold">Hook–Body–CTA</span> 구조와 카피를 설계합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <a href="#contact" className="px-8 py-4 bg-primary text-white text-lg font-bold rounded-full hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(175,82,222,0.5)]">
              상세페이지 설계 상담 받기
            </a>
            <a href="#portfolio" className="px-8 py-4 bg-white/5 text-white text-lg font-bold rounded-full hover:bg-white/20 backdrop-blur-xl transition-all duration-300 border border-white/20">
              포트폴리오 먼저 보기
            </a>
          </div>
          <p className="text-sm text-white/50 mb-8">* 상담은 무료이며, 현재 상세페이지나 상품 링크만 보내주셔도 됩니다.</p>
        </section>

        {/* Target Section */}
        <section className="w-full py-20 px-8 md:px-16 lg:px-24 bg-black/60 border-t border-white/5">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-white/90">이럴 때 특히 잘 맞습니다</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10 glassmorphism hover:-translate-y-2 transition-transform duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-primary/20 backdrop-blur-xl border border-white/20 shadow-[0_0_20px_rgba(175,82,222,0.3)] flex items-center justify-center text-2xl mb-6 relative overflow-hidden group-hover:shadow-[0_0_30px_rgba(175,82,222,0.5)] transition-shadow duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-50 pointer-events-none"></div>
                  <img src="/전환율.png" alt="전환율 아이콘" className="relative z-10 w-8 h-8 object-contain drop-shadow-[0_2px_10px_rgba(175,82,222,0.8)]" />
                </div>
                <p className="text-white/80 leading-relaxed font-medium">광고는 돌리는데<br/>상세페이지 전환율이<br/>안 나오는 셀러</p>
              </div>
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10 glassmorphism hover:-translate-y-2 transition-transform duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-[#E5A4FF]/20 backdrop-blur-xl border border-white/20 shadow-[0_0_20px_rgba(229,164,255,0.3)] flex items-center justify-center text-2xl mb-6 relative overflow-hidden group-hover:shadow-[0_0_30px_rgba(229,164,255,0.5)] transition-shadow duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-50 pointer-events-none"></div>
                  <img src="/막막.png" alt="막막 아이콘" className="relative z-10 w-8 h-8 object-contain drop-shadow-[0_2px_10px_rgba(229,164,255,0.8)]" />
                </div>
                <p className="text-white/80 leading-relaxed font-medium">첫 런칭이라 상세페이지<br/>구조를 어떻게 짜야 할지<br/>막막한 브랜드</p>
              </div>
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10 glassmorphism hover:-translate-y-2 transition-transform duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-[#FFB6C1]/20 backdrop-blur-xl border border-white/20 shadow-[0_0_20px_rgba(255,182,193,0.3)] flex items-center justify-center text-2xl mb-6 relative overflow-hidden group-hover:shadow-[0_0_30px_rgba(255,182,193,0.5)] transition-shadow duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-50 pointer-events-none"></div>
                  <img src="/시계.png" alt="시계 아이콘" className="relative z-10 w-8 h-8 object-contain drop-shadow-[0_2px_10px_rgba(255,182,193,0.8)]" />
                </div>
                <p className="text-white/80 leading-relaxed font-medium">리뷰는 많은데, 그 안에서<br/>카피 포인트를 뽑을<br/>시간이 없는 팀</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-24 px-8 md:px-16 lg:px-24 bg-gradient-to-b from-transparent to-black/20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight">어떻게 작업하나요?</h2>
              <p className="text-lg text-white/60">클라이언트가 앱에서 남긴 브리프와 리뷰·경쟁사 데이터를 결합해, 3단계로 상세페이지를 설계합니다.</p>
            </div>
            
            <div className="flex flex-col gap-8">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-white/5 rounded-3xl p-8 lg:p-10 border border-white/10 backdrop-blur-sm group">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-2xl font-bold text-white group-hover:bg-primary group-hover:scale-110 transition-all shrink-0">1</div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">앱으로 브리프 수집</h3>
                  <p className="text-white/70 leading-relaxed text-lg text-left">링크를 보내드리면, 클라이언트가 게임처럼 질문에 답하고 제품 사진·레퍼런스를 업로드합니다.</p>
                </div>
              </div>
              {/* Step 2 */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-white/5 rounded-3xl p-8 lg:p-10 border border-white/10 backdrop-blur-sm group">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-2xl font-bold text-white group-hover:bg-[#E5A4FF] group-hover:scale-110 transition-all shrink-0">2</div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">데이터 분석</h3>
                  <p className="text-white/70 leading-relaxed text-lg text-left">퍼블릭시티·Claude·Gemini로 카테고리 상위 상세페이지, 경쟁사, 쿠팡·네이버 리뷰를 분석해 핵심 메시지를 추출합니다.</p>
                </div>
              </div>
              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-white/5 rounded-3xl p-8 lg:p-10 border border-white/10 backdrop-blur-sm group">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-2xl font-bold text-white group-hover:bg-[#FFB6C1] group-hover:scale-110 transition-all shrink-0">3</div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Hook–Body–CTA 설계 및 디자인</h3>
                  <p className="text-white/70 leading-relaxed text-lg text-left">분석 결과를 바탕으로 상세페이지 섹션 구조와 카피 초안을 작성한 뒤, 몰입도를 높이는 고퀄리티 디자인까지 완벽하게 마무리합니다.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
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
                  {/* Glowing Backlight Behind the Phone - Intense Radiance on Hover Only */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[260px] aspect-[9/19.5] bg-primary/70 blur-[50px] rounded-[3rem] mix-blend-screen opacity-0 group-hover:opacity-100 group-hover:bg-[#E5A4FF]/90 group-hover:blur-[70px] group-hover:scale-110 transition-all duration-700 pointer-events-none" />
                  
                  {/* Apple Style iPhone Mockup */}
                  <div className="w-full max-w-[220px] aspect-[9/19.5] bg-black rounded-[2.5rem] border-[6px] border-[#222] mb-6 relative overflow-hidden shadow-2xl transition-all duration-500 ease-out group-hover:-translate-y-3 z-10 flex flex-col">
                    {/* Dynamic Island */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-10 border border-white/5" />
                    
                    {/* Screen Content - Replaced placeholder with actual image */}
                    <div className="w-full h-full bg-black group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden">
                       <img 
                          src={`${item.folder}/${item.preview}`} 
                          alt={item.title}
                          className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                        />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1 px-2 text-center mt-2">
                    <span className="text-[10px] text-primary font-bold tracking-widest uppercase">{item.cat}</span>
                    <h3 className="text-base font-semibold text-white/90 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-xs text-white/50 line-clamp-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Detail Modal */}
        {selectedPortfolio && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedPortfolio(null)}
              className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-2xl transition-all z-50 backdrop-blur-xl border border-white/10"
            >
              ✕
            </button>
            
            {/* Modal Content Scroll Area */}
            <div className="w-full max-w-4xl h-full max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-2xl bg-black border border-white/10 relative custom-scrollbar flex flex-col items-center">
              
              <div className="w-full p-8 md:p-12 text-center border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent">
                <span className="text-sm text-primary font-bold tracking-widest uppercase mb-2 block">{selectedPortfolio.cat}</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{selectedPortfolio.title}</h2>
                <p className="text-white/60 text-lg max-w-2xl mx-auto">{selectedPortfolio.desc}</p>
              </div>

              <div className="w-full">
                {selectedPortfolio.items.map((media, index) => (
                  <div key={index} className="w-full flex justify-center border-b border-white/5 last:border-0 relative">
                    {media.type === 'video_mp4' ? (
                      <video 
                        src={`${selectedPortfolio.folder}/${media.src}`} 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        className="w-full h-auto max-w-3xl block"
                      />
                    ) : (
                      <img 
                        src={`${selectedPortfolio.folder}/${media.src}`} 
                        alt={`${selectedPortfolio.title} - ${index + 1}`}
                        className="w-full h-auto max-w-3xl block"
                        loading="lazy"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pricing / Packages Section */}
        <section id="pricing" className="w-full py-24 px-8 md:px-16 lg:px-24">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight">Service Packages</h2>
            <p className="text-lg text-white/60 mb-16">제품과 목표에 맞는 형태로 상세페이지 설계를 제공합니다.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              {/* Package A */}
              <div className="bg-white/5 rounded-3xl p-8 lg:p-10 border border-white/10 relative overflow-hidden flex flex-col h-full">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">패키지 A <span className="text-base font-normal text-white/50 ml-2">· 스타터 상세페이지</span></h3>
                  <div className="text-4xl font-bold text-primary mb-2">400,000<span className="text-xl text-white/50 font-normal">원</span></div>
                  <p className="text-sm text-white/50 mt-4 mb-1">첫 런칭/테스트용 상품에 추천드립니다.</p>
                  <p className="text-sm text-white/50">기본 Hook–Body–CTA 구조와 핵심 카피를 설계해 드립니다.</p>
                </div>
                <ul className="space-y-4 text-white/80 mb-10 flex-1 text-sm md:text-base">
                  <li className="flex gap-3"><span className="text-primary">✓</span> <span className="font-semibold text-white">디자인 세로 길이 10,000px ~ 15,000px</span></li>
                  <li className="flex gap-3"><span className="text-primary">✓</span> 제품·타깃 브리프 분석</li>
                  <li className="flex gap-3"><span className="text-primary">✓</span> 기본 경쟁사·카테고리 분석</li>
                  <li className="flex gap-3"><span className="text-primary">✓</span> Hook–Body–CTA 구조 설계 + 디자인</li>
                  <li className="flex gap-3"><span className="text-primary">✓</span> 작업 완료 후 수정 1회 제공</li>
                </ul>
                <a href="#contact" className="block text-center w-full py-4 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-all cursor-pointer backdrop-blur-md">
                  패키지 A로 상담 요청하기
                </a>
              </div>

              {/* Package B */}
              <div className="bg-primary/10 rounded-3xl p-8 lg:p-10 border border-primary/30 relative overflow-hidden flex flex-col h-full">
                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-bl-lg">BEST 추천</div>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">패키지 B <span className="text-base font-normal text-primary/70 ml-2">· 성장형 상세페이지</span></h3>
                  <div className="text-4xl font-bold text-primary mb-2">550,000<span className="text-xl text-white/50 font-normal">원</span></div>
                  <p className="text-sm text-white/50 mt-4 mb-1">이미 판매 중인 상품의 전환율을 끌어올리고 싶은 브랜드에 추천드립니다.</p>
                  <p className="text-sm text-white/50">경쟁사·리뷰 분석까지 포함해, 데이터 기반으로 상세페이지를 재설계합니다.</p>
                </div>
                <ul className="space-y-4 text-white/80 mb-10 flex-1 text-sm md:text-base">
                  <li className="flex gap-3"><span className="text-primary">✓</span> <span className="font-semibold text-white">디자인 세로 길이 15,000px ~ 20,000px 이상</span></li>
                  <li className="flex gap-3"><span className="text-primary">✓</span> 패키지 A 전 내용 (기초 분석/설계) 포함</li>
                  <li className="flex gap-3"><span className="text-primary">✓</span> 카테고리 상위 상세페이지·경쟁사 상세 분석</li>
                  <li className="flex gap-3"><span className="text-primary">✓</span> 리뷰 마이닝 인사이트 리포트 및 A/B 테스트용 카피</li>
                  <li className="flex gap-3"><span className="text-primary">✓</span> 작업 완료 후 수정 2회 제공</li>
                </ul>
                <a href="#contact" className="block text-center w-full py-4 rounded-xl bg-primary text-white font-bold hover:opacity-90 transition-all shadow-[0_0_20px_rgba(175,82,222,0.4)] cursor-pointer">
                  패키지 B로 상담 요청하기
                </a>
              </div>
            </div>
            
            <div className="mt-12 text-center text-white/80 font-medium py-6 px-4 bg-white/5 border border-white/10 rounded-2xl glassmorphism">
              결정 전까지는 상담만으로도 충분히 방향을 잡아보실 수 있습니다.
            </div>
            
            {/* Unified Account Payment Block */}
            <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 glassmorphism">
              <div className="text-left">
                <span className="text-lg font-bold text-white mb-1 block">무통장 입금 결제</span>
                <p className="text-sm text-white/60">문의 상담 후, 아래 계좌를 통해 결제를 진행해주시면 바로 작업이 시작됩니다.</p>
              </div>
              <div className="bg-black/50 px-6 py-4 rounded-xl border border-white/5 text-center md:text-right shrink-0 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <span className="text-sm text-white/50 block mb-1">국민은행</span>
                <span className="text-lg font-mono text-primary font-bold">096302-04-200379</span><br />
                <span className="text-sm text-white/80">예금주: 김윤미</span>
              </div>
            </div>

            <p className="mt-8 text-xs text-white/40 text-left">* 부가세 별도 / 마켓·카테고리 및 기획 난이도 옵션 추가 여부에 따라 변동될 수 있습니다.</p>
          </div>
        </section>

        {/* FAQ Section */}
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
                  Q3. 사진 촬영이나 광고 세팅도 해주시나요?
                  <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="p-6 pt-0 text-white/70 whitespace-pre-line leading-relaxed">
                  사진 촬영·영상 제작·광고 세팅은 별도 영역이라 기본 패키지에는 포함되지 않습니다.
                  다만, 어떤 소재가 필요한지에 대한 가이드는 함께 드릴 수 있습니다.
                </div>
              </details>
              <details className="group bg-white/5 border border-white/10 rounded-2xl">
                <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold text-white/90">
                  Q4. 수정은 몇 번까지 가능한가요?
                  <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="p-6 pt-0 text-white/70 whitespace-pre-line leading-relaxed">
                  디자인 기획과 전체 구조(큰 틀)에 대한 방향성 수정은 초안 단계에서만 가능합니다.
                  2차 시안 단계부터는 큰 틀의 변경이 어려우며, 상세 디테일 위주의 수정이 진행됩니다.
                </div>
              </details>
              <details className="group bg-white/5 border border-white/10 rounded-2xl">
                <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold text-white/90">
                  Q5. 아직 상세페이지가 없는데도 의뢰 가능한가요?
                  <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="p-6 pt-0 text-white/70 whitespace-pre-line leading-relaxed">
                  네, 가능합니다.
                  상품 정보와 타깃만 알려주시면, 처음부터 상세페이지 구조와 카피를 함께 설계해 드립니다.
                </div>
              </details>
            </div>
            
            <div className="mt-16 text-center">
              <p className="text-lg text-white/80 mb-6 font-medium">위에 없는 질문이 있으시면, 아래 상담 폼에 편하게 남겨 주세요. 최대한 솔직하게 답변 드립니다.</p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="w-full py-24 px-8 md:px-16 lg:px-24 bg-black/50 border-t border-white/5">
          <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">상담부터 받고 싶어요</h2>
              <p className="text-white/60 mb-6 leading-relaxed">
                어떤 단계에 계시든 괜찮습니다.<br/>
                상품 링크만 보내주셔도, 리뷰·경쟁사 데이터를 먼저 보고 설계 방향과 견적을 제안드립니다.
              </p>
              <a href="#pricing" className="text-primary hover:text-white underline text-sm font-medium mb-8 inline-block transition-colors">
                바로 패키지 결제하고 시작할래요 →
              </a>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 inline-flex flex-col gap-3">
                <span className="text-sm text-white/50 font-semibold uppercase">Email</span>
                <span className="text-lg font-medium">blingkkami@gmail.com</span>
              </div>
            </div>
            
            <div className="flex-1 bg-white/5 p-8 rounded-3xl border border-white/10">
              <ContactForm />
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-white/5 text-center text-sm text-white/40">
        © 2026 Blingkkami. All rights reserved.
      </footer>
    </div>
  );
}
