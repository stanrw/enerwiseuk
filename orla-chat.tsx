import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiRequest } from "@/lib/queryClient";
import type { ChatMessage } from "@/lib/types";

// Simple, clear owl icon

export default function OrlaChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      message: "Hello! I'm Orla, your renewable energy advisor. I can help you understand solar panels, calculate savings, and find trusted installers near you. What would you like to know?",
      isFromUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef(Math.random().toString(36).substring(7));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chat", {
        sessionId: sessionId.current,
        message,
      });
      return response.json();
    },
    onSuccess: (data) => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          message: data.response,
          isFromUser: false,
          timestamp: new Date(),
        }
      ]);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || chatMutation.isPending) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      message: inputMessage,
      isFromUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    chatMutation.mutate(inputMessage);
    setInputMessage("");
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Chat Interface */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        {/* Header with Orla */}
        <div className="bg-energy-green p-4 sm:p-6 text-white text-center">
          <div className="flex items-center justify-center mb-3">
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 mr-3 sm:mr-4">
              {/* Slow pulsing white light effect */}
              <div className="absolute inset-0 rounded-full bg-white opacity-10" 
                   style={{ 
                     animation: 'pulse 3s ease-in-out infinite',
                     transform: 'scale(1)'
                   }}></div>
              <div className="absolute inset-1 rounded-full bg-white opacity-20" 
                   style={{ 
                     animation: 'pulse 3.5s ease-in-out infinite 0.5s',
                     transform: 'scale(1)'
                   }}></div>
              <div className="absolute inset-3 rounded-full bg-white opacity-40" 
                   style={{ 
                     animation: 'pulse 4s ease-in-out infinite 1s',
                     transform: 'scale(1)'
                   }}></div>
              {/* Central bright white core */}
              <div className="absolute inset-5 rounded-full bg-white opacity-60 shadow-lg"
                   style={{ 
                     animation: 'pulse 4.5s ease-in-out infinite 1.5s',
                     transform: 'scale(1)'
                   }}></div>
            </div>
            <div className="text-left">
              <h3 className="text-xl sm:text-2xl font-bold">Orla</h3>
              <p className="text-green-100 text-base sm:text-lg">Your Energy Advisor</p>
            </div>
          </div>
          <p className="text-green-50 text-sm sm:text-base">
            Ask me anything about solar panels, savings, government grants, or finding installers
          </p>
        </div>

        {/* Messages Area */}
        <div className="h-80 sm:h-96 p-4 sm:p-6 overflow-y-auto bg-gray-50 space-y-3 sm:space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isFromUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[90%] sm:max-w-[85%] p-3 sm:p-4 rounded-lg ${
                message.isFromUser 
                  ? 'bg-energy-green text-white' 
                  : 'bg-white border border-gray-200 text-gray-900'
              }`}>
                <div className="text-sm sm:text-base leading-relaxed">
                  {message.message.split('\n').map((line, index) => (
                    <p key={index} className={index > 0 ? 'mt-3' : ''}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
          
          {chatMutation.isPending && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 max-w-[85%] p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="relative w-6 h-6 flex items-center justify-center">
                    {/* Elegant pulsing light effect for Orla */}
                    <div className="absolute inset-0 rounded-full bg-energy-green opacity-15" 
                         style={{ 
                           animation: 'pulse 3s ease-in-out infinite',
                           transform: 'scale(1)'
                         }}></div>
                    <div className="absolute inset-1 rounded-full bg-energy-green opacity-30" 
                         style={{ 
                           animation: 'pulse 3.5s ease-in-out infinite 0.5s',
                           transform: 'scale(1)'
                         }}></div>
                    <div className="relative w-2 h-2 bg-energy-green rounded-full"></div>
                  </div>
                  <span className="text-gray-600">Orla is typing...</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-energy-green rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-energy-green rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-energy-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 sm:p-6 bg-white border-t border-gray-200">
          <form onSubmit={handleSubmit}>
            <div className="flex space-x-2 sm:space-x-3">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your question here..."
                className="flex-1 text-sm sm:text-base p-3 sm:p-4 border-2 border-gray-300 rounded-lg focus:border-energy-green"
                disabled={chatMutation.isPending}
              />
              <Button 
                type="submit" 
                className="bg-energy-green hover:bg-energy-dark text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold"
                disabled={chatMutation.isPending || !inputMessage.trim()}
              >
                Send
              </Button>
            </div>
          </form>
          
          {/* Helpful suggestions */}
          <div className="mt-3 sm:mt-4 text-center">
            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">Try asking:</p>
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
              <button
                onClick={() => setInputMessage("How much can I save with solar panels?")}
                className="px-2 sm:px-3 py-1 sm:py-2 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm hover:bg-gray-200 transition-colors"
              >
                "How much can I save with solar panels?"
              </button>
              <button
                onClick={() => setInputMessage("What government grants are available?")}
                className="px-2 sm:px-3 py-1 sm:py-2 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm hover:bg-gray-200 transition-colors"
              >
                "What government grants are available?"
              </button>
              <button
                onClick={() => setInputMessage("Find installers near me")}
                className="px-2 sm:px-3 py-1 sm:py-2 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm hover:bg-gray-200 transition-colors"
              >
                "Find installers near me"
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}