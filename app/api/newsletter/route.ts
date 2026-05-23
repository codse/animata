/**
 * Newsletter Subscription API Route
 *
 * CDL Learning Outcome: LO2 - Backend Development (Node.js)
 * Student: Krishna Kumar Gupta | ID: 23056976
 * Company: Codse | Internship 2026
 *
 * Purpose:
 * This server-side API route was created to fix a critical security
 * vulnerability where the Plunk API key was being exposed client-side.
 * Moving the API call to a Next.js server route (Node.js backend)
 * protects the secret key from being visible in browser DevTools.
 *
 * Security Fix:
 * Before: NEXT_PUBLIC_PLUNK_API_KEY used in browser (exposed)
 * After:  PLUNK_API_KEY used server-side only (protected)
 */

import { type NextRequest, NextResponse } from "next/server";

// ─── Type Definitions ────────────────────────────────────────────
interface NewsletterRequestBody {
  email: string;
}

interface PlunkResponse {
  success: boolean;
  message?: string;
}

// ─── Input Validation Helper ──────────────────────────────────────
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ─── POST Handler ─────────────────────────────────────────────────
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // 1. Parse the request body
    const body: NewsletterRequestBody = await request.json();
    const { email } = body;

    // 2. Validate email input
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email address is required" }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please provide a valid email address" }, { status: 400 });
    }

    // 3. Check server-side environment variable exists
    const plunkApiKey = process.env.PLUNK_API_KEY;

    if (!plunkApiKey) {
      console.error("PLUNK_API_KEY environment variable is not set");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // 4. Call Plunk API from SERVER side (key never reaches browser)
    const plunkResponse = await fetch("https://api.useplunk.com/v1/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // ✅ SECURE: Server-side env var — never exposed to browser
        Authorization: `Bearer ${plunkApiKey}`,
      },
      body: JSON.stringify({
        event: "newsletter-signup",
        email: email.toLowerCase().trim(),
      }),
    });

    // 5. Handle Plunk API response
    if (!plunkResponse.ok) {
      const errorData = await plunkResponse.text();
      console.error("Plunk API error:", errorData);
      return NextResponse.json(
        { error: "Subscription service temporarily unavailable" },
        { status: 502 },
      );
    }

    const data: PlunkResponse = await plunkResponse.json();

    // 6. Return success response to frontend
    return NextResponse.json(
      {
        success: true,
        message: "Successfully subscribed to newsletter",
      },
      { status: 200 },
    );
  } catch (error) {
    // 7. Handle unexpected errors
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 },
    );
  }
}

// ─── GET Handler (Method Not Allowed) ────────────────────────────
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ error: "Method not allowed. Use POST." }, { status: 405 });
}
