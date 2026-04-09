import type { Metadata } from 'next';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut, 
  ExternalLink,
  Bell
} from 'lucide-react';

export const metadata: Metadata = {
  title: '관리자 센터 | Blingkkami',
  description: '블링까미 관리자 전용 페이지',
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  if (cookieStore.get("admin_auth")?.value !== "true") {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen bg-[#0A0A0A] text-zinc-100 selection:bg-primary/30">
      {/* CRM Sidebar */}
      <aside className="w-64 bg-black border-r border-zinc-800 hidden md:flex flex-col sticky top-0 h-screen z-50">
        <div className="p-6 flex items-center gap-3 border-b border-zinc-800">
          <img 
            src="/logo.png" 
            alt="Blingkkami Logo" 
            className="h-8 w-auto object-contain" 
            style={{ mixBlendMode: 'screen' }}
          />
          <h1 className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">CRM</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <div className="px-4 py-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">General</div>
          <a href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-xl font-medium transition-all hover:scale-[1.02] active:scale-95">
            <LayoutDashboard size={20} />
            대시보드
          </a>
          <a href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:bg-zinc-900 hover:text-primary-light rounded-xl font-medium transition-all hover:translate-x-1">
            <Users size={20} />
            클라이언트 관리
          </a>
          <a href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:bg-zinc-900 hover:text-primary-light rounded-xl font-medium transition-all hover:translate-x-1">
            <MessageSquare size={20} />
            문의 내역 (Inbox)
          </a>
          <div className="px-4 py-2 mt-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Notifications</div>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:bg-zinc-900 hover:text-primary-light rounded-xl font-medium transition-all hover:translate-x-1">
            <Bell size={20} />
            알림 센터
          </a>
        </nav>
        
        <div className="p-4 border-t border-zinc-800 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:bg-zinc-900 hover:text-primary-light rounded-xl font-medium transition-all">
            <Settings size={20} />
            설정
          </a>
          
          <div className="flex flex-col gap-1 mt-2">
            <form action={async () => {
               "use server";
               const store = await cookies();
               store.delete("admin_auth");
               redirect("/admin");
            }}>
              <button type="submit" className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 text-zinc-400 hover:text-rose-400 text-sm font-bold transition-all group">
                <span className="flex items-center gap-3"><LogOut size={18} /> 로그아웃</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </button>
            </form>
            
            <a href="/" className="flex items-center justify-between px-4 py-3 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 text-zinc-400 hover:text-white text-sm font-bold transition-all group">
              <span className="flex items-center gap-3"><ExternalLink size={18} /> 홈페이지로</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
            </a>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col p-6 md:p-10 w-full max-w-full relative overflow-x-hidden">
        {/* Subtle Background Decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        {children}
      </main>
    </div>
  );
}
