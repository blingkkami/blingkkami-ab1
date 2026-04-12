import React from 'react';
import { LayoutDashboard, Users, Settings, Briefcase, Bell } from 'lucide-react';

export function Sidebar() {
  return (
    <div className="w-64 bg-black text-white h-screen flex flex-col fixed left-0 top-0 border-r border-zinc-800">
      <div className="p-6 flex items-center gap-3 border-b border-zinc-800">
        <img 
          src="/logo.png" 
          alt="Blingkkami Logo" 
          className="h-8 w-auto object-contain" 
          style={{ mixBlendMode: 'screen' }}
        />
        <h1 className="text-lg font-bold tracking-tight">CRM</h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <a href="#" className="flex items-center gap-3 px-4 py-3 bg-purple-500/10 text-purple-400 rounded-xl font-medium transition-colors">
          <LayoutDashboard size={20} />
          대시보드
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:bg-zinc-900 hover:text-pink-400 rounded-xl font-medium transition-colors">
          <Users size={20} />
          클라이언트 관리
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:bg-zinc-900 hover:text-pink-400 rounded-xl font-medium transition-colors">
          <Bell size={20} />
          알림
        </a>
      </nav>
      
      <div className="p-4 border-t border-zinc-800">
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:bg-zinc-900 hover:text-pink-400 rounded-xl font-medium transition-colors">
          <Settings size={20} />
          설정
        </a>
        
        <div className="mt-4 flex items-center gap-3 px-4 py-2">
          <div className="w-8 h-8 rounded-full bg-pink-300 flex items-center justify-center text-sm font-bold text-pink-950 shadow-[0_0_10px_rgba(249,168,212,0.4)]">
            ME
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">관리자</span>
            <span className="text-xs text-zinc-500">Free Plan</span>
          </div>
        </div>
      </div>
    </div>
  );
}
