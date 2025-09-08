// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/context/AuthContext';

// interface RouteGuardProps {
//   children: React.ReactNode;
//   allowedRoles: ('admin' | 'employee')[];
//   redirectPath?: string;
// }

// export function RouteGuard({ children, allowedRoles, redirectPath }: RouteGuardProps) {
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading) {
//       if (!user) {
//         // User not logged in, redirect to appropriate login page
//         const defaultRedirect = allowedRoles.includes('admin') ? '/login/admin' : '/login/employee';
//         router.push(redirectPath || defaultRedirect);
//         return;
//       }

//       if (!allowedRoles.includes(user.role)) {
//         // User doesn't have the right role
//         const roleBasedRedirect = user.role === 'admin' ? '/admin' : '/employee';
//         router.push(roleBasedRedirect);
//         return;
//       }
//     }
//   }, [user, loading, allowedRoles, redirectPath, router]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   if (!user || !allowedRoles.includes(user.role)) {
//     return null;
//   }

//   return <>{children}</>;
// }

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Mock authentication
  if (email === "admin@example.com" && password === "123456") {
    return NextResponse.json({
      role: "Admin",
      token: "admin_token_123",
    });
  } else if (email === "employee@example.com" && password === "123456") {
    return NextResponse.json({
      role: "Employee",
      token: "employee_token_123",
    });
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
