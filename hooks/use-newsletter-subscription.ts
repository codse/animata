"use client";
import { useState } from "react";

import { supabaseClient } from "@/db/client";

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
    try {
      const response = await supabaseClient
        .from("prelaunch_subscribers")
        .insert({
          email: state.email,
        });
      const { status, error } = response;
      if (status >= 200 && status < 300) {
        // Email added successfully
        setState({
          ...initialState,
          isLoading: false,
          success: true,
        });
        return;
      }
      if (status === 409) {
        // Already subscribed
        setState({
          ...initialState,
          error: "You are already subscribed!",
        });
        return;
      }
      if (error) {
        // Some other error
        setState({
          ...initialState,
          error: error.message,
        });
      }
    } catch (error) {
      setState({
        ...initialState,
        error: (error as Error).message,
      });
    }
  };

  return { ...state, addSubscriber, setEmail };
}
