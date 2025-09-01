import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Paperclip, X, FileText, Image } from 'lucide-react';
import type { FileUpload } from '../types';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  placeholder?: string;
  onFileUpload?: (files: FileUpload[]) => void;
  uploadedFiles?: FileUpload[];
  onRemoveFile?: (fileId: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  isLoading,
  placeholder = "Type your message...",
  onFileUpload,
  uploadedFiles = [],
  onRemoveFile
}) => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessage(prev => prev + transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSend(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0 || !onFileUpload) return;

    const fileUploads: FileUpload[] = files.map(file => ({
      id: `file_${Date.now()}_${Math.random()}`,
      name: file.name,
      type: file.type,
      size: file.size,
      content: '',
      uploadDate: new Date()
    }));

    // Read file contents
    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        fileUploads[index].content = e.target?.result || '';
        if (index === files.length - 1) {
          onFileUpload(fileUploads);
        }
      };
      reader.readAsDataURL(file);
    });

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const hasVoiceSupport = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

  return (
    <div className="sticky bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-4">
        {/* File Uploads Display */}
        {uploadedFiles.length > 0 && (
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="flex items-center gap-2 sm:gap-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl px-3 sm:px-4 py-2 sm:py-3 backdrop-blur-sm">
                {file.type.startsWith('image/') ? (
                  <Image className="text-blue-600 dark:text-blue-400 w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <FileText className="text-blue-600 dark:text-blue-400 w-4 h-4 sm:w-5 sm:h-5" />
                )}
                <span className="text-sm sm:text-base font-medium text-blue-700 dark:text-blue-300 truncate max-w-32 sm:max-w-40">
                  {file.name}
                </span>
                {onRemoveFile && (
                  <button
                    onClick={() => onRemoveFile(file.id)}
                    className="p-1.5 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full transition-colors touch-target min-w-[36px] min-h-[36px] flex items-center justify-center"
                  >
                    <X className="text-blue-600 dark:text-blue-400 w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Enhanced Input Form */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-end gap-3 sm:gap-4">
            <div className="flex-1 relative">
              {/* Enhanced Textarea - Much Larger */}
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  adjustTextareaHeight();
                }}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={isLoading}
                className="w-full px-5 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 pr-20 sm:pr-24 md:pr-28 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl sm:rounded-3xl resize-none focus:outline-none focus:ring-3 focus:ring-blue-500/50 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-xl transition-all duration-300 hover:shadow-2xl text-base sm:text-lg leading-relaxed no-zoom touch-target"
                rows={1}
                style={{ 
                  minHeight: window.innerWidth < 640 ? '60px' : window.innerWidth < 768 ? '70px' : '80px',
                  maxHeight: window.innerWidth < 640 ? '160px' : window.innerWidth < 768 ? '180px' : '200px'
                }}
              />
              
              {/* Enhanced Control Buttons */}
              <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2 sm:gap-3">
                {/* File Upload */}
                {onFileUpload && (
                  <>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*,.pdf,.txt,.doc,.docx"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isLoading}
                      className="touch-target p-2.5 sm:p-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl sm:rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:transform-none min-w-[44px] min-h-[44px] flex items-center justify-center"
                      title="Upload files"
                    >
                      <Paperclip className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </>
                )}

                {/* Voice Input */}
                {hasVoiceSupport && (
                  <button
                    type="button"
                    onClick={toggleVoiceInput}
                    disabled={isLoading}
                    className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:transform-none touch-target min-w-[44px] min-h-[44px] flex items-center justify-center ${
                      isListening 
                        ? 'bg-red-100 text-red-600 hover:bg-red-200 animate-pulse' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                    title={isListening ? "Stop recording" : "Start voice input"}
                  >
                    {isListening ? <MicOff className="w-5 h-5 sm:w-6 sm:h-6" /> : <Mic className="w-5 h-5 sm:w-6 sm:h-6" />}
                  </button>
                )}
              </div>
            </div>
            
            {/* Enhanced Send Button - Larger */}
            <button
              type="submit"
              disabled={!message.trim() || isLoading}
              className="touch-target p-4 sm:p-5 md:p-6 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-2xl sm:rounded-3xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex-shrink-0 shadow-xl hover:shadow-2xl hover:-translate-y-1 disabled:transform-none min-w-[60px] min-h-[60px] sm:min-w-[70px] sm:min-h-[70px] md:min-w-[80px] md:min-h-[80px] flex items-center justify-center"
              title="Send message"
            >
              <Send className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            </button>
          </div>
        </form>
      </div>
      
      {/* Safe area padding for mobile devices */}
      <div className="h-safe-area-inset-bottom sm:h-0" />
    </div>
  );
};