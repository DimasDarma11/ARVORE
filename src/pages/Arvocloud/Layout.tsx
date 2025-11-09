import { ReactNode, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  ShoppingCart,
  FileText,
  LogOut,
  Shield,
  User,
  Menu,
  X,
  Server,
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      setMenuOpen(false);
      setTimeout(() => navigate('/app/login'), 200);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: '/app/dashboard', label: 'My Servers', icon: <Server className="w-5 h-5" /> },
    { to: '/app/order', label: 'Order Server', icon: <ShoppingCart className="w-5 h-5" /> },
    { to: '/app/invoices', label: 'Invoices', icon: <FileText className="w-5 h-5" /> },
  ];

  if (profile?.is_admin) {
    navLinks.push({ to: '/app/admin', label: 'Admin', icon: <Shield className="w-5 h-5" /> });
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* NAVBAR */}
      <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="/app/dashboard"
              className="flex items-center space-x-2"
            >
              <img
                src="https://i.ibb.co/VWzggVqJ/Arvocloud1.png"
                alt="ArvoCloud Logo"
                className="w-10 h-10 rounded-lg object-cover"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive(link.to)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {link.icon}
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}

              {/* Profile & Logout */}
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                <Link
                  to="/app/profile"
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {profile?.full_name || 'Profile'}
                  </span>
                </Link>

                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-md animate-slideDown">
            <div className="px-4 py-3 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive(link.to)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {link.icon}
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}

              <div className="border-t border-gray-200 pt-3 mt-3">
                <Link
                  to="/app/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 p-3 rounded-lg"
                >
                  <User className="w-5 h-5" />
                  <span>{profile?.full_name || 'Profile'}</span>
                </Link>

                <button
                  onClick={() => {
                    handleSignOut();
                    setMenuOpen(false);
                  }}
                  className="flex items-center w-full space-x-2 text-red-600 hover:bg-red-50 p-3 rounded-lg mt-1"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}
