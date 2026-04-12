"use client";

import React, { useState } from 'react';
import { Shield, Key, CheckCircle2, AlertCircle } from 'lucide-react';

export default function SettingsPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setStatus('error');
      setMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/admin/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });

      if (res.ok) {
        setStatus('success');
        setMessage('비밀번호가 성공적으로 변경되었습니다. 다음 로그인부터 새로운 비밀번호를 사용하세요.');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        throw new Error();
      }
    } catch (e) {
      setStatus('error');
      setMessage('비밀번호 변경 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-black tracking-tighter text-white mb-2 underline decoration-primary decoration-4 underline-offset-8">
          시스템 설정
        </h1>
        <p className="text-zinc-500 font-medium font-sans">관리자 권한 및 보안 설정을 관리합니다.</p>
      </div>

      <section className="bg-zinc-900/10 rounded-3xl border border-zinc-800 p-8 space-y-8">
        <div className="flex items-center gap-4 border-b border-zinc-800 pb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <Shield size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white uppercase tracking-tight">보안 설정</h2>
            <p className="text-sm text-zinc-500 font-sans">대시보드 접속 비밀번호를 안전하게 변경할 수 있습니다.</p>
          </div>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-zinc-400 font-bold ml-1 uppercase tracking-wider">New Password</label>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="새로운 비밀번호 입력"
                  className="w-full bg-black/40 border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 text-white focus:border-primary outline-none transition-all placeholder:text-zinc-700"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-zinc-400 font-bold ml-1 uppercase tracking-wider">Confirm Password</label>
              <div className="relative">
                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="비밀번호 재확인"
                  className="w-full bg-black/40 border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 text-white focus:border-primary outline-none transition-all placeholder:text-zinc-700"
                  required
                />
              </div>
            </div>
          </div>

          {status === 'success' && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex gap-3 text-emerald-400 text-sm font-medium animate-in zoom-in-95 duration-300">
              <CheckCircle2 size={18} className="shrink-0" />
              {message}
            </div>
          )}

          {status === 'error' && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex gap-3 text-rose-500 text-sm font-medium animate-in zoom-in-95 duration-300">
              <AlertCircle size={18} className="shrink-0" />
              {message}
            </div>
          )}

          <button 
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-4 bg-primary text-black font-black rounded-2xl hover:bg-primary-light transition-all shadow-[0_0_20px_rgba(175,82,222,0.3)] hover:scale-[1.01] active:scale-95 disabled:opacity-50"
          >
            {status === 'loading' ? '변경 중...' : '비밀번호 변경하기'}
          </button>
        </form>
      </section>

      <section className="bg-zinc-900/5 rounded-3xl border border-zinc-800/50 p-8">
        <h3 className="text-white font-bold mb-2">보안 팁</h3>
        <p className="text-sm text-zinc-500 font-sans leading-relaxed">
          * 비밀번호는 숫자, 영문, 특수문자를 조합하여 8자리 이상으로 설정하는 것을 권장합니다.<br/>
          * 비밀번호를 잊어버린 경우 Supabase 대시보드에서 `site_settings` 테이블의 값을 직접 초기화해야 합니다.
        </p>
      </section>
    </div>
  );
}
