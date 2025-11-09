import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../Layout';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../contexts/AuthContext';
import { FileText, Eye } from 'lucide-react';

interface Invoice {
  id: string;
  invoice_number: string;
  amount: number;
  status: string;
  created_at: string;
  orders: {
    products: {
      name: string;
    };
  };
}

export function Invoices() {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchInvoices();
    }
  }, [user]);

  const fetchInvoices = async () => {
    if (!user?.id) return;

    const { data, error } = await supabase
      .from('invoices')
      .select(`
        *,
        orders (
          products (
            name
          )
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setInvoices(data);
    }
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending_verification':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'unpaid':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'rejected':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatRupiah = (value: number) =>
    value.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Daftar Invoice</h1>
          <p className="text-gray-600 mt-2">Lihat dan kelola riwayat tagihan Anda di sini.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : invoices.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum ada invoice</h3>
            <p className="text-gray-600">Invoice Anda akan muncul di sini setelah melakukan pemesanan.</p>
          </div>
        ) : (
          <>
            {/* 💻 Desktop View */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nomor Invoice</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produk</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 text-gray-400 mr-2" />
                          <span className="text-sm font-medium text-gray-900">{invoice.invoice_number}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.orders.products.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {formatRupiah(invoice.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full border ${getStatusColor(invoice.status)}`}>
                          {invoice.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(invoice.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Link to={`/app/checkout/${invoice.id}`} className="text-blue-600 hover:text-blue-900 flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 📱 Mobile Card View */}
            <div className="md:hidden space-y-4">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="bg-white shadow-sm rounded-lg p-4 border border-gray-100"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <span className="font-semibold text-gray-900 text-sm">
                        {invoice.invoice_number}
                      </span>
                    </div>
                    <span
                      className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${getStatusColor(
                        invoice.status
                      )}`}
                    >
                      {invoice.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 mb-1">
                    <span className="font-medium">Produk:</span> {invoice.orders.products.name}
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    <span className="font-medium">Jumlah:</span> {formatRupiah(invoice.amount)}
                  </p>
                  <p className="text-sm text-gray-500 mb-3">
                    {new Date(invoice.created_at).toLocaleDateString()}
                  </p>

                  <Link
                    to={`/app/checkout/${invoice.id}`}
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-900 font-medium"
                  >
                    <Eye className="w-4 h-4 mr-1" /> Lihat Detail
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
