import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import characterVideo from "../assets/20260326183922173497.mp4";
import logo from "../assets/gpt.png";

export default function MainPage() {
  const [view, setView] = useState("register");
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
    if (e.target.id === "email" && registeredEmail) {
      setRegisteredEmail(e.target.value);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    if (!form.email || !form.password) {
      setError("Email and password are required");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/login`, {
        method: "POST",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        }),
      });

      const data = await response.json();

      if (response.status === 403 && data.requiresVerification) {
        setVerifyEmail(data.email || form.email);
        setView("verify");
        setIsLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      window.location.href = '/' 
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
      setIsLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!verificationCode || verificationCode.length < 5) {
      setError("Please enter a valid verification code");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/verify-email`, {
        method: "POST",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: verifyEmail,
          code: verificationCode.trim()
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Verification failed");
      }

      window.location.href = "/";
    } catch (err) {
      setError(err.message || "Verification failed. Please try again.");
      setIsLoading(false);
    }
  };

  const handleRegisterEmail = async (e) => {
    e.preventDefault();
    if (!form.email) {
      setError("Email is required");
      return;
    }
    setRegisteredEmail(form.email);
    setView("register-password");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (form.password !== form["repeat-password"]) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(import.meta.env.VITE_URL + "/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: registeredEmail || form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      
      if (res.status === 201 && data.requiresVerification) {
        setVerifyEmail(data.email || form.email);
        setView("verify");
        setIsLoading(false);
        return;
      }
      
      if (!res.ok) throw new Error(data.message || "Registration failed");

      window.location.href = '/'
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[var(--bg-primary)] text-white">
      {/* Desktop: Left side - Form */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <img src={logo} alt="Logo" className="h-10" />
          </div>

          {/* Title */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-[var(--foreground)]">
              {view === "register" ? "Create account" : view === "register-password" ? "Set password" : view === "login" ? "Welcome back" : "Verify Email"}
            </h1>
            <p className="text-sm text-[var(--text-muted)] mt-2">
              {view === "register" 
                ? "Enter your email to get started" 
                : view === "register-password"
                ? "Create a secure password"
                : view === "login"
                ? "Enter your details to continue"
                : "Check your inbox for the code"}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {view === "login" ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleLogin}
                className="space-y-4"
              >
                <Button
                  type="button"
                  onClick={() => window.location = `${import.meta.env.VITE_URL}/auth/google`}
                  variant="outline"
                  className="w-full h-11 bg-transparent border-[var(--border-subtle)] text-white hover:bg-[var(--bg-tertiary)]"
                >
                  <FcGoogle size={18} className="mr-2" />
                  Continue with Google
                </Button>

                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-[var(--border-subtle)]" />
                  <span className="text-xs text-[var(--text-muted)]">or</span>
                  <div className="flex-1 h-px bg-[var(--border-subtle)]" />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email" className="text-xs text-[var(--text-muted)]">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    onChange={handleChange}
                    className="h-10 bg-transparent border-[var(--border-subtle)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)]"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="password" className="text-xs text-[var(--text-muted)]">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    onChange={handleChange}
                    className="h-10 bg-transparent border-[var(--border-subtle)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)]"
                  />
                </div>

                {error && <p className="text-xs text-[#e11d48]">{error}</p>}

                <Button 
                  type="submit"
                  className="w-full h-10 bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary)]/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>

                <div className="flex justify-center mt-4">
                  <button
                    type="button"
                    className="text-md text-[var(--text-muted)] hover:text-[var(--foreground)] cursor-pointer"
                    onClick={() => setView("register")}
                  >
                    Don't have an account? Create one
                  </button>
                </div>
              </motion.form>
            ) : view === "register" || view === "register-password" ? (
              <motion.form
                key={view}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                onSubmit={view === "register" ? handleRegisterEmail : handleRegister}
                className="space-y-3"
              >
                <Button
                  type="button"
                  onClick={() => window.location = `${import.meta.env.VITE_URL}/auth/google`}
                  variant="outline"
                  className="w-full h-11 bg-transparent border-[var(--border-subtle)] text-white hover:bg-[var(--bg-tertiary)]"
                >
                  <FcGoogle size={18} className="mr-2" />
                  Continue with Google
                </Button>

                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-[var(--border-subtle)]" />
                  <span className="text-xs text-[var(--text-muted)]">or</span>
                  <div className="flex-1 h-px bg-[var(--border-subtle)]" />
                </div>

                {view === "register" ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs text-[var(--text-muted)]">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        required
                        onChange={handleChange}
                        className="h-10 bg-transparent border-[var(--border-subtle)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)]"
                      />
                    </div>
                  </>
                ) : view === "register-password" ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs text-[var(--text-muted)]">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        required
                        readOnly
                        value={registeredEmail || form.email || ""}
                        onChange={handleChange}
                        className="h-10 bg-transparent border-[var(--border-subtle)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-xs text-[var(--text-muted)]">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        required
                        onChange={handleChange}
                        className="h-10 bg-transparent border-[var(--border-subtle)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="repeat-password" className="text-xs text-[var(--text-muted)]">Confirm password</Label>
                      <Input
                        id="repeat-password"
                        type="password"
                        placeholder="••••••••"
                        required
                        onChange={handleChange}
                        className="h-10 bg-transparent border-[var(--border-subtle)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)]"
                      />
                    </div>
                  </>
                ) : null}

                {error && <p className="text-xs text-[#e11d48]">{error}</p>}

                <Button 
                  type="submit"
                  className="w-full h-10 bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary)]/90 mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : view === "register" ? "Continue" : "Create account"}
                </Button>

                <div className="flex justify-center mt-4">
                  <button
                    type="button"
                    className="text-md text-[var(--text-muted)] hover:text-[var(--foreground)] cursor-pointer"
                    onClick={() => {
                      if (view === "register-password") {
                        setRegisteredEmail("");
                      }
                      setView(view === "register" ? "login" : "register")
                    }}
                  >
                    {view === "register" ? "Already have an account? Sign in" : "Back"}
                  </button>
                </div>
              </motion.form>
            ) : view === "verify" ? (
              <motion.form
                key="verify"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleVerify}
                className="space-y-4"
              >
                <p className="text-sm text-center text-[var(--text-muted)] mb-4">
                  Verification code sent to:<br/><span className="text-[var(--foreground)] font-medium">{verifyEmail}</span>
                </p>
                <div className="space-y-3">
                  <Label htmlFor="verificationCode" className="text-xs text-[var(--text-muted)] mb-2 block">
                    6-Digit Code
                  </Label>
                  <Input
                    id="verificationCode"
                    type="text"
                    placeholder="123456"
                    required
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="text-center tracking-widest text-lg h-11 bg-transparent border-[var(--border-subtle)] text-[var(--foreground)] focus:border-[var(--accent-primary)] focus:ring-[var(--accent-primary)]"
                    maxLength={6}
                  />
                </div>

                {error && <p className="text-xs text-[#e11d48]">{error}</p>}

                <Button 
                  type="submit" 
                  className="w-full h-10 bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary)]/90" 
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying..." : "Verify Email"}
                </Button>
              </motion.form>
            ) : null}
          </AnimatePresence>

          <p className="text-xs text-[var(--text-muted)] text-center mt-8">
            By continuing, you agree to our{" "}
            <a href="/terms" className="underline hover:text-[var(--foreground)]">Terms</a>
            {" "}and{" "}
            <a href="/privacy" className="underline hover:text-[var(--foreground)]">Privacy</a>
          </p>
        </div>
      </div>

      {/* Desktop: Right side - Video */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-[var(--bg-secondary)] p-4">
        <div className="relative w-full max-w-xs aspect-[9/16] rounded-xl overflow-hidden">
          <video
            src={characterVideo}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <p className="text-xs text-[var(--text-muted)]">
              © {new Date().getFullYear()} ClonMe
            </p>
          </div>
        </div>
      </div>

      {/* Mobile: Full screen video with overlay */}
      <div className="lg:hidden w-full flex flex-col" >
        <div className="relative h-48">
          <video
            src={characterVideo}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 text-center">
            <img src={logo} alt="Logo" className="h-8 mb-2" />
            <h1 className="text-xl font-semibold text-white">
              {view === "register" ? "Create account" : view === "register-password" ? "Set password" : view === "login" ? "Welcome back" : "Verify Email"}
            </h1>
          </div>
        </div>

        {/* Mobile: Form section */}
        <div className="bg-[var(--bg-primary)] p-4">
          <AnimatePresence mode="wait">
            {view === "login" ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleLogin}
                className="space-y-4"
              >
                <Button
                  type="button"
                  onClick={() => window.location = `${import.meta.env.VITE_URL}/auth/google`}
                  variant="outline"
                  className="w-full h-11 bg-transparent border-[var(--border-subtle)] text-white hover:bg-[var(--bg-tertiary)]"
                >
                  <FcGoogle size={18} className="mr-2" />
                  Continue with Google
                </Button>

                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-[var(--border-subtle)]" />
                  <span className="text-xs text-white">or</span>
                  <div className="flex-1 h-px bg-[var(--border-subtle)]" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs text-white">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    onChange={handleChange}
                    className="h-10 bg-transparent border-[var(--border-subtle)] text-white placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-xs text-white">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    onChange={handleChange}
                    className="h-10 bg-transparent border-[var(--border-subtle)] text-white placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)]"
                  />
                </div>

                {error && <p className="text-xs text-[#e11d48]">{error}</p>}

                <Button 
                  type="submit"
                  className="w-full h-10 bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary)]/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>

                <div className="flex justify-center">
                  <button
                    type="button"
                    className="text-md text-white hover:text-white/80 cursor-pointer"
                    onClick={() => setView("register")}
                  >
                    Don't have an account? Create one
                  </button>
                </div>
              </motion.form>
            ) : view === "register" || view === "register-password" ? (
              <motion.form
                key={view}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                onSubmit={view === "register" ? handleRegisterEmail : handleRegister}
                className="space-y-3"
              >
                <Button
                  type="button"
                  onClick={() => window.location = `${import.meta.env.VITE_URL}/auth/google`}
                  variant="outline"
                  className="w-full h-11 bg-transparent border-[var(--border-subtle)] text-white hover:bg-[var(--bg-tertiary)]"
                >
                  <FcGoogle size={18} className="mr-2" />
                  Continue with Google
                </Button>

                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-[var(--border-subtle)]" />
                  <span className="text-xs text-white">or</span>
                  <div className="flex-1 h-px bg-[var(--border-subtle)]" />
                </div>

                {view === "register" ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs text-white">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        required
                        onChange={handleChange}
                        className="h-10 bg-transparent border-[var(--border-subtle)] text-white placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)]"
                      />
                    </div>
                  </>
                ) : view === "register-password" ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs text-white">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        required
                        readOnly
                        value={registeredEmail || form.email || ""}
                        onChange={handleChange}
                        className="h-10 bg-transparent border-[var(--border-subtle)] text-white placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-xs text-white">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        required
                        onChange={handleChange}
                        className="h-10 bg-transparent border-[var(--border-subtle)] text-white placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="repeat-password" className="text-xs text-white">Confirm password</Label>
                      <Input
                        id="repeat-password"
                        type="password"
                        placeholder="••••••••"
                        required
                        onChange={handleChange}
                        className="h-10 bg-transparent border-[var(--border-subtle)] text-white placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)]"
                      />
                    </div>
                  </>
                ) : null}

                {error && <p className="text-xs text-[#e11d48]">{error}</p>}

                <Button 
                  type="submit"
                  className="w-full h-10 bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary)]/90 mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : view === "register" ? "Continue" : "Create account"}
                </Button>

                <div className="flex justify-center">
                  <button
                    type="button"
                    className="text-xs text-white hover:text-white/80"
                    onClick={() => {
                      if (view === "register-password") {
                        setRegisteredEmail("");
                      }
                      setView(view === "register" ? "login" : "register")
                    }}
                  >
                    {view === "register" ? "Already have an account? Sign in" : "Back"}
                  </button>
                </div>
              </motion.form>
            ) : view === "verify" ? (
              <motion.form
                key="verify"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleVerify}
                className="space-y-4"
              >
                <p className="text-sm text-center text-white mb-4">
                  Verification code sent to:<br/><span className="text-white font-medium">{verifyEmail}</span>
                </p>
                <div className="space-y-3">
                  <Label htmlFor="verificationCode" className="text-xs text-white mb-2 block">
                    6-Digit Code
                  </Label>
                  <Input
                    id="verificationCode"
                    type="text"
                    placeholder="123456"
                    required
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="text-center tracking-widest text-lg h-11 bg-transparent border-[var(--border-subtle)] text-white placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:ring-[var(--accent-primary)]"
                    maxLength={6}
                  />
                </div>

                {error && <p className="text-xs text-[#e11d48]">{error}</p>}

                <Button 
                  type="submit" 
                  className="w-full h-10 bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary)]/90" 
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying..." : "Verify Email"}
                </Button>
              </motion.form>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}





