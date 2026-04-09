"use client";

import React, { useState, useEffect } from 'react';
import DashboardStats from './components/DashboardStats';
import ClientTable from './components/ClientTable';
import ClientModal from './components/ClientModal';
import InquiryList from './InquiryList';
import { Plus, UserPlus } from 'lucide-react';

interface DashboardContainerProps {
  initialInquiries: any[];
}

export default function DashboardContainer({ initialInquiries }: DashboardContainerProps) {
  const [clients, setClients] = useState<any[]>([]);
  const [inquiries] = useState<any[]>(initialInquiries);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<any | null>(null);

  // Fetch clients from our API
  const fetchClients = async () => {
    try {
      const res = await fetch('/api/crm/clients');
      if (res.ok) {
        const data = await res.json();
        setClients(data);
      }
    } catch (e) {
      console.error('Failed to fetch clients');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSaveClient = async (formData: any) => {
    // 신규 등록 시에는 ID를 넘기지 않아 Supabase가 UUID를 생성하게 함
    const clientData = editingClient 
      ? { ...editingClient, ...formData }
      : { ...formData }; // id and createdAt omitted for new clients
    
    try {
      const res = await fetch('/api/crm/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientData),
      });
      if (res.ok) {
        await fetchClients();
      }
    } catch (e) {
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  const handleDeleteClient = async (id: string) => {
    if (!confirm('정말로 삭제하시겠습니까?')) return;
    try {
      const res = await fetch('/api/crm/clients', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        await fetchClients();
      }
    } catch (e) {
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header with quick actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-white mb-2 underline decoration-primary decoration-4 underline-offset-8">
            블링까미 CRM 대시보드
          </h1>
          <p className="text-zinc-500 font-medium">실시간 프로젝트 현황 및 클라이언트를 관리합니다.</p>
        </div>
        <button 
          onClick={() => {
            setEditingClient(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-black font-black rounded-2xl hover:bg-primary-light transition-all shadow-[0_0_20px_rgba(175,82,222,0.3)] hover:scale-105 active:scale-95"
        >
          <UserPlus size={20} />
          신규 파트너 등록
        </button>
      </div>

      {/* Overview stats */}
      <DashboardStats clients={clients} />

      {/* Main CRM area */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-1 h-6 bg-primary rounded-full" />
          <h2 className="text-xl font-bold text-white uppercase tracking-tight">Project Management</h2>
        </div>
        <ClientTable 
          clients={clients} 
          onEdit={(c) => {
            setEditingClient(c);
            setIsModalOpen(true);
          }} 
          onDelete={handleDeleteClient} 
        />
      </section>

      {/* Homepage Inbox */}
      <section className="space-y-4 bg-zinc-900/30 p-8 rounded-3xl border border-zinc-800">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-primary/40 rounded-full" />
            <h2 className="text-xl font-bold text-zinc-300 uppercase tracking-tight">Homepage Inbox</h2>
          </div>
          <span className="text-[10px] font-bold text-zinc-500 bg-zinc-800 px-3 py-1 rounded-full border border-zinc-700">
            신규 접수 {inquiries.length}건
          </span>
        </div>
        <p className="text-sm text-zinc-500 px-2 mb-4 italic">홈페이지를 통해 들어온 실시간 문의입니다. 'CRM 등록' 버튼으로 프로젝트를 시작하세요.</p>
        <div className="bg-black/40 rounded-2xl overflow-hidden border border-zinc-800">
          <InquiryList inquiries={inquiries} />
        </div>
      </section>

      {/* Modal */}
      <ClientModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveClient} 
        editingClient={editingClient}
      />
    </div>
  );
}
