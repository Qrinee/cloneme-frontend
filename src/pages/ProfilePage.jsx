import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuthFetch } from '../utils/authFetch';
import { useLayoutContext } from '../components/LayoutContext';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Trash2, Save, AlertTriangle, ChevronRight, Shield, Bell, CreditCard, Lock, Eye, EyeOff, Crown, MessageCircle, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  
  // Get premium state from context
  const { premium, messagesUsed, messagesRemaining, canCreateGirlfriend } = useLayoutContext();
  
  // General form state
  const [form, setForm] = useState({ name: "", email: "" });
  
  // Security form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const authFetch = useAuthFetch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await authFetch(import.meta.env.VITE_URL + "/mydata");
        const data = await res.json();
        if (data && data.user) {
          setUser(data.user);
          setForm({ 
            name: data.user.name || "", 
            email: data.user.email || "" 
          });
        }
      } catch (err) {
        setError("Failed to load user data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handlePasswordChange = (e) => {
    setPasswordForm(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await authFetch(import.meta.env.VITE_URL + "/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setSuccess("Profile updated successfully!");
        setUser(prev => ({ ...prev, ...form }));
        setTimeout(() => setSuccess(""), 3000);
      } else {
        const data = await res.json();
        setError(data.message || "Failed to update profile");
      }
    } catch (err) {
      setError("An error occurred while updating profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("New passwords do not match");
      return;
    }
    
    setIsSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await authFetch(import.meta.env.VITE_URL + "/reqpasswordreset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        })
      });
      
      if (res.ok) {
        setSuccess("Password changed successfully!");
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setTimeout(() => setSuccess(""), 3000);
      } else {
        const data = await res.json();
        setError(data.message || "Failed to change password");
      }
    } catch (err) {
      setError("An error occurred while changing password");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await authFetch(import.meta.env.VITE_URL + "/user/delete", {
        method: "DELETE"
      });
      if (res.ok) {
        window.location.href = "/login";
      } else {
        setError("Failed to delete account");
      }
    } catch (err) {
      setError("An error occurred while deleting account");
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen bg-[#0a0a0f]">
          <div className="w-12 h-12 border-2 border-white/5 border-t-[#741818] rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#0a0a0f] text-gray-100 py-10 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Account Settings</h1>
              <p className="text-white/40">Manage your profile information and account security.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar Navigation */}
            <div className="space-y-2">
              <nav className="flex flex-col space-y-1">
                <button 
                  onClick={() => setActiveTab("general")}
                  className={`flex cursor-pointer items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all border ${
                    activeTab === "general" 
                    ? "bg-[#741818]/10 text-[#741818] border-[#741818]/20" 
                    : "text-white/40 hover:text-white hover:bg-white/5 border-transparent"
                  }`}
                >
                  <User size={18} />
                  <span>General</span>
                  <ChevronRight size={14} className={`ml-auto ${activeTab === "general" ? "opacity-40" : "opacity-0"}`} />
                </button>
                <button 
                  onClick={() => setActiveTab("security")}
                  className={`flex cursor-pointer items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all border ${
                    activeTab === "security" 
                    ? "bg-[#741818]/10 text-[#741818] border-[#741818]/20" 
                    : "text-white/40 hover:text-white hover:bg-white/5 border-transparent"
                  }`}
                >
                  <Shield size={18} />
                  <span>Security</span>
                  <ChevronRight size={14} className={`ml-auto ${activeTab === "security" ? "opacity-40" : "opacity-0"}`} />
                </button>
                <button 
                  onClick={() => setActiveTab("premium")}
                  className={`flex cursor-pointer items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all border ${
                    activeTab === "premium" 
                    ? "bg-[#741818]/10 text-[#741818] border-[#741818]/20" 
                    : "text-white/40 hover:text-white hover:bg-white/5 border-transparent"
                  }`}
                >
                  <Crown size={18} className={premium?.isActive ? "text-yellow-500" : ""} />
                  <span>Premium</span>
                  <ChevronRight size={14} className={`ml-auto ${activeTab === "premium" ? "opacity-40" : "opacity-0"}`} />
                </button>

                <button 
                   onClick={() => window.location = 'https://billing.stripe.com/p/login/dRmbJ042S4vv6c6cRF6sw00'}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/40 cursor-pointer hover:text-white hover:bg-white/5 font-bold transition-all"
                >
                  <CreditCard size={18} />
                  <span>Billing</span>
                  <ChevronRight size={14} className="ml-auto opacity-0" />
                </button>
              </nav>
            </div>

            {/* Main Content Area */}
            <div className="md:col-span-2 space-y-6">
              <AnimatePresence mode="wait">
                {activeTab === "general" && (
                  <motion.div
                    key="general"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="bg-white/5 border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden">
                      <CardHeader className="pt-4">
                        <CardTitle className="text-xl font-bold text-white">Profile details</CardTitle>
                        <CardDescription className="text-white/40">Your data will not be displayed to other users.</CardDescription>
                      </CardHeader>
                      <Separator className="bg-white/5" />
                      <CardContent className="pt-2 space-y-6">


                        <div className="grid grid-cols-1 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-white/40 ml-1">Username</Label>
                            <Input
                              id="name"
                              value={form.name}
                              onChange={handleChange}
                              className="bg-white/5 border-white/10 text-white focus:border-[#741818] rounded-xl h-12 outline-none"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-white/40 ml-1">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              value={form.email}
                              onChange={handleChange}
                              className="bg-white/5 border-white/10 text-white focus:border-[#741818] rounded-xl h-12 outline-none"
                            />
                          </div>
                        </div>

                        {error && activeTab === "general" && (
                          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm flex items-center gap-3">
                            <AlertTriangle size={16} />
                            {error}
                          </div>
                        )}
                        {success && activeTab === "general" && (
                          <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-sm">
                            {success}
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="bg-white/[0.02] border-t border-white/5 px-6 py-4 flex justify-end">
                        <Button 
                          onClick={handleUpdate}
                          disabled={isSaving}
                          className="bg-[#741818] hover:bg-[#8d1d1d] text-white font-bold rounded-xl px-8 h-11 cursor-pointer transition-all active:scale-95 flex items-center gap-2"
                        >
                          {isSaving ? (
                             <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          ) : (
                            <Save size={18} />
                          )}
                          Save Changes
                        </Button>
                      </CardFooter>
                    </Card>

                    {/* Danger Zone */}
                    <Card className="mt-8 bg-red-500/[0.02] border-red-500/10 rounded-3xl  pt-5  pb-5 overflow-hidden">
                      <CardHeader>
                        <CardTitle className="text-xl font-bold text-red-400">Danger Zone</CardTitle>
                        <CardDescription className="text-white/30">Irreversible actions that will permanently delete your data.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-red-500/[0.05] border border-red-500/10">
                          <div>
                            <h4 className="font-bold text-white text-sm mb-1">Delete Account</h4>
                            <p className="text-white/30 text-xs">Permanently remove your account and all your chats.</p>
                          </div>
                          {!showDeleteConfirm ? (
                            <Button 
                              variant="destructive" 
                              onClick={() => setShowDeleteConfirm(true)}
                              className="bg-red-500/10 hover:bg-red-600 hover:text-red-500 text-white-500  border border-red-500/20 rounded-xl px-6 h-10 transition-all cursor-pointer font-bold"
                            >
                              Delete
                            </Button>
                          ) : (
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                onClick={() => setShowDeleteConfirm(false)}
                                className="text-white/40 hover:text-white hover:bg-white/5 rounded-xl px-4 h-10 font-bold"
                              >
                                Cancel
                              </Button>
                              <Button 
                                variant="destructive" 
                                onClick={handleDeleteAccount}
                                className="bg-red-500 hover:bg-red-600 text-white rounded-xl px-6 h-10 transition-all font-bold shadow-lg shadow-red-500/20"
                              >
                                Confirm
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
                
                {activeTab === "security" && (
                  <motion.div
                    key="security"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="bg-white/5 border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-xl font-bold text-white">Security Settings</CardTitle>
                        <CardDescription className="text-white/40">Update your password to keep your account secure.</CardDescription>
                      </CardHeader>
                      <Separator className="bg-white/5" />
                      <CardContent className="pt-6 space-y-6">
                        <form onSubmit={handlePasswordUpdate} className="grid grid-cols-1 gap-6">
                          {/* Current Password */}
                          <div className="space-y-2">
                            <Label htmlFor="currentPassword" title="Password" className="text-white/40 ml-1">Current Password</Label>
                            <div className="relative">
                              <Input
                                id="currentPassword"
                                type={showPasswords.current ? "text" : "password"}
                                value={passwordForm.currentPassword}
                                onChange={handlePasswordChange}
                                className="bg-white/5 border-white/10 text-white focus:border-[#741818] rounded-xl h-12 pr-12 outline-none"
                                placeholder="••••••••"
                              />
                              <button
                                type="button"
                                onClick={() => togglePasswordVisibility('current')}
                                aria-label={showPasswords.current ? 'Hide current password' : 'Show current password'}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/40 transition-colors"
                              >
                                {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* New Password */}
                            <div className="space-y-2">
                              <Label htmlFor="newPassword" title="Password" className="text-white/40 ml-1">New Password</Label>
                              <div className="relative">
                                <Input
                                  id="newPassword"
                                  type={showPasswords.new ? "text" : "password"}
                                  value={passwordForm.newPassword}
                                  onChange={handlePasswordChange}
                                  className="bg-white/5 border-white/10 text-white focus:border-[#741818] rounded-xl h-12 pr-12 outline-none"
                                  placeholder="••••••••"
                                />
                                <button
                                  type="button"
                                  onClick={() => togglePasswordVisibility('new')}
                                  aria-label={showPasswords.new ? 'Hide new password' : 'Show new password'}
                                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/40 transition-colors"
                                >
                                  {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                              </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                              <Label htmlFor="confirmPassword" title="Password" className="text-white/40 ml-1">Confirm New Password</Label>
                              <div className="relative">
                                <Input
                                  id="confirmPassword"
                                  type={showPasswords.confirm ? "text" : "password"}
                                  value={passwordForm.confirmPassword}
                                  onChange={handlePasswordChange}
                                  className="bg-white/5 border-white/10 text-white focus:border-[#741818] rounded-xl h-12 pr-12 outline-none"
                                  placeholder="••••••••"
                                />
                                <button
                                  type="button"
                                  onClick={() => togglePasswordVisibility('confirm')}
                                  aria-label={showPasswords.confirm ? 'Hide confirm password' : 'Show confirm password'}
                                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/40 transition-colors"
                                >
                                  {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                              </div>
                            </div>
                          </div>

                          {error && activeTab === "security" && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm flex items-center gap-3">
                              <AlertTriangle size={16} />
                              {error}
                            </div>
                          )}
                          {success && activeTab === "security" && (
                            <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-sm">
                              {success}
                            </div>
                          )}
                        </form>
                      </CardContent>
                      <CardFooter className="bg-white/[0.02] border-t border-white/5 px-6 py-4 flex justify-end gap-3">
                         <Button 
                          onClick={handlePasswordUpdate}
                          disabled={isSaving}
                          className="bg-[#741818] hover:bg-[#8d1d1d] text-white font-bold rounded-xl px-8 h-11 transition-all active:scale-95 flex items-center gap-2 cursor-pointer "
                        >
                          {isSaving ? (
                             <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          ) : (
                            <Lock size={18} />
                          )}
                          Update Password
                        </Button>
                      </CardFooter>
                    </Card>

                    {/* Additional Security Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                       <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-3">
                         <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                           <Shield size={20} />
                         </div>
                         <h4 className="font-bold text-white">Two-Factor Auth</h4>
                         <p className="text-white/30 text-xs">Add an extra layer of security to your account.</p>
                         <Button variant="outline" className="mt-2 w-fit bg-transparent border-white/10 text-white/40 hover:text-white rounded-xl h-9 text-xs">Coming Soon</Button>
                       </div>
                       <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-3">
                         <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                           <Lock size={20} />
                         </div>
                         <h4 className="font-bold text-white">Sessions</h4>
                         <p className="text-white/30 text-xs">Manage and sign out of your active sessions.</p>
                         <Button variant="outline" className="mt-2 w-fit bg-transparent border-white/10 text-white/40 hover:text-white rounded-xl h-9 text-xs">Coming Soon</Button>
                       </div>
                    </div>
                  </motion.div>
                )}
                {activeTab === "premium" && (
                  <motion.div
                    key="premium"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="bg-white/5 border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden">
                      <CardHeader className="pt-4">
                        <div className="flex items-center gap-3">
                          <Crown size={24} className={premium ? "text-yellow-500" : "text-white/20"} />
                          <CardTitle className="text-xl font-bold text-white">Premium Status</CardTitle>
                        </div>
                        <CardDescription className="text-white/40">
                          {premium?.isActive ? "You are a premium member!" : "Upgrade to premium for unlimited features."}
                        </CardDescription>
                      </CardHeader>
                      <Separator className="bg-white/5" />
                      <CardContent className="pt-6 space-y-6">
                        <div className={`p-6 rounded-3xl ${premium?.isActive ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-white/5 border border-white/10'}`}>
                          <div className="flex items-center gap-3 mb-2">
                            <Crown size={24} className={premium?.isActive ? "text-yellow-500" : "text-white/20"} />
                            <h4 className={`font-bold text-lg ${premium?.isActive ? 'text-yellow-500' : 'text-white/40'}`}>
                              {premium?.isActive ? "PREMIUM ACTIVE" : "Premium Not Active"}
                            </h4>
                          </div>
                          <p className="text-white/40 text-sm">
                            {premium?.isActive ? "Enjoy unlimited messages and 1 free AI Girlfriend creation per month!" : "Upgrade to get unlimited messages and 1 free AI Girlfriend creation per month."}
                          </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                              <MessageCircle size={20} />
                            </div>
                            <h4 className="font-bold text-white">Messages</h4>
                            <p className="text-white/40 text-sm">{premium?.isActive ? "Unlimited" : `${messagesUsed || 0} / 20 per month`}</p>
                          </div>
                          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-3">
                            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                              <Star size={20} />
                            </div>
                            <h4 className="font-bold text-white">Girlfriend Creation</h4>
                            <p className="text-white/40 text-sm">{premium?.isActive ? (canCreateGirlfriend ? "1 free available" : "1/month (used)") : "200 credits"}</p>
                          </div>
                        </div>
                        {user?.points !== undefined && (
                          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-bold text-white">Your Points</h4>
                                <p className="text-white/40 text-sm">Use points for AI Girlfriend creations</p>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-white">{user.points}</p>
                                <p className="text-white/40 text-xs">points</p>
                              </div>
                            </div>
                          </div>
                        )}
                        {!premium?.isActive && (
                          <Button onClick={() => window.location = 'https://buy.stripe.com/bJedR87f4aTTgQK5pd6sw01'} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-xl py-4 transition-all cursor-pointer">
                            <Crown size={20} className="mr-2" />Upgrade to Premium
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        body {
          background-color: #0a0a0f !important;
        }
      `}</style>
    </Layout>
  );
}
