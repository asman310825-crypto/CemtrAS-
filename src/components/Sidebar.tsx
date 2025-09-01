import React, { useState, useEffect } from 'react';
import { Bot, User, LogOut, X, Plus, MessageSquare, Zap, History } from 'lucide-react';
import { RoleSelector } from './RoleSelector';
import { useAuth } from '../contexts/AuthContext';
import { useChatHistory } from '../contexts/ChatHistoryContext';
import type { UserRole, ChatHistory } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRole: UserRole | 'General AI';
  onRoleChange: (role: UserRole | 'General AI') => void;
  onLoadChat: (history: ChatHistory) => void;
  onNewChat: () => void;
  messageCount: number;
  isLoading: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  selectedRole,
  onRoleChange,
  onLoadChat,
  onNewChat,
  messageCount,
  isLoading
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { histories } = useChatHistory();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    setShowLogoutConfirm(false);
    onClose();
    window.location.reload();
  };

  const handleChatSelect = (chatId: string) => {
    const history = histories.find(h => h.id === chatId);
    if (history) {
      onLoadChat(history);
      // Auto-close sidebar on mobile/tablet after selection
      if (window.innerWidth < 1024) {
        onClose();
      }
    }
  };

  const handleRoleChange = (role: UserRole | 'General AI') => {
    onRoleChange(role);
    // Auto-close sidebar on mobile/tablet after role selection
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const handleNewChatClick = () => {
    onNewChat();
    // Auto-close sidebar on mobile/tablet after new chat
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  // Enhanced auto-close for touch devices
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        // Keep sidebar open on desktop
        return;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden touch-target"
          onClick={onClose}
        />
      )}

      {/* Enhanced Sidebar */}
      <div 
        className={`
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          fixed lg:static z-50 lg:z-auto
          w-64 sm:w-72 md:w-80 lg:w-72 xl:w-80 h-full
          bg-white/90 dark:bg-gray-900/90 backdrop-blur-md
          border-r border-gray-200/50 dark:border-gray-700/50
          flex flex-col shadow-2xl lg:shadow-xl
          transition-all duration-300 ease-in-out
          top-0 lg:top-auto mobile-viewport-fix
        `}
      >
        {/* Enhanced Sidebar Header */}
        <div className="p-3 sm:p-4 md:p-5 lg:p-6 border-b border-gray-200/50 dark:border-gray-700/50 flex-shrink-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg sm:rounded-xl shadow-xl">
                  <Bot className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-sm sm:text-base font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  CemtrAS by VS
                </h2>
                <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                  AI Expert 
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden touch-target p-2 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-lg sm:rounded-xl transition-colors backdrop-blur-sm min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <X className="text-gray-500 dark:text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Enhanced User Profile */}
          {user && (
            <div className="p-2 sm:p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg sm:rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
              <div className="flex items-center gap-2 mb-1 sm:mb-2">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg">
                  <User className="text-white w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white truncate">
                    {user.name.length > 12 ? user.name.substring(0, 12) + '...' : user.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-green-600 dark:text-green-400">
                      Active
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="touch-target p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
                  title="Logout"
                >
                  <LogOut className="text-gray-400 hover:text-red-500 w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Content Area */}
        <div className="flex-1 flex flex-col min-h-0 p-3 sm:p-4 md:p-5 lg:p-6 space-y-3 sm:space-y-4 md:space-y-6 overflow-y-auto scrollbar-thin overscroll-contain">
          {/* New Chat Button */}
          <button
            onClick={handleNewChatClick}
            className="w-full flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-lg sm:rounded-xl md:rounded-2xl transition-all duration-200 font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-xs sm:text-sm md:text-base touch-target min-h-[44px]"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>New Chat Session</span>
          </button>

          {/* Role Selection */}
          <div>
            <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-500" />
              Select Expertise
            </h4>
            <div className="max-h-64 sm:max-h-80 md:max-h-96 lg:max-h-[32rem] overflow-y-auto pr-1 sm:pr-2 scrollbar-thin overscroll-contain">
              <RoleSelector 
                selectedRole={selectedRole}
                onRoleChange={handleRoleChange}
              />
            </div>
          </div>

          {/* Unified Chat History */}
          <div className="flex-1 min-h-0">
            <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-4 flex items-center gap-2">
              <History className="w-5 h-5 text-purple-500" />
              Chat History
            </h4>
            <div className="h-full overflow-y-auto pr-1 sm:pr-2 space-y-2 scrollbar-thin overscroll-contain">
              {histories.length === 0 ? (
                <div className="text-center py-4 sm:py-6 md:py-8">
                  <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-300 dark:text-gray-600 mx-auto mb-2 sm:mb-3" />
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                    No chat history yet
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 px-2">
                    Start a conversation to see your chats here
                  </p>
                </div>
              ) : (
                histories.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => handleChatSelect(chat.id)}
                    className="w-full text-left p-2.5 sm:p-3 md:p-4 bg-white/60 dark:bg-gray-800/60 hover:bg-white/80 dark:hover:bg-gray-800/80 rounded-lg sm:rounded-xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-200 backdrop-blur-sm shadow-sm hover:shadow-md group touch-target min-h-[44px] flex items-center"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 w-full">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md sm:rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                        <MessageSquare className="text-white w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {chat.title.length > 25 ? chat.title.substring(0, 25) + '...' : chat.title}
                        </h5>
                        <div className="flex items-center gap-1 sm:gap-2 mt-1 flex-wrap">
                          <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100/80 dark:bg-blue-900/30 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                            {chat.role === 'General AI' ? 'AI' : chat.role.split(' ')[0]}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {chat.messages.length} messages
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 hidden sm:block">
                          {chat.lastUpdated.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Enhanced Stats */}
          <div className="space-y-2 sm:space-y-3 pt-3 sm:pt-4 border-t border-gray-200/50 dark:border-gray-700/50 flex-shrink-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-200/50 dark:border-blue-800/50">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="text-blue-500 w-4 h-4" />
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                    Messages
                  </span>
                </div>
                <p className="text-lg sm:text-xl md:text-2xl font-black text-blue-700 dark:text-blue-300">{messageCount}</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-green-200/50 dark:border-green-800/50">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="text-green-500 w-4 h-4" />
                  <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wide">
                    Status
                  </span>
                </div>
                <p className={`text-xs sm:text-sm font-black ${isLoading ? 'text-yellow-600 dark:text-yellow-400' : 'text-green-600 dark:text-green-400'}`}>
                  {isLoading ? 'Processing' : 'Ready'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Footer with Attribution */}
        <div className="p-3 sm:p-4 md:p-5 lg:p-6 border-t border-gray-200/50 dark:border-gray-700/50 flex-shrink-0 bg-gradient-to-r from-gray-50/50 to-blue-50/50 dark:from-gray-800/50 dark:to-blue-900/20 pb-safe">
          <div className="text-center space-y-3">
            {/* Attribution */}
            <div className="space-y-1 sm:space-y-2">
              <div className="flex items-center justify-center gap-2 text-xs">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400 font-medium">
                  Made By <span className="text-blue-600 dark:text-blue-400 font-bold">Vipul</span>
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400 font-medium">
                  Idea By <span className="text-purple-600 dark:text-purple-400 font-bold">Akanksha</span>
                </span>
              </div>
            </div>
            
            {/* Powered By */}
            <div className="pt-1 sm:pt-2 border-t border-gray-200/50 dark:border-gray-700/50">
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Powered by <span className="text-blue-600 dark:text-blue-400 font-bold">AI Technology</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4 sm:p-6 mobile-viewport-fix">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-xs sm:max-w-sm w-full shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-center mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                <LogOut className="text-white w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Confirm Logout
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                Are you sure you want to logout? Your chat history will be preserved for when you return.
              </p>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-3 sm:py-4 px-4 sm:px-6 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl sm:rounded-2xl font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 shadow-md text-sm sm:text-base touch-target min-h-[44px] flex items-center justify-center"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl sm:rounded-2xl font-bold hover:from-red-700 hover:to-pink-700 transition-all duration-200 shadow-lg text-sm sm:text-base touch-target min-h-[44px] flex items-center justify-center"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};