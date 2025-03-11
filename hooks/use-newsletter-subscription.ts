"use client";
import { useState } from "react";

const plunkApiUrl = "https://api.useplunk.com/v1/track";
const plunkApiKey = process.env.NEXT_PUBLIC_PLUNK_API_KEY;

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

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${plunkApiKey}`,
      },
      body: JSON.stringify({
        event: "newsletter_subscription",
        email: state.email,
        subscribed: true,
        data: {
          project_id: "animata",
        },
      }),
    };

    try {
      const response = await fetch(plunkApiUrl, options);

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
