import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    if (cookieStore.get("admin_auth")?.value !== "true") {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { newPassword } = await request.json();

    const { error } = await supabase
      .from('site_settings')
      .upsert({ key: 'admin_password', value: newPassword });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Password Update Error:", error);
    return NextResponse.json({ error: '비밀번호 변경 실패' }, { status: 500 });
  }
}
