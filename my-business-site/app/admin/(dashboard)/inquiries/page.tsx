import { supabase } from '@/lib/supabase';
import InquiryInboxContainer from './InquiryInboxContainer';

export const dynamic = 'force-dynamic';

export default async function InquiriesPage() {
  const { data: inquiries, error } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Fetch Error:', error);
  }

  const mappedInquiries = (inquiries || []).map(item => ({
    ...item,
    date: new Date(item.created_at).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
  }));

  return (
    <div className="w-full h-full">
      <InquiryInboxContainer initialInquiries={mappedInquiries} />
    </div>
  );
}
