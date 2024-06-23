"use client";
import { useState } from "react";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL + "/rest/v1/prelaunch_subscribers";
const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(state.email)) {
      setState({
        ...state,
        error: "Please enter a valid email address.",
      });
      return;
    }

    setState({ ...state, isLoading: true });
    const data = { email: state.email };

    try {
      const response = await fetch(url, {
        method: "POST",
        // @ts-expect-error - Types for custom headers are not defined in fetch types
        headers: {
          apikey: apiKey,
          Authorization: "Bearer " + apiKey,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(data),
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

      // Other errors
      const errorData = await response.json();
      setState({
        ...initialState,
        error: errorData.message || "An unknown error occurred",
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
