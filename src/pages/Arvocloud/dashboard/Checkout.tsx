import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { supabase } from '../lib/supabase';
import { FileText, CreditCard, CheckCircle, Copy, Check, X } from 'lucide-react';

interface Invoice {
  id: string;
  invoice_number: string;
  amount: number;
  status: string;
  created_at: string;
  orders: {
    products: {
      name: string;
      category: string;
    };
    os_choice: string;
    duration_value: number;
    duration_unit: string;
  };
}

export function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // Fungsi upload bukti ke Supabase Storage
  const handleUploadProof = async () => {
    if (!selectedFile || !id) {
      alert("Silakan pilih file bukti transfer terlebih dahulu!");
      return;
    }

    setUploading(true);
    try {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${id}_${Date.now()}.${fileExt}`;
      const filePath = `payment_proofs/${fileName}`;

      // Upload ke Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('proofs') 
        .upload(filePath, selectedFile, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // Ambil URL file
      const { data: publicData } = supabase.storage
        .from('proofs')
        .getPublicUrl(filePath);

      const publicUrl = publicData?.publicUrl;

      // Update status invoice & simpan link bukti
      const { error: updateError } = await supabase
        .from('invoices')
        .update({
          status: 'pending_verification',
          proof_url: publicUrl,
        })
        .eq('id', id);

      if (updateError) throw updateError;

      alert('Bukti pembayaran berhasil diunggah! Admin akan segera memverifikasi.');
      navigate('/app/invoices');
    } catch (error) {
      console.error(error);
      alert('Gagal mengunggah bukti pembayaran.');
    } finally {
      setUploading(false);
    }
  };

  const formatRupiah = (value: number) =>
  value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });

  useEffect(() => {
    fetchInvoice();
  }, [id]);

  const fetchInvoice = async () => {
    if (!id) return;

    const { data, error } = await supabase
      .from('invoices')
      .select(`
        *,
        orders (
          products (
            name,
            category
          ),
          os_choice,
          duration_value,
          duration_unit
        )
      `)
      .eq('id', id)
      .single();

    if (!error && data) {
      setInvoice(data);
    }
    setLoading(false);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMarkAsPaid = async () => {
    if (!id) return;

    await supabase
      .from('invoices')
      .update({ status: 'pending_verification' })
      .eq('id', id);

    alert('Notifikasi pembayaran telah dikirim! Admin akan segera memverifikasi pembayaran Anda.');
    navigate('/app/invoices');
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (!invoice) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-gray-600">Invoice tidak ditemukan</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Detail Invoice</h1>
                <p className="text-gray-600">{invoice.invoice_number}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Dibuat pada</p>
              <p className="font-medium text-gray-900">
                {new Date(invoice.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="border-t border-b border-gray-200 py-6 space-y-4">
            <h2 className="font-semibold text-gray-900 text-lg">Detail Pesanan</h2>

            <div className="flex justify-between">
              <span className="text-gray-600">Produk:</span>
              <span className="font-medium text-gray-900">{invoice.orders.products.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Kategori:</span>
              <span className="font-medium text-gray-900">{invoice.orders.products.category}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Operating System:</span>
              <span className="font-medium text-gray-900">{invoice.orders.os_choice}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Durasi:</span>
              <span className="font-medium text-gray-900">
                {invoice.orders.duration_value} {invoice.orders.duration_unit}
              </span>
            </div>
          </div>

          <div className="pt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-semibold text-gray-900">Total Pembayaran:</span>
              <span className="text-3xl font-bold text-blue-600">{formatRupiah(invoice.amount)}</span>
            </div>

            <div
              className={`px-4 py-2 rounded-lg inline-block ${
                invoice.status === 'verified'
                  ? 'bg-green-100 text-green-800'
                  : invoice.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : invoice.status === 'rejected'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              Status: {invoice.status.toUpperCase()}
            </div>
          </div>
        </div>

        {(invoice.status === 'unpaid' || invoice.status === 'rejected') && (
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <CreditCard className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Informasi Pembayaran</h2>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
              <p className="text-gray-700 font-medium">Silakan lakukan transfer ke rekening berikut:</p>

              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Nama Bank</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-gray-900">Bank Rakyat Indonesia (BRI)</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Nomer Rekening</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-mono font-semibold text-gray-900">211801016387508</p>
                    <button
                      onClick={() => handleCopy('211801016387508')}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Atas Nama</p>
                  <p className="text-lg font-semibold text-gray-900">Dimaz Darma</p>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Jumlah yang Harus Dibayar</p>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-blue-600">{formatRupiah(invoice.amount)}</p>
                    <button
                      onClick={() => handleCopy(formatRupiah(invoice.amount))}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Penting:</strong> Setelah melakukan pembayaran, klik tombol di bawah ini
                untuk mengirim notifikasi ke admin. Pembayaran Anda akan diverifikasi secara manual
                dan server akan aktif setelah dikonfirmasi.
              </p>
            </div>

            <button
              onClick={() => setShowUploadModal(true)}
              className="w-full bg-green-600 text-white py-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Saya Sudah Melakukan Pembayaran</span>
            </button>
          </div>
        )}

        {invoice.status === 'pending_verification' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-900 mb-2">Pembayaran Menunggu Verifikasi</h3>
                <p className="text-yellow-800">
                  Notifikasi pembayaran Anda telah diterima. Tim admin kami akan segera memverifikasi
                  dan mengaktifkan server Anda. Anda akan menerima notifikasi melalui WhatsApp
                  setelah verifikasi selesai.
                </p>
              </div>
            </div>
          </div>
        )}

        {invoice.status === 'paid' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-900 mb-2">Pembayaran Terverifikasi</h3>
                <p className="text-green-800">
                  Pembayaran Anda telah berhasil diverifikasi dan server sedang disiapkan. Anda dapat
                  melihat detail login server di halaman <strong>Server Saya</strong> setelah aktif.
                </p>
              </div>
            </div>
          </div>
        )}

        {invoice.status === 'rejected' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 mb-2">Pembayaran Ditolak</h3>
                <p className="text-red-800">
                  Pembayaran Anda tidak dapat diverifikasi. Pastikan Anda telah mentransfer ke rekening yang benar
                  dan sesuai dengan nominal invoice. Silakan ulangi pembayaran atau hubungi admin.
                </p>
              </div>
            </div>
          </div>
        )}

        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-md relative">
              <button
                onClick={() => setShowUploadModal(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Upload Bukti Pembayaran
              </h2>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2 mb-4"
              />

              <button
                onClick={handleUploadProof}
                disabled={uploading}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                {uploading ? 'Mengunggah...' : 'Kirim Bukti Pembayaran'}
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
