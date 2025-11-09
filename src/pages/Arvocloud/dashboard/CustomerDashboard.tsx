import { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Server, Clock, CheckCircle, AlertCircle, XCircle, Eye, X, RefreshCcw } from 'lucide-react';

interface Order {
  id: string;
  product_id: string;
  os_choice: string;
  status: string;
  created_at: string;
  expires_at: string | null;
  region: string | null;
  products: {
    name: string;
    category: string;
  };
}

interface Credentials {
  ip_address: string | null;
  username: string | null;
  password: string | null;
}

export function CustomerDashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [credentials, setCredentials] = useState<Credentials | null>(null);
  const [renewing, setRenewing] = useState<string | null>(null);
  const [showRenew, setShowRenew] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user?.id) fetchOrders();
  }, [user?.id]);
  
  const fetchOrders = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        region, 
        products (
          name,
          category
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setOrders(data);
    }
    setLoading(false);
  };

  const handleViewCredentials = async (order: Order) => {
    if (order.status !== 'active') return;

    const { data, error } = await supabase
      .from('server_credentials')
      .select('*')
      .eq('order_id', order.id)
      .maybeSingle();

    if (!error && data) {
      setCredentials(data);
      setSelectedOrder(order);
      setShowModal(true);
    }
  };

  const handleRenew = async (order: Order) => {
    try {
      setRenewing(order.id);

      const invoiceNumber = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      
      const { data: newInvoice, error } = await supabase
        .from('invoices')
        .insert([
          {
            user_id: user?.id,
            order_id: order.id,
            amount: order.products?.price_per_month || 100000,
            status: 'unpaid',
            renewal_for: order.id,
            invoice_number: invoiceNumber,
          },
        ])
        .select('*');

      if (error) throw error;
      alert(`✅ Invoice berhasil dibuat!\nNomor: ${newInvoice[0].invoice_number}`);
    } catch (err) {
      console.error(err);
      alert('❌ Gagal membuat invoice perpanjangan.');
    } finally {
      setRenewing(null);
    }
  };

  const daysLeft = (expires_at: string | null) => {
    if (!expires_at) return null;
    const diffMs = new Date(expires_at).getTime() - new Date().getTime();
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'provisioning':
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
      case 'suspended':
      case 'expired':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'provisioning':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'suspended':
      case 'expired':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Servers</h1>
          <p className="text-gray-600 mt-2">Manage and monitor your cloud infrastructure</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Server className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No servers yet</h3>
            <p className="text-gray-600 mb-6">Get started by ordering your first server</p>
            <a
              href="/app/order"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Order Server
            </a>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className={`bg-white rounded-xl shadow-sm border-2 p-6 transition-all ${
                  order.status === 'active'
                    ? 'hover:shadow-lg hover:border-blue-300 cursor-pointer'
                    : 'border-gray-200'
                }`}
                onClick={() => order.status === 'active' && handleViewCredentials(order)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Server className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{order.products.name}</h3>
                      <p className="text-sm text-gray-500">{order.products.category}</p>
                    </div>
                  </div>
                  {getStatusIcon(order.status)}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">OS:</span>
                    <span className="font-medium text-gray-900">{order.os_choice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Region:</span>
                    <span className="font-medium text-gray-900">{order.region || '-'}</span>
                  </div>
                  {order.expires_at && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Expires:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(order.expires_at).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status.toUpperCase()}
                  </span>
                  {order.status === 'active' && (
                     <div className="flex gap-2">
                      {order.status === 'active' && (
                        <button
                          onClick={() => handleViewCredentials(order)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      )}

                      {showRenew && (
                        <button
                          onClick={() => handleRenew(order)}
                          disabled={renewing === order.id}
                          className="flex items-center gap-1 text-green-600 hover:text-green-700 font-medium"
                        >
                          {renewing === order.id ? (
                            <Clock className="w-4 h-4 animate-spin" />
                          ) : (
                            <RefreshCcw className="w-4 h-4" />
                          )}
                          <span>{renewing === order.id ? 'Renewing...' : 'Renew'}</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && selectedOrder && credentials && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Server Credentials</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-600 mb-1">Server Name</h3>
                <p className="text-lg font-semibold text-gray-900">{selectedOrder.products.name}</p>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-purple-600 mb-1">Region</h3>
                <p className="text-lg font-semibold text-gray-900">{selectedOrder.region || 'Not assigned'}</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-600 mb-1">IP Address</h3>
                <p className="text-lg font-mono font-semibold text-gray-900">
                  {credentials.ip_address || 'Not assigned yet'}
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-green-600 mb-1">Username</h3>
                <p className="text-lg font-mono font-semibold text-gray-900">
                  {credentials.username || 'Not assigned yet'}
                </p>
              </div>

              <div className="bg-yellow-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-yellow-600 mb-1">Password</h3>
                <p className="text-lg font-mono font-semibold text-gray-900 break-all">
                  {credentials.password || 'Not assigned yet'}
                </p>
              </div>

              {selectedOrder.expires_at && (
                <div className="bg-red-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-red-600 mb-1">Expiry Date</h3>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(selectedOrder.expires_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
