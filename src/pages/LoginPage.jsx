import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import logo from '../assets/gpt.png';

export default function LoginPage() {
  const [view, setView] = useState("start");
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

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

      window.location.href = "/";
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
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)]">
      {/* Minimal header */}
      <header className="absolute top-0 left-0 right-0 p-6 flex justify-center">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src={logo} alt="Logo" className="h-8" />
        </Link>
      </header>

      {/* Main Content - Centered */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          {/* Logo section */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-[var(--foreground)]">
              {view === "register" ? "Create account" : view === "login" ? "Welcome back" : "Sign in"}
            </h1>
            <p className="text-sm text-[var(--text-muted)] mt-2">
              {view === "register" 
                ? "Get started for free" 
                : view === "login" 
                ? "Enter your details to continue" 
                : "Choose how you want to sign in"}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {view === "start" && (
              <motion.div
                key="start"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                <Button
                  onClick={() => window.location = `${import.meta.env.VITE_URL}/auth/google`}
                  variant="outline"
                  className="w-full h-11 bg-transparent border-[var(--border-subtle)] text-[var(--foreground)] hover:bg-[var(--bg-tertiary)] hover:border-[var(--border-subtle)]"
                >
                  <FcGoogle size={18} className="mr-2" />
                  Continue with Google
                </Button>

                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-[var(--border-subtle)]" />
                  <span className="text-xs text-[var(--text-muted)]">or</span>
                  <div className="flex-1 h-px bg-[var(--border-subtle)]" />
                </div>

                <Button
                  onClick={() => setView("login")}
                  className="w-full h-11 bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary)]/90"
                >
                  <HiOutlineMail size={18} className="mr-2" />
                  Continue with email
                </Button>

                <p className="text-xs text-[var(--text-muted)] text-center mt-6">
                  By continuing, you agree to our{" "}
                  <a href="#" className="underline hover:text-[var(--foreground)]">Terms</a>
                  {" "}and{" "}
                  <a href="#" className="underline hover:text-[var(--foreground)]">Privacy</a>
                </p>
              </motion.div>
            )}

            {view === "login" && (
              <motion.form
                key="login"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.2 }}
                className="space-y-4"
                onSubmit={handleLogin}
              >
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs text-[var(--text-muted)]">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    onChange={handleChange}
                    className="h-10 bg-transparent border-[var(--border-subtle)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:ring-[var(--accent-primary)]"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-xs text-[var(--text-muted)]">Password</Label>
                  <Input
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    required
                    onChange={handleChange}
                    className="h-10 bg-transparent border-[var(--border-subtle)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:ring-[var(--accent-primary)]"
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

                <div className="flex items-center justify-between mt-4">
                  <button
                    type="button"
                    className="text-xs text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors"
                    onClick={() => setView("register")}
                  >
                    Create account
                  </button>
                  <button
                    type="button"
                    className="text-xs text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              </motion.form>
            )}

            {view === "register" && (
              <motion.form
                key="register"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.2 }}
                className="space-y-3"
                onSubmit={handleRegister}
              >
                <div className="space-y-1.5">
                  <Label htmlFor="username" className="text-xs text-[var(--text-muted)]">Username</Label>
                  <Input
                    id="username"
                    placeholder="johndoe"
                    type="text"
                    required
                    onChange={handleChange}
                    className="h-10 bg-transparent border-[var(--border-subtle)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:ring-[var(--accent-primary)]"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs text-[var(--text-muted)]">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    onChange={handleChange}
                    className="h-10 bg-transparent border-[var(--border-subtle)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:ring-[var(--accent-primary)]"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-xs text-[var(--text-muted)]">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    onChange={handleChange}
                    className="h-10 bg-transparent border-[var(--border-subtle)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:ring-[var(--accent-primary)]"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="repeat-password" className="text-xs text-[var(--text-muted)]">Confirm password</Label>
                  <Input
                    id="repeat-password"
                    type="password"
                    placeholder="••••••••"
                    required
                    onChange={handleChange}
                    className="h-10 bg-transparent border-[var(--border-subtle)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:ring-[var(--accent-primary)]"
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

                <p className="text-xs text-[var(--text-muted)] text-center mt-4">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="text-[var(--accent-primary)] hover:underline"
                    onClick={() => setView("login")}
                  >
                    Sign in
                  </button>
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Minimal footer */}
      <footer className="py-4 text-center">
        <Link to="/" className="text-xs text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">
          ← Back to home
        </Link>
      </footer>
    </div>
  );
}
