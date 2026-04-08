import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLogin() {
  // 이미 인증된 쿠키(admin_auth)가 있다면 로그인 폼을 생략하고 바로 대시보드로 이동
  const cookieStore = await cookies();
  if (cookieStore.get("admin_auth")?.value === "true") {
    redirect("/admin/dashboard");
  }

  // 간단한 로그인 처리 서버 액션
  async function loginAction(formData: FormData) {
    "use server";
    const password = formData.get("password");
    
    // 블링까미님 전용 임시 비밀번호 설정
    if (password === "admin1234") {
      const store = await cookies();
      store.set("admin_auth", "true", { httpOnly: true, path: "/" });
      redirect("/admin/dashboard");
    } else {
      // 비밀번호가 틀리면 다시 에러 매개변수와 함께 리다이렉트
      redirect("/admin?error=wrong");
    }
  }

  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <div className="bg-white/5 border border-white/10 p-10 rounded-3xl w-full max-w-sm backdrop-blur-md shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/10 blur-[60px] rounded-full -z-10" />

        <h1 className="text-2xl font-bold text-center mb-8">관리자 센터 로그인</h1>
        <p className="text-sm text-center text-white/50 mb-8">사이트 관리 및 현황 조회를 위한 권한이 필요합니다.</p>
        
        {/* React Server Action을 통한 폼 제출 연동 */}
        <form action={loginAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white/80 font-medium">관리자 아이디</label>
            <input type="text" name="username" defaultValue="admin" readOnly className="w-full bg-black/40 border border-white/10 px-4 py-3 rounded-xl outline-none text-white/50 cursor-not-allowed" />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label className="text-sm text-white/80 font-medium">비밀번호 (초기 비번: admin1234)</label>
            <input type="password" name="password" required className="w-full bg-black/40 border border-white/10 px-4 py-3 rounded-xl focus:border-primary outline-none transition-colors text-white" placeholder="••••••••" />
          </div>
          
          <button type="submit" className="w-full py-4 bg-primary text-white text-center font-bold rounded-xl hover:bg-purple-600 transition-colors shadow-[0_0_15px_rgba(107,63,160,0.5)]">
            안전하게 접속하기
          </button>
        </form>
      </div>
    </div>
  );
}
