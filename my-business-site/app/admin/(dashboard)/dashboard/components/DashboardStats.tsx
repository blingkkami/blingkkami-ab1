"use client";

import React from 'react';
import { formatCurrency } from '../crm-utils';
import { Users, Briefcase, CreditCard, TrendingUp } from 'lucide-react';

interface DashboardStatsProps {
  clients: any[];
}

export default function DashboardStats({ clients }: DashboardStatsProps) {
  const activeProjects = clients.filter(c => !['완료'].includes(c.status));
  const totalRevenue = clients.reduce((sum, c) => sum + (Number(c.price) || 0), 0);
  const pendingRevenue = clients
    .filter(c => c.paymentStatus !== '잔금 완료(완납)')
    .reduce((sum, c) => sum + (Number(c.price) || 0), 0);

  const stats = [
    {
      title: '총 클라이언트',
      value: clients.length,
      icon: Users,
      color: 'text-blue-400 bg-blue-500/10',
      suffix: '명'
    },
    {
      title: '진행 중인 프로젝트',
      value: activeProjects.length,
      icon: Briefcase,
      color: 'text-pink-300 bg-pink-300/10 shadow-[0_0_15px_rgba(249,168,212,0.2)]',
      suffix: '건'
    },
    {
      title: '누적 예상 매출',
      value: formatCurrency(totalRevenue),
      icon: TrendingUp,
      color: 'text-emerald-400 bg-emerald-500/10',
      suffix: ''
    },
    {
      title: '미수금 / 잔금 대기',
      value: formatCurrency(pendingRevenue),
      icon: CreditCard,
      color: 'text-orange-400 bg-orange-500/10',
      suffix: ''
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div key={i} className="bg-[#111111] rounded-2xl p-6 border border-zinc-800 flex items-center gap-4 transition-all hover:border-zinc-700 hover:translate-y-[-2px]">
            <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center shrink-0`}>
              <Icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-400 mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {stat.value}
                {stat.suffix && <span className="text-base font-medium text-zinc-500 ml-1">{stat.suffix}</span>}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}
