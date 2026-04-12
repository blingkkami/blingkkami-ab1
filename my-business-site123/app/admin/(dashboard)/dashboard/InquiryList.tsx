"use client";

import { useState } from 'react';

export default function InquiryList({ inquiries }: { inquiries: any[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handlePromoteToCRM = async (inquiry: any) => {
    if (!confirm(`${inquiry.name}님을 CRM 클라이언트로 등록하시겠습니까?`)) return;
    
    setLoadingId(inquiry.id);
    try {
      const res = await fetch('/api/crm/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: inquiry.name,
          contact: inquiry.contact || inquiry.email || inquiry.phone || '연락처 없음',
          channel: '홈페이지',
          status: '문의',
          deadline: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0], // Default 7 days
          price: 0,
          paymentStatus: '결제 대기',
          memo: `[홈페이지 문의] 상품: ${inquiry.product || '미지정'}, 내용: ${inquiry.message}`,
        }),
      });

      if (res.ok) {
        alert('CRM에 성공적으로 등록되었습니다!');
        // Optional: Update local state to show "Registered" status
      } else {
        throw new Error('등록 실패');
      }
    } catch (err) {
      alert('CRM 등록 중 오류가 발생했습니다.');
    } finally {
      setLoadingId(null);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm('정말로 이 문의 내역을 삭제하시겠습니까?')) return;
    
    setLoadingId(id);
    try {
      const res = await fetch('/api/contact', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        window.location.reload(); // Simple refresh to update list
      }
    } catch (err) {
      alert('삭제 중 오류가 발생했습니다.');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-black/40 text-white/50 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-6 md:px-8 py-4 font-semibold">고객명 (이메일/연락처)</th>
            <th className="px-6 md:px-8 py-4 font-semibold">요청사항 내용</th>
            <th className="px-6 md:px-8 py-4 font-semibold">처리 상태</th>
            <th className="px-6 md:px-8 py-4 font-semibold">접수 일시</th>
            <th className="px-6 md:px-8 py-4 font-semibold">액션</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 text-white/80">
          {inquiries.length === 0 ? (
             <tr>
               <td colSpan={5} className="text-center py-12 text-white/50">
                 아직 폼으로 접수된 문의가 없습니다.<br/>메인 페이지에서 글을 작성해 보세요!
               </td>
             </tr>
          ) : inquiries.map((item: any, idx: number) => (
            <tr key={idx} className="hover:bg-white/5 transition-colors group">
              <td className="px-6 md:px-8 py-5 font-medium">
                <div className="flex flex-col">
                  <span className="group-hover:text-primary transition-colors">{item.name}</span>
                  <span className="text-white/40 text-xs mt-1 break-all">
                    {item.contact || item.email} {item.phone && <span className="ml-2 text-white/30 truncate">({item.phone})</span>}
                  </span>
                </div>
              </td>
              <td className="px-6 md:px-8 py-5 text-white/60 max-w-[200px] truncate" title={item.message}>{item.message}</td>
              <td className="px-6 md:px-8 py-5">
                <span className="px-3 py-1.5 rounded border text-xs font-bold bg-green-500/20 text-green-400 border-green-500/30">
                  {item.status}
                </span>
              </td>
              <td className="px-6 md:px-8 py-5 text-white/40 text-xs">{item.date}</td>
              <td className="px-6 md:px-8 py-5">
                <div className="flex gap-2">
                  <button 
                    onClick={() => handlePromoteToCRM(item)}
                    disabled={loadingId === item.id}
                    className="px-3 py-1.5 bg-primary/20 hover:bg-primary/40 text-primary border border-primary/30 rounded-lg text-xs font-bold transition-all disabled:opacity-50"
                  >
                    {loadingId === item.id ? '등록 중...' : 'CRM 등록'}
                  </button>
                  <button 
                    onClick={() => handleDeleteInquiry(item.id)}
                    disabled={loadingId === item.id}
                    className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 rounded-lg transition-all disabled:opacity-50"
                    title="문의 삭제"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
