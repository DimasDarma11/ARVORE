import { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import {
  ShoppingBag,
  FileText,
  Server,
  Settings,
  CheckCircle,
  Edit2,
  Save,
  XCircle,
  PlusCircle,
} from 'lucide-react';

export function Admin() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<'orders' | 'invoices' | 'products' | 'telegram'>('orders');
  const [loading, setLoading] = useState(true);

  const [orders, setOrders] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [credentialsForms, setCredentialsForms] = useState<Record<string, any>>({});

  const [modal, setModal] = useState<any>(null); // { type: 'order'|'invoice'|'product'|'telegram', data: any }

  // Fetch data
  useEffect(() => {
    if (activeTab === 'orders') fetchOrders();
    if (activeTab === 'invoices') fetchInvoices();
    if (activeTab === 'products' && products.length === 0) fetchProducts();
  }, [activeTab]);

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('orders')
      .select(`*, profiles (full_name, whatsapp_number), products (name)`)
      .order('created_at', { ascending: false });
    if (data) {
      setOrders(data);
      const creds: Record<string, any> = {};
      for (const order of data) {
        const { data: c } = await supabase
          .from('server_credentials')
          .select('*')
          .eq('order_id', order.id)
          .maybeSingle();
        if (c) creds[order.id] = c;
      }
      setCredentialsForms(creds);
    }
    setLoading(false);
  };

  const fetchInvoices = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('invoices')
      .select(`*, profiles (full_name)`)
      .order('created_at', { ascending: false });
    if (data) setInvoices(data);
    setLoading(false);
  };

  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (data)
      setProducts(
        data.map((p) => ({
          ...p,
          specs: typeof p.specs === 'string' ? JSON.parse(p.specs) : p.specs || {},
        }))
      );
    setLoading(false);
  };

  // Save / update actions
  const handleSaveCredentials = async (orderId: string) => {
    const c = credentialsForms[orderId];
    if (!c) return;
    await supabase
      .from('server_credentials')
      .update({
        ip_address: c.ip_address,
        username: c.username,
        password: c.password,
        updated_at: new Date().toISOString(),
      })
      .eq('id', c.id);
    alert('Credentials saved!');
    setModal(null);
  };

  const handleSaveProduct = async (product: any) => {
    const payload = {
      category: product.category,
      name: product.name,
      description: product.description,
      price_per_month: product.price_per_month,
      specs: product.specs,
      is_active: product.is_active,
      available_usa: product.available_usa || false,
      available_indonesia: product.available_indonesia || false,
    };
    if (product._isNew) {
      await supabase.from('products').insert([payload]);
      alert('Product added!');
    } else {
      await supabase.from('products').update(payload).eq('id', product.id);
      alert('Product updated!');
    }
    fetchProducts();
    setModal(null);
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm('Yakin ingin menghapus order ini? Data akan dihapus permanen.')) return;

    try {
      // Hapus credentials terkait
      await supabase.from('server_credentials').delete().eq('order_id', orderId);

      // Hapus order utama
      const { error } = await supabase.from('orders').delete().eq('id', orderId);
      if (error) throw error;

      alert('✅ Order berhasil dihapus.');
      setModal(null);
      fetchOrders(); 
    } catch (err) {
      console.error(err);
      alert('❌ Gagal menghapus order. Silakan coba lagi.');
    }
  };

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: newStatus,
          region: modal.data.region,
        })
        .eq('id', orderId);

      if (error) throw error;

      alert('✅ Status berhasil diperbarui.');
      fetchOrders();
      setModal((prev) =>
        prev && prev.data
          ? { ...prev, data: { ...prev.data, status: newStatus } }
          : prev
      );
    } catch (err) {
      console.error(err);
      alert('❌ Gagal memperbarui status.');
    }
  };


  if (!profile?.is_admin)
    return (
      <Layout>
        <div className="text-center py-12 text-red-600">Access denied. Admin privileges required.</div>
      </Layout>
    );

  return (
    <Layout>
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600 text-sm md:text-base">Manage orders, invoices, and system settings</p>
        </header>

        {/* TABS */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200">
          {[
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
            { id: 'invoices', label: 'Invoices', icon: FileText },
            { id: 'products', label: 'Products', icon: Server },
            { id: 'telegram', label: 'Telegram', icon: Settings },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === id ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* ========== ORDERS TAB ========== */}
            {activeTab === 'orders' && (
              <div className="space-y-3">
                {orders.map((o) => (
                  <div
                    key={o.id}
                    onClick={() => setModal({ type: 'order', data: o })}
                    className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center hover:shadow-md transition cursor-pointer"
                  >
                    <div>
                      <h3 className="font-semibold">{o.products.name}</h3>
                      <p className="text-sm text-gray-500">
                        {o.profiles.full_name} ({o.profiles.whatsapp_number})
                      </p>
                      <p className="text-sm text-gray-500">
                        OS: {o.os_choice} — Region: <span className="font-medium">{o.region}</span> —{' '}
                        IP: <span className="font-medium">{o.ip_type === 'public' ? 'Public' : 'NAT'}</span> —{' '}
                        <span className="font-medium text-gray-800">
                          {o.total_price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}
                        </span>
                      </p>             
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-gray-100">{o.status}</span>
                  </div>
                ))}
              </div>
            )}

            {/* ========== INVOICES TAB ========== */}
            {activeTab === 'invoices' && (
              <div className="space-y-3">
                {invoices.map((inv) => (
                  <div
                    key={inv.id}
                    onClick={() => setModal({ type: 'invoice', data: inv })}
                    className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center hover:shadow-md transition cursor-pointer"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-900">{inv.invoice_number}</h3>
                      <p className="text-sm text-gray-500">{inv.profiles.full_name}</p>
                      <p className="text-sm text-gray-600">
                        Rp {inv.amount?.toLocaleString('id-ID')} -{' '}
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            inv.status === 'paid'
                              ? 'bg-green-100 text-green-700'
                              : inv.status === 'rejected'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {inv.status}
                        </span>
                      </p>
                      {inv.proof_url && (
                        <p>
                          <a href={inv.proof_url} target="_blank" className="text-blue-600 hover:underline">
                            Lihat Bukti
                          </a>
                        </p>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">{new Date(inv.created_at).toLocaleDateString('id-ID')}</p>
                  </div>
                ))}
              </div>
            )}

            {/* ========== PRODUCTS TAB ========== */}
            {activeTab === 'products' && (
              <div className="space-y-3">
                <button
                  onClick={() =>
                    setModal({
                      type: 'product',
                      data: { category: 'VPS', name: '', description: '', price_per_month: 0, specs: {}, is_active: true, _isNew: true },
                    })
                  }
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                >
                  <PlusCircle className="w-4 h-4" /> Add Product
                </button>

                {products.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setModal({ type: 'product', data: p })}
                    className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center hover:shadow-md transition cursor-pointer"
                  >
                    <div>
                      <h3 className="font-semibold">{p.name}</h3>
                      <p className="text-sm text-gray-500">{p.category}</p>
                      <p className="text-sm text-gray-700">Rp {p.price_per_month.toLocaleString('id-ID')}/bulan</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full ${p.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {p.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* ========== TELEGRAM TAB ========== */}
            {activeTab === 'telegram' && (
              <div
                onClick={() =>
                  setModal({
                    type: 'telegram',
                    data: {
                      token: '',
                      chatId: '',
                    },
                  })
                }
                className="bg-white rounded-xl shadow-sm p-5 text-gray-600 cursor-pointer hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-900">Telegram Configuration</h3>
                <p className="text-sm">Tap to configure your Telegram Bot for notifications</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* ========== UNIVERSAL MODAL ========== */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-3">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative space-y-4 overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setModal(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg"
            >
              ✕
            </button>

            {/* ORDER DETAIL */}
            {modal.type === 'order' && (
              <>
                <h3 className="text-xl font-semibold">{modal.data.products.name}</h3>
                <p>{modal.data.profiles.full_name} ({modal.data.profiles.whatsapp_number})</p>
                <p>OS: {modal.data.os_choice}</p>
                <p>IP Type: {modal.data.ip_type === 'public' ? 'Public' : 'NAT'}</p>
                
                <div className="mt-3">
                  <label className="text-sm font-semibold block mb-1">Server Region</label>
                  <select
                    value={modal.data.region}
                    onChange={(e) =>
                      setModal((prev) => prev && prev.data ? { ...prev, data: { ...prev.data, region: e.target.value } } : prev)
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="USA">USA</option>
                    <option value="Indonesia">Indonesia</option>
                  </select>
                </div>
                
                <p>Total: Rp {modal.data.total_price.toLocaleString('id-ID')}</p>

                <div className="mt-3">
                  <label className="text-sm font-semibold block mb-1">Status Order</label>
                  <select
                    value={modal.data.status}
                    onChange={(e) => handleUpdateStatus(modal.data.id, e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="provisioning">Provisioning</option>
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>

                <div className="border-t pt-3 space-y-2">
                  <h4 className="font-semibold">Server Credentials</h4>
                  {credentialsForms[modal.data.id] &&
                    ['ip_address', 'username', 'password'].map((f) => (
                      <input
                        key={f}
                        type="text"
                        placeholder={f}
                        value={credentialsForms[modal.data.id][f] || ''}
                        onChange={(e) =>
                          setCredentialsForms((prev) => ({
                            ...prev,
                            [modal.data.id]: { ...prev[modal.data.id], [f]: e.target.value },
                          }))
                        }
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      />
                    ))}
                  <button
                    onClick={() => handleSaveCredentials(modal.data.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full mt-2"
                  >
                    <Save className="w-4 h-4 inline-block mr-1" /> Save
                    
                  </button>
                  <button
                    onClick={() => handleDeleteOrder(modal.data.id)}
                    className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg mt-4"
                  >
                    <XCircle className="w-4 h-4" />
                      Hapus Order
                  </button>
                </div>
              </>
            )}

            {/* INVOICE DETAIL */}
            {modal.type === 'invoice' && (
              <>
                <h3 className="text-xl font-semibold">Invoice #{modal.data.invoice_number}</h3>
                <p>{modal.data.profiles.full_name}</p>
                <p>Rp {modal.data.amount.toLocaleString('id-ID')}</p>
                <p>Status: {modal.data.status}</p>
                
                {modal.data.proof_url && (
                  <div className="mt-3">
                    <label className="text-sm font-semibold block mb-1">Bukti Pembayaran:</label>
                    <img src={modal.data.proof_url} alt="Proof" className="w-full rounded-md border" />
                  </div>
                )}

                {modal.data.status === 'pending_verification' && (
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={async () => {
                        await supabase.from('invoices').update({ status: 'paid' }).eq('id', modal.data.id);
                        fetchInvoices();
                        setModal(null);
                      }}
                      className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 inline mr-1" /> Verify
                    </button>
                    <button
                      onClick={async () => {
                        await supabase.from('invoices').update({ status: 'rejected' }).eq('id', modal.data.id);
                        fetchInvoices();
                        setModal(null);
                      }}
                      className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                    >
                      <XCircle className="w-4 h-4 inline mr-1" /> Reject
                    </button>
                  </div>
                )}
              </>
            )}

            {/* PRODUCT DETAIL */}
            {modal.type === 'product' && (
              <>
                <h3 className="text-xl font-semibold">
                  {modal.data._isNew ? 'Add Product' : 'Edit Product'}
                </h3>

                {/* CATEGORY DROPDOWN */}
                <label className="block text-sm font-medium text-gray-700 mt-2">
                  Category
                </label>
                <select
                  value={modal.data.category}
                  onChange={(e) =>
                    setModal((prev: any) => ({
                      ...prev,
                      data: { ...prev.data, category: e.target.value },
                    }))
                  }            
                  className="w-full border px-3 py-2 rounded-lg text-sm"
                >
                  <option value="VPS">VPS</option>
                  <option value="RDP">RDP</option>
                  <option value="Baremetal">Baremetal</option>
                </select>

                <input
                  type="text"
                  placeholder="Name"
                  value={modal.data.name}
                  onChange={(e) =>
                    setModal((prev: any) => ({
                      ...prev,
                      data: { ...prev.data, name: e.target.value },
                    }))
                  }
                  className="w-full border px-3 py-2 rounded-lg text-sm mt-2"
                />

                <textarea
                  placeholder="Description"
                  value={modal.data.description}
                  onChange={(e) =>
                    setModal((prev: any) => ({
                      ...prev,
                      data: { ...prev.data, description: e.target.value },
                    }))
                  }
                  className="w-full border px-3 py-2 rounded-lg text-sm mt-2"
                />

                <input
                  type="number"
                  placeholder="Price per month"
                  value={modal.data.price_per_month}
                  onChange={(e) =>
                    setModal((prev: any) => ({
                      ...prev,
                      data: { ...prev.data, price_per_month: Number(e.target.value) },
                    }))
                  }
                  className="w-full border px-3 py-2 rounded-lg text-sm mt-2"
                />

                {['cpu', 'ram', 'storage', 'bandwidth'].map((s) => (
                  <input
                    key={s}
                    type="text"
                    placeholder={s.toUpperCase()}
                    value={modal.data.specs?.[s] || ''}
                    onChange={(e) =>
                      setModal((prev: any) => ({
                      ...prev,
                      data: {
                        ...prev.data,
                        specs: { ...prev.data.specs, [s]: e.target.value },
                      },
                    }))
                  }
                  className="w-full border px-3 py-2 rounded-lg text-sm mt-2"
                />
              ))}

              <label className="flex items-center gap-2 text-sm mt-2">
                <input
                  type="checkbox"
                  checked={modal.data.is_active}
                  onChange={(e) =>
                    setModal((prev: any) => ({
                      ...prev,
                      data: { ...prev.data, is_active: e.target.checked },
                    }))
                  }
                />
                Active
              </label>

              {/* REGION AVAILABILITY */}
              <div className="mt-3">
                <label className="block text-sm font-semibold mb-1">Available Regions</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={modal.data.available_usa || false}
                      onChange={(e) =>
                        setModal((prev: any) => ({
                          ...prev,
                          data: { ...prev.data, available_usa: e.target.checked },
                        }))
                      }
                    />
                    USA
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={modal.data.available_indonesia || false}
                      onChange={(e) =>
                        setModal((prev: any) => ({
                          ...prev,
                          data: { ...prev.data, available_indonesia: e.target.checked },
                        }))
                      }
                    />
                    Indonesia
                  </label>
                </div>
              </div>

              <button
                  onClick={() => handleSaveProduct(modal.data)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full mt-3"
              >
                <Save className="w-4 h-4 inline mr-1" /> Save
              </button>
            </>
          )}


            {/* TELEGRAM CONFIG */}
            {modal.type === 'telegram' && (
              <>
                <h3 className="text-xl font-semibold">Telegram Configuration</h3>
                <input
                  type="text"
                  placeholder="Bot Token"
                  className="w-full border px-3 py-2 rounded-lg text-sm"
                />
                <input
                  type="text"
                  placeholder="Chat ID"
                  className="w-full border px-3 py-2 rounded-lg text-sm"
                />
                <p className="text-gray-500 text-xs mt-2">Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in Edge Functions</p>
                <button
                  onClick={() => setModal(null)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full mt-2"
                >
                  Save
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}
