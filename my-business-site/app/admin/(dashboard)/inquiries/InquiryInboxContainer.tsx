"use client";

import React, { useState, useEffect } from 'react';
import InquiryList from '../dashboard/InquiryList';
import { Mail, RefreshCw, MessageCircle } from 'lucide-react';

interface InquiryInboxContainerProps {
  initialInquiries: any[];
}

export default function InquiryInboxContainer({ initialInquiries }: InquiryInboxContainerProps) {
  const [inquiries, setInquiries] = useState<any[]>(initialInquiries);
  const [loading, setLoading] = useState(false);

  const refreshInquiries = async () => {
    setLoading(true);
    try {
      // In a real app, you'd have a GET /api/contact route
      // For now, we rely on the server-side initial fetch or a simple refresh
      window.location.reload(); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-white mb-2 underline decoration-primary/50 decoration-4 underline-offset-8">
            문의 내역 (Inbox)
          </h1>
          <p className="text-zinc-500 font-medium font-sans">홈페이지를 통해 접수된 실시간 잠재 고객 리스트입니다.</p>
        </div>
        <button 
          onClick={refreshInquiries}
          className="flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold rounded-2xl hover:text-white transition-all"
        >
          <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          새로고침
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-primary/5 border border-primary/20 p-6 rounded-3xl">
          <div className="text-primary mb-2"><Mail size={24} /></div>
          <div className="text-2xl font-black text-white">{inquiries.length}</div>
          <div className="text-xs text-zinc-500 font-bold uppercase mt-1">Total Leads</div>
        </div>
        <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl">
          <div className="text-emerald-400 mb-2"><MessageCircle size={24} /></div>
          <div className="text-2xl font-black text-white">{inquiries.filter(i => i.status === '신규 접수').length}</div>
          <div className="text-xs text-zinc-500 font-bold uppercase mt-1">Unread / New</div>
        </div>
      </div>

      <section className="bg-zinc-900/30 rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl">
        <InquiryList inquiries={inquiries} />
      </section>
    </div>
  );
}
