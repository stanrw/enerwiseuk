import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Link } from 'wouter';
import { CheckCircle, XCircle, Mail, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

export default function VerifyEmail() {
  const [location] = useLocation();
  const { toast } = useToast();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error' | 'resend'>('loading');
  const [accountType, setAccountType] = useState<'customer' | 'installer'>('customer');
  const [resendEmail, setResendEmail] = useState('');
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    // Parse query parameters from URL
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    const token = urlParams.get('token');
    const type = urlParams.get('type');

    if (token && type) {
      verifyEmail(token, type);
      setAccountType(type as 'customer' | 'installer');
    } else {
      setVerificationStatus('resend');
    }
  }, [location]);

  const verifyEmail = async (token: string, type: string) => {
    try {
      const data = await apiRequest('GET', `/api/verify-email?token=${token}&type=${type}`) as any;
      
      if (data.success) {
        setVerificationStatus('success');
        setAccountType(type as 'customer' | 'installer');
        toast({
          title: "Email Verified!",
          description: data.message,
        });
      } else {
        setVerificationStatus('error');
      }
    } catch (error) {
      console.error('Email verification error:', error);
      setVerificationStatus('error');
      toast({
        title: "Verification Failed",
        description: "The verification link is invalid or expired.",
        variant: "destructive",
      });
    }
  };

  const handleResendVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resendEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setResendLoading(true);
    
    try {
      const data = await apiRequest('POST', '/api/resend-verification', {
        email: resendEmail,
        type: accountType
      }) as any;

      if (data.success) {
        toast({
          title: "Verification Email Sent",
          description: "Please check your inbox for the verification link.",
        });
        setResendEmail('');
      } else {
        toast({
          title: "Failed to Send Email",
          description: data.message || "Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Resend verification error:', error);
      toast({
        title: "Failed to Send Email",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setResendLoading(false);
    }
  };

  if (verificationStatus === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-green-600" />
              <p className="text-gray-600">Verifying your email address...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (verificationStatus === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Email Verified!</CardTitle>
            <CardDescription>
              Your email address has been successfully verified. You can now log in to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Link href={accountType === 'customer' ? '/customer-auth' : '/installer-auth'}>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Continue to {accountType === 'customer' ? 'Customer' : 'Installer'} Login
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full">
                  Return to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (verificationStatus === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Verification Failed</CardTitle>
            <CardDescription>
              The verification link is invalid or has expired. Please request a new verification email.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleResendVerification} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={resendEmail}
                  onChange={(e) => setResendEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="accountType">Account Type</Label>
                <select
                  id="accountType"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value as 'customer' | 'installer')}
                >
                  <option value="customer">Customer Account</option>
                  <option value="installer">Installer Account</option>
                </select>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={resendLoading}
              >
                {resendLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Resend Verification Email
                  </>
                )}
              </Button>
            </form>
            
            <div className="mt-4 text-center">
              <Link href="/">
                <Button variant="outline" className="w-full">
                  Return to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Default resend form
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Mail className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Email Verification</CardTitle>
          <CardDescription>
            Enter your email address to receive a verification link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleResendVerification} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={resendEmail}
                onChange={(e) => setResendEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="accountType">Account Type</Label>
              <select
                id="accountType"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value as 'customer' | 'installer')}
              >
                <option value="customer">Customer Account</option>
                <option value="installer">Installer Account</option>
              </select>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={resendLoading}
            >
              {resendLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Verification Email
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <Link href="/">
              <Button variant="outline" className="w-full">
                Return to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}