"use client";

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (client: any) => void;
  editingClient?: any | null;
}

const PROJECT_STATUSES = ['문의', '견적', '계약', '작업 중', '납품', '완료'];
const PAYMENT_STATUSES = ['결제 대기', '선입금 완료', '중도금 완료', '잔금 완료(완납)'];
const CHANNELS = ['지인 추천', '검색', 'SNS', '크몽/숨고', '기타'];

const defaultState = {
  name: '',
  contact: '',
  channel: '검색',
  status: '문의',
  deadline: '',
  price: 0,
  paymentStatus: '결제 대기',
  memo: '',
};

export default function ClientModal({ isOpen, onClose, onSave, editingClient }: ClientModalProps) {
  const [formData, setFormData] = useState(defaultState);

  useEffect(() => {
    if (editingClient) {
      setFormData({
        name: editingClient.name || '',
        contact: editingClient.contact || '',
        channel: editingClient.channel || '검색',
        status: editingClient.status || '문의',
        deadline: editingClient.deadline || '',
        price: editingClient.price || 0,
        paymentStatus: editingClient.paymentStatus || '결제 대기',
        memo: editingClient.memo || '',
      });
    } else {
      setFormData(defaultState);
    }
  }, [editingClient, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-[#111111] border border-zinc-800 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-8 duration-500">
        <div className="px-6 py-5 border-b border-zinc-800 flex items-center justify-between shrink-0 bg-zinc-950/50">
          <h2 className="text-xl font-bold text-white selection:bg-primary/30">
            {editingClient ? '클라이언트 정보 수정' : '새로운 파트너 등록'}
          </h2>
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-all">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 overflow-y-auto">
          <form id="client-form" onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-400">성함 / 기업명 <span className="text-primary">*</span></label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-zinc-700"
                  placeholder="예: 홍길동 (스타트업A)"
                />
              </div>

              {/* Contact */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-400">연락처 <span className="text-primary">*</span></label>
                <input 
                  required
                  type="text" 
                  value={formData.contact}
                  onChange={e => setFormData({...formData, contact: e.target.value})}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-zinc-700"
                  placeholder="전화번호 또는 이메일"
                />
              </div>

              {/* Channel */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-400">유입 경로</label>
                <select 
                  value={formData.channel}
                  onChange={e => setFormData({...formData, channel: e.target.value})}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none"
                >
                  {CHANNELS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-400">프로젝트 상태</label>
                <select 
                  value={formData.status}
                  onChange={e => setFormData({...formData, status: e.target.value})}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none"
                >
                  {PROJECT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Deadline */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-400">최종 마감일</label>
                <input 
                  type="date" 
                  value={formData.deadline}
                  onChange={e => setFormData({...formData, deadline: e.target.value})}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-sans"
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-400">단가 (KRW)</label>
                <input 
                  type="number" 
                  value={formData.price || ''}
                  onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-zinc-700"
                  placeholder="0"
                />
              </div>

              {/* Payment Status */}
              <div className="space-y-3 md:col-span-2">
                <label className="text-sm font-bold text-zinc-400 font-sans tracking-wide">결제 단계</label>
                <div className="flex flex-wrap gap-2">
                  {PAYMENT_STATUSES.map(status => (
                    <label key={status} className={`
                      flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-all
                      ${formData.paymentStatus === status ? 'border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(175,82,222,0.2)]' : 'border-zinc-800 hover:bg-zinc-800/50 text-zinc-500'}
                    `}>
                      <input 
                        type="radio" 
                        name="paymentStatus" 
                        value={status}
                        checked={formData.paymentStatus === status}
                        onChange={e => setFormData({...formData, paymentStatus: e.target.value})}
                        className="hidden"
                      />
                      {status}
                    </label>
                  ))}
                </div>
              </div>

              {/* Memo */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-zinc-400">추가 정보 및 특이사항</label>
                <textarea 
                  value={formData.memo}
                  onChange={e => setFormData({...formData, memo: e.target.value})}
                  className="w-full px-4 py-4 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all min-h-[120px] resize-none placeholder:text-zinc-700 text-sm leading-relaxed"
                  placeholder="미팅 요약 혹은 주요 요청사항을 적어주세요."
                />
              </div>
            </div>
          </form>
        </div>

        <div className="px-8 py-6 border-t border-zinc-800 bg-zinc-950/50 flex justify-end gap-3 shrink-0">
          <button 
            type="button"
            onClick={onClose}
            className="px-6 py-3 text-sm font-bold text-zinc-400 hover:bg-zinc-800 rounded-xl transition-all"
          >
            닫기
          </button>
          <button 
            type="submit"
            form="client-form"
            className="px-8 py-3 text-sm font-black text-black bg-primary hover:bg-primary-light rounded-xl transition-all shadow-[0_0_20px_rgba(175,82,222,0.4)] hover:scale-105 active:scale-95"
          >
            {editingClient ? '변경사항 저장하기' : '파트너 등록 완료'}
          </button>
        </div>
      </div>
    </div>
  );
}
