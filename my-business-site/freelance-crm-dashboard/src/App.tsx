import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardStats } from './components/DashboardStats';
import { ClientTable } from './components/ClientTable';
import { ClientModal } from './components/ClientModal';
import { useClients } from './hooks/useClients';
import { Client } from './types';
import { Plus } from 'lucide-react';

export default function App() {
  const { clients, addClient, updateClient, deleteClient } = useClients();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const handleOpenModal = (client?: Client) => {
    if (client) {
      setEditingClient(client);
    } else {
      setEditingClient(null);
    }
    setIsModalOpen(true);
  };

  const handleSaveClient = (clientData: Omit<Client, 'id' | 'createdAt'>) => {
    if (editingClient) {
      updateClient(editingClient.id, clientData);
    } else {
      addClient(clientData);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex font-sans text-zinc-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">대시보드</h1>
              <p className="text-zinc-400 mt-1">클라이언트 및 프로젝트 진행 현황을 관리하세요.</p>
            </div>
            
            <button 
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 bg-pink-300 hover:bg-pink-200 text-pink-950 px-5 py-2.5 rounded-xl font-medium transition-all shadow-[0_0_15px_rgba(249,168,212,0.4)] hover:shadow-[0_0_25px_rgba(249,168,212,0.6)] border-0"
            >
              <Plus size={20} />
              새 클라이언트
            </button>
          </header>

          {/* Stats */}
          <DashboardStats clients={clients} />

          {/* Table */}
          <ClientTable 
            clients={clients} 
            onEdit={handleOpenModal}
            onDelete={deleteClient}
          />
        </div>
      </main>

      {/* Modal */}
      <ClientModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveClient}
        editingClient={editingClient}
      />
    </div>
  );
}
