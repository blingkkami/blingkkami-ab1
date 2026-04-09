"use client";

import React from 'react';
import DashboardStats from './components/DashboardStats';
import { LayoutDashboard, Users, MessageSquare, ArrowRight, Calendar } from 'lucide-react';
import { calculateDDay, getDDayColor } from './crm-utils';

interface DashboardSummaryProps {
  recentInquiries: any[];
  clients: any[];
}

export default function DashboardSummaryContainer({ recentInquiries, clients }: DashboardSummaryProps) {
  // Get active projects with upcoming deadlines
  const upcomingProjects = clients
    .filter(c => c.status !== '완료' && c.deadline)
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-white mb-2 underline decoration-primary decoration-4 underline-offset-8">
            마스터 대시보드
          </h1>
          <p className="text-zinc-500 font-medium">Blingkkami 비즈니스의 전체 통계와 주요 일정을 요약합니다.</p>
        </div>
      </div>

      {/* Overview stats */}
      <DashboardStats clients={clients} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Inquiries (Latest 5) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <MessageSquare size={20} className="text-primary" />
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">Recent Inquiries</h2>
            </div>
            <a href="/admin/inquiries" className="text-xs text-zinc-500 hover:text-primary transition-colors flex items-center gap-1 group">
              View Inbox <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          <div className="bg-[#111111] border border-zinc-800 rounded-2xl overflow-hidden divide-y divide-zinc-800/50">
            {recentInquiries.length === 0 ? (
              <p className="p-8 text-center text-zinc-600 text-sm">신규 문의가 없습니다.</p>
            ) : (
              recentInquiries.map((inquiry) => (
                <div key={inquiry.id} className="p-4 hover:bg-zinc-800/30 transition-colors flex justify-between items-center">
                  <div>
                    <div className="text-sm font-bold text-white">{inquiry.name}</div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">{inquiry.product || '상품 미지정'}</div>
                  </div>
                  <div className="text-[10px] text-zinc-600 font-medium">
                    {new Date(inquiry.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Upcoming Deadlines (Next 5) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-primary" />
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">Upcoming Deadlines</h2>
            </div>
            <a href="/admin/clients" className="text-xs text-zinc-500 hover:text-primary transition-colors flex items-center gap-1 group">
              Full List <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          <div className="bg-[#111111] border border-zinc-800 rounded-2xl overflow-hidden divide-y divide-zinc-800/50">
            {upcomingProjects.length === 0 ? (
              <p className="p-8 text-center text-zinc-600 text-sm">현재 활성화된 프로젝트가 없습니다.</p>
            ) : (
              upcomingProjects.map((client) => (
                <div key={client.id} className="p-4 hover:bg-zinc-800/30 transition-colors flex justify-between items-center">
                  <div>
                    <div className="text-sm font-bold text-white">{client.name}</div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">{client.status}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] border ${getDDayColor(client.deadline)}`}>
                    {calculateDDay(client.deadline)}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
