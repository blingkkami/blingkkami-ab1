import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Get all clients
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    // Map snake_case from DB to camelCase for Frontend
    const mappedData = data.map((item: any) => ({
      ...item,
      paymentStatus: item.payment_status,
      createdAt: item.created_at
    }));

    return NextResponse.json(mappedData);
  } catch (error) {
    console.error('Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 });
  }
}

// Add or update clients
export async function POST(request: Request) {
  try {
    const client = await request.json();
    
    // Map camelCase to snake_case for DB
    const dbClient = {
      id: client.id,
      name: client.name,
      contact: client.contact,
      channel: client.channel,
      status: client.status,
      deadline: client.deadline || null,
      price: client.price || 0,
      payment_status: client.paymentStatus,
      memo: client.memo,
    };

    const { error } = await supabase
      .from('clients')
      .upsert(dbClient);

    if (error) throw error;
    
    return NextResponse.json({ success: true, client });
  } catch (error) {
    console.error('Save Error:', error);
    return NextResponse.json({ error: 'Failed to save client' }, { status: 500 });
  }
}

// Delete client
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete Error:', error);
    return NextResponse.json({ error: 'Failed to delete client' }, { status: 500 });
  }
}
