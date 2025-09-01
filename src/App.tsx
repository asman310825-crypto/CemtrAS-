import React, { useState, useRef, useEffect } from 'react';
import { Factory } from 'lucide-react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { LoadingMessage } from './components/LoadingMessage';
import { ErrorMessage } from './components/ErrorMessage';
import { NameEntryScreen } from './components/NameEntryScreen';
import { WelcomeScreen } from './components/WelcomeScreen';
import { useAuth } from './contexts/AuthContext';
import { useChatHistory } from './contexts/ChatHistoryContext';
import { useTheme } from './contexts/ThemeContext';
import { generateResponse } from './utils/gemini';
import type { Message, UserRole, ChatState, ChatHistory, FileUpload } from './types';

function App() {
  const { user, isAuthenticated, logout } = useAuth();
  const { saveChatHistory, loadChatHistory, setCurrentChatId } = useChatHistory();
  const { isDarkMode } = useTheme();
  const [showNameEntry, setShowNameEntry] = useState(!isAuthenticated);
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    selectedRole: 'Operations',
    uploadedFiles: []
  });
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Hidden by default
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages, chatState.isLoading]);

  useEffect(() => {
    if (isAuthenticated) {
      setShowNameEntry(false);
    }
  }, [isAuthenticated]);

  const handleNameEntryComplete = () => {
    setShowNameEntry(false);
  };

  const handleSendMessage = async (content: string) => {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      setError('GEMINI_API_KEY is not configured. Please set VITE_GEMINI_API_KEY in your environment variables.');
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
      files: chatState.uploadedFiles && chatState.uploadedFiles.length > 0 ? [...chatState.uploadedFiles] : undefined
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      uploadedFiles: []
    }));

    setSidebarOpen(false);
    setError(null);

    try {
      const aiResponse = await generateResponse(
        content, 
        chatState.selectedRole, 
        true,
        chatState.uploadedFiles || []
      );
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false
      }));
    } catch (err) {
      setChatState(prev => ({ ...prev, isLoading: false }));
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    }
  };

  useEffect(() => {
    if (chatState.messages.length >= 2) {
      const hasUserMessage = chatState.messages.some(m => m.role === 'user');
      const hasAIResponse = chatState.messages.some(m => m.role === 'assistant');
      
      if (hasUserMessage && hasAIResponse) {
        saveChatHistory({
          messages: chatState.messages,
          role: chatState.selectedRole
        });
      }
    }
  }, [chatState.messages, chatState.selectedRole, saveChatHistory]);

  const handleRoleChange = (role: UserRole | 'General AI') => {
    setChatState(prev => ({ ...prev, selectedRole: role }));
    setSidebarOpen(false);
  };

  const handleLoadChat = (history: ChatHistory) => {
    setChatState(prev => ({
      ...prev,
      messages: history.messages,
      selectedRole: history.role,
      isLoading: false
    }));
    setCurrentChatId(history.id);
    setSidebarOpen(false);
  };

  const handleNewChat = () => {
    setChatState(prev => ({
      ...prev,
      messages: [],
      isLoading: false,
      uploadedFiles: []
    }));
    setCurrentChatId(null);
    setSidebarOpen(false);
  };

  const handleFileUpload = (files: FileUpload[]) => {
    setChatState(prev => ({
      ...prev,
      uploadedFiles: [...(prev.uploadedFiles || []), ...files]
    }));
  };

  const handleRemoveFile = (fileId: string) => {
    setChatState(prev => ({
      ...prev,
      uploadedFiles: (prev.uploadedFiles || []).filter(f => f.id !== fileId)
    }));
  };

  const clearError = () => setError(null);

  if (showNameEntry) {
    return <NameEntryScreen onComplete={handleNameEntryComplete} />;
  }

  return (
    <div className={`min-h-screen mobile-viewport-fix flex flex-col responsive-container ${isDarkMode ? 'dark' : ''}`}>
      {/* Enhanced Background Pattern */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-gray-900 dark:via-blue-900/10 dark:to-indigo-900/20 -z-10">
        <div className="absolute inset-0 opacity-[0.01] sm:opacity-[0.02] dark:opacity-[0.03] sm:dark:opacity-[0.05] overflow-hidden">
          <div className="absolute top-20 left-20 w-64 h-64 border-2 border-blue-500 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-32 w-48 h-48 border-2 border-indigo-400 rounded-lg rotate-45 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 border-2 border-blue-300 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      {/* Fixed Header */}
      <Header
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        selectedRole={chatState.selectedRole}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex relative min-h-0">
        {/* Enhanced Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          selectedRole={chatState.selectedRole}
          onRoleChange={handleRoleChange}
          onLoadChat={handleLoadChat}
          onNewChat={handleNewChat}
          messageCount={chatState.messages.length}
          isLoading={chatState.isLoading}
        />

        {/* Chat Content Area */}
        <div className="flex-1 flex flex-col min-w-0 relative">
          {/* Scrollable Messages Container */}
          <div className="flex-1 overflow-y-auto overscroll-contain scrollbar-thin mobile-viewport-fix">
            <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 pb-6 sm:pb-8">
              {error && (
                <ErrorMessage 
                  message={error} 
                  onRetry={error.includes('GEMINI_API_KEY') ? undefined : clearError}
                />
              )}

              {chatState.messages.length === 0 && !error ? (
                <WelcomeScreen selectedRole={chatState.selectedRole} />
              ) : (
                <>
                  {chatState.messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                  {chatState.isLoading && <LoadingMessage />}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Fixed Input Area */}
          <div className="border-t border-gray-200/50 dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md p-3 sm:p-4 md:p-6 flex-shrink-0 relative z-10 pb-safe keyboard-safe">
            <ChatInput 
              onSend={handleSendMessage}
              isLoading={chatState.isLoading || !!error}
              placeholder={`Ask me (${chatState.selectedRole} expertise)...`}
              onFileUpload={handleFileUpload}
              uploadedFiles={chatState.uploadedFiles || []}
              onRemoveFile={handleRemoveFile}
            />
            
            {/* Mobile-Responsive Attribution */}
            <div className="flex flex-col sm:flex-row items-center justify-center mt-3 sm:mt-4 gap-1 sm:gap-2 md:gap-6 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span className="font-medium">Made By <span className="text-blue-600 dark:text-blue-400 font-semibold">Vipul</span></span>
              </div>
              <div className="hidden md:block w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                <span className="font-medium">Idea By <span className="text-purple-600 dark:text-purple-400 font-semibold">Akanksha</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;