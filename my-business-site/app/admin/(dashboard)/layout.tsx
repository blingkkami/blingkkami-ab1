import type { Metadata } from 'next';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: '관리자 센터 | Blingkkami',
  description: '블링까미 관리자 전용 페이지',
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // === 핵심 보안: 페이지별 인증 체크 로직 ===
  // 로그인 안 된 사용자가 접근하면 무조건 튕겨냅니다.
  const cookieStore = await cookies();
  if (cookieStore.get("admin_auth")?.value !== "true") {
    redirect("/admin"); // 로그인 페이지로 즉시 리다이렉트
  }

  // 관리자 전용 레이아웃 렌더링
  return (
    <div className="flex min-h-screen bg-[#0A0A0A] text-white">
      {/* Sidebar Area */}
      <aside className="w-64 bg-black border-r border-white/10 hidden md:flex flex-col sticky top-0 h-screen">
        <div className="h-20 flex items-center px-8 border-b border-white/10">
          <span className="font-bold text-lg text-primary tracking-tight">✨ Admin Panel</span>
        </div>
        
        <nav className="flex-1 py-8 px-4 flex flex-col gap-2">
          <span className="text-xs font-bold text-white/40 uppercase tracking-wider px-4 mb-2">Management</span>
          <a href="/admin/dashboard" className="px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-white/80 hover:text-white font-medium flex items-center gap-3">
            <span>📊</span> 대시보드
          </a>
          <a href="/admin/inquiries" className="px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-white/80 hover:text-white font-medium flex items-center gap-3">
            <span>📨</span> 문의 내역 관리
          </a>
          <a href="/admin/payments" className="px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-white/80 hover:text-white font-medium flex items-center gap-3">
            <span>💳</span> 결제 내역 관리
          </a>
        </nav>
        
        <div className="p-4 border-t border-white/10 flex flex-col gap-2">
          {/* 로그아웃 버튼 로직 */}
          <form action={async () => {
             "use server";
             const store = await cookies();
             store.delete("admin_auth");
             redirect("/admin");
          }}>
            <button type="submit" className="w-full px-4 py-3 text-center rounded-xl bg-white/5 hover:bg-white/10 text-sm font-bold transition-colors">
              🔒 안전하게 로그아웃
            </button>
          </form>
          
          <a href="/" className="block px-4 py-3 text-center rounded-xl bg-white/5 hover:bg-white/10 text-sm font-bold transition-colors">
            🏠 내 퍼블릭 사이트로
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col p-8 md:p-12 w-full max-w-full relative">
        {children}
      </main>
    </div>
  );
}
