"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const demoAccounts = [
    { role: "Admin", email: "admin@example.com", password: "123456" },
    { role: "Employee", email: "employee@example.com", password: "123456" },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("api/auth/login", { email, password });
      const data = res.data;

      const role: string = (data.user?.role || data.role || "").toLowerCase();
      // Save token + role
      localStorage.setItem(`${role}_token`, data.token);
    localStorage.setItem("role", role);

      // Redirect
      if (role === "admin") {
      router.push("/admin");
    } else if (role === "employee") {
      router.push("/employee");
    } else {
      setError("Unauthorized role");
    }
  } catch (err: any) {
    setError(err.response?.data?.error || "Invalid credentials");
  } finally {
    setLoading(false);
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Log In</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                        placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Must have at least 8 characters"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                          placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
                      shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In →"}
          </button>
        </form>        
      </div>
    </div>
  );
}
