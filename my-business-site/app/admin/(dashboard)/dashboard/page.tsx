import fs from 'fs';
import path from 'path';

// Next.js가 페이지를 정적으로 캐시하지 않고 통계 접속 시점마다 진짜 현황을 불러오도록 강제 설정
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // 로컬 파일(모의 DB)에서 고객이 남긴 진짜 데이터를 읽어옵니다.
  const dbPath = path.join(process.cwd(), 'inquiries.json');
  let inquiries: any[] = [];
  
  if (fs.existsSync(dbPath)) {
    inquiries = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  }
  
  const recentInquiries = inquiries.slice(0, 5); // 최근 도착 5건만 표출
  const totalCount = inquiries.length;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">안녕하세요, 블링까미님! 👋</h1>
          <p className="text-white/50">오늘의 포트폴리오 메인 대시보드입니다.</p>
        </div>
        <button className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-sm font-medium transition-colors">
          보고서 다운로드
        </button>
      </div>
      
      {/* KPI Cards (통계 카드) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/10 p-6 lg:p-8 rounded-3xl shadow-xl backdrop-blur-md">
          <h3 className="text-white/60 font-medium text-sm mb-4">누적 신규 문의량</h3>
          <div className="flex items-end gap-3">
            <div className="text-4xl lg:text-5xl font-bold tracking-tight">{totalCount}<span className="text-xl text-white/40 ml-2 font-normal">건</span></div>
            <div className="text-green-400 text-sm font-bold mb-2">실제 접수 기준</div>
          </div>
        </div>
        
        <div className="bg-primary/20 border border-primary/40 p-6 lg:p-8 rounded-3xl relative overflow-hidden shadow-[0_0_30px_rgba(107,63,160,0.15)]">
          <div className="absolute right-0 top-0 w-32 h-32 bg-primary/30 blur-[40px] rounded-full point-events-none" />
          <h3 className="text-white/80 font-medium text-sm mb-4 relative z-10">결제 모듈(수익) 확인</h3>
          <div className="flex items-end gap-3 relative z-10">
            <div className="text-4xl lg:text-5xl font-bold tracking-tight text-white">0<span className="text-xl text-white/40 ml-2 font-normal">원</span></div>
            <div className="text-white/40 text-sm font-medium mb-2">결제 기능 연결 대기중</div>
          </div>
        </div>
        
        <div className="bg-white/5 border border-white/10 p-6 lg:p-8 rounded-3xl shadow-xl backdrop-blur-md">
          <h3 className="text-white/60 font-medium text-sm mb-4">답변을 기다리는 문의</h3>
          <div className="flex items-end gap-3">
            {totalCount > 0 ? (
               <div className="text-4xl lg:text-5xl font-bold tracking-tight text-[#FFB020]">{totalCount}<span className="text-xl text-white/40 ml-2 font-normal">명</span></div>
            ) : (
               <div className="text-4xl lg:text-5xl font-bold tracking-tight text-white/50">0<span className="text-xl text-white/40 ml-2 font-normal">명</span></div>
            )}
            <div className="text-white/40 text-sm font-medium mb-2">빠른 확인이 필요해요!</div>
          </div>
        </div>
      </div>

      {/* Recent Inquiries List (실제 데이터 목록) */}
      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden mt-8 shadow-xl">
        <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-center bg-black/20">
          <h2 className="text-lg md:text-xl font-bold text-primary">실제 고객 문의 내역 (Live)</h2>
          <span className="text-xs text-white/40">가장 최근에 작성된 5개가 표시됩니다.</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-black/40 text-white/50 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 md:px-8 py-4 font-semibold">고객명 (이메일/연락처)</th>
                <th className="px-6 md:px-8 py-4 font-semibold">요청사항 내용</th>
                <th className="px-6 md:px-8 py-4 font-semibold">처리 상태</th>
                <th className="px-6 md:px-8 py-4 font-semibold">접수 일시</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              {recentInquiries.length === 0 ? (
                 <tr>
                   <td colSpan={4} className="text-center py-12 text-white/50">
                     아직 폼으로 접수된 문의가 없습니다.<br/>메인 페이지에서 글을 작성해 보세요!
                   </td>
                 </tr>
              ) : recentInquiries.map((item: any, idx: number) => (
                <tr key={idx} className="hover:bg-white/5 cursor-pointer transition-colors group">
                  <td className="px-6 md:px-8 py-5 font-medium group-hover:text-primary transition-colors">
                    <div className="flex flex-col">
                      <span>{item.name}</span>
                      <span className="text-white/40 text-xs mt-1 break-all">
                        {item.email} {item.phone && <span className="ml-2 text-white/30 truncate">({item.phone})</span>}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 md:px-8 py-5 text-white/60 max-w-[200px] truncate">{item.message}</td>
                  <td className="px-6 md:px-8 py-5">
                    <span className="px-3 py-1.5 rounded border text-xs font-bold bg-green-500/20 text-green-400 border-green-500/30">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 md:px-8 py-5 text-white/40 text-xs">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
