import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { CheckCircle, Loader2, XCircle } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

export function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');

  useEffect(() => {
    const token = searchParams.get('token_hash');
    const type = searchParams.get('type');
    const email = searchParams.get('email');

    if (!token || !type || !email) {
      setStatus('error');
      return;
    }

    const verify = async () => {
      try {
        const { error } = await supabase.auth.verifyOtp({ email, token_hash: token, type });
        if (error) throw error;
        setStatus('success');
      } catch (err) {
        console.error('Verification failed:', err);
        setStatus('error');
      }
    };

    verify();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-6">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 text-center">
        {status === 'verifying' && (
          <div>
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800">Memverifikasi email kamu...</h1>
            <p className="text-gray-500 mt-2">Harap tunggu sebentar, kami sedang memastikan tautan kamu valid.</p>
          </div>
        )}

        {status === 'success' && (
          <div>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800">Verifikasi Berhasil 🎉</h1>
            <p className="text-gray-600 mt-2">
              Email kamu telah berhasil dikonfirmasi. Sekarang kamu bisa masuk ke dashboard ArvoCloud.
            </p>
            <Link
              to="/app/login"
              className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Masuk Sekarang
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800">Verifikasi Gagal</h1>
            <p className="text-gray-600 mt-2">
              Tautan konfirmasi sudah tidak valid atau telah digunakan.
            </p>
            <Link
              to="/app/login"
              className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Kembali ke Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
