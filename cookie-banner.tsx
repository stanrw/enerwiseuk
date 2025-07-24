import { useState, useEffect } from "react";
import { X, Settings, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('enerwise-cookie-consent');
    if (!cookieConsent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      try {
        const saved = JSON.parse(cookieConsent);
        setPreferences(prev => ({ ...prev, ...saved }));
      } catch (e) {
        console.error('Error parsing cookie preferences:', e);
      }
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem('enerwise-cookie-consent', JSON.stringify(allAccepted));
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptSelected = () => {
    localStorage.setItem('enerwise-cookie-consent', JSON.stringify(preferences));
    setShowBanner(false);
    setShowSettings(false);
  };

  const rejectAll = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    setPreferences(essentialOnly);
    localStorage.setItem('enerwise-cookie-consent', JSON.stringify(essentialOnly));
    setShowBanner(false);
    setShowSettings(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl">
      {!showSettings ? (
        // Main banner
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                We Value Your Privacy
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We use cookies to enhance your experience on Enerwise, analyse site usage, 
                and provide personalised recommendations. Essential cookies are required for 
                basic functionality, while others help us improve our service.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                You can change your preferences at any time in your account settings.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 lg:ml-6 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(true)}
                className="text-gray-700 border-gray-300 hover:bg-gray-50"
              >
                <Settings className="w-4 h-4 mr-2" />
                Manage Preferences
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={rejectAll}
                className="text-gray-700 border-gray-300 hover:bg-gray-50"
              >
                Essential Only
              </Button>
              
              <Button
                size="sm"
                onClick={acceptAll}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Check className="w-4 h-4 mr-2" />
                Accept All
              </Button>
            </div>
          </div>
        </div>
      ) : (
        // Settings panel
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Cookie Preferences</h3>
            <button
              onClick={() => setShowSettings(false)}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Essential Cookies */}
            <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Essential Cookies</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Required for basic site functionality, security, and your account access. 
                  These cannot be disabled.
                </p>
                <p className="text-xs text-gray-500">
                  Examples: Authentication, security tokens, form submissions
                </p>
              </div>
              <div className="ml-4 flex items-center">
                <div className="w-12 h-6 bg-green-600 rounded-full flex items-center justify-end px-1">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                <span className="text-sm text-gray-600 ml-2">Always On</span>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Analytics Cookies</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Help us understand how you use our platform to improve performance 
                  and user experience. All data is anonymised.
                </p>
                <p className="text-xs text-gray-500">
                  Examples: Page views, session duration, popular features
                </p>
              </div>
              <div className="ml-4 flex items-center">
                <button
                  onClick={() => setPreferences(prev => ({ ...prev, analytics: !prev.analytics }))}
                  className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                    preferences.analytics ? 'bg-green-600 justify-end' : 'bg-gray-300 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </button>
                <span className="text-sm text-gray-600 ml-2">
                  {preferences.analytics ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>

            {/* Preference Cookies */}
            <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Preference Cookies</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Remember your settings and preferences to provide a personalised experience 
                  across visits.
                </p>
                <p className="text-xs text-gray-500">
                  Examples: Language settings, theme preferences, saved filters
                </p>
              </div>
              <div className="ml-4 flex items-center">
                <button
                  onClick={() => setPreferences(prev => ({ ...prev, preferences: !prev.preferences }))}
                  className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                    preferences.preferences ? 'bg-green-600 justify-end' : 'bg-gray-300 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </button>
                <span className="text-sm text-gray-600 ml-2">
                  {preferences.preferences ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Marketing Cookies</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Enable personalised content and relevant advertisements. Help us measure 
                  campaign effectiveness and improve our marketing.
                </p>
                <p className="text-xs text-gray-500">
                  Examples: Targeted content, campaign tracking, social media integration
                </p>
              </div>
              <div className="ml-4 flex items-center">
                <button
                  onClick={() => setPreferences(prev => ({ ...prev, marketing: !prev.marketing }))}
                  className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                    preferences.marketing ? 'bg-green-600 justify-end' : 'bg-gray-300 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </button>
                <span className="text-sm text-gray-600 ml-2">
                  {preferences.marketing ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={rejectAll}
              className="text-gray-700 border-gray-300 hover:bg-gray-50"
            >
              Essential Only
            </Button>
            <Button
              onClick={acceptSelected}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Save Preferences
            </Button>
          </div>

          <p className="text-xs text-gray-500 mt-4 text-center">
            For more details about our data practices, please read our{' '}
            <a href="/privacy-policy" className="text-green-600 hover:text-green-700 underline">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="/terms" className="text-green-600 hover:text-green-700 underline">
              Terms of Service
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
}