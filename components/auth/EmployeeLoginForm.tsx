"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, User } from "lucide-react";
import { baseURL } from "@/lib/utils";

export function EmployeeLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>(null);
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${baseURL}api/auth/login`, // 👈 your backend URL
        { email, password },
        {
          
            headers: { "Content-Type": "application/json" },
          
        }
      );
       const data = response.data;

       localStorage.setItem("employee-token", data.token);

       setUser(data.user); 
      setSuccess(data.message); 

       setTimeout(() => {
        router.push("/employee");
      }, 1000);
    
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-2">
          <User className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl text-center">Employee Login</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your employee portal
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-md">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          <div className="text-center">
            <Link
              href="/register/employee"
              className="text-sm text-primary hover:underline"
            >
              Dont have an account? Register here
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
