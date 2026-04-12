export default function ThankYouPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] bg-primary/20 blur-[100px] rounded-full -z-10" />
      
      <div className="bg-white/5 p-12 rounded-3xl border border-white/10 text-center max-w-lg mx-4 backdrop-blur-md shadow-2xl">
        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_20px_rgba(107,63,160,0.6)]">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-4 tracking-tight">접수 완료되었습니다!</h1>
        <p className="text-white/60 mb-8 leading-relaxed font-light">
          요청해주신 귀하의 프로젝트 문의를 성공적으로 전달받았습니다.<br/>
          내용 확인 후 기재해주신 연락처로 24시간 내에 답변 드리겠습니다.
        </p>
        <a href="/" className="block w-full py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors border border-white/5">
          홈으로 돌아가기
        </a>
      </div>
    </div>
  );
}
