import { CreditCard, TrendingUp, Wallet, ArrowUpRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { formatCurrency } from '../dashboard/crm-utils';

export const dynamic = 'force-dynamic';

export default async function PaymentsPage() {
  const { data: clients } = await supabase.from('clients').select('price, payment_status');
  
  const totalRevenue = (clients || []).reduce((sum, c) => sum + (Number(c.price) || 0), 0);
  const receivedRevenue = (clients || [])
    .filter(c => c.payment_status === '잔금 완료(완납)')
    .reduce((sum, c) => sum + (Number(c.price) || 0), 0);
  const pendingRevenue = totalRevenue - receivedRevenue;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-black tracking-tighter text-white mb-2 underline decoration-emerald-500/50 decoration-4 underline-offset-8">
          결제 및 정산 관리
        </h1>
        <p className="text-zinc-500 font-medium font-sans">누적 매출 현황과 정산 대기 금액을 실시간으로 집계합니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111111] border border-zinc-800 p-8 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp size={80} />
          </div>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Total Expected Revenue</p>
          <div className="text-3xl font-black text-white">{formatCurrency(totalRevenue)}</div>
          <div className="mt-4 flex items-center gap-1 text-emerald-400 text-xs font-bold">
            <ArrowUpRight size={14} /> 누적 프로젝트 기준
          </div>
        </div>

        <div className="bg-[#111111] border border-zinc-800 p-8 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Wallet size={80} />
          </div>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Received Amount</p>
          <div className="text-3xl font-black text-white">{formatCurrency(receivedRevenue)}</div>
          <div className="mt-4 flex items-center gap-1 text-zinc-500 text-xs font-bold">
            완납된 프로젝트 총액
          </div>
        </div>

        <div className="bg-emerald-500/5 border border-emerald-500/20 p-8 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-emerald-500">
            <CreditCard size={80} />
          </div>
          <p className="text-emerald-500/60 text-xs font-bold uppercase tracking-widest mb-2">Pending / Accounts Receivable</p>
          <div className="text-3xl font-black text-emerald-400">{formatCurrency(pendingRevenue)}</div>
          <div className="mt-4 flex items-center gap-1 text-emerald-500 text-xs font-bold">
            정산 대기 중인 잔금
          </div>
        </div>
      </div>

      <section className="bg-zinc-900/30 p-10 rounded-3xl border border-zinc-800 text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-500 mb-6">
          <CreditCard size={32} />
        </div>
        <h3 className="text-xl font-bold text-white">상세 결제 목록 및 영수증 기능</h3>
        <p className="text-zinc-500 max-w-md mx-auto">토스페이먼츠 또는 나이스페이 연동 시 이곳에서 실제 결제 승인 내역을 확인하고 전자 영수증을 발행할 수 있습니다.</p>
        <button className="px-6 py-2 bg-zinc-800 text-zinc-400 text-xs font-bold rounded-full cursor-not-allowed">
          PG사 연동 대기 중
        </button>
      </section>
    </div>
  );
}
