import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail } from "react-icons/hi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from '../assets/gpt.png';

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verifyEmail, setVerifyEmail] = useState("");

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validation
    if (!form.username || !form.email || !form.password || !form.repeatPassword) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    if (form.password !== form.repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      
      if (res.status === 201 && data.requiresVerification) {
        setVerifyEmail(data.email || form.email);
        setIsVerifying(true);
        setIsLoading(false);
        return;
      }
      
      if (!res.ok) throw new Error(data.message || "Registration failed");

      // Redirect to login after successful registration
      window.location.href = "/login";
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="py-6 px-6 flex justify-between items-center border-b">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-8" />
        </div>
        <div>
          <Button variant="outline" asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={variants}
          className="w-full max-w-md rounded-2xl border bg-card text-card-foreground shadow-lg px-6 py-8"
        >
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white">Create Account</h1>
            <p className="text-muted-foreground mt-2">
              Create your account to get started
            </p>
          </div>

          {isVerifying ? (
            <form onSubmit={handleVerify} className="space-y-4 text-left">
              <p className="text-sm text-center text-muted-foreground mb-4">
                Verification code sent to:<br/><span className="text-white font-medium">{verifyEmail}</span>
              </p>
              <div>
                <Label htmlFor="verificationCode" className="mb-2 text-white">6-Digit Code</Label>
                <Input
                  id="verificationCode"
                  type="text"
                  placeholder="123456"
                  required
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="text-center tracking-widest text-lg h-11 border-muted text-white placeholder:text-gray-300 focus:border-primary"
                  maxLength={6}
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button type="submit" className="w-full mt-4" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify Email"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4 text-left">
              <div>
                <Label htmlFor="username" className="text-white">Username</Label>
                <Input
                  id="username"
                  placeholder="John Doe"
                  type="text"
                  required
                  onChange={handleChange}
                  value={form.username}
                  className="mt-1 text-white placeholder:text-gray-300"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@doe.com"
                  required
                  onChange={handleChange}
                  value={form.email}
                  className="mt-1 text-white placeholder:text-gray-300"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                  onChange={handleChange}
                  value={form.password}
                  className="mt-1 text-white placeholder:text-gray-300"
                />
              </div>

              <div>
                <Label htmlFor="repeatPassword" className="text-white">Repeat Password</Label>
                <Input
                  id="repeatPassword"
                  placeholder="********"
                  type="password"
                  required
                  onChange={handleChange}
                  value={form.repeatPassword}
                  className="mt-1 text-white placeholder:text-gray-300"
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button 
                type="submit" 
                className="w-full mt-2"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Register"}
              </Button>

              <div className="flex items-center justify-center mt-4">
                <span className="border-t w-full border-muted" />
                <span className="px-3 text-muted-foreground text-sm">Or</span>
                <span className="border-t w-full border-muted" />
              </div>

              <Button
                type="button"
                onClick={() => window.location = `${import.meta.env.VITE_URL}/auth/google`}
                variant="outline"
                className="w-full flex gap-2 justify-center"
              >
                <FcGoogle size={20} />
                Register with Google
              </Button>

              <p className="text-sm text-muted-foreground text-center mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-primary cursor-pointer underline font-medium">
                  Login
                </Link>
              </p>
            </form>
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-sm text-muted-foreground">
        Need help? <a href="#" className="underline">Contact support</a>
      </footer>
    </div>
  );
}