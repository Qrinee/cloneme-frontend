import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginModal({ open, onClose }) {
  const [activeTab, setActiveTab] = useState("register");
  const [form, setForm] = useState({});
  const [error, setError] = useState("");

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
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
    
    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/login`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      console.log("Login success:", data);
      window.location.reload();
      onClose();
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
      console.error("Login error:", err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form["repeat-password"]) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(import.meta.env.VITE_URL + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      console.log("Registration success:", data);
      setActiveTab("login"); // Przełącz na logowanie po udanej rejestracji
    } catch (err) {
      setError(err.message);
      console.error("Register error:", err.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl text-center px-6 py-8">
        <DialogHeader>
          <DialogTitle className="text-4xl font-bold mb-2 text-center">
            <span className="text-primary">ClonMe</span>
          </DialogTitle>
          <p className="text-muted-foreground text-sm mb-6 text-center">
            Join our community or access your account
          </p>
        </DialogHeader>

        <div className="space-y-4">
          <Button
            onClick={() => window.location = `${import.meta.env.VITE_URL}/auth/google`}
            variant="outline"
            className="w-full flex gap-2 justify-center"
          >
            <FcGoogle size={20} />
            Continue with Google
          </Button>

          <div className="flex items-center justify-center">
            <span className="border-t w-full border-muted" />
            <span className="px-3 text-muted-foreground text-sm">Or</span>
            <span className="border-t w-full border-muted" />
          </div>

          <Tabs defaultValue="register" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="register">Register</TabsTrigger>
              <TabsTrigger value="login">Login</TabsTrigger>
            </TabsList>
            
            <TabsContent value="register" className="space-y-4 pt-4">
              <motion.form
                initial="hidden"
                animate="visible"
                variants={variants}
                className="space-y-4 text-left"
                onSubmit={handleRegister}
              >
                <div>
                  <Label htmlFor="username" className="mb-2">
                    Username
                  </Label>
                  <Input
                    id="username"
                    placeholder="John Doe"
                    type="text"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="mb-2">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@doe.com"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="mb-2">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="repeat-password" className="mb-2">
                    Repeat Password
                  </Label>
                  <Input
                    id="repeat-password"
                    placeholder="********"
                    type="password"
                    required
                    onChange={handleChange}
                  />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </motion.form>
            </TabsContent>
            
            <TabsContent value="login" className="space-y-4 pt-4">
              <motion.form
                initial="hidden"
                animate="visible"
                variants={variants}
                className="space-y-4 text-left"
                onSubmit={handleLogin}
              >
                <div>
                  <Label htmlFor="login-email" className="mb-2">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@doe.com"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="login-password" className="mb-2">
                    Password
                  </Label>
                  <Input
                    id="password"
                    placeholder="********"
                    type="password"
                    required
                    onChange={handleChange}
                  />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <Button type="submit" className="w-full">
                  Login
                </Button>
              </motion.form>
            </TabsContent>
          </Tabs>

          <p className="text-xs text-muted-foreground mt-2">
            By signing up, you confirm that you have read and understood our{" "}
            <a href="#" className="underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
            .
          </p>

          <p className="text-xs text-blue-600 mt-1 cursor-pointer underline">
            Contact us
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}