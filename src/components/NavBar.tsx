import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Menu, X, User, LogOut } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import Button from './Button';

const NavBar: React.FC = () => {
  const location = useLocation();
  const { theme } = useTheme();
  const { user, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Don't show navbar on welcome page
  if (location.pathname === '/') {
    return null;
  }

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleSignOut = async () => {
    await signOut();
    setMobileMenuOpen(false);
  };

  const publicNavItems = [
    { to: '/survey', label: 'Pre-Survey', active: location.pathname === '/survey' },
    { to: '/explore', label: 'Explore', active: location.pathname.includes('/explore') },
    { to: '/post-survey', label: 'Post-Survey', active: location.pathname === '/post-survey' },
    { to: '/testimonials', label: 'Stories', active: location.pathname.includes('/testimonials') },
    { to: '/about', label: 'About', active: location.pathname === '/about' },
    { to: '/feedback', label: 'Feedback', active: location.pathname === '/feedback' }
  ];

  const authenticatedNavItems = [
    { to: '/dashboard', label: 'Dashboard', active: location.pathname === '/dashboard' },
    { to: '/journal', label: 'Journal', active: location.pathname === '/journal' },
    { to: '/surveys', label: 'Surveys', active: location.pathname === '/surveys' },
    { to: '/explore', label: 'Explore', active: location.pathname.includes('/explore') },
    { to: '/testimonials', label: 'Stories', active: location.pathname.includes('/testimonials') },
    { to: '/about', label: 'About', active: location.pathname === '/about' },
    { to: '/feedback', label: 'Feedback', active: location.pathname === '/feedback' }
  ];

  const navItems = user ? authenticatedNavItems : publicNavItems;

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to={user ? "/dashboard" : "/"} className="flex items-center space-x-2">
                <Leaf size={28} color={theme.colors.darkGreen} />
                <span className="font-semibold text-lg text-emerald-800">Dear Future Me</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-6">
              {navItems.map((item) => (
                <NavLink key={item.to} to={item.to} active={item.active}>
                  {item.label}
                </NavLink>
              ))}
            </nav>
            
            {/* Desktop Auth/Profile */}
            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <Link to="/profile">
                    <Button variant="outline\" size="sm">
                      <User size={16} className="mr-2" />
                      Profile
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={handleSignOut}>
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button variant="outline" size="sm" onClick={() => handleAuthClick('signin')}>
                    Sign In
                  </Button>
                  <Button size="sm" onClick={() => handleAuthClick('signup')}>
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
            
            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-emerald-800 hover:bg-emerald-100"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    item.active
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="border-t border-gray-200 pt-3 mt-3">
                {user ? (
                  <div className="space-y-2">
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      <User size={16} className="mr-2" />
                      Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        handleAuthClick('signin');
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        handleAuthClick('signup');
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, active, children }) => {
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
        active
          ? 'bg-emerald-100 text-emerald-800'
          : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'
      }`}
    >
      {children}
    </Link>
  );
};

export default NavBar;