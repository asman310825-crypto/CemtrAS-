import React from 'react';
import { Bot, ArrowRight, Zap, Shield, Target } from 'lucide-react';
import type { UserRole } from '../types';

interface WelcomeScreenProps {
  selectedRole: UserRole | 'General AI';
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ selectedRole }) => {
  return (
    <div className="text-center py-6 sm:py-8 md:py-12 lg:py-16 px-4 md:px-6 responsive-container">
      {/* Enhanced Logo Section */}
      <div className="relative mb-8 md:mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-full blur-3xl"></div>
        <div className="relative p-6 sm:p-8 md:p-12 bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-800 dark:to-blue-900/20 rounded-2xl md:rounded-3xl border-2 border-blue-200/50 dark:border-blue-800/50 shadow-2xl w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto flex items-center justify-center backdrop-blur-sm">
          <div className="absolute inset-3 md:inset-4 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl md:rounded-2xl shadow-lg flex items-center justify-center">
            <Bot className="text-white w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" />
          </div>
        </div>
      </div>

      {/* Enhanced Branding */}
      <div className="mb-8 md:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          AI Assistant
        </h1>
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6">
          <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-1 max-w-12 sm:max-w-16 md:max-w-24 lg:max-w-32"></div>
          <div className="px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs md:text-sm font-bold rounded-full shadow-lg">
            EXPERT SYSTEM
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-1 max-w-12 sm:max-w-16 md:max-w-24 lg:max-w-32"></div>
        </div>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 font-medium max-w-3xl mx-auto leading-relaxed px-4">
          Your trusted partner in building and optimizing world-class cement plants
        </p>
        <div className="mt-4 md:mt-6 inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full border border-green-200 dark:border-green-800">
          <Shield className="w-4 h-4 md:w-5 md:h-5" />
          <span className="font-semibold text-xs sm:text-sm md:text-base">Premium Access Activated</span>
        </div>
      </div>

      {/* Current Role Display */}
      <div className="mb-8 md:mb-12">
        <div className="inline-flex items-center gap-2 sm:gap-3 md:gap-4 px-3 sm:px-4 md:px-6 lg:px-8 py-2.5 sm:py-3 md:py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl md:rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl max-w-full">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg">
            <Target className="text-white w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div className="text-left min-w-0 flex-1">
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Current Expertise
            </p>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 dark:text-white truncate">
              {selectedRole} Expert
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Features Grid */}
      <div className="max-w-6xl mx-auto mb-8 md:mb-16">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8 px-4">
          🚀 Available Expertise Areas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 px-4">
          {[
            { 
              title: 'Plant Operations & Maintenance', 
              color: 'from-yellow-500 to-orange-500',
              icon: '⚙️',
              description: 'Machinery troubleshooting & process optimization'
            },
            { 
              title: 'Project Management', 
              color: 'from-blue-500 to-cyan-500',
              icon: '📊',
              description: 'EPC scheduling & resource planning'
            },
            { 
              title: 'Sales & Marketing', 
              color: 'from-green-500 to-emerald-500',
              icon: '📈',
              description: 'Market analysis & customer strategies'
            },
            { 
              title: 'Procurement & Supply Chain', 
              color: 'from-purple-500 to-violet-500',
              icon: '🛒',
              description: 'Vendor negotiations & inventory optimization'
            },
            { 
              title: 'Erection & Commissioning', 
              color: 'from-red-500 to-pink-500',
              icon: '🔧',
              description: 'Installation sequencing & safety compliance'
            },
            { 
              title: 'Engineering & Design', 
              color: 'from-orange-500 to-red-500',
              icon: '⚡',
              description: 'Process flow design & equipment selection'
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="group p-3 sm:p-4 md:p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl md:rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-[120px] sm:min-h-[140px] md:min-h-[160px] flex flex-col"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${feature.color} rounded-xl md:rounded-2xl flex items-center justify-center text-lg sm:text-xl md:text-2xl mb-3 md:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                {feature.icon}
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex-1">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-2xl mx-auto px-4">
        <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl md:rounded-3xl shadow-2xl text-white">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-yellow-300" />
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold">Ready to Get Started?</h3>
          </div>
          <p className="text-blue-100 mb-4 md:mb-6 text-sm sm:text-base md:text-lg leading-relaxed">
            Ask me anything about cement plant operations, and I'll provide expert guidance tailored to your needs.
          </p>
          <div className="flex items-center justify-center gap-2 text-blue-200">
            <span className="text-sm font-medium">Start typing below</span>
            <ArrowRight className="w-4 h-4 animate-bounce" style={{ animationDirection: 'alternate' }} />
          </div>
        </div>
      </div>
    </div>
  );
};