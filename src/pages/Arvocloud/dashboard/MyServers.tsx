import React, { useEffect, useState } from 'react';
import supabase from '../../../lib/supabase';
import { useAuth } from '../../../contexts/AuthContext';
import { Server, Activity, HardDrive, Cpu, Database, KeyRound, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ServerOrder {
  id: string;
  order_number: string;
  status: string;
  billing_period: string;
  created_at: string;
  servers: {
    name: string;
    type: string;
    cpu: string;
    ram: string;
    storage: string;
    os?: string;
    ip_address?: string;
    username?: string;
    password?: string;
  };
}

export const MyServers: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<ServerOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedServer, setSelectedServer] = useState<ServerOrder | null>(null);

  useEffect(() => {
    if (user) loadOrders();
  }, [user]);

  const loadOrders = async () => {
    try {
      setLoading(true);

      const identifier = user?.id || user?.email;
      if (!identifier) return;

      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          servers (
            name,
            type,
            cpu,
            ram,
            storage,
            os,
            ip_address,
            username,
            password
          )
        `)
        .or(`customer_id.eq.${identifier},customer_email.eq.${user?.email}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data as any || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'pending':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">My Servers</h1>
        <p className="text-gray-400">Manage your active servers and orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/10 text-center">
          <Server className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No servers yet</h3>
          <p className="text-gray-400 mb-6">Order your first server to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              onClick={() => order.status === 'active' && setSelectedServer(order)}
              className={`bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all ${
                order.status === 'active' ? 'cursor-pointer hover:bg-white/10' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <Server className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{order.servers.name}</h3>
                    <p className="text-sm text-gray-400">{order.order_number}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-lg border text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status.toUpperCase()}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white/5 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs text-gray-400">CPU</span>
                  </div>
                  <p className="text-sm font-medium text-white">{order.servers.cpu}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Database className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs text-gray-400">RAM</span>
                  </div>
                  <p className="text-sm font-medium text-white">{order.servers.ram}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <HardDrive className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs text-gray-400">Storage</span>
                  </div>
                  <p className="text-sm font-medium text-white">{order.servers.storage}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs text-gray-400">Billing</span>
                  </div>
                  <p className="text-sm font-medium text-white capitalize">{order.billing_period}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-gray-400 mb-1">Ordered on</p>
                <p className="text-sm text-white font-medium">
                  {new Date(order.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Detail Login */}
      <AnimatePresence>
        {selectedServer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setSelectedServer(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 w-full max-w-md text-white"
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Monitor className="w-6 h-6 text-cyan-400" />
                {selectedServer.servers.name}
              </h2>

              <div className="space-y-2 text-sm">
                <p><span className="text-gray-400">OS:</span> {selectedServer.servers.os || 'N/A'}</p>
                <p><span className="text-gray-400">IP Address:</span> {selectedServer.servers.ip_address || '-'}</p>
                <p><span className="text-gray-400">Username:</span> {selectedServer.servers.username || '-'}</p>
                <p><span className="text-gray-400">Password:</span> {selectedServer.servers.password || '-'}</p>
              </div>

              <button
                onClick={() => setSelectedServer(null)}
                className="mt-6 w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white font-medium shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
