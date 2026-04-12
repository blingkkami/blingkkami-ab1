"use client";

import React, { useState, useEffect } from 'react';
import DashboardStats from '../dashboard/components/DashboardStats';
import ClientTable from '../dashboard/components/ClientTable';
import ClientModal from '../dashboard/components/ClientModal';
import { UserPlus, RefreshCw } from 'lucide-react';

export default function ClientManagementContainer() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<any | null>(null);

  const fetchClients = async () => {
    setLoading(true);
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
    const clientData = editingClient 
      ? { ...editingClient, ...formData }
      : { ...formData };
    
    try {
      const res = await fetch('/api/crm/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientData),
      });
      if (res.ok) {
        await fetchClients();
        setIsModalOpen(false);
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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-white mb-2 underline decoration-[#FFD1DF] decoration-4 underline-offset-8">
            클라이언트 관리
          </h1>
          <p className="text-zinc-500 font-medium font-sans">모든 고객사 정보와 프로젝트 단계, 정산 현황을 마스터 관리합니다.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={fetchClients}
            className="p-3 bg-zinc-900 text-zinc-400 rounded-2xl hover:text-white transition-all border border-zinc-800"
          >
            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          </button>
          <button 
            onClick={() => {
              setEditingClient(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FFD1DF] to-[#FFB6C1] text-pink-950 font-black rounded-2xl hover:opacity-90 transition-all shadow-[0_0_20px_rgba(255,182,193,0.3)] hover:scale-105 active:scale-95"
          >
            <UserPlus size={20} />
            신규모집 등록
          </button>
        </div>
      </div>

      <DashboardStats clients={clients} />

      <section className="bg-zinc-900/10 rounded-3xl border border-zinc-800/50 overflow-hidden">
        <ClientTable 
          clients={clients} 
          onEdit={(c) => {
            setEditingClient(c);
            setIsModalOpen(true);
          }} 
          onDelete={handleDeleteClient} 
        />
      </section>

      <ClientModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveClient} 
        editingClient={editingClient}
      />
    </div>
  );
}
