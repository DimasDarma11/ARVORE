import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Cloud } from "lucide-react";

const LoginPage2: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isLogin && !agree) {
      setError("Harap menyetujui Syarat & Ketentuan sebelum mendaftar.");
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password, fullName);
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan, coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 border border-gray-200 shadow-inner mb-4">
            <Cloud className="w-8 h-8 text-gray-700" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">ArvoCloud</h1>
          <p className="text-gray-500 text-sm">Infrastruktur VPS & RDP Premium</p>
        </div>

        {/* Tab Switch */}
        <div className="flex gap-2 mb-8 bg-gray-100 rounded-xl p-1">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-all ${
              isLogin
                ? "bg-gray-900 text-white shadow-md"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-all ${
              !isLogin
                ? "bg-gray-900 text-white shadow-md"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/20 transition-all"
                placeholder="Nama Anda"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/20 transition-all"
              placeholder="nama@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/20 transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          {!isLogin && (
            <div className="flex items-start gap-3 pt-1">
              <input
                type="checkbox"
                id="agree"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1 w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900/30"
              />
              <label
                htmlFor="agree"
                className="text-sm text-gray-600 leading-tight"
              >
                Saya telah membaca dan menyetujui{" "}
                <a
                  href="#"
                  className="text-gray-900 font-medium hover:underline"
                >
                  Syarat & Ketentuan
                </a>{" "}
                penggunaan ArvoCloud.
              </label>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Memproses..." : isLogin ? "Login" : "Buat Akun"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          © {new Date().getFullYear()} ArvoCloud. Semua hak dilindungi.
        </p>
      </div>
    </div>
  );
};

export default LoginPage2;
