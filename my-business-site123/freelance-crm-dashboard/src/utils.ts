export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const calculateDDay = (deadline: string) => {
  if (!deadline) return '';
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(deadline);
  target.setHours(0, 0, 0, 0);
  
  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'D-Day';
  if (diffDays > 0) return `D-${diffDays}`;
  return `D+${Math.abs(diffDays)}`;
};

export const getDDayColor = (deadline: string) => {
  if (!deadline) return 'text-zinc-500 bg-zinc-800 border border-zinc-700';
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(deadline);
  target.setHours(0, 0, 0, 0);
  
  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return 'text-pink-400 bg-pink-400/10 font-bold border border-pink-400/20'; // Overdue
  if (diffDays <= 3) return 'text-rose-400 bg-rose-400/10 font-bold border border-rose-400/20'; // Urgent
  if (diffDays <= 7) return 'text-purple-400 bg-purple-400/10 border border-purple-400/20'; // Soon
  return 'text-zinc-300 bg-zinc-800 border border-zinc-700'; // Plenty of time
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case '문의': return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    case '견적': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    case '계약': return 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20';
    case '작업 중': return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
    case '납품': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    case '완료': return 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border-purple-500/30';
    default: return 'bg-zinc-800 text-zinc-300 border-zinc-700';
  }
};

export const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case '결제 대기': return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    case '선입금 완료': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    case '중도금 완료': return 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20';
    case '잔금 완료(완납)': return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
    default: return 'bg-zinc-800 text-zinc-300 border-zinc-700';
  }
};
