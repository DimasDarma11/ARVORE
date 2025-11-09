import React from "react";
import { motion } from "framer-motion";
import { User, Lock } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 overflow-hidden">
      
      {/* Background Accents */}
      <div className="absolute w-72 h-72 bg-blue-100 rounded-full top-16 left-12 blur-3xl opacity-40"></div>
      <div className="absolute w-96 h-96 bg-indigo-100 rounded-full bottom-20 right-12 blur-3xl opacity-40"></div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="z-10 w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl p-10 shadow-xl border border-gray-100"
      >
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Coming Soon 🚧
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Halaman login sedang dalam tahap pengembangan.
        </p>

        {/* Disabled Form */}
        <div className="space-y-4">
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
            <User className="text-gray-500 mr-2" />
            <input
              type="email"
              placeholder="Email"
              disabled
              className="flex-1 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
            />
          </div>

          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
            <Lock className="text-gray-500 mr-2" />
            <input
              type="password"
              placeholder="Password"
              disabled
              className="flex-1 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Login Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() =>
            alert("🚧 Maaf! Halaman Login masih dalam pengembangan.")
          }
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-300"
        >
          Login
        </motion.button>

        {/* Extra Links */}
        <div className="mt-6 flex justify-between text-sm text-gray-500">
          <a
            href="#"
            onClick={() => alert("🚧 Coming Soon!")}
            className="hover:text-blue-600"
          >
            Forgot password?
          </a>
          <a
            href="#"
            onClick={() => alert("🚧 Coming Soon!")}
            className="hover:text-blue-600"
          >
            Sign up
          </a>
        </div>
      </motion.div>

      {/* Footer */}
      <p className="absolute bottom-5 text-gray-400 text-sm">
        © 2025 ARVOCLOUD
      </p>
    </div>
  );
}
