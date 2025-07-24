import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

interface UserBehavior {
  pageViews: Record<string, number>;
  timeOnPage: Record<string, number>;
  formAbandonment: Record<string, number>;
  lastActivity: number;
}

interface AssistanceOffer {
  type: 'help' | 'guidance' | 'support';
  message: string;
  action?: () => void;
}

export function useUserAssistance() {
  const [location] = useLocation();
  const [behavior, setBehavior] = useState<UserBehavior>({
    pageViews: {},
    timeOnPage: {},
    formAbandonment: {},
    lastActivity: Date.now()
  });
  const [assistanceOffer, setAssistanceOffer] = useState<AssistanceOffer | null>(null);

  // Track page views and time spent
  useEffect(() => {
    const startTime = Date.now();
    
    setBehavior(prev => ({
      ...prev,
      pageViews: {
        ...prev.pageViews,
        [location]: (prev.pageViews[location] || 0) + 1
      },
      lastActivity: startTime
    }));

    return () => {
      const timeSpent = Date.now() - startTime;
      setBehavior(prev => ({
        ...prev,
        timeOnPage: {
          ...prev.timeOnPage,
          [location]: (prev.timeOnPage[location] || 0) + timeSpent
        }
      }));
    };
  }, [location]);

  // Detect assistance opportunities
  useEffect(() => {
    const checkForAssistanceNeeds = () => {
      const currentPageViews = behavior.pageViews[location] || 0;
      const timeOnCurrentPage = behavior.timeOnPage[location] || 0;

      // Multiple page visits might indicate confusion
      if (currentPageViews >= 3 && !assistanceOffer) {
        setAssistanceOffer({
          type: 'help',
          message: "I notice you've visited this page several times. Would you like some guidance navigating the platform?",
          action: () => {
            // Trigger Orla chat with contextual help
            const chatEvent = new CustomEvent('openOrlaChat', { 
              detail: { context: `User needs help with ${location} page` }
            });
            window.dispatchEvent(chatEvent);
          }
        });
      }

      // Long time on assessment pages might indicate confusion
      if ((location.includes('assessment') || location.includes('energy-options')) && 
          timeOnCurrentPage > 180000 && !assistanceOffer) { // 3 minutes
        setAssistanceOffer({
          type: 'guidance',
          message: "Taking your time with the assessment is smart! Do you have any questions about the renewable energy options?",
          action: () => {
            const chatEvent = new CustomEvent('openOrlaChat', { 
              detail: { context: "User spending long time on assessment" }
            });
            window.dispatchEvent(chatEvent);
          }
        });
      }

      // Quote request page abandonment detection
      if (location.includes('quote-request') && currentPageViews >= 2 && !assistanceOffer) {
        setAssistanceOffer({
          type: 'support',
          message: "Almost there with your quote request! Is there anything I can help clarify?",
          action: () => {
            const chatEvent = new CustomEvent('openOrlaChat', { 
              detail: { context: "User having difficulty with quote request" }
            });
            window.dispatchEvent(chatEvent);
          }
        });
      }
    };

    const timer = setTimeout(checkForAssistanceNeeds, 2000); // Check after 2 seconds
    return () => clearTimeout(timer);
  }, [behavior, location, assistanceOffer]);

  const dismissAssistance = () => {
    setAssistanceOffer(null);
  };

  const acceptAssistance = () => {
    if (assistanceOffer?.action) {
      assistanceOffer.action();
    }
    setAssistanceOffer(null);
  };

  return {
    assistanceOffer,
    dismissAssistance,
    acceptAssistance
  };
}