import { X, MessageCircle } from "lucide-react";
import { useUserAssistance } from "@/hooks/use-user-assistance";

export default function UserAssistancePopup() {
  const { assistanceOffer, dismissAssistance, acceptAssistance } = useUserAssistance();

  if (!assistanceOffer) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 animate-in slide-in-from-bottom-2">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-energy-green rounded-full flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-900">Orla here to help</span>
        </div>
        <button
          onClick={dismissAssistance}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <p className="text-sm text-gray-700 mb-4">
        {assistanceOffer.message}
      </p>
      
      <div className="flex space-x-2">
        <button
          onClick={acceptAssistance}
          className="flex-1 bg-energy-green text-white text-sm px-3 py-2 rounded-md hover:bg-energy-green/90 transition-colors"
        >
          Yes, help me
        </button>
        <button
          onClick={dismissAssistance}
          className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          No thanks
        </button>
      </div>
    </div>
  );
}