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
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
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
    <div className="space-y-3 sm:space-y-4 keyboard-safe">
      {/* File Uploads Display */}
      {uploadedFiles.length > 0 && (
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {uploadedFiles.map((file) => (
            <div key={file.id} className="flex items-center gap-1.5 sm:gap-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 backdrop-blur-sm">
              {file.type.startsWith('image/') ? (
                <Image className="text-blue-600 dark:text-blue-400 w-3 h-3 sm:w-4 sm:h-4" />
              ) : (
                <FileText className="text-blue-600 dark:text-blue-400 w-3 h-3 sm:w-4 sm:h-4" />
              )}
              <span className="text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300 truncate max-w-24 sm:max-w-32">
                {file.name}
              </span>
              {onRemoveFile && (
                <button
                  onClick={() => onRemoveFile(file.id)}
                  className="p-1 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full transition-colors touch-target min-w-[32px] min-h-[32px] flex items-center justify-center"
                >
                  <X className="text-blue-600 dark:text-blue-400 w-3 h-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Enhanced Input Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-end gap-2 sm:gap-3 md:gap-4">
          <div className="flex-1 relative">
            {/* Enhanced Textarea */}
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
              className="w-full px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 pr-16 sm:pr-20 md:pr-24 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-2 border-gray-200/50 dark:border-gray-700/50 rounded-lg sm:rounded-xl md:rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-lg transition-all duration-200 hover:shadow-xl text-sm sm:text-base no-zoom touch-target"
              rows={1}
              style={{ 
                minHeight: window.innerWidth < 640 ? '44px' : window.innerWidth < 768 ? '48px' : '52px',
                maxHeight: window.innerWidth < 640 ? '100px' : window.innerWidth < 768 ? '120px' : '140px'
              }}
            />
            
            {/* Enhanced Control Buttons */}
            <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 sm:gap-2">
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
                    className="touch-target p-1.5 sm:p-2 bg-gray-100/80 dark:bg-gray-700/80 text-gray-600 dark:text-gray-400 hover:bg-gray-200/80 dark:hover:bg-gray-600/80 rounded-md sm:rounded-lg md:rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm shadow-md hover:shadow-lg min-w-[36px] min-h-[36px] flex items-center justify-center"
                    title="Upload files"
                  >
                    <Paperclip className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </>
              )}

              {/* Voice Input */}
              {hasVoiceSupport && (
                <button
                  type="button"
                  onClick={toggleVoiceInput}
                  disabled={isLoading}
                  className={`p-2 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm shadow-md hover:shadow-lg ${
                    isListening 
                      ? 'bg-red-100/80 text-red-600 hover:bg-red-200/80 animate-pulse p-1.5 sm:p-2 rounded-md sm:rounded-lg md:rounded-xl touch-target' 
                      : 'bg-gray-100/80 dark:bg-gray-700/80 text-gray-600 dark:text-gray-400 hover:bg-gray-200/80 dark:hover:bg-gray-600/80 p-1.5 sm:p-2 rounded-md sm:rounded-lg md:rounded-xl touch-target'
                  }`}
                  title={isListening ? "Stop recording" : "Start voice input"}
                >
                  {isListening ? <MicOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Mic className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                </button>
              )}
            </div>
          </div>
          
          {/* Enhanced Send Button */}
          <button
            type="submit"
            disabled={!message.trim() || isLoading}
            className="touch-target p-2.5 sm:p-3 md:p-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-lg sm:rounded-xl md:rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:transform-none min-w-[44px] min-h-[44px] flex items-center justify-center"
            title="Send message"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};