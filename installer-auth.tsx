import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Eye, EyeOff, Wrench, Award, Building, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { installerLoginSchema, installerRegistrationSchema, type InstallerLogin, type InstallerRegistration } from "@shared/schema";

export default function InstallerAuth() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const loginForm = useForm<InstallerLogin>({
    resolver: zodResolver(installerLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<InstallerRegistration>({
    resolver: zodResolver(installerRegistrationSchema),
    defaultValues: {
      email: "",
      password: "",
      companyName: "",
      contactName: "",

    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: InstallerLogin) => {
      const response = await apiRequest("POST", "/api/auth/installer/login", data);
      return await response.json();
    },
    onSuccess: (data: any) => {
      // Store authentication state
      localStorage.setItem('installerAuth', JSON.stringify(data));
      toast({
        title: "Welcome back!",
        description: "You've successfully logged into your installer account.",
      });
      setLocation("/installer-portal");
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message || "Please check your email and password.",
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: InstallerRegistration) => {
      const response = await apiRequest("POST", "/api/auth/installer/register", data);
      return await response.json();
    },
    onSuccess: (data: any) => {
      if (data.emailSent) {
        toast({
          title: "Registration submitted!",
          description: data.message || "Please verify your email address, then await approval.",
        });
        // Don't redirect to portal - user needs to verify email and await approval
      } else {
        // Store authentication state (fallback for when email isn't sent)
        localStorage.setItem('installerAuth', JSON.stringify(data));
        toast({
          title: "Registration submitted!",
          description: "Your installer account is pending approval. You'll be notified when it's ready.",
        });
        setLocation("/installer-portal");
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Registration failed",
        description: error.message || "Please try again with different details.",
        variant: "destructive",
      });
    },
  });

  const onLogin = (data: InstallerLogin) => {
    loginMutation.mutate(data);
  };

  const onRegister = (data: InstallerRegistration) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center group cursor-pointer">
                <h1 className="text-2xl font-bold text-gray-900 group-hover:text-energy-green transition-colors">
                  Ener<span className="text-energy-green">wise</span>
                </h1>
              </div>
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-12 max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Wrench className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Installer Portal</h1>
          <p className="text-gray-600">Access tender packs and manage your renewable energy business</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Log In</TabsTrigger>
            <TabsTrigger value="register">Join Network</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>
                  Log into your installer account to access tender packs and quotes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Email</FormLabel>
                          <FormControl>
                            <Input placeholder="info@yourcompany.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                {...field}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={loginMutation.isPending}
                    >
                      {loginMutation.isPending ? "Logging in..." : "Access Portal"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Join Our Network</CardTitle>
                <CardDescription>
                  Apply to become an approved Enerwise installer partner
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Renewable Energy Ltd" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="contactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Smith" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Email</FormLabel>
                          <FormControl>
                            <Input placeholder="info@yourcompany.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Email</FormLabel>
                          <FormControl>
                            <Input placeholder="01234 567890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a secure password"
                                {...field}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? "Submitting Application..." : "Apply to Join"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-gray-500 text-center">
                  All installer applications are reviewed for MCS certification and insurance requirements.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Benefits */}
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 text-center">Enerwise Partner Benefits</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 bg-white p-3 rounded-lg border">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-gray-700">Access pre-qualified customer leads</span>
            </div>
            <div className="flex items-center space-x-3 bg-white p-3 rounded-lg border">
              <Award className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-gray-700">Comprehensive property assessment data</span>
            </div>
            <div className="flex items-center space-x-3 bg-white p-3 rounded-lg border">
              <Building className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-gray-700">Credit-based tender system with detailed specs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}