import React from 'react';
import { User, Bot, FileText, Image } from 'lucide-react';
import type { Message, FileUpload } from '../types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  const renderContent = (content: string) => {
    return (
      <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
        {content.split('\n').map((line, index) => {
          const trimmedLine = line.trim();
          if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-') || trimmedLine.startsWith('*')) {
            return (
              <div key={index} className="flex items-start gap-3 ml-4 mb-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>{trimmedLine.replace(/^[•\-*]\s*/, '')}</span>
              </div>
            );
          }
          return trimmedLine ? <p key={index} className="mb-3">{trimmedLine}</p> : null;
        })}
      </div>
    );
  };
  
  const renderFileAttachments = (files: FileUpload[]) => {
    if (!files || files.length === 0) return null;

    return (
      <div className="mt-4 space-y-2">
        {files.map((file) => (
          <div key={file.id} className="flex items-center gap-3 bg-white/80 dark:bg-gray-700/80 rounded-xl p-3 border border-gray-200/50 dark:border-gray-600/50 backdrop-blur-sm">
            {file.type.startsWith('image/') ? (
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Image className="text-blue-600 dark:text-blue-400" size={16} />
              </div>
            ) : (
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <FileText className="text-red-600 dark:text-red-400" size={16} />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300 truncate block">
                {file.name}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({(file.size / 1024).toFixed(1)} KB)
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className={`flex gap-2 sm:gap-3 md:gap-6 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-4 sm:mb-6 md:mb-8 px-1 sm:px-0`}>
      {/* Enhanced Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center shadow-xl ${
        isUser 
          ? 'bg-gradient-to-br from-blue-600 to-indigo-700' 
          : 'bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-600 dark:to-gray-800'
      }`}>
        {isUser ? <User className="text-white w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" /> : <Bot className="text-white w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />}
      </div>
      
      {/* Enhanced Message Bubble */}
      <div className={`flex-1 max-w-4xl ${isUser ? 'text-right' : 'text-left'}`}>
        <div className={`inline-block px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 shadow-lg max-w-full backdrop-blur-sm border transition-all duration-200 hover:shadow-xl break-words ${
          isUser
            ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-lg sm:rounded-xl md:rounded-2xl rounded-br-sm sm:rounded-br-md md:rounded-br-lg border-blue-500/50'
            : 'bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white border-gray-200/50 dark:border-gray-700/50 rounded-lg sm:rounded-xl md:rounded-2xl rounded-bl-sm sm:rounded-bl-md md:rounded-bl-lg'
        }`}>
          <div className="text-xs sm:text-sm md:text-base leading-relaxed">
            {isUser ? (
              <div className="space-y-2 sm:space-y-3">
                <div className="font-semibold break-words overflow-wrap-anywhere">{message.content}</div>
                {message.files && renderFileAttachments(message.files)}
              </div>
            ) : (
              <div className="space-y-2 sm:space-y-3">
                {renderContent(message.content)}
              </div>
            )}
          </div>
        </div>
        
        {/* Enhanced Timestamp with Short Role Labels */}
        <div className={`text-xs text-gray-500 dark:text-gray-400 mt-1.5 sm:mt-2 md:mt-3 font-semibold flex items-center gap-1.5 sm:gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${isUser ? 'bg-blue-500' : 'bg-gray-500'}`}></div>
          <span>{isUser ? 'You' : 'CemtrAS'}</span>
          <span>•</span>
          <span className="hidden sm:inline">{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <span className="sm:hidden">{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
        </div>
      </div>
    </div>
  );
};