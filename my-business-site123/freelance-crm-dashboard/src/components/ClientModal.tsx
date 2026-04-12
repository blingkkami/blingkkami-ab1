import React, { useState, useEffect } from 'react';
import { Client, ProjectStatus, PaymentStatus } from '../types';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (client: Omit<Client, 'id' | 'createdAt'>) => void;
  editingClient?: Client | null;
}

const PROJECT_STATUSES: ProjectStatus[] = ['문의', '견적', '계약', '작업 중', '납품', '완료'];
const PAYMENT_STATUSES: PaymentStatus[] = ['결제 대기', '선입금 완료', '중도금 완료', '잔금 완료(완납)'];
const CHANNELS = ['지인 추천', '검색', 'SNS', '크몽/숨고', '기타'];

const defaultState = {
  name: '',
  contact: '',
  channel: '검색',
  status: '문의' as ProjectStatus,
  deadline: '',
  price: 0,
  paymentStatus: '결제 대기' as PaymentStatus,
  memo: '',
};

export function ClientModal({ isOpen, onClose, onSave, editingClient }: Props) {
  const [formData, setFormData] = useState(defaultState);

  useEffect(() => {
    if (editingClient) {
      setFormData({
        name: editingClient.name,
        contact: editingClient.contact,
        channel: editingClient.channel,
        status: editingClient.status,
        deadline: editingClient.deadline,
        price: editingClient.price,
        paymentStatus: editingClient.paymentStatus,
        memo: editingClient.memo,
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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#111111] border border-zinc-800 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between shrink-0">
          <h2 className="text-xl font-bold text-white">
            {editingClient ? '클라이언트 수정' : '새 클라이언트 등록'}
          </h2>
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <form id="client-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">클라이언트 이름 / 회사명 <span className="text-pink-400">*</span></label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:ring-2 focus:ring-pink-300 focus:border-pink-300 outline-none transition-all placeholder:text-zinc-600"
                  placeholder="예: 홍길동 (스타트업A)"
                />
              </div>

              {/* Contact */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">연락처 <span className="text-pink-400">*</span></label>
                <input 
                  required
                  type="text" 
                  value={formData.contact}
                  onChange={e => setFormData({...formData, contact: e.target.value})}
                  className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:ring-2 focus:ring-pink-300 focus:border-pink-300 outline-none transition-all placeholder:text-zinc-600"
                  placeholder="전화번호 또는 이메일"
                />
              </div>

              {/* Channel */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">유입 경로</label>
                <select 
                  value={formData.channel}
                  onChange={e => setFormData({...formData, channel: e.target.value})}
                  className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:ring-2 focus:ring-pink-300 focus:border-pink-300 outline-none transition-all"
                >
                  {CHANNELS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">프로젝트 상태</label>
                <select 
                  value={formData.status}
                  onChange={e => setFormData({...formData, status: e.target.value as ProjectStatus})}
                  className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:ring-2 focus:ring-pink-300 focus:border-pink-300 outline-none transition-all"
                >
                  {PROJECT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Deadline */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">납기일</label>
                <input 
                  type="date" 
                  value={formData.deadline}
                  onChange={e => setFormData({...formData, deadline: e.target.value})}
                  className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:ring-2 focus:ring-pink-300 focus:border-pink-300 outline-none transition-all"
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">단가 (원)</label>
                <input 
                  type="number" 
                  value={formData.price || ''}
                  onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                  className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:ring-2 focus:ring-pink-300 focus:border-pink-300 outline-none transition-all placeholder:text-zinc-600"
                  placeholder="0"
                />
              </div>

              {/* Payment Status */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-zinc-300">결제 상태</label>
                <div className="flex flex-wrap gap-3">
                  {PAYMENT_STATUSES.map(status => (
                    <label key={status} className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all
                      ${formData.paymentStatus === status ? 'border-pink-300 bg-pink-300/10 text-pink-300 font-medium shadow-[0_0_10px_rgba(249,168,212,0.2)]' : 'border-zinc-700 hover:bg-zinc-800 text-zinc-400'}
                    `}>
                      <input 
                        type="radio" 
                        name="paymentStatus" 
                        value={status}
                        checked={formData.paymentStatus === status}
                        onChange={e => setFormData({...formData, paymentStatus: e.target.value as PaymentStatus})}
                        className="hidden"
                      />
                      {status}
                    </label>
                  ))}
                </div>
              </div>

              {/* Memo */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-zinc-300">메모 / 특이사항</label>
                <textarea 
                  value={formData.memo}
                  onChange={e => setFormData({...formData, memo: e.target.value})}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:ring-2 focus:ring-pink-300 focus:border-pink-300 outline-none transition-all min-h-[100px] resize-y placeholder:text-zinc-600"
                  placeholder="클라이언트의 특별한 요청사항이나 미팅 노트를 기록하세요."
                />
              </div>
            </div>
          </form>
        </div>

        <div className="px-6 py-4 border-t border-zinc-800 bg-[#111111] flex justify-end gap-3 shrink-0">
          <button 
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-zinc-300 hover:bg-zinc-800 bg-zinc-900 border border-zinc-700 rounded-lg transition-colors"
          >
            취소
          </button>
          <button 
            type="submit"
            form="client-form"
            className="px-5 py-2.5 text-sm font-medium text-pink-950 bg-pink-300 hover:bg-pink-200 rounded-lg transition-all shadow-[0_0_15px_rgba(249,168,212,0.4)] hover:shadow-[0_0_25px_rgba(249,168,212,0.6)] border-0"
          >
            {editingClient ? '수정 내용 저장' : '클라이언트 등록'}
          </button>
        </div>
      </div>
    </div>
  );
}
