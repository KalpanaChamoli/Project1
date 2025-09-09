import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (email === "admin@example.com" && password === "123456") {
    return NextResponse.json({
      role: "admin",
      token: "admin_token_123",
    });
  } else if (email === "employee@example.com" && password === "123456") {
    return NextResponse.json({
      role: "employee",
      token: "employee_token_123",
    });
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
