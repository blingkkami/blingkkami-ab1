"use client";

import React, { useState } from 'react';
import { calculateDDay, formatCurrency, getDDayColor, getPaymentStatusColor, getStatusColor } from '../crm-utils';
import { Edit2, Trash2, Search, FileText } from 'lucide-react';

interface ClientTableProps {
  clients: any[];
  onEdit: (client: any) => void;
  onDelete: (id: string) => void;
}

export default function ClientTable({ clients, onEdit, onDelete }: ClientTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (client.contact || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (client.memo || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-[#111111] rounded-2xl border border-zinc-800 overflow-hidden shadow-lg shadow-pink-900/10 mb-10">
      {/* Table Header / Controls */}
      <div className="p-6 bg-gradient-to-r from-[#FFD1DF] to-[#FFB6C1] border-b border-[#FFD1DF]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-black">클라이언트 및 프로젝트 리스트</h2>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={18} />
            <input 
              type="text" 
              placeholder="검색..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/40 border border-primary/30 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-primary w-64 placeholder:text-black/50"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-white/40 border border-primary/30 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-primary [&>option]:bg-zinc-900 [&>option]:text-white"
          >
            <option value="all">모든 상태</option>
            <option value="문의">문의</option>
            <option value="견적">견적</option>
            <option value="계약">계약</option>
            <option value="작업 중">작업 중</option>
            <option value="납품">납품</option>
            <option value="완료">완료</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-900/50 border-b border-zinc-800 text-zinc-400 text-sm">
              <th className="px-6 py-4 font-medium">클라이언트 명</th>
              <th className="px-6 py-4 font-medium">상태</th>
              <th className="px-6 py-4 font-medium">데드라인 (D-Day)</th>
              <th className="px-6 py-4 font-medium">예상 수익</th>
              <th className="px-6 py-4 font-medium">결제 현황</th>
              <th className="px-6 py-4 font-medium">메모</th>
              <th className="px-6 py-4 font-medium text-right">옵션</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {filteredClients.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-zinc-500">
                  표시할 데이터가 없습니다.
                </td>
              </tr>
            ) : (
              filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-zinc-800/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-medium text-zinc-100">{client.name}</div>
                    <div className="text-xs text-zinc-400 mt-1">{client.contact || '연락처 없음'}</div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">경로: {client.channel || '홈페이지'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusColor(client.status)}`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 transition-all">
                    <div className="text-sm text-zinc-300">{client.deadline || '-'}</div>
                    {client.deadline && client.status !== '완료' && (
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] border ${getDDayColor(client.deadline)} transition-colors`}>
                        {calculateDDay(client.deadline)}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-zinc-100">
                      {formatCurrency(client.price)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border ${getPaymentStatusColor(client.paymentStatus)}`}>
                      {client.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-2 max-w-xs">
                      {client.memo && <FileText size={14} className="text-zinc-500 shrink-0 mt-0.5" />}
                      <p className="text-xs text-zinc-400 truncate" title={client.memo}>
                        {client.memo || '-'}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onEdit(client)}
                        className="p-1.5 text-zinc-400 hover:text-primary-light hover:bg-primary/10 rounded-md transition-all hover:scale-110"
                        title="수정"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => onDelete(client.id)}
                        className="p-1.5 text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-md transition-colors"
                        title="삭제"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
