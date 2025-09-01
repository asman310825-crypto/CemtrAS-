import React from 'react';
import { Bot, ArrowRight, Award, Shield, Target, Users, Briefcase, Settings } from 'lucide-react';
import type { UserRole } from '../types';

interface WelcomeScreenProps {
  selectedRole: UserRole | 'General AI';
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ selectedRole }) => {
  return (
    <div className="text-center py-8 md:py-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Professional Header */}
      <div className="mb-12 md:mb-16">
        {/* Professional Logo Section */}
        <div className="mb-8">
          <div className="w-20 h-20 md:w-24 md:h-24 mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-lg flex items-center justify-center mb-6 border border-slate-200 dark:border-slate-700">
            <img 
              src="/Logo.png" 
              alt="Company Logo" 
              className="w-16 h-16 md:w-20 md:h-20 object-contain"
              onError={(e) => {
                // Fallback to Bot icon if logo fails to load
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.appendChild(
                  Object.assign(document.createElement('div'), {
                    innerHTML: '<svg class="w-10 h-10 md:w-12 md:h-12 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>'
                  })
                );
              }}
            />
            {/* Fallback Bot icon (hidden by default, shown if image fails) */}
            <Bot className="text-slate-600 dark:text-slate-300 w-10 h-10 md:w-12 md:h-12 hidden" />
          </div>
        </div>

        {/* Corporate Branding */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-slate-800 dark:text-white mb-3">
            CementAI <span className="font-semibold">Professional</span>
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 font-light max-w-2xl mx-auto mb-6">
            Advanced AI Solutions for Cement Manufacturing Excellence
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700">
            <Award className="w-4 h-4" />
            <span className="text-sm font-medium">Enterprise Solution</span>
          </div>
        </div>

        {/* Current Expertise Display */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-4 px-6 py-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
              <Target className="text-white w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                Active Configuration
              </p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">
                {selectedRole} Specialist
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Capabilities Grid */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-light text-slate-800 dark:text-white mb-4">
            Core Competencies
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Comprehensive expertise across all aspects of cement plant operations and management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { 
              title: 'Operations & Maintenance', 
              icon: Settings,
              description: 'Equipment optimization, preventive maintenance, and operational efficiency enhancement',
              category: 'Technical Operations'
            },
            { 
              title: 'Project Management', 
              icon: Briefcase,
              description: 'EPC project delivery, timeline management, and stakeholder coordination',
              category: 'Management'
            },
            { 
              title: 'Commercial Strategy', 
              icon: Users,
              description: 'Market analysis, sales optimization, and customer relationship management',
              category: 'Business Development'
            },
            { 
              title: 'Supply Chain Management', 
              icon: Shield,
              description: 'Procurement strategies, vendor management, and inventory optimization',
              category: 'Logistics'
            },
            { 
              title: 'Installation & Commissioning', 
              icon: Award,
              description: 'Equipment installation, system commissioning, and safety compliance',
              category: 'Engineering'
            },
            { 
              title: 'Process Engineering', 
              icon: Target,
              description: 'Process design, equipment selection, and performance optimization',
              category: 'Technical Design'
            }
          ].map((capability, index) => (
            <div 
              key={index}
              className="group p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-600"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center group-hover:bg-slate-200 dark:group-hover:bg-slate-600 transition-colors">
                  <capability.icon className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                    {capability.category}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {capability.title}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {capability.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Professional CTA */}
      <div className="max-w-3xl mx-auto">
        <div className="p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
          <div className="mb-6">
            <h3 className="text-2xl font-light text-slate-800 dark:text-white mb-3">
              Ready to Optimize Your Operations?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Leverage decades of industry expertise through our advanced AI system. 
              Get precise, actionable insights for your cement manufacturing challenges.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span className="text-sm">Begin consultation</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
          
          {/* Professional Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
            <div className="text-center">
              <div className="text-2xl font-semibold text-slate-800 dark:text-white mb-1">24/7</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Availability</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-slate-800 dark:text-white mb-1">Expert</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Knowledge Base</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-slate-800 dark:text-white mb-1">Instant</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Responses</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};