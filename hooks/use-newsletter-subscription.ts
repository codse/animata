"use client";

/**
 * Newsletter Subscription Hook — Updated for Security
 *
 * CDL Learning Outcome: LO2 - Backend Development (Node.js)
 * Student: Krishna Kumar Gupta | ID: 23056976
 * Company: Codse | Internship 2026
 *
 * Security Fix Applied:
 * BEFORE: Hook called Plunk API directly from browser using
 *         NEXT_PUBLIC_PLUNK_API_KEY (exposed in DevTools)
 *
 * AFTER:  Hook calls our secure server-side API route at
 *         /api/newsletter which handles Plunk server-side
 *         API key is now fully protected on the server
 */

import { useState } from "react";

// ─── Removed (Security Fix) ───────────────────────────────────────
// const plunkApiUrl = "https://api.useplunk.com/v1/track";  ← direct browser call
// const plunkApiKey = process.env.NEXT_PUBLIC_PLUNK_API_KEY; ← exposed key

// ─── New secure endpoint (server-side API route) ──────────────────
const newsletterApiUrl = "/api/newsletter";

export default function useNewsletterSubscription() {
  const initialState = {
    email: "",
    isLoading: false,
    error: "",
    success: false,
  };
  const [state, setState] = useState(initialState);

  const setEmail = (email: string) => {
    setState({ ...state, email });
  };

  const addSubscriber = async () => {
    // Validate email on client side first
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(state.email)) {
      setState({
        ...state,
        error: "Please enter a valid email address.",
      });
      return;
    }

    setState({ ...state, isLoading: true });

    try {
      // ✅ SECURE: Now calls our server-side API route
      // API key never leaves the server — not visible in browser DevTools
      const response = await fetch(newsletterApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // No Authorization header here — handled server-side
        },
        body: JSON.stringify({
          email: state.email,
        }),
      });

      if (response.status >= 200 && response.status < 300) {
        // Email added successfully
        setState({
          ...initialState,
          isLoading: false,
          success: true,
        });
        return;
      }

      if (response.status === 409) {
        // Already subscribed
        setState({
          ...initialState,
          error: "You are already subscribed!",
        });
        return;
      }

      // Other errors — parse message from server response
      const errorData = await response.json();
      setState({
        ...initialState,
        error: errorData.error || "An unknown error occurred",
      });
    } catch (error) {
      setState({
        ...initialState,
        error: (error as Error).message,
      });
    }
  };

  return { ...state, addSubscriber, setEmail };
}
