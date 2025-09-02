import React from 'react';
import { Menu, X, User, Moon, Sun, Bot } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import type { UserRole } from '../types';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  selectedRole: UserRole | 'General AI';
}

export const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen, selectedRole }) => {
  const { user, isAuthenticated } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <header 
      role="banner" 
      aria-label="Main application header"
      className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 shadow-lg flex-shrink-0 relative z-20 pt-safe"
    >
      <div className="flex items-center justify-between">
        {/* Left Section - Enhanced Branding */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden touch-target p-2 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-lg sm:rounded-xl transition-all duration-200 backdrop-blur-sm min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            {sidebarOpen ? (
              <X className="text-gray-700 dark:text-gray-300 w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Menu className="text-gray-700 dark:text-gray-300 w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>

          {/* Enhanced App Branding */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                <Bot className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                CemtrAS AI
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 truncate">
                  {selectedRole} Expert Active
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Enhanced Controls */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4">
          {/* Enhanced Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="touch-target p-2 sm:p-2.5 md:p-3 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-lg sm:rounded-xl transition-all duration-200 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 min-w-[44px] min-h-[44px] flex items-center justify-center"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? (
              <Sun className="text-yellow-500 w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Moon className="text-gray-600 w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>

          {/* Enhanced User Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden xl:flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 bg-green-100/80 dark:bg-green-900/30 rounded-lg sm:rounded-xl border border-green-200/50 dark:border-green-800/50 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm font-bold text-green-700 dark:text-green-400">
                Online & Ready
              </span>
            </div>

            {user ? (
              <div className="flex items-center gap-1 sm:gap-2 md:gap-3 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-white/80 dark:bg-gray-800/80 rounded-lg sm:rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg backdrop-blur-sm">
                <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white hidden lg:inline truncate max-w-16">
                  {user.name.length > 8 ? user.name.substring(0, 8) + '...' : user.name}
                </span>
                <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg">
                  <User className="text-white w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1 sm:gap-2 md:gap-3 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-white/80 dark:bg-gray-800/80 rounded-lg sm:rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg backdrop-blur-sm">
                <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center shadow-lg">
                  <User className="text-white w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};