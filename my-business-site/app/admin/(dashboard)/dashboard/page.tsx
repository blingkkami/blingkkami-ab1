import { supabase } from '@/lib/supabase';
import DashboardSummaryContainer from './DashboardSummaryContainer';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // 1. Fetch recent inquiries
  const { data: inquiries } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  // 2. Fetch all clients for stats and upcoming deadlines
  const { data: clients } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false });

  // Data mapping for consistency
  const mappedInquiries = (inquiries || []).map(item => ({ ...item }));
  const mappedClients = (clients || []).map(item => ({
    ...item,
    paymentStatus: item.payment_status,
    createdAt: item.created_at
  }));

  return (
    <div className="w-full h-full">
      <DashboardSummaryContainer 
        recentInquiries={mappedInquiries} 
        clients={mappedClients} 
      />
    </div>
  );
}
