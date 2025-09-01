import React, { useState } from 'react';
import { Bot, User, ArrowRight, Shield, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NameEntryScreenProps {
  onComplete: () => void;
}

export const NameEntryScreen: React.FC<NameEntryScreenProps> = ({ onComplete }) => {
  const { authenticateWithName, isLoading, error, clearError } = useAuth();
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim().length < 2) {
      return;
    }

    const success = await authenticateWithName(name);
    if (success) {
      setTimeout(() => onComplete(), 500);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    clearError();
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen mobile-viewport-fix overflow-y-auto pb-safe responsive-container">
      {/* Enhanced Background Pattern */}
      <div className="fixed inset-0 opacity-5 sm:opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 border-4 border-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border-4 border-indigo-500 rounded-lg rotate-45 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 border-4 border-purple-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12 lg:py-16 min-h-screen mobile-viewport-fix flex items-center justify-center landscape-compact">
        <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl w-full relative z-10 space-y-6 sm:space-y-8">
          {/* Enhanced Header */}
          <div className="text-center space-y-4 sm:space-y-6">
            {/* Enhanced Logo with your actual logo */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 rounded-full blur-2xl"></div>
              <div className="relative p-3 sm:p-4 bg-gradient-to-br from-white to-blue-50 rounded-2xl sm:rounded-3xl border-2 border-blue-200 shadow-2xl w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 mx-auto flex items-center justify-center backdrop-blur-sm">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl sm:rounded-2xl shadow-lg flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20">
                  <Bot className="text-white w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                </div>
              </div>
            </div>

            {/* Enhanced Branding */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                AI Assistant
              </h1>
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-1 max-w-12 sm:max-w-16 md:max-w-24"></div>
                <div className="px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm font-bold rounded-full shadow-lg">
                  EXPERT SYSTEM
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-1 max-w-12 sm:max-w-16 md:max-w-24"></div>
              </div>
              <p className="text-sm sm:text-base md:text-lg text-slate-600 font-medium px-4 leading-relaxed">Enter your name to access all premium features</p>
            </div>
          </div>

          {/* Enhanced Name Entry Form */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-slate-200/50 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 sm:py-4 md:py-6 px-4 sm:px-6 md:px-8 text-center">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center justify-center gap-2 sm:gap-3">
                <User className="w-5 h-5 sm:w-6 sm:h-6" />
                Welcome! What's your name?
              </h2>
            </div>

            <div className="p-4 sm:p-6 md:p-8">
              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 text-center backdrop-blur-sm">
                  <p className="text-red-700 font-bold text-xs sm:text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Enhanced Name Input */}
                <div className="relative">
                  <User className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 sm:w-6 sm:h-6" />
                  <input
                    type="text"
                    value={name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full pl-11 sm:pl-12 md:pl-14 pr-4 sm:pr-6 py-3 sm:py-4 md:py-5 lg:py-6 border-2 border-slate-300 rounded-xl sm:rounded-2xl 
                             focus:border-blue-500 focus:outline-none transition-all duration-200
                             font-bold text-sm sm:text-base md:text-lg bg-white/80 backdrop-blur-sm shadow-lg
                             hover:shadow-xl focus:shadow-xl no-zoom touch-target min-h-[44px] sm:min-h-[48px] md:min-h-[52px]"
                    style={{ fontSize: window.innerWidth < 768 ? '16px' : 'inherit' }}
                    required
                    minLength={2}
                    disabled={isLoading}
                  />
                </div>

                {/* Character Count */}
                <div className="text-right">
                  <span className={`text-xs font-bold ${
                    name.length >= 2 ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    {name.length}/2 minimum characters
                  </span>
                </div>

                {/* Enhanced Submit Button */}
                <button
                  type="submit"
                  disabled={name.trim().length < 2 || isLoading}
                  className="w-full py-3 sm:py-4 md:py-5 px-4 sm:px-6 md:px-8 bg-gradient-to-r from-blue-600 to-indigo-700
                           text-white font-black text-sm sm:text-base md:text-lg rounded-xl sm:rounded-2xl transition-all duration-300 shadow-xl
                           hover:from-blue-700 hover:to-indigo-800 hover:shadow-2xl hover:-translate-y-1
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                           flex items-center justify-center gap-2 sm:gap-3 md:gap-4 touch-target min-h-[44px] sm:min-h-[48px] md:min-h-[52px]"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Getting Started...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                      Access All Features
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </>
                  )}
                </button>
              </form>

              {/* Enhanced Features List */}
              <div className="mt-6 sm:mt-8 md:mt-10 space-y-3 sm:space-y-4">
                <h4 className="text-xs sm:text-sm font-black text-slate-700 text-center mb-3 sm:mb-4 md:mb-6 flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  🎉 You'll get instant access to:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                  {[
                    { icon: '🤖', text: 'General AI Assistant', color: 'bg-purple-100 text-purple-700' },
                    { icon: '📎', text: 'File Upload Support', color: 'bg-blue-100 text-blue-700' },
                    { icon: '💾', text: 'Chat History & Sessions', color: 'bg-green-100 text-green-700' },
                    { icon: '⚡', text: 'All Expert Areas', color: 'bg-yellow-100 text-yellow-700' }
                  ].map((feature, index) => (
                    <div key={index} className={`${feature.color} rounded-lg sm:rounded-xl p-2 sm:p-3 text-center font-bold backdrop-blur-sm border border-current/20 min-h-[60px] sm:min-h-[70px] flex flex-col items-center justify-center`}>
                      <div className="text-sm sm:text-base md:text-lg mb-1">{feature.icon}</div>
                      <div className="text-xs leading-tight">{feature.text}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attribution */}
              <div className="mt-4 sm:mt-6 md:mt-8 pt-3 sm:pt-4 md:pt-6 border-t border-gray-200 text-center space-y-1 sm:space-y-2">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Made By <span className="font-bold text-blue-600">Vipul</span></span>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  <span>Idea By <span className="font-bold text-purple-600">Akanksha</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
 };