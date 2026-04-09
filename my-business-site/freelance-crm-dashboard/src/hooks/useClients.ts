import { useState, useEffect } from 'react';
import { Client } from '../types';

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch clients from the server API
  const fetchClients = async () => {
    try {
      const res = await fetch('/api/crm/clients');
      if (res.ok) {
        const data = await res.json();
        setClients(data);
      }
    } catch (e) {
      console.error('Failed to fetch clients from server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const addClient = async (client: Omit<Client, 'id' | 'createdAt'>) => {
    const newClient: Client = {
      ...client,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    
    try {
      const res = await fetch('/api/crm/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newClient),
      });
      if (res.ok) {
        setClients((prev) => [newClient, ...prev]);
      }
    } catch (e) {
      console.error('Failed to add client');
    }
  };

  const updateClient = async (id: string, updates: Partial<Client>) => {
    const existingClient = clients.find(c => c.id === id);
    if (!existingClient) return;
    
    const updatedClient = { ...existingClient, ...updates };
    
    try {
      const res = await fetch('/api/crm/clients', {
        method: 'POST', // The same endpoint handles add/update in our implementation
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedClient),
      });
      if (res.ok) {
        setClients((prev) =>
          prev.map((client) => (client.id === id ? updatedClient : client))
        );
      }
    } catch (e) {
      console.error('Failed to update client');
    }
  };

  const deleteClient = async (id: string) => {
    try {
      const res = await fetch('/api/crm/clients', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setClients((prev) => prev.filter(c => c.id !== id));
      }
    } catch (e) {
      console.error('Failed to delete client');
    }
  };

  return {
    clients,
    loading,
    addClient,
    updateClient,
    deleteClient,
    refresh: fetchClients
  };
}
