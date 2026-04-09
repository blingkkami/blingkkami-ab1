import { supabase } from '@/lib/supabase';
import DashboardContainer from './DashboardContainer';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // Supabase에서 최신 문의 내역 10건 가져오기
  const { data: inquiries, error } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) {
    console.error('Supabase Fetch Error:', error);
  }

  // 데이터 매핑 (기존 컴포넌트 호환용)
  const mappedInquiries = (inquiries || []).map(item => ({
    ...item,
    date: new Date(item.created_at).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
  }));

  return (
    <div className="w-full h-full">
      <DashboardContainer initialInquiries={mappedInquiries} />
    </div>
  );
}
