"use client";

import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      // 1. 단일 로컬 API 호출 (Gmail 발송 + 로컬 DB 저장 동시 처리)
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error("전송 실패");

      // 2. 예쁜 완료 화면으로 이동
      window.location.href = '/thank-you';

    } catch (err) {
      alert("전송 중 문제가 발생했습니다. 에러가 지속되면 이메일로 직접 문의해주세요.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-white/80">이름</label>
          <input type="text" name="name" required className="w-full bg-[#FFB6C1]/20 border border-[#FFB6C1]/40 rounded-xl px-4 py-3 text-white placeholder:text-[#FFB6C1]/50 focus:outline-none focus:border-[#FFB6C1] focus:ring-4 focus:ring-[#FFB6C1]/20 focus:bg-[#FFB6C1]/30 transition-all hover:border-[#FFB6C1]/60" placeholder="홍길동" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-white/80">연락처 (이메일 또는 카카오톡 ID)</label>
          <input type="text" name="contact" required className="w-full bg-[#FFB6C1]/20 border border-[#FFB6C1]/40 rounded-xl px-4 py-3 text-white placeholder:text-[#FFB6C1]/50 focus:outline-none focus:border-[#FFB6C1] focus:ring-4 focus:ring-[#FFB6C1]/20 focus:bg-[#FFB6C1]/30 transition-all hover:border-[#FFB6C1]/60" placeholder="연락 가능한 정보를 남겨주세요" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-white/80">상품 링크 또는 간단한 상품 설명</label>
        <input type="text" name="product" required className="w-full bg-[#FFB6C1]/20 border border-[#FFB6C1]/40 rounded-xl px-4 py-3 text-white placeholder:text-[#FFB6C1]/50 focus:outline-none focus:border-[#FFB6C1] focus:ring-4 focus:ring-[#FFB6C1]/20 focus:bg-[#FFB6C1]/30 transition-all hover:border-[#FFB6C1]/60" placeholder="기존 링크나 예정된 상품의 정보를 적어주세요" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-white/80">희망 패키지</label>
        <select name="package" className="w-full bg-[#FFB6C1]/20 border border-[#FFB6C1]/40 rounded-xl px-4 py-3 text-[#FFB6C1] focus:outline-none focus:border-[#FFB6C1] focus:ring-4 focus:ring-[#FFB6C1]/20 focus:bg-[#FFB6C1]/30 transition-all hover:border-[#FFB6C1]/60 appearance-none">
          <option value="모르겠음">아직 모르겠음 (상담 후 결정)</option>
          <option value="A">패키지 A (스타터)</option>
          <option value="B">패키지 B (성장형)</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-white/80">추가 전달 사항</label>
        <textarea name="message" rows={4} className="w-full bg-[#FFB6C1]/20 border border-[#FFB6C1]/40 rounded-xl px-4 py-3 text-white placeholder:text-[#FFB6C1]/50 focus:outline-none focus:border-[#FFB6C1] focus:ring-4 focus:ring-[#FFB6C1]/20 focus:bg-[#FFB6C1]/30 transition-all hover:border-[#FFB6C1]/60 resize-none" placeholder="글을 길게 쓰지 않으셔도 괜찮습니다. 추가로 전달하고 싶은 내용이 있다면 적어주세요! (필수 안내 항목만으로 1영업일 이내 회신 드립니다)"></textarea>
      </div>
      <button type="submit" disabled={loading} className="w-full py-4 mt-2 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all active:scale-[0.98] shadow-lg disabled:opacity-50">
        {loading ? "메일 전송 중..." : "접수하고 답변 기다리기"}
      </button>
    </form>
  );
}
