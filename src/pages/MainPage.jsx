import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import characterVideo from "../assets/video2.mp4";
import logo from "../assets/gpt.png";

export default function MainPage() {
  const [view, setView] = useState("register");
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
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

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      window.location.href = '/' 
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
      setIsLoading(false);
    }
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
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      await handleLogin(e);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[var(--bg-primary)]">
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
              {view === "register" ? "Create account" : "Welcome back"}
            </h1>
            <p className="text-sm text-[var(--text-muted)] mt-2">
              {view === "register" 
                ? "Get started for free" 
                : "Enter your details to continue"}
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
                  onClick={() => window.location = `${import.meta.env.VITE_URL}/auth/google`}
                  variant="outline"
                  className="w-full h-11 bg-transparent border-[var(--border-subtle)] text-[var(--foreground)] hover:bg-[var(--bg-tertiary)]"
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

                {error && <p className="text-xs text-red-400">{error}</p>}

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
            ) : (
              <motion.form
                key="register"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleRegister}
                className="space-y-3"
              >
                <Button
                  onClick={() => window.location = `${import.meta.env.VITE_URL}/auth/google`}
                  variant="outline"
                  className="w-full h-11 bg-transparent border-[var(--border-subtle)] text-[var(--foreground)] hover:bg-[var(--bg-tertiary)]"
                >
                  <FcGoogle size={18} className="mr-2" />
                  Continue with Google
                </Button>

                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-[var(--border-subtle)]" />
                  <span className="text-xs text-[var(--text-muted)]">or</span>
                  <div className="flex-1 h-px bg-[var(--border-subtle)]" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username" className="text-xs text-[var(--text-muted)]">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="johndoe"
                    required
                    onChange={handleChange}
                    className="h-10 bg-transparent border-[var(--border-subtle)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)]"
                  />
                </div>

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

                {error && <p className="text-xs text-red-400">{error}</p>}

                <Button 
                  type="submit"
                  className="w-full h-10 bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary)]/90 mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>

                <div className="flex justify-center mt-4">
                  <button
                    type="button"
                    className="text-md text-[var(--text-muted)] hover:text-[var(--foreground)] cursor-pointer"
                    onClick={() => setView("login")}
                  >
                    Already have an account? Sign in
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="text-xs text-[var(--text-muted)] text-center mt-8">
            By continuing, you agree to our{" "}
            <a href="#" className="underline hover:text-[var(--foreground)]">Terms</a>
            {" "}and{" "}
            <a href="#" className="underline hover:text-[var(--foreground)]">Privacy</a>
          </p>
        </div>
      </div>

      {/* Desktop: Right side - Video */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-[var(--bg-secondary)] p-8">
        <div className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden">
          <video
            src={characterVideo}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute bottom-6 left-0 right-0 text-center">
            <p className="text-sm text-[var(--text-muted)]">
              © {new Date().getFullYear()} ClonMe
            </p>
          </div>
        </div>
      </div>

      {/* Mobile: Full screen video with overlay */}
      <div className="lg:hidden flex flex-col min-h-screen">
        <div className="flex-1 relative">
          <video
            src={characterVideo}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
            <img src={logo} alt="Logo" className="h-12 mb-4" />
            <h1 className="text-2xl font-semibold text-white mb-2">
              {view === "register" ? "Create account" : "Welcome back"}
            </h1>
            <p className="text-sm text-white/70 mb-6">
              {view === "register" 
                ? "Get started for free" 
                : "Enter your details to continue"}
            </p>
          </div>
        </div>

        {/* Mobile: Form section */}
        <div className="bg-[var(--bg-primary)] p-6">
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
                  onClick={() => window.location = `${import.meta.env.VITE_URL}/auth/google`}
                  variant="outline"
                  className="w-full h-11 bg-transparent border-[var(--border-subtle)] text-[var(--foreground)] hover:bg-[var(--bg-tertiary)]"
                >
                  <FcGoogle size={18} className="mr-2" />
                  Continue with Google
                </Button>

                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-[var(--border-subtle)]" />
                  <span className="text-xs text-[var(--text-muted)]">or</span>
                  <div className="flex-1 h-px bg-[var(--border-subtle)]" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-mobile" className="text-xs text-[var(--text-muted)]">Email</Label>
                  <Input
                    id="email-mobile"
                    type="email"
                    placeholder="name@example.com"
                    required
                    onChange={handleChange}
                    className="h-10 bg-transparent border-[var(--border-subtle)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password-mobile" className="text-xs text-[var(--text-muted)]">Password</Label>
                  <Input
                    id="password-mobile"
                    type="password"
                    placeholder="••••••••"
                    required
                    onChange={handleChange}
                    className="h-10 bg-transparent border-[var(--border-subtle)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)]"
                  />
                </div>

                {error && <p className="text-xs text-red-400">{error}</p>}

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
                    className="text-md text-[var(--text-muted)] hover:text-[var(--foreground)] cursor-pointer"
                    onClick={() => setView("register")}
                  >
                    Don't have an account? Create one
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.form
                key="register"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleRegister}
                className="space-y-3"
              >
                <Button
                  onClick={() => window.location = `${import.meta.env.VITE_URL}/auth/google`}
                  variant="outline"
                  className="w-full h-11 bg-transparent border-[var(--border-subtle)] text-[var(--foreground)] hover:bg-[var(--bg-tertiary)]"
                >
                  <FcGoogle size={18} className="mr-2" />
                  Continue with Google
                </Button>

                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-[var(--border-subtle)]" />
                  <span className="text-xs text-[var(--text-muted)]">or</span>
                  <div className="flex-1 h-px bg-[var(--border-subtle)]" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username-mobile" className="text-xs text-[var(--text-muted)]">Username</Label>
                  <Input
                    id="username-mobile"
                    type="text"
                    placeholder="johndoe"
                    required
                    onChange={handleChange}
                    className="h-10 bg-transparent border-[var(--border-subtle)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-mobile" className="text-xs text-[var(--text-muted)]">Email</Label>
                  <Input
                    id="email-mobile"
                    type="email"
                    placeholder="name@example.com"
                    required
                    onChange={handleChange}
                    className="h-10 bg-transparent border-[var(--border-subtle)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password-mobile" className="text-xs text-[var(--text-muted)]">Password</Label>
                  <Input
                    id="password-mobile"
                    type="password"
                    placeholder="••••••••"
                    required
                    onChange={handleChange}
                    className="h-10 bg-transparent border-[var(--border-subtle)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="repeat-password-mobile" className="text-xs text-[var(--text-muted)]">Confirm password</Label>
                  <Input
                    id="repeat-password-mobile"
                    type="password"
                    placeholder="••••••••"
                    required
                    onChange={handleChange}
                    className="h-10 bg-transparent border-[var(--border-subtle)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)]"
                  />
                </div>

                {error && <p className="text-xs text-red-400">{error}</p>}

                <Button 
                  type="submit"
                  className="w-full h-10 bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary)]/90 mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>

                <div className="flex justify-center">
                  <button
                    type="button"
                    className="text-xs text-[var(--text-muted)] hover:text-[var(--foreground)]"
                    onClick={() => setView("login")}
                  >
                    Already have an account? Sign in
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
